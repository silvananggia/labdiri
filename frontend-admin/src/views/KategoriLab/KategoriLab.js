// ** React Imports
import { useState, useEffect, memo, Fragment } from "react";
import { Link } from "react-router-dom";

// ** Store & Actions
import { useSelector, useDispatch, connect } from "react-redux";

// ** Third Party Components
import {

  Edit,
  Plus,
  Trash2,

} from "react-feather";

// ** Reactstrap Imports
import {
  Label,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Table,
} from "reactstrap";
import toast from "react-hot-toast";
import {
  getAllKategori,
  createKategori,
  deleteKategori,
  updateKategori,
  OpenPopup,
  getKategoriID,
} from "../../actions/kategorilab";

const KategoriLab = (props) => {
  const dispatch = useDispatch();

  const [isedit, iseditchange] = useState(false);
  const [title, titlechange] = useState("Tambah Kategori");

  const kategoriobj = useSelector((state) => state.kategori.kategoriobj);

  const [id, idchange] = useState(0);
  const [nama, namachange] = useState("");
  const [keterangan, keteranganchange] = useState("");
  const [logo, logochange] = useState("");
  const [open, openchange] = useState(false);

  useEffect(() => {
    if (Object.keys(kategoriobj).length > 0) {
      idchange(kategoriobj.id);
      namachange(kategoriobj.nama);
      keteranganchange(kategoriobj.keterangan);
      logochange(kategoriobj.logo);
    } else {
      clearstate();
    }
  }, [kategoriobj]);

  const handledelete = (code) => {
    if (window.confirm("Anda yakin akan menghapus data tersebut?")) {
      props.removekategori(code);
      props.loadkategori();
      toast.success("Kategori Berhasil Dihapus.");
    }
  };
  const functionadd = () => {
    iseditchange(false);
    titlechange("Tambah Kategori");
    openpopup();
  };
  const closepopup = () => {
    openchange(false);
  };
  const openpopup = () => {
    openchange(true);
    clearstate();
    dispatch(OpenPopup());
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const _obj = { nama, keterangan, logo };
    if (isedit) {
      console.log(id);
      console.log(_obj);
      dispatch(updateKategori(id, _obj));
    } else {
      dispatch(createKategori(_obj));
    }
    closepopup();
    props.loadkategori();
  };

  const handleEdit = (code) => {
    iseditchange(true);
    titlechange("Ubah Kategori");
    openchange(true);
    dispatch(getKategoriID(code));
  };

  const clearstate = () => {
    idchange(0);
    namachange("");
    keteranganchange("");
    logochange("");
  };

  useEffect(() => {
    props.loadkategori();
  }, []);

  return props.kategori.loading ? (
    <Row>
      <h2>Loading...</h2>
    </Row>
  ) : props.kategori.errmessage ? (
    <Row>
      <h2>{props.kategori.errmessage}</h2>
    </Row>
  ) : (
    <Fragment>
      <Row className="invoice-list-wrapper">
        <Col sm="12">
        <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Master Kategori</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
            <Button className='ms-2' color='primary' onClick={functionadd}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Tambah</span>
            </Button>
          </div>
        </CardHeader>
         

            <Table hover responsive>
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Keterangan</th>
                  <th>Logo</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {props.kategori.kategorilist &&
                  props.kategori.kategorilist.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.logo}</td>
                      <td>
                        <div className="column-action d-flex align-items-center">
                          <Button
                            color="primary"
                            onClick={(e) => {
                              handleEdit(item.id);
                            }}
                          >
                            <Edit
                              className="cursor-pointer"
                              size={17}
                              id={`send-tooltip-${item.id}`}
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target={`send-tooltip-${item.id}`}
                            >
                              Ubah
                            </UncontrolledTooltip>
                          </Button>
                          <Link
                            onClick={() => {
                              handledelete(item.id);
                            }}
                            to={props.kategori}
                            id={`pw-tooltip-${item.id}`}
                          >
                            <Trash2 size={17} className="mx-1" />
                            <UncontrolledTooltip
                              placement="top"
                              target={`pw-tooltip-${item.id}`}
                            >
                              Hapus
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Modal
          isOpen={open}
          toggle={closepopup}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader
            className="bg-transparent"
            toggle={closepopup}
          ></ModalHeader>
          <ModalBody className="px-sm-5 mx-50 pb-5">
            <div className="text-center mb-2">
              <h1 className="mb-1">{title}</h1>
            </div>

            <Row tag="form" className="gy-1 pt-75" onSubmit={handlesubmit}>
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  Nama
                </Label>
                <input
                  value={nama}
                  onChange={(e) => namachange(e.target.value)}
                  className="form-control"
                ></input>
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Keterangan
                </Label>
                <input
                  value={keterangan}
                  onChange={(e) => keteranganchange(e.target.value)}
                  className="form-control"
                ></input>
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Logo
                </Label>
                <input
                  value={logo}
                  onChange={(e) => logochange(e.target.value)}
                  className="form-control"
                ></input>
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={closepopup}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    kategori: state.kategori,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadkategori: () => dispatch(getAllKategori()),
    removekategori: (code) => dispatch(deleteKategori(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KategoriLab);
