import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { getAllAlat, getAlatID } from "../actions/alat";
import { getLaboratoriumID } from "../actions/laboratorium";

function Alat(props) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDataCount, setFilteredDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [idlab, setIDLab] = useState("all");
  const [namaLab, setNamaLab] = useState("");

  useEffect(() => {
    props.loadalat(idlab);
  }, []);

  const isLoading = props.alat.loading; // Assuming you have a loading state in your Redux store

  useEffect(() => {
    props.loadalat(idlab);
  }, [idlab]);

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

  useEffect(() => {
    // Calculate the filtered data count
    setFilteredDataCount(
      props.alat.alatlist.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.laboratorium
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.laboratorium.lokasi_kawasan
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      ).length
    );
  }, [searchQuery, props.alat.alatlist]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredDataCount / itemsPerPage);

  // Create a paginated data array based on the current page
  const paginatedData = props.alat.alatlist
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.laboratorium.nama
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.laboratorium.lokasi.nama
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
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

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Adjust as needed

    for (let i = 1; i <= totalPages; i++) {
      // Show first, last, and nearby pages
      const showButton =
        i === 1 ||
        i === totalPages ||
        Math.abs(i - currentPage) <= Math.floor(maxButtonsToShow / 2);

      if (showButton) {
        buttons.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            color={currentPage === i ? "primary" : "secondary"}
          >
            {i}
          </Button>
        );
      }
    }

    // Add ellipses if there are more pages to be hidden
    if (currentPage - Math.floor(maxButtonsToShow / 2) > 2) {
      buttons.splice(1, 0, <span key="ellipsis-start">...</span>);
    }
    if (currentPage + Math.floor(maxButtonsToShow / 2) < totalPages - 1) {
      buttons.splice(buttons.length - 1, 0, <span key="ellipsis-end">...</span>);
    }

    return buttons;
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
          <div>
            <Row className="mx-0 mt-1 mb-50">
              <Col sm="6">
                <Input
                  type="text"
                  placeholder="Cari Alat atau Laboratorium..."
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
          <br />
          {searchQuery && (
            <div className="mb-3">
              {" "}
              {/* Add margin-bottom */}
              <Alert color="info">Ditemukan : {filteredDataCount} data</Alert>
            </div>
          )}
          <div className="wrapper">
            <Row className="boxItem">
            {isLoading ? (
                // Skeleton loading while data is being fetched
                Array.from({ length: 8 }).map((_, index) => (
                  <Col key={index}>
                    <div className="boxAlat box">
                      <Skeleton height={150} />
                    </div>
                    <div className="boxTitle">
                      <Skeleton width={250} />
                    </div>
                  </Col>
                ))
              ) : (
                // Render actual data
                paginatedData.map((item, index) => (
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
                  <div className="boxSubTitle">{item.laboratorium || ""}</div>
                  <div className="boxSubTitle">
                    {item.lokasi_kawasan || ""}
                  </div>
                  </Col>
                ))
              )}
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
            {renderPageButtons()}
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
    alat: state.alat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadalat: (idlab) => dispatch(getAllAlat(idlab)),
    getalat: (code) => dispatch(getAlatID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alat);
