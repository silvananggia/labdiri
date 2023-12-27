// ** React Imports
import { useState,useEffect, Fragment , React} from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

import { Link, useNavigate,useParams } from "react-router-dom";
import { updateLokasi, getLokasiID } from "../../actions/lokasi";

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

const statusOptions = [
  { id: "1", value: "1", label: "Aktif" },
  { id: "2", value: "0", label: "Tidak Aktif" },
];

const LokasiUpdate = () => {
    const [id, idchange] = useState(0);
    const [nama, namachange] = useState('');
    const [keterangan, keteranganchange] = useState('');
    const [latitude, latitudechange] = useState('');
    const [longitude, longitudechange] = useState('');
    const { code } = useParams();

 

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const [inputValue, setValue] = useState("")
    const [status, statuschange] = useState("aktif")
  

  
    const handleInputChange = (value) => {
      setValue(value)
    }
  

    const handleChange = e => {
        statuschange(e.value);
      }

      const lokasiobj=useSelector((state)=>state.lokasi.lokasiobj)
    
    const handlesubmit = (e) => {
        e.preventDefault();
        const lokasiobj = { nama, keterangan, latitude, longitude, status };
        dispatch(updateLokasi(id, lokasiobj));
        navigate('/lokasi');
       
    }

    useEffect(() => {
        dispatch(getLokasiID(code));
    }, [])

    useEffect(() => {
        if(lokasiobj){
            idchange(lokasiobj.id);
            namachange(lokasiobj.nama);
            keteranganchange(lokasiobj.keterangan);
            latitudechange(lokasiobj.latitude);
            longitudechange(lokasiobj.longitude);
            statuschange(lokasiobj.status);
        }
    }, [lokasiobj])


  return (
    <Fragment>
      <Row className="invoice-list-wrapper">
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Ubah Lokasi</CardTitle>
            </CardHeader>

            <CardBody>
              <Form onSubmit={handlesubmit}>
                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="namaLokasi">
                      Nama Lokasi
                    </Label>
                    <Input
                      type="text"
                      name="nama"
                      id="namaLokasi"
                      placeholder="Nama Lokasi"
                      value={nama} 
                      onChange={e => namachange(e.target.value)}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="keteranganLokasi">
                      Keterangan
                    </Label>
                    <Input
                      type="text"
                      name="keterangan"
                      id="keteranganLokasi"
                      placeholder="Keterangan"
                      value={keterangan} onChange={e => keteranganchange(e.target.value)}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="latitudeLokasi">
                      Latitude
                    </Label>
                    <Input
                      type="text"
                      name="latitude"
                      id="latitudeLokasi"
                      placeholder="Latitude"
                      value={latitude} onChange={e => latitudechange(e.target.value)}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="longitudeLokasi">
                      Longitude
                    </Label>
                    <Input
                      type="text"
                      name="longitude"
                      id="longitudeLokasi"
                      placeholder="Longitude"
                      value={longitude} onChange={e => longitudechange(e.target.value)}
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
                     

                      cacheOptions
                      defaultOptions
                      options={statusOptions} // Since the list is provided by the store, provide it directly
                      value={statusOptions.find(obj => obj.value === status)}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.id}
                      onInputChange={handleInputChange}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col sm="12">
                    <div className="d-flex">
                      <Button
                        className="me-1"
                        color="primary"
                        type="submit"
                      >
                        Simpan
                      </Button>
                      <Button outline color="secondary" type="reset" onClick={() => navigate(-1)}>
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
export default LokasiUpdate;
