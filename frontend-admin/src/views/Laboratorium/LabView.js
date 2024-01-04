// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import {
  Plus,
  Minus,
  FileText,
  X,
  DownloadCloud,
  AlertCircle,
} from "react-feather";
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

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );

  useEffect(() => {
    dispatch(getLaboratoriumID(code));
  }, []);
  const handleEditClick = () => {
    // Navigate to the edit page
    navigate(`/admin/laboratorium/edit/${code}`);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Laboratorium</CardTitle>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <h6 className="form-h6" for="namaLaboratorium">
                Nama Laboratorium
              </h6>
              <Input
                type="text"
                name="nama"
                id="namaLaboratorium"
                placeholder="Nama Laboratorium"
                value={laboratoriumobj.nama}
                disabled
                style={{ backgroundColor: "#f0f0f0", color: "#666" }}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <h6 className="form-h6" for="namaLaboratorium">
                Lokasi
              </h6>
              <Input
                type="text"
                name="lokasi"
                id="namaLaboratorium"
                value={laboratoriumobj.lokasi_kawasan}
                disabled
                style={{ backgroundColor: "#f0f0f0", color: "#666" }}
              />
            </Col>
          </Row>
          <Row>
            <Col md="12" sm="12" className="mb-1">
              <h6 className="form-h6" for="namaLaboratorium">
                Deskripsi
              </h6>
              <Input
                type="textarea"
                name="lokasi"
                id="namaLaboratorium"
                value={laboratoriumobj.desc}
                disabled
                style={{ backgroundColor: "#f0f0f0", color: "#666" }}
              />
            </Col>
          </Row>
          <Alert color="danger">
            <div className="alert-body">
              <AlertCircle size={15} />{" "}
              <span className="ms-1">
                <strong> *) </strong> Data diatas diambil dari Sistem{" "}
                <strong>ELSA</strong>, Jika terdapat perubahaan dapat
                disesuaikan melalui sistem <strong>ELSA</strong>.
              </span>
            </div>
          </Alert>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Detail Laboratorium</CardTitle>
          <Row className="mt-2">
          <Col className="d-flex justify-content-end">
            <Button color="secondary" className="me-1" onClick={() => navigate(-1)}>
              Kembali
            </Button>
            <Button color="primary" onClick={handleEditClick}>
              Edit
            </Button>
          </Col>
        </Row>
        </CardHeader>

        <CardBody>
          <Row>
            <Col sm="12" className="mb-1">
              <h6 className="form-h6" for="keteranganLokasi">
                Tugas & Fungsi
              </h6>
              <p dangerouslySetInnerHTML={{ __html: laboratoriumobj.tusi }} />
            </Col>

            <Col sm="12" className="mb-1">
              <h6 className="form-h6" for="keteranganLokasi">
                Posisi Strategis
              </h6>
              <p dangerouslySetInnerHTML={{ __html: laboratoriumobj.posisi }} />
            </Col>

            <Col sm="12" className="mb-1">
              <h6 className="form-h6" for="keteranganLokasi">
                SDM
              </h6>
              <p dangerouslySetInnerHTML={{ __html: laboratoriumobj.sdm }} />
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <h6 className="form-h6" for="CompanyMulti">
                Status
              </h6>
              <p>{laboratoriumobj.status}</p>
            </Col>
          </Row>

          {/* Display single image */}
          {laboratoriumobj.image && (
            <Row className="mt-2">
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="alatImage">
                  Foto Alat
                </h6>
                <img src={laboratoriumobj.image.url} alt="Alat" style={{ maxWidth: 'auto', height: '200px' }} />
              </Col>
            </Row>
          )}

          {/* Display multiple images if available */}
          {laboratoriumobj.images && laboratoriumobj.images.length > 0 && (
            <Row className="mt-2">
              <Col md="12">
                <h6 className="form-h6" for="alatImages">
                 Foto Alat
                </h6>
                <ListGroup>
                  {laboratoriumobj.images.map((image, index) => (
                    <ListGroupItem key={index}>
                      <img src={image.url} alt={`Alat ${index + 1}`} style={{ maxWidth: 'auto', height: '200px' }} />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default LaboratoriumUpdate;
