import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { Row, Col, Button, Input, FormGroup, Alert, Breadcrumb, BreadcrumbItem, NavLink } from "reactstrap";
import LabImage from "./LabImage";
import { getAllAlat, getAlatID } from "../actions/alat";

function Alat(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { code } = useParams();

  useEffect(() => {
    props.getalat(code);
  }, []);

  const alatobj = useSelector((state) => state.alat.alatobj);

  // Check if alatobj.images exists and has at least one element
  const firstImageUrl =
    alatobj.images && alatobj.images.length > 0 ? alatobj.images[0].url : "";

  return (
    <Fragment>
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
            {firstImageUrl && ( // Check if firstImageUrl exists
              <>
                <Row>
                  <Col sm="4">
                    <div className="boxLab box">
                      <img src={firstImageUrl} alt={alatobj.nama} />
                    </div>
                  </Col>
                  <Col sm="8">
                    <h1>{alatobj.nama} </h1>
                    <Link
                        className="ms-2"
                        color="primary"
                        to={`/laboratorium/${alatobj.laboratorium?.id}`}
                      >
                    <h4>{alatobj.laboratorium?.nama} </h4></Link>
                    <h4>{alatobj.lokasi?.nama} </h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: alatobj.deskripsi,
                      }}
                    ></p>
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
              </>
            )}
          </div>
        </div>
      </section>
    </Fragment>
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
