import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { connect, useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getAllAlat, getAlatID } from "../actions/alat";
import { getLaboratoriumID } from "../actions/laboratorium";

import CardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly

const AlatCard = lazy(() => import("./Card/AlatCard"));
function Alat(props) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDataCount, setFilteredDataCount] = useState(0);

  const availableLimits = [10, 25, 50, 100];
  const [currentPage, setCurrentPage] = useState(1);
  const [idlab, setIDLab] = useState("all");
  const [namaLab, setNamaLab] = useState("");
  const [limit, setLimit] = useState(15);
  const pageRangeDisplayed = 3; // Adjust the value as needed

  useEffect(() => {
    props.loadalat(idlab, limit, currentPage);
  }, [idlab, limit, currentPage]);

  const isLoading = props.alat.loading;

  const paginatedData = props.alat.alatlist.data || []; // Ensure to have an empty array if data is undefined
  const pagination = props.alat.alatlist.pagination;
  const totalPages = pagination
    ?pagination.last_page
    : 0;

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
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={2}
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

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );
  useEffect(() => {
    if (idlab !== "all") {
      dispatch(getLaboratoriumID(idlab));
    }
  }, []);

  useEffect(() => {
    if (laboratoriumobj) {
      setNamaLab(laboratoriumobj.nama);
    }
  }, [laboratoriumobj]);

  return (
    <Fragment>
      <div className="breadcrumb">
        <div className="wrapper">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Beranda</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {namaLab ? "Alat " + namaLab : "Alat Laboratorium"}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <section className="alatLab">
        <div className="container">
          <div>
            <h2 className="titleLeft">
              {namaLab ? "Alat " + namaLab : "Alat Laboratorium"}
            </h2>
          </div>
          <div className="mx-0 mt-1 mb-50">
            <Col sm="6">
              <Input
                type="text"
                placeholder="Cari Alat atau Laboratorium..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col sm="3">
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
            <Col sm="3">
              <Button color="primary" onClick={() => setSearchQuery("")}>
                Hapus Pencarian
              </Button>
            </Col>
          </div>
          <br />
          {searchQuery && (
            <div className="mb-3">
              {" "}
              {/* Add margin-bottom */}
              <Alert color="info">Ditemukan : {filteredDataCount} data</Alert>
            </div>
          )}
          <div className="wrapper">
            <Row>
              {paginatedData.map((item, index) => (
                <Col key={item.id} className="my-3">
                  <Link
                    className="ms-2"
                    color="primary"
                    to={`/alat-lab/${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Suspense fallback={<CardSkeleton />}>
                      <AlatCard item={item} />
                    </Suspense>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
          <div className="pagination">{renderPagination()}</div>
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
    loadalat: (idlab, limit, currentPage) =>
      dispatch(getAllAlat(idlab, limit, currentPage)),
    getalat: (code) => dispatch(getAlatID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alat);
