import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Edit, Plus, Trash2, Eye } from "react-feather";
import {
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

import { getAllPages, deletePages } from "../../actions/pages";

import "@styles/react/libs/tables/react-dataTable-component.scss";

const Pages = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = (code) => {
    if (window.confirm("Anda yakin akan menghapus data tersebut?")) {
      props.removePages(code);
      toast.success("Kategori Berhasil Dihapus.");
    }
  };

  const handlePerPage = (e) => {
    const selectedRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(selectedRowsPerPage);
    setCurrentPage(0);
  };

  useEffect(() => {
    props.loadPages();
  }, []);

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
        </div>)},
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
    },
/* 
    {
      name: "Aksi",
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Link color="primary" to={"edit/" + row.id}>
            <Edit className="cursor-pointer" size={17} id={`send-tooltip-${row.id}`} />
            <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
              Ubah
            </UncontrolledTooltip>
          </Link>
          <Link
            onClick={() => {
              handleDelete(row.id);
            }}
            to={props.Pages}
            id={`pw-tooltip-${row.id}`}
          >
            <Trash2 size={17} className="mx-1" />
            <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
              Hapus
            </UncontrolledTooltip>
          </Link>
        </div>
      ),
    }, */
  ];

  const filteredData = props.pages.pageslist.filter((item) =>
    item.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
    item.slug.toLowerCase().includes(globalFilter.toLowerCase()) ||
    item.content.toLowerCase().includes(globalFilter.toLowerCase())
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
              <CardTitle tag="h4">Pages</CardTitle>
              <div className="d-flex mt-md-0 mt-1">
                <Link className="ms-2" color="primary" to={"add"}>
                  <Plus size={15} />
                  <span className="align-middle ms-50">Tambah</span>
                </Link>
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
                    placeholder="Search Title, Slug, Content"
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
    pages: state.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPages: () => dispatch(getAllPages()),
    removePages: (code) => dispatch(deletePages(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
