// ** React Imports
import { useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Store & Actions
import { connect, useDispatch } from "react-redux";

import CarouselHome from "./Home/CarouselHome";
import { Row, Col, Button, NavLink } from "reactstrap";

import { getAllKategori, getKategoriID } from "../actions/kategorilab";
import { getAllLaboratorium, getLaboratoriumID } from "../actions/laboratorium";
import { getAllAlat, getAlatID } from "../actions/alat";

function Home(props) {
  const navigate = useNavigate();
  const idlab = "all";
  const idKat = "all";

  useEffect(() => {
    props.loadlaboratorium(idKat);
    props.loadkategori();
    props.loadalat(idlab);
  }, []);

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
            <Row >
              {props.kategori.kategorilist &&
                props.kategori.kategorilist.map((item, index) => (
                  <Col key={item.id} className="centered-col">
                    
                     <Link
                        className="ms-2"
                        color="primary"
                        to={`/laboratorium-kategori/${item.id}`}
                      >
                    <img src="https://cdn.medcom.id/dynamic/content/2022/01/31/1383719/3FP7ZzilxH.jpeg?w=700" />
                    <div className="title">
                        {item.nama}
                      </div>
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
              <Row className="boxItem">
                {props.laboratorium.laboratoriumlist &&
                  props.laboratorium.laboratoriumlist.slice(0, 3) .map((item, index) => (
                    <Col key={item.id}>
                                            <Link
                        className="ms-2"
                        color="primary"
                        to={`laboratorium/${item.id}`}
                      >
                      <div className="boxLab box">
                        <img src={item.images[0].url} alt={item.nama} />
                      </div>

                      <div className="boxTitle">
                        <h5>{item.nama}</h5>
                      </div>
                      </Link>
                      <div className="boxSubTitle">{item.lokasi.nama}</div>
                      <div className="boxSubTitle">
                        {item.lokasi.keterangan}
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>

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
                 
                <NavLink href="https://elsa.brin.go.id" target="_blank" rel="noopener noreferrer" >
                       <Button
            
              className="btn pull-right"
              color="primary"
              size="sm"
              style={{ float: "right" }}
            > Daftar Sekarang</Button>
               
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
              <Row className="boxItem">
                {props.alat.alatlist &&
                  props.alat.alatlist.slice(0, 12).map((item, index) => (
                    <Col key={item.id}>
                      <Link
                        className="ms-2"
                        color="primary"
                        to={`alat-lab/${item.id}`}
                      >
                        <div className="boxAlat box">
                          <img src={item.images[0].url} alt={item.nama} />
                        </div>

                        <div className="boxTitle">
                          <h5>{item.nama}</h5>
                        </div>
                      </Link>

                      <div className="boxSubTitle">
                        {item.laboratorium.nama}
                      </div>
                      <div className="boxSubTitle">
                        {item.laboratorium.lokasi.nama}
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>

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

    loadalat: (idlab) => dispatch(getAllAlat(idlab)),
    getalat: (code) => dispatch(getAlatID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
