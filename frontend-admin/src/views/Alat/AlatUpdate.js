// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import InputNumber from "rc-input-number";
import { Plus, Minus } from "react-feather";
import Cleave from "cleave.js/react";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";

// ** Utils
import { selectThemeColors } from "@utils";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllLaboratorium } from "../../actions/laboratorium";
import { updateAlat, getAlatID } from "../../actions/alat";
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

import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML, convertFromHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

// ** Styles
import "@styles/react/libs/input-number/input-number.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const kondisiOptions = [
  { id: "1", value: "0", label: "Baik" },
  { id: "2", value: "1", label: "Rusak Ringan" },
  { id: "3", value: "2", label: "Rusak Berat" },
];

const kalibrasiOptions = [
  { id: "1", value: "0", label: "Belum Kalibrasi" },
  { id: "2", value: "1", label: "Perlu Kalibrasi" },
  { id: "3", value: "2", label: "Terkalibrasi" },
];

const LaboratoriumUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = { date: true, delimiter: "-", datePattern: ["Y"] };

  const { code } = useParams();
  const [id, idchange] = useState(0);
  const [inputlaboratorium, setvaluelab] = useState("");
  const [idlab, setIdlab] = useState("");
  const [nama, namachange] = useState("");
  const [merk, merkchange] = useState("");
  const [spesifikasi, spesifikasichange] = useState("");
  const [fungsi, fungsichange] = useState("");
  const [deskripsi, deskripsichange] = useState("");
  const [jumlah, setJml] = useState(1);
  const [dimensi, dimensichange] = useState("");
  const [kondisi, kondisichange] = useState("0");
  const [kode_bmn, kodebmnchange] = useState("");
  const [tahun_perolehan, tahunperolehanchange] = useState("");
  const [harga_perolehan, hargaperolehanchange] = useState("");
  const [keterangan, keteranganchange] = useState("");
  const [penanggungjawab, penanggungjawabchange] = useState("");
  const [status_kalibrasi, kalibrasichange] = useState("0");
  const [tahun_kalibrasi, tahunkalibrasichange] = useState("");
  const [link_elsa, linkelsachange] = useState("");
  const [noseri, noserichange] = useState("");
  const [sumber_tenaga, sumbertenagachange] = useState("");
  const [status_ketersediaan, statusketersediaanchange] = useState("");
  const [lokasi_penyimpanan, lokasipenyimpananchange] = useState("");

  const [inputValue, setValue] = useState("");

  const handleInputLab = (value) => {
    setvaluelab(value);
  };

  const handleLabChange = (value) => {
    setIdlab(value.id);
  };

  const handleInputKondisi = (value) => {
    setValue(value);
  };

  const handleKondisi = (e) => {
    kondisichange(e.value);
  };

  const handleInputKalibrasi = (value) => {
    setValue(value);
  };

  const handleKalibrasi = (e) => {
    kalibrasichange(e.value);
  };

  useEffect(() => {
    dispatch(getAllLaboratorium());
  }, []);

  const listLaboratorium = useSelector(
    (state) => state.laboratorium.laboratoriumlist
  );

  const alatobj = useSelector((state) => state.alat.alatobj);
  const labobj = useSelector((state) => state.alat.labobj);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const alatobj = {
      idlab,
      nama,
      merk,
      spesifikasi,
      fungsi,
      deskripsi,
      jumlah,
      dimensi,
      kondisi,
      kode_bmn,
      tahun_perolehan,
      harga_perolehan,
      keterangan,
      penanggungjawab,
      status_kalibrasi,
      tahun_kalibrasi,
      link_elsa,
      noseri,
      sumber_tenaga,
      status_ketersediaan,
      lokasi_penyimpanan,
    };
  
    try {
      await dispatch(updateAlat(id, alatobj));
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
    dispatch(getAlatID(code));
  }, []);

  useEffect(() => {
    if (alatobj ) {
      idchange(alatobj.id);
      if(labobj){      
        setIdlab(labobj.id);
}

      namachange(alatobj.nama);
      merkchange(alatobj.merk);
      spesifikasichange(alatobj.spesifikasi);
      fungsichange(alatobj.fungsi);
      deskripsichange(alatobj.deskripsi);
      setJml(alatobj.jumlah);
      dimensichange(alatobj.dimensi);
      kondisichange(alatobj.kondisi);
      kodebmnchange(alatobj.kode_bmn);
      tahunperolehanchange(alatobj.tahun_perolehan);
      hargaperolehanchange(alatobj.harga_perolehan);
      keteranganchange(alatobj.keterangan);
      penanggungjawabchange(alatobj.penanggungjawab);
      kalibrasichange(alatobj.status_kalibrasi);
      tahunkalibrasichange(alatobj.tahun_kalibrasi);
      linkelsachange(alatobj.link_elsa);
      noserichange(alatobj.noseri);
      sumbertenagachange(alatobj.sumber_tenaga);
      statusketersediaanchange(alatobj.status_ketersediaan);
      lokasipenyimpananchange(alatobj.lokasi_penyimpanan);
    }
  }, [alatobj,labobj]);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Ubah Alat</CardTitle>
        </CardHeader>

        <CardBody>
          <Form onSubmit={handlesubmit}>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Laboratorium
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  cacheOptions
                  defaultOptions
                  options={listLaboratorium}
                  value={listLaboratorium.find((obj) => obj.id === idlab)}
                  getOptionLabel={({ nama }) => nama}
                  getOptionValue={({ id }) => id}
                  onInputChange={handleInputLab}
                  onChange={handleLabChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="namaAlat">
                  Nama Alat
                </Label>
                <Input
                  type="text"
                  name="nama"
                  id="namaAlat"
                  placeholder="Nama Alat"
                  value={nama}
                  onChange={(e) => namachange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="merkAlat">
                  Merk
                </Label>
                <Input
                  type="text"
                  name="merk"
                  id="merkAlat"
                  placeholder="Merk"
                  value={merk}
                  onChange={(e) => merkchange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="spesifikasiAlat">
                  Spesifikasi
                </Label>
                <Input
                  type="textarea"
                  name="spesifikasi"
                  id="spesifikasiAlat"
                  placeholder="Spesifikasi"
                  value={spesifikasi}
                  onChange={(e) => spesifikasichange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="fungsiAlat">
                  Fungsi
                </Label>
                <Input
                  type="textarea"
                  name="fungsi"
                  id="namaLaboratorium"
                  placeholder="Fungsi Alat"
                  value={fungsi}
                  onChange={(e) => fungsichange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="deskripsiAlat">
                  Deskripsi
                </Label>
                <Input
                  type="textarea"
                  name="deskripsi"
                  id="deskripsiAlat"
                  placeholder="Deskripsi"
                  value={deskripsi}
                  onChange={(e) => deskripsichange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="keteranganAlat">
                  Keterangan
                </Label>
                <Input
                  type="textarea"
                  name="keterangan"
                  id="keteranganAlat"
                  placeholder="Keterangan"
                  value={keterangan}
                  onChange={(e) => keteranganchange(e.target.value)}
                />
              </Col>

              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="dimensiAlat">
                  Dimensi
                </Label>
                <Input
                  type="text"
                  name="dimensi"
                  id="dimensiAlat"
                  placeholder="Dimensi"
                  value={dimensi}
                  onChange={(e) => dimensichange(e.target.value)}
                />
              </Col>

              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="kodebmnAlat">
                  Kode BMN
                </Label>
                <Input
                  type="text"
                  name="kodebmn"
                  id="kodebmnAlat"
                  placeholder="Kode BMN"
                  value={kode_bmn}
                  onChange={(e) => kodebmnchange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Jumlah
                </Label>
                <InputNumber
                  value={jumlah}
                  upHandler={<Plus />}
                  downHandler={<Minus />}
                  className="input-lg"
                  id="controlled-number-input"
                  onChange={(jumlah) => setJml(jumlah)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Kondisi
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  options={kondisiOptions} // Since the list is provided by the store, provide it directly
                  value={kondisiOptions.find((obj) => obj.value === kondisi)}
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => e.id}
                  onInputChange={handleInputKondisi}
                  onChange={handleKondisi}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="noseriAlat">
                  No. Seri Alat
                </Label>
                <Input
                  type="text"
                  name="noseri"
                  id="noseriAlat"
                  placeholder="No. Seri Alat"
                  value={noseri}
                  onChange={(e) => noserichange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="sumbertenagaAlat">
                  Sumber Tenaga
                </Label>
                <Input
                  type="text"
                  name="sumbertenaga"
                  id="sumbertenagaAlat"
                  placeholder="Sumber Tenaga"
                  value={sumber_tenaga}
                  onChange={(e) => sumbertenagachange(e.target.value)}
                />
              </Col>

              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Status Kalibrasi
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  options={kalibrasiOptions} // Since the list is provided by the store, provide it directly
                  value={kalibrasiOptions.find(
                    (obj) => obj.value === status_kalibrasi
                  )}
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => e.id}
                  onInputChange={handleInputKalibrasi}
                  onChange={handleKalibrasi}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Tahun Kalibrasi
                </Label>
                <Cleave
                  className="form-control"
                  placeholder="2020"
                  options={options}
                  id="tahunKalibrasi"
                  value={tahun_kalibrasi}
                  onChange={(e) => tahunkalibrasichange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Link Elsa
                </Label>
                <Input
                  type="text"
                  name="nama"
                  id="namaLaboratorium"
                  placeholder="Link Elsa"
                  value={link_elsa}
                  onChange={(e) => linkelsachange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Tahun Perolehan
                </Label>
                <Cleave
                  className="form-control"
                  placeholder="2020"
                  options={options}
                  id="date"
                  value={tahun_perolehan}
                  onChange={(e) => tahunperolehanchange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="hargaperolehan">
                  Harga Perolehan
                </Label>
                <Input
                  type="text"
                  name="hargaperolehan"
                  id="hargaperolehan"
                  placeholder="Harga Perolehan"
                  value={harga_perolehan}
                  onChange={(e) => hargaperolehanchange(e.target.value)}
                />
              </Col>

              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="penanggungjawab">
                  Penanggung Jawab
                </Label>
                <Input
                  type="text"
                  name="penanggungjawab"
                  id="penanggungjawab"
                  placeholder="Penanggung Jawab"
                  value={penanggungjawab}
                  onChange={(e) => penanggungjawabchange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="statusketersediaan">
                  Ketersediaan
                </Label>
                <Input
                  type="text"
                  name="statusketersediaan"
                  id="statusketersediaan"
                  placeholder="Ketersediaan"
                  value={status_ketersediaan}
                  onChange={(e) => statusketersediaanchange(e.target.value)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="lokasipenyimpanan">
                  Lokasi Penyimpanan
                </Label>
                <Input
                  type="text"
                  name="lokasipenyimpanan"
                  id="lokasipenyimpanan"
                  placeholder="Lokasi Penyimpanan"
                  value={lokasi_penyimpanan}
                  onChange={(e) => lokasipenyimpananchange(e.target.value)}
                />
              </Col>
            </Row>
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
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default LaboratoriumUpdate;
