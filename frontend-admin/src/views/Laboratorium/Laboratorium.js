import React, { useContext, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Edit, Plus, Trash2,Eye } from "react-feather";
import {
  Badge,
  Label,
  Input,
  UncontrolledTooltip,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
} from "reactstrap";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { AbilityContext } from "@src/utility/context/Can";
import { getAllLaboratorium, deleteLaboratorium } from "../../actions/laboratorium";

import "@styles/react/libs/tables/react-dataTable-component.scss";

const Laboratorium = (props) => {
  const ability = useContext(AbilityContext);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageRangeDisplayed = 3;

  useEffect(() => {

    props.loadlaboratorium(globalFilter, rowsPerPage, currentPage);
  
}, [globalFilter, rowsPerPage, currentPage]);


  const handleDelete = (code) => {
    if (window.confirm("Anda yakin akan menghapus data tersebut?")) {
      props.removeLaboratorium(code);
      toast.success("Kategori Berhasil Dihapus.");
    }
  };

  const handlePerPage = (e) => {
    const selectedRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(selectedRowsPerPage);
    setLimit(selectedRowsPerPage);
    setCurrentPage(1); 
  };

  const columns = [
    {
      name: "",
      width: "120px",
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
            <Link to={"view/" + row.id} className="cursor-pointer btn btn-info btn-sm">
          <Eye
            className="xs-1"
            size={12}
            style={{  stroke: "white"}}
            id={`view-tooltip-${row.id}`}
          />
          <UncontrolledTooltip
            placement="top"
            target={`view-tooltip-${row.id}`}
          >
            Lihat
          </UncontrolledTooltip>
        </Link>
        <span style={{ margin: "0 2px" }}></span>
        <Link to={"edit/" + row.id} className="cursor-pointer btn btn-primary btn-sm">
          <Edit
            className="xs-1"
            size={12}
            style={{  stroke: "white"}}
            id={`send-tooltip-${row.id}`}
          />
          <UncontrolledTooltip
            placement="top"
            target={`send-tooltip-${row.id}`}
          >
            Ubah
          </UncontrolledTooltip>
        </Link>
        </div>
      )},{
      name: "Laboratorium",
      selector: (row) => row.nama,
      sortable: true,
      width: '500px',
    },
    {
      name: "Lokasi",
      selector: (row) => row.lokasi_kawasan,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Badge pill color={row.status === "aktif" ? "light-success" : "light-danger"} className="me-1">
          {row.status === "aktif" ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
    
  ];


  const paginatedData = props.laboratorium.laboratoriumlist.data || []; // Ensure to have an empty array if data is undefined
  const pagination = props.laboratorium.laboratoriumlist.metadata;
  const totalPages = pagination ? pagination.last_page : 0;



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to the first page when changing the limit
  };

  const CustomPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    return (
      <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={ pageRangeDisplayed}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => handlePageChange(selected + 1)}
      forcePage={currentPage - 1}
      previousLabel={""}
      nextLabel={""}
      breakLabel={"..."}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
     
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">Laboratorium</CardTitle>
             {/*  <div className="d-flex mt-md-0 mt-1">
              {ability.can("add", "laboratorium") ? (
                <Link className="ms-2" color="primary" to={"add"}>
                  <Plus size={15} />
                  <span className="align-middle ms-50">Tambah</span>
                </Link>) : null}
              </div> */}
            </CardHeader>
            <Row className="mx-0 mt-1 mb-50">
              <Col sm="6">
                <div className="d-flex align-items-center">
                  <Label for="sort-select">show</Label>
                  <Input
                    className="dataTable-select"
                    type="select"
                    id="sort-select"
                    value={rowsPerPage}
                    onChange={(e) => handlePerPage(e)}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </Input>
                  <Label for="sort-select">data</Label>
                </div>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                sm="6"
              >
                <Label className="me-1" for="search-input">
                  Search
                </Label>
                  <Input
                    className="dataTable-filter text-right"
                    type="text"
                    bsSize="sm"
                    id="search-input"
                    placeholder="Cari Nama Laboratorium"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
              </Col>
            </Row>

            <div className="react-dataTable">
              <DataTable
                columns={columns}
                data={paginatedData}
                pagination
                highlightOnHover
                pointerOnHover
                paginationPerPage={rowsPerPage}
                paginationComponent={CustomPagination}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    laboratorium: state.laboratorium,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadlaboratorium: ( search,limit, currentPage) =>
    dispatch(getAllLaboratorium( search,limit, currentPage)),
    removeLaboratorium: (code) => dispatch(deleteLaboratorium(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorium);
