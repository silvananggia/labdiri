// ** React Imports
import { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Store & Actions
import { connect, useDispatch } from "react-redux";

import CarouselHome from "./Home/CarouselHome";
import { Row, Col, Button, NavLink } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllKategori, getKategoriID } from "../actions/kategorilab";
import { getAllLaboratorium, getLaboratoriumID } from "../actions/laboratorium";
import { getAllAlat, getAlatID } from "../actions/alat";
import CardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly

const LabCard = lazy(() => import("./Card/LabCard"));
const AlatCard = lazy(() => import("./Card/AlatCard"));
function Home(props) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const idlab = "all";
  const idKat = "all";

  useEffect(() => {
    props.loadlaboratorium(idKat);
    props.loadkategori();
    props.loadalat(idlab, limit, currentPage);
  }, [idKat, idlab, limit, currentPage]);

  return (
    <Fragment>
      <Col>
        <section className="sliderHome">
          <Col className="divider"></Col>
          <CarouselHome />
        </section>
        <section className="kategoriLab">
          <div className="container">
            <div>
              <h2 className="titleCenter">Kategori Laboratorium</h2>
            </div>
            <div className="contentKategori  justify-content-center">
              <Row>
                {props.kategori.loading
                  ? // Display skeletons while loading
                    Array.from({ length: 3 }).map((_, index) => (
                      <Col key={index} className="centered-col">
                        <Skeleton width={150} height={150} />
                      </Col>
                    ))
                  : props.kategori.kategorilist &&
                    props.kategori.kategorilist.map((item, index) => (
                      <Col key={item.id} className="centered-col">
                        <Link
                          className="ms-2"
                          color="primary"
                          to={`/laboratorium-kategori/${item.id}`}
                        >
                          <img src="https://cdn.medcom.id/dynamic/content/2022/01/31/1383719/3FP7ZzilxH.jpeg?w=700" />
                          <div className="title">{item.nama}</div>
                        </Link>
                      </Col>
                    ))}
              </Row>
            </div>
          </div>
        </section>

        <section className="listLab">
          <div className="container">
            <div>
              <h2 className="titleLeft">Laboratorium</h2>
            </div>
            <div className="wrapper">
              <Row>
                {props.laboratorium.loading
                  ? // Display skeletons while loading
                    Array.from({ length: 4 }).map((_, index) => (
                      <CardSkeleton />
                    ))
                  : props.laboratorium.laboratoriumlist &&
                    props.laboratorium.laboratoriumlist
                      .slice(0, 4)
                      .map((item, index) => (
                        <Col key={item.id} className="my-3">
                          <Link
                            className="ms-2"
                            color="primary"
                            to={`/laboratorium/${item.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Suspense fallback={<CardSkeleton />}>
                              <LabCard item={item} />
                            </Suspense>
                          </Link>
                        </Col>
                      ))}
              </Row>
            </div>

            <div style={{ paddingTop: "20px", marginTop: "20px" }}>
              <Button
                onClick={() => navigate("/laboratorium")}
                className="btn pull-right"
                color="primary"
                size="sm"
                style={{ float: "right" }}
              >
                Lihat Selengkapnya
              </Button>
            </div>
          </div>
        </section>

        <section className="promo">
          <div className="container">
            <div>
              <Row>
                <Col>
                  <h3 className="title">E-Layanan Sains</h3>
                  <p className="subTitle">
                    Akses Layanan Fasilitas Riset dan Laboratorium di Lingkungan
                    Badan Riset dan Inovasi Nasional.
                  </p>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  <NavLink
                    href="https://elsa.brin.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="btn pull-right"
                      color="primary"
                      size="sm"
                      style={{ float: "right" }}
                    >
                      {" "}
                      Daftar Sekarang
                    </Button>
                  </NavLink>
                </Col>
              </Row>
            </div>
          </div>
        </section>

        <section className="alatLab">
          <div className="container">
            <div>
              <h2 className="titleLeft">Alat Laboratorium</h2>
            </div>
            <div className="wrapper">
              <Row>
                {props.alat.loading
                  ? // Display skeletons while loading
                    Array.from({ length: 4 }).map((_, index) => (
                      <CardSkeleton key={index} />
                    ))
                  : Array.isArray(props.alat.alatlist.data)
                  ? props.alat.alatlist.data.map((item, index) => (
                      <Col key={item.id}  className="my-3">
                        <Link
                          className="ms-2"
                          color="primary"
                          to={`alat-lab/${item.id}`}
                        >
                          <Suspense fallback={<CardSkeleton />}>
                            <AlatCard item={item} />
                          </Suspense>
                        </Link>

                       
                      </Col>
                    ))
                  : null}
              </Row>
            </div>

            <div style={{ paddingTop: "20px", marginTop: "20px" }}>
            <Button
              onClick={() => navigate("/alat-lab")}
              className="btn pull-right"
              color="primary"
              size="sm"
              style={{ float: "right" }}
            >
              Lihat Selengkapnya
            </Button>
            </div>
          </div>
        </section>

        <section className="mitra">
          <div className="container">
            <div>
              <h2 className="titleLeft">Mitra</h2>
            </div>
          </div>
        </section>
      </Col>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    laboratorium: state.laboratorium,
    kategori: state.kategori,
    alat: state.alat,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadlaboratorium: (idKat) => dispatch(getAllLaboratorium(idKat)),
    getlaboratorium: (code) => dispatch(getLaboratoriumID(code)),

    loadkategori: () => dispatch(getAllKategori()),
    getkategori: (code) => dispatch(getKategoriID(code)),

    loadalat: (idlab, limit, currentPage) =>
      dispatch(getAllAlat(idlab, limit, currentPage)),
    getalat: (code) => dispatch(getAlatID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
