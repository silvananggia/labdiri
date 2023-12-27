import React, { useContext, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Edit, Plus, Trash2 } from "react-feather";
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
  const { user: currentUser } = useSelector((state) => state.auth.user);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = (code) => {
    if (window.confirm("Anda yakin akan menghapus data tersebut?")) {
      props.removeLaboratorium(code);
      toast.success("Kategori Berhasil Dihapus.");
    }
  };

  const handlePerPage = (e) => {
    const selectedRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(selectedRowsPerPage);
    setCurrentPage(0);
  };

  useEffect(() => {
    props.loadLaboratorium();
  }, []);

  const columns = [
    {
      name: "Laboratorium",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori.nama,
      sortable: true,
    },
    {
      name: "Lokasi",
      selector: (row) => row.lokasi.nama,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Badge pill color={row.status === "1" ? "light-success" : "light-danger"} className="me-1">
          {row.status === "1" ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
         {ability.can("update", "laboratorium") ? (
          <Link color="primary" to={"edit/" + row.id}>
            <Edit className="cursor-pointer" size={17} id={`send-tooltip-${row.id}`} />
            <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
              Ubah
            </UncontrolledTooltip>
          </Link>) : null }
          {ability.can("delete", "laboratorium") ? (
          <Link
            onClick={() => {
              handleDelete(row.id);
            }}
            to={props.Laboratorium}
            id={`pw-tooltip-${row.id}`}
          >
            <Trash2 size={17} className="mx-1" />
            <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
              Hapus
            </UncontrolledTooltip>
          </Link>): null}
        </div>
      ),
    },
  ];

  const filteredData = props.laboratorium.laboratoriumlist.filter((item) =>
    item.nama.toLowerCase().includes(globalFilter.toLowerCase()) ||
    item.kategori.nama.toLowerCase().includes(globalFilter.toLowerCase()) ||
    item.lokasi.nama.toLowerCase().includes(globalFilter.toLowerCase()) ||
    (item.status === "1" && "Aktif".toLowerCase().includes(globalFilter.toLowerCase())) ||
    (item.status !== "1" && "Tidak Aktif".toLowerCase().includes(globalFilter.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlePagination = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const CustomPagination = () => {
    const count = Math.ceil(filteredData.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePagination}
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
              <div className="d-flex mt-md-0 mt-1">
              {ability.can("add", "laboratorium") ? (
                <Link className="ms-2" color="primary" to={"add"}>
                  <Plus size={15} />
                  <span className="align-middle ms-50">Tambah</span>
                </Link>) : null}
              </div>
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
                    placeholder="Search Laboratorium, Kategori, Lokasi, Status"
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
    loadLaboratorium: () => dispatch(getAllLaboratorium()),
    removeLaboratorium: (code) => dispatch(deleteLaboratorium(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorium);
