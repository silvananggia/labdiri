import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  NavLink,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import LabImage from "./LabImage";
import { getAllAlat, getAlatID } from "../actions/alat";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly

import { MapPin } from "react-feather";
function Alat(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    props.getalat(code);
    dispatch(getAllAlat("all", limit, currentPage,"true"));
  }, [code, limit, currentPage]);

  const alatobj = useSelector((state) => state.alat.alatobj);

  return (
    <>
      {props.alat.loading ? (
           <section className="alatLab">
           <div className="container">
               <div>
                   <h2 className="titleLeft">Alat {alatobj?.laboratorium || ""}</h2>
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
      ) : alatobj &&
      alatobj.images &&
      alatobj.images.length > 0 ? (
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
              <Row>
                {/* First Column (Content) */}
                <Col sm="8">
                  <div>
                    <h2 className="titleLeft">
                      Alat {alatobj?.laboratorium || ""}
                    </h2>
                  </div>

                  <div className="wrapper">
                    <Row>
                      <Col sm="4">
                        <div className="boxLab box">
                          <img src={alatobj.images[0].url} alt={alatobj.nama} />
                        </div>
                      </Col>
                      <Col sm="8">
                        <h3>{alatobj.nama} </h3>
                        <Link
                          className="ms-2"
                          color="primary"
                          to={`/laboratorium/${alatobj.laboratorium?.id}`}
                        >
                          <h4>{alatobj.laboratorium} </h4>
                        </Link>
                        <h4>{alatobj.lokasi_kawasan} </h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.deskripsi,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Fungsi</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.fungsi,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Aplikasi</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.keterangan,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Merk</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.merk,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Dimensi</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.dimensi,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Tahun Perolehan</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.tahun_perolehan,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Spesifikasi</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.spesifikasi,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Jumlah</h3>
                      </Col>
                      <Col sm="8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: alatobj.jumlah,
                          }}
                        ></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <h3>Link Elsa</h3>
                      </Col>
                      <Col sm="8">
                        <NavLink
                          href={alatobj.link_elsa}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p>{alatobj.link_elsa}</p>
                        </NavLink>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {/* Second Column (Filter) */}
                <Col sm="4">
                <div className="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h2 className="titleLeft">Alat Lainnya</h2>
    </div>
    <div>
      {/* Add the "Lihat Semua" link here */}
      <Link to="/alat-lab" className="text-primary">
        Lihat Semua
      </Link>
    </div>
  </div>
                  {props.alat.loading
                    ? // Display skeletons while loading
                      Array.from({ length: 4 }).map((_, index) => (
                        <CardSkeleton key={index} />
                      ))
                    : Array.isArray(props.alat.alatlist.data)
                    ? props.alat.alatlist.data.map((item, index) => (
                        <Col key={item.id} className="mb-1">
                          <Link
                            color="primary"
                            to={`/alat-lab/${item.id}`}
                          >
                            <Suspense fallback={<CardSkeleton />}>
                              <Card className="d-flex flex-row">
                                <CardImg
                                  style={{ height: "30%", width: "20%" }}
                                  src={item.images[0].url}
                                  alt={item.nama}
                                />
                                <CardBody>
                                  <CardTitle>{item.nama}</CardTitle>
                                  <CardSubtitle
                                    className="mb-2"
                                    style={{
                                      fontSize: "12px",
                                      color: "#274380",
                                    }}
                                  >
                                    {" "}
                                    {item.laboratorium || ""}
                                  </CardSubtitle>
                                  {item.lokasi_kawasan ? (
                                    <>
                                      <CardSubtitle
                                        className="mb-2"
                                        style={{
                                          fontSize: "10px",
                                          color: "#274380",
                                        }}
                                      >
                                        <MapPin
                                          size={10}
                                          color="#274380"
                                          className="me-2"
                                        />
                                        {item.lokasi_kawasan}
                                      </CardSubtitle>
                                    </>
                                  ) : null}
                                  <CardText
                                    className="mb-2"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {item.spesifikasi || ""}
                                  </CardText>
                                </CardBody>
                              </Card>
                            </Suspense>
                          </Link>
                        </Col>
                      ))
                    : null}
                </Col>
              </Row>
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
