import React, { useEffect, useState, Fragment, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  Row,
  Col,
  Button,
  Input,
  Label,
  FormGroup,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap"; // Import Alert
import { MapPin } from "react-feather";
import {
  getAllLaboratorium,
  getLaboratoriumID,
  getLaboratoriumCat,
  getFilterLaboratorium,
} from "../actions/laboratorium";
import Select from "react-select";
import { getLokasiList } from "../actions/filter";
import { getKategoriID } from "../actions/kategorilab";
import LabCardSkeleton from "./Card/LabCardSkeleton"; // Adjust the path accordingly

const LabCard = lazy(() => import("./Card/LabCard"));
function Laboratorium(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDataFoundAlert, setShowDataFoundAlert] = useState(false);
  const [filteredDataCount, setFilteredDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [namaKat, setNamaKat] = useState("");
  const { code } = useParams("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const availableLimits = [10, 25, 50, 100];
  const [fnama, setFNama] = useState("");
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
    dispatch(getLokasiList());
  }, [dispatch]);

  const handleSubmit = async () => {
    setCurrentPage(1);
    setIsLoading(true); // Set loading state to true

    try {
      await dispatch(getFilterLaboratorium(fnama, flokasi, limit, currentPage));
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

    // Reset state
    setIsFiltered(false);
    setCurrentPage(1);

    props.loadlaboratorium("all", limit, currentPage);
  };

  /*  useEffect(() => {
    if (code) {
      props.loadlaboratorium(code);
    } else {
      props.loadlaboratorium("all");
    }
  }, []); */
  const lokasilist = useSelector((state) => state.filter.lokasilist);

  useEffect(() => {
    if (isFiltered) {
      dispatch(getFilterLaboratorium(fnama, flokasi, limit, currentPage));
    } else {
      props.loadlaboratorium("all", limit, currentPage);
    }
  }, [code, limit, currentPage]);

  const paginatedData = props.laboratorium.laboratoriumlist.data || []; // Ensure to have an empty array if data is undefined
  const pagination = props.laboratorium.laboratoriumlist.pagination;
  const totalPages = pagination ? pagination.last_page : 0;
  console.log(paginatedData);
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
              <Col sm="4">
                <Input
                  type="text"
                  name="namaAlat"
                  id="namaAlat"
                  placeholder="Nama Laboratorium"
                  value={fnama}
                  onChange={(e) => setFNama(e.target.value)}
                />
              </Col>

              <Col sm="3">
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
              </Col>
              <Col sm="4" className="d-flex">
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
                {isFiltered && (
                  <Button
                    color="primary"
                    onClick={handleReset}
                    className="w-100"
                  >
                    Hapus Pencarian
                  </Button>
                )}
              </Col>
            </Row>
          </div>
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
    loadlaboratorium: (code, limit, currentPage) =>
      dispatch(getAllLaboratorium(code, limit, currentPage)),
    getlaboratorium: (code) => dispatch(getLaboratoriumID(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorium);
