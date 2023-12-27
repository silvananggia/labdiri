// ** React Imports
import {useContext, useState, useEffect, Fragment, React } from "react";

// ** Third Party Components
import Select from "react-select";
import InputNumber from "rc-input-number";
import { Plus, Minus, FileText, X, DownloadCloud } from "react-feather";
import Cleave from "cleave.js/react";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllLaboratorium } from "../../actions/laboratorium";
import { createAlat } from "../../actions/alat";

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
import { AbilityContext } from "@src/utility/context/Can";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/input-number/input-number.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import '@styles/react/libs/file-uploader/file-uploader.scss'

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

const LaboratoriumCreate = () => {
  const ability = useContext(AbilityContext);
  const { user: currentUser } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = { date: true, delimiter: "-", datePattern: ["Y"] };
  const hargaOptions = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

  const [inputlaboratorium, setvaluelab] = useState("");
  const [idlab, setIdlab] = useState("");
  const [nama, namachange] = useState("");
  const [merk, merkchange] = useState("");
  const [spesifikasi, spesifikasichange] = useState("");
  const [fungsi, fungsichange] = useState("");
  const [deskripsi, deskripsichange] = useState("");
  const [jumlah, setJml] = useState(1);
  const [dimensi, dimensichange] = useState("");
  const [kondisi, kondisichange] = useState("");
  const [kode_bmn, kodebmnchange] = useState("");
  const [tahun_perolehan, tahunperolehanchange] = useState("");
  const [harga_perolehan, hargaperolehanchange] = useState("");
  const [keterangan, keteranganchange] = useState("");
  const [penanggungjawab, penanggungjawabchange] = useState("");
  const [status_kalibrasi, kalibrasichange] = useState("");
  const [tahun_kalibrasi, tahunkalibrasichange] = useState("");
  const [link_elsa, linkelsachange] = useState("");
  const [noseri, noserichange] = useState("");
  const [sumber_tenaga, sumbertenagachange] = useState("");
  const [status_ketersediaan, statusketersediaanchange] = useState("");
  const [lokasi_penyimpanan, lokasipenyimpananchange] = useState("");

  const [inputValue, setValue] = useState("");
  const [status, setSelectedValue] = useState("aktif");

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


  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
  
      setIdlab(currentUser.laboratorium);
    }
  }, []);

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



  const listLaboratorium = useSelector(
    (state) => state.laboratorium.laboratoriumlist
  );
console.log(listLaboratorium)
  const matchingLaboratorium = listLaboratorium.find((item) =>
  item.id === currentUser.laboratorium);
  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append other form fields to the FormData
    formData.append("idlab", idlab);
    formData.append("nama", nama);
    formData.append("merk", merk);
    formData.append("spesifikasi", spesifikasi);
    formData.append("fungsi", fungsi);
    formData.append("deskripsi", deskripsi);
    formData.append("jumlah", jumlah);
    formData.append("dimensi", dimensi);
    formData.append("kondisi", kondisi);
    formData.append("kode_bmn", kode_bmn);
    formData.append("tahun_perolehan", tahun_perolehan);
    formData.append("harga_perolehan", harga_perolehan);
    formData.append("keterangan", keterangan);
    formData.append("penanggungjawab", penanggungjawab);
    formData.append("status_kalibrasi", status_kalibrasi);
    formData.append("tahun_kalibrasi", tahun_kalibrasi);
    formData.append("link_elsa", link_elsa);
    formData.append("noseri", noseri);
    formData.append("sumber_tenaga", sumber_tenaga);
    formData.append("status_ketersediaan", status_ketersediaan);
    formData.append("lokasi_penyimpanan", lokasi_penyimpanan);

    if (setimages.length === 0) return;

    for (const image of images) {
      formData.append("images[]", image);
    }

    

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
      images,
    };


    try {
      await dispatch(createAlat(formData));
      // Show a success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data Berhasil Disimpan.",
      });
      navigate(-1);
    } catch (error) {
      // Handle errors if the update fails
      console.error("Error:", error);
      // Show an error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal Menyimpan Data.",
      });
    }
  };

  return (
    <Fragment>
        <Form onSubmit={handlesubmit}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Tambah Alat</CardTitle>
        </CardHeader>

        <CardBody>
        
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Laboratorium
                </Label>
             
    
            {matchingLaboratorium && matchingLaboratorium.nama}
  
                {currentUser && currentUser.role == "admin" ? 
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  cacheOptions
                  defaultOptions
                  options={listLaboratorium}
                  value={listLaboratorium.find((obj) => obj.value === idlab)}
                  getOptionLabel={({ nama }) => nama}
                  getOptionValue={({ id }) => id}
                  onInputChange={handleInputLab}
                  onChange={handleLabChange}
                  required
                />:
null
                }
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="namaAlat">
                  Nama Alat (*)
                </Label>
                <Input
                  type="text"
                  name="nama"
                  id="namaAlat"
                  placeholder="Nama Alat"
                  value={nama}
                  onChange={(e) => namachange(e.target.value)}
                  required
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="merkAlat">
                  Merk (*)
                </Label>
                <Input
                  type="text"
                  name="merk"
                  id="merkAlat"
                  placeholder="Merk"
                  value={merk}
                  onChange={(e) => merkchange(e.target.value)}
                  required
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
                  Kode BMN (*)
                </Label>
                <Input
                  type="text"
                  name="kodebmn"
                  id="kodebmnAlat"
                  placeholder="Kode BMN"
                  value={kode_bmn}
                  onChange={(e) => kodebmnchange(e.target.value)}
                  required
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
                  required
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
            <br/>
 
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
