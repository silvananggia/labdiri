// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import InputNumber from "rc-input-number";
import { Plus, Minus,X,DownloadCloud, AlertCircle } from "react-feather";
import Cleave from "cleave.js/react";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";

// ** Utils
import { selectThemeColors } from "@utils";

import { Link, useNavigate, useParams } from "react-router-dom";
import { updateAlat, getAlatID } from "../../actions/alat";
// ** Reactstrap Imports
import {
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardBody,

  Input,
  FormText,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

// ** Styles
import "@styles/react/libs/input-number/input-number.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";



const LaboratoriumUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const alatobj = useSelector((state) => state.alat.alatobj);


  useEffect(() => {
    dispatch(getAlatID(code));
  }, []);

  const handleEditClick = () => {
    // Navigate to the edit page
    navigate(`/admin/alat/edit/${code}`);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Alat</CardTitle>
          
        </CardHeader>

        <CardBody>
          
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="namaAlat">
                  Nama Alat
                </h6>
                <Input
                  type="text"
                  name="nama"
                  id="namaAlat"
                  placeholder="Nama Alat"
                  value={alatobj.nama}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  Merk
                </h6>
                <Input
                  type="text"
                  name="merk"
                  id="merkAlat"
                  placeholder="Merk"
                  value={alatobj.merk}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="3" sm="12" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  Kode Barang
                </h6>
                <Input
                  type="text"
                  name="kodeBarang"
                  id="kodeBarang"
                  placeholder="Kode Barang"
                  value={alatobj.kode_barang}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="1" sm="3" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  NUP
                </h6>
                <Input
                  type="text"
                  name="nup"
                  id="nup"
                  placeholder="NUP"
                  value={alatobj.nup}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="2" sm="3" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  Tahun Perolehan
                </h6>
                <Input
                  type="text"
                  name="tahuPerolehan"
                  id="tahunPerolehan"
                  placeholder="Tahun Perolehan"
                  value={alatobj.tahun_perolehan}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  Kondisi Alat
                </h6>
                <Input
                  type="text"
                  name="kondisi"
                  id="kondisiAlat"
                  placeholder="Kondisi"
                  value={alatobj.kondisi}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  Laboratorium
                </h6>
                <Input
                  type="text"
                  name="laboratorium"
                  id="laboratorium"
                  placeholder="Laboratorium"
                  value={alatobj.laboratorium}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="merkAlat">
                  Lokasi
                </h6>
                <Input
                  type="text"
                  name="lokasi"
                  id="lokasiAlat"
                  placeholder="Lokasi"
                  value={alatobj.lokasi_kawasan}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
              </Col>
              </Row>
    
             
            </CardBody>
              </Card>
            

              <Card>
        <CardHeader>
          <CardTitle tag="h4">Detail Alat</CardTitle>
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
          <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="spesifikasiAlat">
                  Spesifikasi
                </h6>
                <p>
                {alatobj.spesifikasi}
              </p>
              </Col>
          <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="fungsiAlat">
                  Fungsi
                </h6>
                <p>
                {alatobj.fungsi}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="deskripsiAlat">
                  Deskripsi
                </h6>
                <p>
                {alatobj.deskripsi}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="keteranganAlat">
                  Keterangan
                </h6>
                <p>
                {alatobj.keterangan}
              </p>
              </Col>

              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="dimensiAlat">
                  Dimensi
                </h6>
                <p>
                {alatobj.dimensi}
              </p>
              </Col>

    

              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="CompanyMulti">
                  Kondisi
                </h6>
                <p>
                {alatobj.kondisi_alat}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="noseriAlat">
                  No. Seri Alat
                </h6>
                <p>
                {alatobj.noseri}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="sumbertenagaAlat">
                  Sumber Tenaga
                </h6>
                <p>
                {alatobj.sumber_tenaga}
              </p>
              </Col>

              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="CompanyMulti">
                  Status Kalibrasi
                </h6>
                <p>
                {alatobj.status_kalibrasi}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="CompanyMulti">
                  Tahun Kalibrasi
                </h6>
                <p>
                {alatobj.tahun_kalibrasi}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="hargaperolehan">
                  Harga Perolehan
                </h6>
                <p>
                {alatobj.harga_perolehan}
              </p>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="CompanyMulti">
                  Link Elsa
                </h6>
                <p>
                {alatobj.link_elsa}
              </p>
              </Col>
             
             

  
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="lokasipenyimpanan">
                  Lokasi Penyimpanan
                </h6>
                <p>
                {alatobj.lokasi_penyimpanan}
              </p>
              </Col>
            
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="CompanyMulti">
                  Status
                </h6>
                <p>
                {alatobj.status}
              </p>
              </Col>
          </Row>
           
            {/* Display single image */}
          {alatobj.image && (
            <Row className="mt-2">
              <Col md="6" sm="12" className="mb-1">
                <h6 className="form-h6" for="alatImage">
                  Foto Alat
                </h6>
                <img src={alatobj.image.url} alt="Alat" style={{ maxWidth: 'auto', height: '200px' }} />
              </Col>
            </Row>
          )}

          {/* Display multiple images if available */}
          {alatobj.images && alatobj.images.length > 0 && (
            <Row className="mt-2">
              <Col md="12">
                <h6 className="form-h6" for="alatImages">
                 Foto Alat
                </h6>
                <ListGroup>
                  {alatobj.images.map((image, index) => (
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
