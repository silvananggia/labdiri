import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSkin } from "@hooks/useSkin";
import { useNavigate, Link } from "react-router-dom";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import { selectThemeColors } from "@utils";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";
import "@styles/react/pages/page-authentication.scss";
import Swal from "sweetalert2";
import { getLabAll } from "../actions/laboratorium";
import { register } from "../redux/auth";
import { clearMessage } from "../redux/message";
import * as Yup from "yup";

const aksesOptions = [
  { id: "1", value: "koordinator", label: "Koordinator Laboratorium" },
  { id: "2", value: "manajer", label: "Manajer Laboratorium" },
  { id: "3", value: "public", label: "Staff" },
];

const Register = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organisasi, setOrganisasi] = useState("Non-BRIN");
  const [akses, akseschange] = useState("");
  const [inputakses, setvalueakses] = useState("");
  const [inputlaboratorium, setvaluelab] = useState("");
  const [idlab, setIdlab] = useState("");
  const [validation, setValidation] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getLabAll());
  }, []);

  const handleInputAkses = (value) => {
    setvalueakses(value);
  };

  const handleAkses = (e) => {
    akseschange(e.value);
  };

  const handleInputLab = (value) => {
    setvaluelab(value);
  };

  const handleLabChange = (value) => {
    setIdlab(value.id);
  };

  const listLaboratorium = useSelector(
    (state) => state.laboratorium.laboratoriumlist
  );

  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    name: "",
    organisasi: "Non-BRIN",
    akses: "",
    idlab: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    name: Yup.string().required("This field is required!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValue = {
      email,
      name,
      organisasi,
      akses,
      idlab,
    };

    setLoading(true);

    dispatch(register(formValue))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil",
          text: "Silahkan Cek Email Anda untuk Informasi Akses Sistem!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <h2 className="brand-text text-primary ms-1">BRIN</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Daftar Akun
            </CardTitle>
            <CardText className="mb-2">BRIN</CardText>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <Label className="form-label" for="organisasi">
                  Instansi
                </Label>
                <select
                  name="organisasi"
                  id="organisasi"
                  className="form-control"
                  value={organisasi}
                  onChange={(e) => setOrganisasi(e.target.value)}
                >
                  <option value="BRIN">BRIN</option>
                  <option value="Non-BRIN">Non-BRIN</option>
                </select>
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-name">
                  Nama
                </Label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              {organisasi === "BRIN" && (
                <>
                  <div className="mb-1">
                    <Label className="form-label" for="akses">
                      Akses
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="status"
                      classNamePrefix="Status"
                      isClearable={false}
                      options={aksesOptions}
                      value={aksesOptions.find((obj) => obj.value === akses)}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.id}
                      onChange={handleAkses}
                      name="akses"
                      id="akses"
                    />
                  </div>

                  {akses === "public" ? null : (
                    <div className="mb-1">
                      <Label className="form-label" for="laboratorium">
                        Laboratorium
                      </Label>
                      <Select
                        id="idlab"
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
                      />
                    </div>
                  )}
                </>
              )}

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-danger btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Daftar</span>
                </button>
              </div>
            </form>

            <p className="text-center mt-2">
              <span className="me-25">Sudah memiliki akun?</span>
              <Link to="/login">
                <span>Masuk</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
