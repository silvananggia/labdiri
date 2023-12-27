// ** React Imports
import React, { useState, useEffect, useRef } from "react";
import "../@core/scss/base/pages/captcha.scss";
import { useDispatch, useSelector } from "react-redux";
import { useSkin } from "@hooks/useSkin";
import { useNavigate, Link } from "react-router-dom";

import { getHomeRouteForLoggedInUser } from "@utils";
// ** Icons Imports
import { RotateCcw } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../actions/auth";
import { clearMessage } from "../redux/message";

const Login = () => {
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validateCaptcha, setValidateCaptcha] = useState([]);
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    initializeCaptcha(ctx);
  }, []);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    const chrs = "0123456789";
    const n = 4;
    let captcha = "";
    for (let i = 0; i < n; i++) {
      captcha += chrs[Math.floor(Math.random() * chrs.length)];
    }
    return captcha;
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = "20px Roboto Mono";
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,

        // Randomize Y position slightly
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput("");
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
    captcha: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    captcha: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password, captcha } = formValue;

    if (captcha === captchaText) {
      dispatch(login(username, password));

      localStorage.setItem("user", user);
    } else {
      alert("Incorrect");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      initializeCaptcha(ctx);
    }
  };

  if (isAuthenticated) {
    navigate("/home");
  }

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
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              LOGIN
            </CardTitle>
            <CardText className="mb-2">
              Badan Riset dan Inovasi Nasional
            </CardText>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Username
                  </Label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="mb-1">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />

                  <div className="mb-1">
                    {/* <div className="form-check mb-1">
                      <Input type="checkbox" id="remember-me" />
                      <Label className="form-check-label" for="remember-me">
                        Remember Me
                      </Label>
                    </div> */}
                    <div className="captcha-box">
                      <canvas
                        ref={canvasRef}
                        width="250vw"
                        height="45"
                      ></canvas>

                      <button
                        className="btn btn-primary"
                        id="reload-button"
                        type="button" // Use type="button" for non-submit buttons
                        onClick={() =>
                          initializeCaptcha(canvasRef.current.getContext("2d"))
                        }
                      >
                        {" "}
                        <RotateCcw size={18} />
                      </button>
                    </div>
                  </div>

                  <Field
                    name="captcha"
                    type="text"
                    placeholder="Masukan Captcha Disini"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-danger btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
              </Form>
            </Formik>
            <p className="text-center mt-2">
              <span className="me-25">Belum Memiliki Akun?</span>
              <Link to="/register">
                <span>Daftar</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
