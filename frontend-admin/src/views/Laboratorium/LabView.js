// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";

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

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

const statusOptions = [
  { id: "1", value: "1", label: "Aktif" },
  { id: "2", value: "0", label: "Tidak Aktif" },
];

const LaboratoriumUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, idchange] = useState(0);
  const { code } = useParams();
  const [inputkategori, setvaluekat] = useState("");
  const [idkategori, setIdkategori] = useState("");
  const [inputlokasi, setvaluelok] = useState("");
  const [idlokasi, setIdlokasi] = useState("");
  const [nama, namachange] = useState("");
  const [inputValue, setValue] = useState("");
  const [status, statuschange] = useState("aktif");

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
    statuschange(e.value);
  };

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );

  const handlesubmit = (e) => {
    e.preventDefault();
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
    dispatch(updateLaboratorium(id, laboratoriumobj));
    navigate("/laboratorium");
  };

  useEffect(() => {
    dispatch(getLaboratoriumID(code));
  }, []);

  useEffect(() => {
    if (laboratoriumobj) {
      idchange(laboratoriumobj.id);
      setIdkategori(laboratoriumobj.idkategori);
      setIdlokasi(laboratoriumobj.idlokasi);
      namachange(laboratoriumobj.nama);
      statuschange(laboratoriumobj.status);
    }
  }, [laboratoriumobj]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tusi, setConvertedtusi] = useState(null);

  const initialContent = laboratoriumobj.tusi;
  const initialContent2 = laboratoriumobj.deskripsi;
  const initialContent3 = laboratoriumobj.posisi_strategis;
  const initialContent4 = laboratoriumobj.sdm;

  useEffect(() => {
    // Check if initialContent exists before creating the editorState
    if (initialContent) {
      const contentBlock = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState); // Set the initial editor state
    }
  }, [initialContent]);

  const [editordeskState, setEditorDeskState] = useState(() =>
    EditorState.createEmpty()
  );
  const [deskripsi, setConvertedDeskripsi] = useState(null);

  useEffect(() => {
    if (initialContent2) {
      const contentBlock = htmlToDraft(initialContent2);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const initialEditorState2 = EditorState.createWithContent(contentState);
      setEditorDeskState(initialEditorState2); // Set the initial editor state
    }
  }, [initialContent2]);

  const [editorposisiState, setEditorPosisiState] = useState(() =>
    EditorState.createEmpty()
  );
  const [posisi_strategis, setConvertedPosisi] = useState(null);

  useEffect(() => {
    if (initialContent3) {
      const contentBlock = htmlToDraft(initialContent3);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const initialEditorState3 = EditorState.createWithContent(contentState);
      setEditorPosisiState(initialEditorState3); // Set the initial editor state
    }
  }, [initialContent3]);

  const [editorsdmState, setEditorSdmState] = useState(() =>
    EditorState.createEmpty()
  );
  const [sdm, setConvertedSdm] = useState(null);

  useEffect(() => {
    if (initialContent4) {
      const contentBlock = htmlToDraft(initialContent4);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const initialEditorState4 = EditorState.createWithContent(contentState);
      setEditorSdmState(initialEditorState4); // Set the initial editor state
    }
  }, [initialContent3]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedtusi(html);
  }, [editorState]);

  useEffect(() => {
    let html = convertToHTML(editordeskState.getCurrentContent());
    setConvertedDeskripsi(html);
  }, [editordeskState]);

  useEffect(() => {
    let html = convertToHTML(editorposisiState.getCurrentContent());
    setConvertedPosisi(html);
  }, [editorposisiState]);

  useEffect(() => {
    let html = convertToHTML(editorsdmState.getCurrentContent());
    setConvertedSdm(html);
  }, [editorsdmState]);

  return (
    <Fragment>
      <Row className="invoice-list-wrapper">
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Tambah Laboratorium</CardTitle>
            </CardHeader>

            <CardBody>
              <Form onSubmit={handlesubmit}>
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
                      value={listKategori.find(
                        (obj) => obj.value === idkategori
                      )}
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
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default LaboratoriumUpdate;
