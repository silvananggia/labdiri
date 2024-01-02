// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { Plus, Minus, FileText, X, DownloadCloud,AlertCircle } from "react-feather";
import Swal from "sweetalert2";

// ** Utils
import { selectThemeColors } from "@utils";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllKategori } from "../../actions/kategorilab";
import { getAllLokasi } from "../../actions/lokasi";
import {
  updateLaboratorium,
  getLaboratoriumID,
} from "../../actions/laboratorium";

// ** Reactstrap Imports
import {
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
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

import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML, convertFromHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";
import CustomEditor from "../Editor/CustomEditor";
// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

const statusOptions = [
  { id: "1", value: "aktif", label: "Aktif" },
  { id: "2", value: "non-aktf", label: "Tidak Aktif" },
];

const LaboratoriumUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, idchange] = useState(0);
  const { code } = useParams();

  const [lokasi, setLokasi] = useState("");
  const [desc, setDesc] = useState("");
  const [nama, namachange] = useState("");
  const [inputValue, setValue] = useState("");
  const [status, statuschange] = useState("aktif");




  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (e) => {
    statuschange(e.value);
  };

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );



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
    formData.append("_method", "PUT");
    formData.append("tusi", tusi);
    formData.append("posisi_strategis", posisi_strategis);
    formData.append("sdm", sdm);
    formData.append("status", status);

    if (setimages.length === 0) return;

    for (const image of images) {
      formData.append("images[]", image);
    }
    try {
      await dispatch(updateLaboratorium(id, formData));
      // Show a success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data Berhasil Diubah.",
      });
      navigate(-1);
    } catch (error) {
      // Handle errors if the update fails
      console.error("Error:", error);
      // Show an error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal Mengubah Data.",
      });
    }
  };
  useEffect(() => {
    dispatch(getLaboratoriumID(code));
  }, []);

  useEffect(() => {
    if (laboratoriumobj ) {
      idchange(laboratoriumobj.id);
      namachange(laboratoriumobj.nama);
      setLokasi(laboratoriumobj.lokasi_kawasan);
      setDesc(laboratoriumobj.deskripsi);
      statuschange(laboratoriumobj.status);
      seInitTusi(laboratoriumobj.tusi)
      seInitPosisi(laboratoriumobj.posisi_strategis);
      seInitSDM(laboratoriumobj.sdm)
    }
  }, [laboratoriumobj]);


  const [inittusi, seInitTusi] = useState(null);
  const [tusi, setConvertedtusi] = useState(null);

  const [initposisi, seInitPosisi] = useState(null);
  const [posisi_strategis, setConvertedPosisi] = useState(null);


  const [initsdm, seInitSDM] = useState(null);
  const [sdm, setConvertedSdm] = useState(null);




  return (
    <Fragment>
      <Form onSubmit={handlesubmit}>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Laboratorium</CardTitle>
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
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="namaLaboratorium">
                  Lokasi
                </Label>
                <Input
                  type="text"
                  name="lokasi"
                  id="namaLaboratorium"
                  value={lokasi}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
            </Row>
            <Row>
              
              <Col md="12" sm="12" className="mb-1">
                <Label className="form-label" for="namaLaboratorium">
                  Deskripsi
                </Label>
                <Input
                  type="textarea"
                  name="lokasi"
                  id="namaLaboratorium"
                  value={desc}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
            </Row>
            <Alert color='danger' >
        <div className='alert-body'>
          <AlertCircle size={15} />{' '}
          <span className='ms-1'>
          <strong> *) </strong> Data diatas diambil dari Sistem <strong>ELSA</strong>, Jika terdapat perubahaan dapat disesuaikan melalui sistem <strong>ELSA</strong>.
            
          </span>
        </div>
      </Alert>
            </CardBody>
         
            </Card>
            <Card>
          <CardHeader>
            <CardTitle tag="h4">Detail Laboratorium</CardTitle>
          </CardHeader>

          <CardBody>
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="keteranganLokasi">
                  Tugas & Fungsi
                </Label>
                <CustomEditor
                  initialContent={inittusi}
                  onEditorStateChange={(html) => setConvertedtusi(html)}
                />
              </Col>
              
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="keteranganLokasi">
                 Posisi Strategis
                </Label>
                <CustomEditor
                  initialContent={initposisi}
                  onEditorStateChange={(html) => setConvertedPosisi(html)}
                />
              </Col>
              
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="keteranganLokasi">
                  SDM
                </Label>
                <CustomEditor
                  initialContent={initsdm}
                  onEditorStateChange={(html) => setConvertedSdm(html)}
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
                    <h5>Masukan Foto Laboratorium</h5>
                    <p className="text-secondary">
                    Drop foto laboratorium disni atau klik{" "}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        browse
                      </a>{" "}
                      untuk mengambil foto dari perangkat anda
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
export default LaboratoriumUpdate;
