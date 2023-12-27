import React, { useContext, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect,useSelector } from "react-redux";
import { Edit, Plus, Trash2, TrendingUp, ThumbsUp, Box } from "react-feather";
import {
  Badge,
  Label,
  Input,
  UncontrolledTooltip,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Avatar from "@components/avatar";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { AbilityContext } from "@src/utility/context/Can";
import { getAllAlat, deleteAlat, getAlatLab } from "../../actions/alat";
import AlatStatistics from "../Card/CardAlat";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const MySwal = withReactContent(Swal)

const Alat = (props) => {
  const ability = useContext(AbilityContext);
  const { user: currentUser } = useSelector((state) => state.auth.user);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [globalFilter, setGlobalFilter] = useState(""); // State for global search
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = (code) => {
    return MySwal.fire({
      title: 'Anda yakin akan menghapus data tersebut?',
      text: "Data yang sudah di hapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false,
      
    }).then(function (result) {
     
      if (result.value) {
        props.removeAlat(code);

        if (currentUser && currentUser.role === "admin") {
          props.loadAlat();
        } else {
          props.loadAlatLab(currentUser.laboratorium);
        }

        MySwal.fire({
          
          icon: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
       // toast.success("Alat Berhasil Dihapus.");
      }
    })

  };

  const handlePerPage = (e) => {
    const selectedRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(selectedRowsPerPage);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (currentUser && currentUser.role == "admin") {
      props.loadAlat();
    } else {
      props.loadAlatLab(currentUser.laboratorium);
    }
  }, []);

  const columns = [
    {
      name: "Nama Alat",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Merk",
      selector: (row) => row.merk,
      sortable: true,
    },
    {
      name: "Jumlah",
      selector: (row) => row.jumlah,
    },
    {
      name: "Kondisi",

      cell: (row) => (
        <Badge
          pill
          color={
            row.kondisi === "0"
              ? "light-success"
              : row.kondisi === "1"
              ? "light-warning"
              : row.kondisi === "2"
              ? "light-danger"
              : "light-secondary" // Default color for unknown values
          }
          className="me-1"
        >
          {row.kondisi === "0"
            ? "Baik"
            : row.kondisi === "1"
            ? "Rusak Ringan"
            : row.kondisi === "2"
            ? "Rusak Berat"
            : "Unknown"}{" "}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Lokasi",
      selector: (row) => row.laboratorium.nama,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Link color="primary" to={"edit/" + row.id}>
            <Edit
              className="cursor-pointer"
              size={17}
              id={`send-tooltip-${row.id}`}
            />
            <UncontrolledTooltip
              placement="top"
              target={`send-tooltip-${row.id}`}
            >
              Ubah
            </UncontrolledTooltip>
          </Link>
          <Link
            onClick={() => {
              handleDelete(row.id);
            }}
            to={props.Alat}
            id={`pw-tooltip-${row.id}`}
          >
            <Trash2 size={17} className="mx-1" />
            <UncontrolledTooltip
              placement="top"
              target={`pw-tooltip-${row.id}`}
            >
              Hapus
            </UncontrolledTooltip>
          </Link>
        </div>
      ),
    },
  ];

  const filteredData = props.alat.alatlist.filter(
    (item) =>
      item.nama.toLowerCase().includes(globalFilter.toLowerCase()) ||
      item.merk.toLowerCase().includes(globalFilter.toLowerCase()) ||
      item.jumlah.toString().includes(globalFilter) ||
      item.laboratorium.nama.toLowerCase().includes(globalFilter.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlePagination = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // ** Custom Pagination
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
          <AlatStatistics alat={props.alat} />

          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">Alat</CardTitle>
              <div className="d-flex mt-md-0 mt-1">
                {ability.can("add", "alat") ? (
                  <Link className="ms-2" color="primary" to={"add"}>
                    <Plus size={15} />
                    <span className="align-middle ms-50">Tambah</span>
                  </Link>
                ) : null}
              </div>
            </CardHeader>
            <Row className="mx-0 mt-1 mb-50">
              <Col sm="6">
                <div className="d-flex align-items-center">
                  <Label for="sort-select">Tampilkan</Label>
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
                  placeholder="Search Nama Alat, Merk, Jumlah, Lokasi"
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
                paginationServer
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
    alat: state.alat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAlat: () => dispatch(getAllAlat()),
    loadAlatLab: (id) => dispatch(getAlatLab(id)),
    removeAlat: (code) => dispatch(deleteAlat(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alat);