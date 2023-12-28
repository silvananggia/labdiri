import React, { useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap"; // Import Alert
import { getAllLaboratorium, getLaboratoriumID } from "../actions/laboratorium";
import { getAllAlat, getAlatID } from "../actions/alat";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Laboratorium(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { code } = useParams();

  useEffect(() => {
    props.getlaboratorium(code);
    props.loadalat(code);
  }, [code]);

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj[0]
  );
  const alatlist = useSelector(
    (state) => state.alat.alatlist
  );

  return (
    <Fragment>
    {props.laboratorium.loading ? (
        <div className="container">
          <Row>
            <Col sm="4">
              <Skeleton width={250} height={150} />
            </Col>
            <Col sm="8">
              <Skeleton width={500} height={30} />
              <Skeleton width={400} height={20} />
              <Skeleton width={400} height={20} />
              <Skeleton width={400} height={20} />
            </Col>
          </Row>
        </div>
      
    ) : laboratoriumobj && laboratoriumobj.images && laboratoriumobj.images.length > 0 ? (
      <div>
        <div className="breadcrumb">
          <div className="wrapper">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">Beranda</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/laboratorium">Laboratorium</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {laboratoriumobj ? laboratoriumobj.nama : ""}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
        <section className="page">
          <div className="container">
            <div>
              <h2 className="titleLeft">Laboratorium</h2>
            </div>
            <div className="wrapper">
              <Row>
                <Col sm="4">
                  <div className="boxLab box">
                    <img
                      src={laboratoriumobj.images[0]?.url || ""}
                      alt={laboratoriumobj.nama || ""}
                    />
                  </div>
                </Col>
                <Col sm="8">
                  <h1>{laboratoriumobj.nama || ""} </h1>
                  <h4>{laboratoriumobj.lokasi_kawasan || ""} </h4>
                 
                    {/* <h4>{laboratoriumobj.lokasi?.keterangan} </h4> */}
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
            </div>
          </div>
        </section>
      </div>
    ) : null}

{props.alat.loading ? (
  <section className="alatLab">
    <div className="container">
      <div>
        <h2 className="titleLeft">Alat {laboratoriumobj?.nama || ""}</h2>
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
) : alatlist && alatlist.length > 0 ? (
      <section className="alatLab">
        <div className="container">
          <div>
            <h2 className="titleLeft">Alat {laboratoriumobj?.nama || ""}</h2>
          </div>
          <div className="wrapper">
            <Row className="boxItem">
              {alatlist.slice(0, 12).map((item, index) => (
                <Col key={item.id}>
                  <Link
                    className="ms-2"
                    color="primary"
                    to={`/alat-lab/${item.id}`}
                  >
                    <div className="boxAlat box">
                      <img src={item.images[0]?.url || ""} alt={item.nama || ""} />
                    </div>
                    <div className="boxTitle">
                      <h5>{item.nama || ""}</h5>
                    </div>
                  </Link>
                  <div className="boxSubTitle">{item.laboratorium?.nama || ""}</div>
                  <div className="boxSubTitle">
                    {item.laboratorium?.lokasi?.nama || ""}
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
    ) : null}
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
