import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Input,
} from "reactstrap"; // Import Alert
import { getAllLaboratorium, getLaboratoriumID } from "../actions/laboratorium";
import { getAllAlat, getAlatID } from "../actions/alat";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly
const AlatCard = lazy(() => import("./Card/AlatCard"));
function Laboratorium(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availableLimits = [10, 25, 50, 100];
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const pageRangeDisplayed = 3; // Adjust the value as needed

  const { code } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    props.getlaboratorium(code);
    props.loadalat(code, limit, currentPage);
  }, [code, limit, currentPage]);

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj[0]
  );
  const alatlist = useSelector((state) => state.alat.alatlist.data);
  const paginatedData = props.alat.alatlist.data || []; // Ensure to have an empty array if data is undefined
  const pagination = props.alat.alatlist.pagination;
  const totalPages = pagination ? pagination.last_page : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to the first page when changing the limit
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    return (
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={isMobile ? 1 : pageRangeDisplayed}
        marginPagesDisplayed={isMobile ? 1 : 2}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    );
  };
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
      ) : laboratoriumobj &&
        laboratoriumobj.images &&
        laboratoriumobj.images.length > 0 ? (
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
                    <h3>{laboratoriumobj.nama || ""} </h3>
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
              <Row>
                {props.alat.loading
                  ? // Display skeletons while loading
                    Array.from({ length: 4 }).map((_, index) => (
                      <CardSkeleton key={index} />
                    ))
                  : Array.isArray(props.alat.alatlist.data)
                  ? props.alat.alatlist.data.map((item, index) => (
                      <Col key={item.id} className="my-3">
                        <Link
                          className="ms-2"
                          color="primary"
                          to={`/alat-lab/${item.id}`}
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
            <div
              className="pagination"
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col sm="4" className={isMobile ? "mb-2" : ""}>
                <Input
                  type="select"
                  value={limit}
                  onChange={(e) => handleLimitChange(e.target.value)}
                >
                  {availableLimits.map((l) => (
                    <option key={l} value={l}>
                      {`Tampilkan ${l} per halaman`}
                    </option>
                  ))}
                </Input>
              </Col>
              {renderPagination()}
            </div>
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
    loadalat: (code, limit, currentPage) =>
      dispatch(getAllAlat(code, limit, currentPage,"false")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorium);
