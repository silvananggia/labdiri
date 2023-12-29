import React, { useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { Row, Col, Button, Breadcrumb, BreadcrumbItem, NavLink } from "reactstrap";
import LabImage from "./LabImage";
import { getAllAlat, getAlatID } from "../actions/alat";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Alat(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  useEffect(() => {
    props.getalat(code);
  }, [code]);

  const alatobj = useSelector((state) => state.alat.alatobj[0]);

  return (
    <>
      {props.alat.loading ? (
        <section className="alatLab">
          <div className="container">
            <div>
              <h2 className="titleLeft">Alat {alatobj?.laboratorium?.nama || ""}</h2>
            </div>
            <div className="wrapper">
              <Row className="boxItem">
                {Array.from({ length: 12 }).map((_, index) => (
                  <Col key={index}>
                    <div className="boxAlat box">
                      <Skeleton width={250} height={150} />
                    </div>
                    <div className="boxTitle">
                      <Skeleton width={200} height={20} />
                    </div>
                    <div className="boxSubTitle">
                      <Skeleton width={200} height={20} />
                    </div>
                    <div className="boxSubTitle">
                      <Skeleton width={200} height={20} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </section>
      ) : alatobj ? (
        <>
          <div className="breadcrumb">
            <div className="wrapper">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="/">Beranda</a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="/alat-lab">Alat Laboratorium</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>{alatobj.nama}</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          <section className="page">
            <div className="container">
              <div>
                <h2 className="titleLeft">Alat</h2>
              </div>

              <div className="wrapper">
                <Row>
                  <Col sm="4">
                    <div className="boxLab box">
                      <img src={alatobj.images[0].url} alt={alatobj.nama} />
                    </div>
                  </Col>
                  <Col sm="8">
                    <h1>{alatobj.nama} </h1>
                    <Link
                      className="ms-2"
                      color="primary"
                      to={`/laboratorium/${alatobj.laboratorium?.id}`}
                    >
                      <h4>{alatobj.laboratorium?.nama} </h4>
                    </Link>
                    <h4>{alatobj.lokasi?.nama} </h4>
                    <p dangerouslySetInnerHTML={{ __html: alatobj.deskripsi }}></p>
                  </Col>
                </Row>
                    <Row>
                    <Col sm="2"><h3>Fungsi</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.fungsi,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="2"><h3>Aplikasi</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.keterangan,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="2"><h3>Merk</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.merk,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    
                    <Col sm="2"><h3>Dimensi</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.dimensi,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="2"><h3>Tahun Perolehan</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.tahun_perolehan,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="2"><h3>Spesifikasi</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.spesifikasi,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="2"><h3>Jumlah</h3></Col>
                    <Col sm="8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.jumlah,
                      }}
                    ></p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="2"><h3>Link Elsa</h3></Col>
                    <Col sm="8">
                    <NavLink href={ alatobj.link_elsa } target="_blank" rel="noopener noreferrer">
                    <p>{ alatobj.link_elsa }</p>
    </NavLink>
                    
                      
                    
                    </Col>
                    
                </Row>
                </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    alat: state.alat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadalat: (code) => dispatch(getAllAlat(code)),
    getalat: (code) => dispatch(getAlatID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alat);