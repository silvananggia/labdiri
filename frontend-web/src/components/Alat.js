import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { connect, useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Button,
  Label,
  Input,
  FormGroup,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
import Select from "react-select";
import { getAllAlat, getAlatID, getFilterAlat } from "../actions/alat";
import { getLokasiList } from "../actions/filter";
import { getLaboratoriumID, getLabList } from "../actions/laboratorium";

import CardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly

const AlatCard = lazy(() => import("./Card/AlatCard"));
function Alat(props) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDataCount, setFilteredDataCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const availableLimits = [10, 25, 50, 100];
  const [currentPage, setCurrentPage] = useState(1);
  const [idlab, setIDLab] = useState("all");
  const [namaLab, setNamaLab] = useState("");
  const [fnama, setFNama] = useState("");
  const [flab, setFLab] = useState("");
  const [fidlab, setFidLab] = useState("");
  const [flokasi, setFLokasi] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [limit, setLimit] = useState(12);
  const pageRangeDisplayed = 3;
  const [isLoading, setIsLoading] = useState(false);

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
    dispatch(getLabList());
    dispatch(getLokasiList());
  }, [dispatch]);

  useEffect(() => {
    if (isFiltered) {
      dispatch(getFilterAlat(fidlab, fnama, flokasi, limit, currentPage));
    } else {
      props.loadalat(idlab, limit, currentPage);
    }
  }, [idlab, limit, currentPage]);

  const paginatedData = props.alat.alatlist.data || []; // Ensure to have an empty array if data is undefined
  const pagination = props.alat.alatlist.metadata;
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

  const laboratoriumobj = useSelector(
    (state) => state.laboratorium.laboratoriumobj
  );

  const lablist = useSelector((state) => state.laboratorium.lablist);
  const lokasilist = useSelector((state) => state.filter.lokasilist);

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

  const handleSubmit = async () => {
    setCurrentPage(1);
    setIsLoading(true); // Set loading state to true

    try {
      await dispatch(getFilterAlat(fidlab, fnama, flokasi, limit, currentPage));
      setIsFiltered(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleReset = () => {
    // Clear filter values
    setFNama("");
    setFLokasi("");
    setFLab("");
    setFidLab("");

    // Reset state
    setIsFiltered(false);
    setCurrentPage(1);
    // Load data with default values (all)
    props.loadalat("all", limit, currentPage);
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
          <div className="row">
            {/* Filter Column */}
            <div className="col-md-3">
              <div className="mx-0 mt-1 mb-50">
                <div className="filterBox">
                  <div className="filterTitle">Filter</div>
                  <div className="filterContent">
                    <Col sm="12">
                      <FormGroup>
                        <Label for="namaAlat">Nama Alat</Label>
                        <Input
                          type="text"
                          name="namaAlat"
                          id="namaAlat"
                          value={fnama}
                          onChange={(e) => setFNama(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="namaLaboratorium">Laboratorium</Label>
                        <Select
                          id="namaLaboratorium"
                          options={[
                            { value: "", label: "Semua Laboratorium" },
                            ...(lablist?.map((lab) => ({
                              value: lab.id,
                              label: lab.nama,
                            })) || []),
                          ]}
                          value={{ value: flab, label: flab }}
                          onChange={(selectedOption) => {
                            setFidLab(selectedOption.value);
                            setFLab(selectedOption.label); // Set flab based on selected option label
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="lokasi">Lokasi</Label>
                        <Select
                          id="lokasi"
                          options={[
                            { value: "", label: "Semua Lokasi" },
                            ...(lokasilist?.map((lokasi) => ({
                              value: lokasi.lokasi_kawasan,
                              label: lokasi.lokasi_kawasan,
                            })) || []),
                          ]}
                          value={{ value: flokasi, label: flokasi }}
                          onChange={(selectedOption) => {
                            setFLokasi(selectedOption.value); // Set flokasi based on selected option label
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <Button
                        color="primary"
                        onClick={handleSubmit}
                        className="w-100 me-2"
                        disabled={isLoading} // Disable button when loading
                      >
                        {isLoading ? (
                          <Spinner color="light" size="sm">
                            Loading...
                          </Spinner>
                        ) : (
                          "Cari"
                        )}
                      </Button>
                    </Col>
                    {""}
                    <br />
                    {isFiltered && (
                      <Col sm="12">
                        <Button color="primary" onClick={handleReset} block>
                          Hapus Pencarian
                        </Button>
                      </Col>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="col-md-9">
              {/* Limit Content */}
              <Col sm="4" className="ml-auto">
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
              {isFiltered &&
                (pagination.total > 0 ? (
                  <Alert color="info" className="mt-3">
                    Ditemukan: {pagination.total} data
                  </Alert>
                ) : (
                  <Alert color="danger" className="mt-3">
                    Tidak Ada Data Ditemukan
                  </Alert>
                ))}
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
    loadalat: (idlab, limit, currentPage) =>
      dispatch(getAllAlat(idlab, limit, currentPage,"false")),
    getalat: (code) => dispatch(getAlatID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alat);
