// ** React Imports
import { useState, useEffect,useCallback, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
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
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Alert,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Form,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

const LaboratoriumUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [id, idchange] = useState(0);
  const { code } = useParams();
  const [inputkategori, setvaluekat] = useState("");
  const [idkategori, setIdkategori] = useState("");
  const [inputlokasi, setvaluelok] = useState("");
  const [idlokasi, setIdlokasi] = useState("");
  const [nama, namachange] = useState("");
  const [inputValue, setValue] = useState("");
  const [status, statuschange] = useState("aktif");

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    if (user && user.laboratorium) {
      dispatch(getLaboratoriumID(user.laboratorium));
      console.log(user.laboratorium);
    }
    console.log(user.role);
  }, []);

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );

  const imageUrls = laboratoriumobj.images || []; // Ensure it's an array

  // Create an array of image objects
  const imageArray = imageUrls.map((imageUrl, index) => ({
    src: imageUrl.url,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
       width: 4,
    height: 3
  }));


  return (
    <Fragment>
      <Row className="invoice-add">
        <Col xl={9} md={8} sm={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{laboratoriumobj.nama}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>
                Lokasi : {laboratoriumobj.lokasi?.nama} -{" "}
                {laboratoriumobj.lokasi?.keterangan}
              </CardText>

               <div>
      <Gallery photos={imageArray} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={imageArray.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
    
              <h5 className="mt-3">Deskripsi</h5>
              <CardText className="mb-2 pb-1">
                <p
                  dangerouslySetInnerHTML={{
                    __html: laboratoriumobj.deskripsi,
                  }}
                ></p>
              </CardText>

              <h5 className="mt-3">Tugas dan Fungsi</h5>
              <CardText className="mb-2 pb-1">
                <p
                  dangerouslySetInnerHTML={{
                    __html: laboratoriumobj.tusi,
                  }}
                ></p>
              </CardText>

              <h5 className="mt-3">Posisi Strategis</h5>
              <CardText className="mb-2 pb-1">
                <p
                  dangerouslySetInnerHTML={{
                    __html: laboratoriumobj.posisi_strategis,
                  }}
                ></p>
              </CardText>

              <h5 className="mt-3">Sumber Daya Manusia</h5>
              <CardText className="mb-2 pb-1">
                <p
                  dangerouslySetInnerHTML={{
                    __html: laboratoriumobj.sdm,
                  }}
                ></p>
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <Card className="invoice-action-wrapper">
            <CardBody>
              <Button
                color="primary"
                tag={Link}
                to={"/profilelab/edit/" + laboratoriumobj.id}
                block
                className="mb-75"
              >
                Ubah
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default LaboratoriumUpdate;
