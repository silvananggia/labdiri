import React, { useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { Row, Col, Button, Input, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap"; // Import Alert
import { getAllLaboratorium, getLaboratoriumID } from "../actions/laboratorium";
import LabImage from "./LabImage";
import { getAllAlat, getAlatID } from "../actions/alat";

function Laboratorium(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { code } = useParams();

  useEffect(() => {
    props.getlaboratorium(code);
    props.loadalat(code);
  }, []);

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );

  // Check if laboratoriumobj.images exists and has at least one element
  const firstImageUrl =
    laboratoriumobj.images && laboratoriumobj.images.length > 0
      ? laboratoriumobj.images[0].url
      : "";

  return (
    <Fragment>
            <div className="breadcrumb">
        <div className="wrapper">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Beranda</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href="/laboratorium">Laboratorium</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>{laboratoriumobj.nama}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <section className="page">
        <div className="container">
          <div>
            <h2 className="titleLeft">Laboratorium</h2>
          </div>

          <div className="wrapper">
            {firstImageUrl && ( // Check if firstImageUrl exists
              <>
                <Row>
                  <Col sm="4">
                    <div className="boxLab box">
                      <img src={firstImageUrl} alt={laboratoriumobj.nama} />
                    </div>
                  </Col>
                  <Col sm="8">
                    <h1>{laboratoriumobj.nama} </h1>
                    <h4>{laboratoriumobj.lokasi?.nama} </h4>
                    <h4>{laboratoriumobj.lokasi?.keterangan} </h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: laboratoriumobj.deskripsi,
                      }}
                    ></p>
                  </Col>
                  <h3>Tugas dan Fungsi</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: laboratoriumobj.tusi }}
                  ></p>
                  <h3>Posisi Strategis</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: laboratoriumobj.posisi_strategis,
                    }}
                  ></p>
                  <h3>Sumber Daya Manuasia</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: laboratoriumobj.sdm }}
                  ></p>
                </Row>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="alatLab">
        <div className="container">
          <div>
            <h2 className="titleLeft">Alat {laboratoriumobj.nama}</h2>
          </div>
          <div className="wrapper">
 <Row className="boxItem">
                {props.alat.alatlist &&
                  props.alat.alatlist.slice(0, 12).map((item, index) => (
                    <Col key={item.id}>
                      <Link
                        className="ms-2"
                        color="primary"
                        to={`/alat-lab/${item.id}`}
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
              Lihat Alat Lainnya
            </Button>
        </div>
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    laboratorium: state.laboratorium,
    alat: state.alat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getlaboratorium: (code) => dispatch(getLaboratoriumID(code)),

    loadalat: (code) => dispatch(getAllAlat(code)),
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorium);
