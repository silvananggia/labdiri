// ** React Imports
import { useState, useEffect, Fragment, React } from "react";

// ** Third Party Components
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { Plus, Minus, FileText, X, DownloadCloud } from "react-feather";
import Swal from "sweetalert2";

// ** Utils
import { selectThemeColors } from "@utils";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllLokasi } from "../../actions/lokasi";
import { getAllKategori } from "../../actions/kategorilab";
import { createLaboratorium } from "../../actions/laboratorium";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/file-uploader/file-uploader.scss";

const statusOptions = [
  { id: "1", value: "1", label: "Aktif" },
  { id: "2", value: "0", label: "Tidak Aktif" },
];

const LaboratoriumCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputkategori, setvaluekat] = useState("");
  const [idkategori, setIdkategori] = useState("");
  const [inputlokasi, setvaluelok] = useState("");
  const [idlokasi, setIdlokasi] = useState("");
  const [nama, namachange] = useState("");

  const [inputValue, setValue] = useState("");
  const [status, setSelectedValue] = useState("aktif");

  useEffect(() => {
    dispatch(getAllLokasi());
    dispatch(getAllKategori());
  }, []);

  const listLokasi = useSelector((state) => state.lokasi.lokasilist);

  const handleInputLokasiChange = (value) => {
    setvaluelok(value);
  };

  const handleLokasiChange = (value) => {
    setIdlokasi(value.id);
  };

  const listKategori = useSelector((state) => state.kategori.kategorilist);

  const handleInputKategoriChange = (value) => {
    setvaluekat(value);
  };

  const handleKategoriChange = (value) => {
    setIdkategori(value.id);
  };

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (e) => {
    setSelectedValue(e.value);
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tusi, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const [editordeskState, setEditorDeskState] = useState(() =>
    EditorState.createEmpty()
  );
  const [deskripsi, setConvertedDeskripsi] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editordeskState.getCurrentContent());
    setConvertedDeskripsi(html);
  }, [editordeskState]);

  const [editorposisiState, setEditorPosisiState] = useState(() =>
    EditorState.createEmpty()
  );
  const [posisi_strategis, setConvertedPosisi] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorposisiState.getCurrentContent());
    setConvertedPosisi(html);
  }, [editorposisiState]);

  const [editorsdmState, setEditorSdmState] = useState(() =>
    EditorState.createEmpty()
  );
  const [sdm, setConvertedSdm] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorsdmState.getCurrentContent());
    setConvertedSdm(html);
  }, [editorsdmState]);

  //
  // ** State
  const [images, setimages] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedimages) => {
      console.log(acceptedimages);
      try {
        setimages([
          ...images,
          ...acceptedimages.map((file) => Object.assign(file)),
        ]);
      } catch (error) {
        console.error("Error handling file drop:", error);
      }
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedimages = images;
    const filtered = uploadedimages.filter((i) => i.name !== file.name);
    setimages([...filtered]);
  };

  const renderimagesize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = images.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderimagesize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  const handleRemoveAllimages = () => {
    setimages([]);
  };
  //

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("idkategori", idkategori);
    formData.append("idlokasi", idlokasi);
    formData.append("nama", nama);
    formData.append("tusi", tusi);
    formData.append("deskripsi", deskripsi);
    formData.append("posisi_strategis", posisi_strategis);
    formData.append("sdm", sdm);
    formData.append("status", status);

    if (setimages.length === 0) return;

    for (const image of images) {
      formData.append("images[]", image);
    }

    const laboratoriumobj = {
      idkategori,
      idlokasi,
      nama,
      tusi,
      deskripsi,
      posisi_strategis,
      sdm,
      status,
    };


    try {
      await dispatch(createLaboratorium(formData));
      // Show a success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data Berhasil Ditambahkan.",
      });
      navigate(-1);
    } catch (error) {
      // Handle errors if the update fails
      console.error("Error:", error);
      // Show an error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal Menambah Data.",
      });
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handlesubmit}>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Tambah Laboratorium</CardTitle>
          </CardHeader>

          <CardBody>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="namaLaboratorium">
                  Nama Laboratorium
                </Label>
                <Input
                  type="text"
                  name="nama"
                  id="namaLaboratorium"
                  placeholder="Nama Laboratorium"
                  value={nama}
                  onChange={(e) => namachange(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Kategori Laboratorium
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  cacheOptions
                  defaultOptions
                  options={listKategori} // Since the list is provided by the store, provide it directly
                  value={listKategori.find((obj) => obj.value === idkategori)}
                  getOptionLabel={({ nama }) => nama}
                  getOptionValue={({ id }) => id}
                  onInputChange={handleInputKategoriChange}
                  onChange={handleKategoriChange}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Lokasi Laboratorium
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  cacheOptions
                  defaultOptions
                  options={listLokasi}
                  value={listLokasi.find((obj) => obj.value === idlokasi)}
                  getOptionLabel={({ nama }) => nama}
                  getOptionValue={({ id }) => id}
                  onInputChange={handleInputLokasiChange}
                  onChange={handleLokasiChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="keteranganLokasi">
                  Tugas & Fungsi
                </Label>

                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="latitudeLokasi">
                  Deskripsi
                </Label>
                <Editor
                  editorState={editordeskState}
                  onEditorStateChange={setEditorDeskState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="latitudeLokasi">
                  Posisi Strategis
                </Label>
                <Editor
                  editorState={editorposisiState}
                  onEditorStateChange={setEditorPosisiState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="longitudeLokasi">
                  SDM
                </Label>
                <Editor
                  editorState={editorsdmState}
                  onEditorStateChange={setEditorSdmState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Status
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  options={statusOptions} // Since the list is provided by the store, provide it directly
                  value={statusOptions.find((obj) => obj.value === status)}
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => e.id}
                  onInputChange={handleInputChange}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Foto Alat</CardTitle>
          </CardHeader>

          <CardBody>
            <Row>
              <Col sm="12">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <DownloadCloud size={64} />
                    <h5>Drop images here or click to upload</h5>
                    <p className="text-secondary">
                      Drop images here or click{" "}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        browse
                      </a>{" "}
                      thorough your machine
                    </p>
                  </div>
                </div>
                {images.length ? (
                  <Fragment>
                    <ListGroup className="my-2">{fileList}</ListGroup>
                    <div className="d-flex justify-content-end">
                      <Button
                        className="me-1"
                        color="danger"
                        outline
                        onClick={handleRemoveAllimages}
                      >
                        Remove All
                      </Button>
                    </div>
                  </Fragment>
                ) : null}
              </Col>
            </Row>
            <br />

            <Row>
              <Col sm="12">
                <div className="d-flex">
                  <Button className="me-1" color="primary" type="submit">
                    Simpan
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    onClick={() => navigate(-1)}
                  >
                    Kembali
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </Fragment>
  );
};
export default LaboratoriumCreate;
