import React, { useEffect, useState, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import {
  Row,
  Col,
  Button,
  Input,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"; // Import Alert
import { MapPin } from "react-feather";
import {
  getAllLaboratorium,
  getLaboratoriumID,
  getLaboratoriumCat,
} from "../actions/laboratorium";
import { getKategoriID } from "../actions/kategorilab";
import LabCardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly

const LabCard = lazy(() => import("./Card/LabCard"));
function Laboratorium(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDataFoundAlert, setShowDataFoundAlert] = useState(false);
  const [filteredDataCount, setFilteredDataCount] = useState(0); // Define filteredDataCount
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [namaKat, setNamaKat] = useState("");
  const { code } = useParams("");

  useEffect(() => {
    if (code) {
      props.loadlaboratorium(code);
    } else {
      props.loadlaboratorium("all");
    }
  }, []);

  const kategoriobj = useSelector((state) => state.kategori.kategoriobj);
  useEffect(() => {
    if (code !== "all") {
      console.log(code);
      dispatch(getKategoriID(code));
    }
  }, []);

  useEffect(() => {
    if (kategoriobj) {
      setNamaKat(kategoriobj.nama);
      console.log(kategoriobj.nama);
    }
  }, [kategoriobj]);

  useEffect(() => {
    const filteredCount = props.laboratorium.laboratoriumlist.filter(
      (item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasi_kawasan.toLowerCase().includes(searchQuery.toLowerCase())
    ).length;

    setFilteredDataCount(filteredCount);
    setShowDataFoundAlert(!!searchQuery && filteredCount > 0);
  }, [searchQuery, props.laboratorium.laboratoriumlist]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredDataCount / itemsPerPage);

  // Create a paginated data array based on the current page
  const paginatedData = props.laboratorium.laboratoriumlist
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasi_kawasan.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Fragment>
      <div className="breadcrumb">
        <div className="wrapper">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/">Beranda</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {namaKat ? "Kategori Laboratorium : " + namaKat : "Laboratorium"}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <section className="listLab">
        <div className="container">
          <div>
            <h2 className="titleLeft">
              {namaKat ? "Kategori Laboratorium : " + namaKat : "Laboratorium"}
            </h2>
          </div>
          <div className="search-container">
            <Row className="mx-0 mt-1 mb-50">
              <Col sm="6">
                <Input
                  type="text"
                  placeholder="Cari Laboratorium..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col sm="6">
                <Button color="primary" onClick={() => setSearchQuery("")}>
                  Hapus Pencarian
                </Button>
              </Col>
            </Row>
          </div>
          {showDataFoundAlert && (
            <Alert color="info" className="mt-3">
              Ditemukan: {filteredDataCount} data
            </Alert>
          )}
          <br />
          <div className="wrapper">
            <Row>
              {paginatedData.map((item, index) => (

                <Col key={item.id} className="my-3">
                  <Link
                    className="ms-2"
                    color="primary"
                    to={`/laboratorium/${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                   <Suspense fallback={<LabCardSkeleton />}>
                  <LabCard item={item} />
                </Suspense>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
          <div className="pagination">
            <Button
              onClick={goToPreviousPage}
              color="secondary"
              disabled={currentPage === 1}
            >
              {"<"}
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                color={currentPage === index + 1 ? "primary" : "secondary"}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={goToNextPage}
              color="secondary"
              disabled={currentPage === totalPages}
            >
              {">"}
            </Button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    laboratorium: state.laboratorium,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadlaboratorium: (code) => dispatch(getAllLaboratorium(code)),
    getlaboratorium: (code) => dispatch(getLaboratoriumID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorium);
