// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import Swal from "sweetalert2";

// ** Utils
import { selectThemeColors } from "@utils";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getAllLaboratorium } from "../../actions/laboratorium";
import {
  updateUser,
  getUserID,
} from "../../actions/user";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Form,
  Button,
} from "reactstrap";

import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML, convertFromHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

const statusOptions = [
  { id: "1", value: 1, label: "Aktif" },
  { id: "2", value: 0, label: "Tidak Aktif" },
];


const roleOptions = [
  { id: "1", value: "admin", label: " Admin" },
  { id: "2", value: "koordinator", label: "Koordinator" },
  { id: "3", value: "manajer", label: "Manajer" },
  { id: "4", value: "public", label: "Public" },
];

const LaboratoriumUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, idchange] = useState(0);
  const { code } = useParams();
  const [idlokasi, setIdlokasi] = useState("");
  const [nama, namachange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [role, rolechange] = useState("");
  const [isVerified, isverifiedchange] = useState("");
  const [inputlaboratorium, setvaluelab] = useState("");
  const [lab_id, setIdlab] = useState("");
  const [inputValue, setValue] = useState("");
  const [inputRoleValue, setRoleValue] = useState("");

  const handleInputLab = (value) => {
    setvaluelab(value);
  };

  const handleLabChange = (value) => {
    setIdlab(value.id);
  };



  useEffect(() => {
    dispatch(getAllLaboratorium());
  }, []);

  const listLaboratorium = useSelector(
    (state) => state.laboratorium.laboratoriumlist
  );

  useEffect(() => {
    dispatch(getUserID(code));
  }, []);

  const userobj = useSelector((state) => state.user.userobj);

  useEffect(() => {
    if (userobj) {
      idchange(userobj.id);
      namechange(userobj.name);
      emailchange(userobj.email);
  
      if (userobj.roles) {
        isverifiedchange(userobj.roles.isVerified);
        rolechange(userobj.roles.role);
        if (userobj.roles.laboratorium) {
          setIdlab(userobj.roles.laboratorium.id);
        }
      }
    }
  }, [userobj]);


  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (e) => {
    isverifiedchange(e.value);
  };


  const handleRoleInputChange = (value) => {
    setRoleValue(value);
  };

  const handleRoleChange = (e) => {
    rolechange(e.value);
  };


  const handlesubmit = async (e) => {
    e.preventDefault();
    const userobj = {
      role,
      isVerified,
      lab_id,
    };
  
    // Assuming your `dispatch` function returns a promise
    try {
      await dispatch(updateUser(id, userobj));
      // Show a success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data Berhasil Diubah.",
      });
      navigate(-1);
    } catch (error) {
      // Handle errors if the update fails
      console.error("Error:", error);
      // Show an error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal Mengubah Data.",
      });
    }
  };




  return (
    <Fragment>
      <Row className="invoice-list-wrapper">
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Ubah Pengguna</CardTitle>
            </CardHeader>

            <CardBody>
              <Form onSubmit={handlesubmit}>
                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="namaLaboratorium">
                      Nama
                    </Label>
                    <Input
                      type="text"
                      name="nama"
                      id="namaLaboratorium"
                      placeholder="Nama "
                      value={name}
                      onChange={(e) => namechange(e.target.value)}
                      disabled
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="namaLaboratorium">
                      E-Mail
                    </Label>
                    <Input
                      type="text"
                      name="nama"
                      id="namaLaboratorium"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      disabled
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="CompanyMulti">
                      Role
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="status"
                      classNamePrefix="Status"
                      isClearable={false}
                      options={roleOptions} // Since the list is provided by the store, provide it directly
                      value={roleOptions.find((obj) => obj.value === role)}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.id}
                      onInputChange={handleRoleInputChange}
                      onChange={handleRoleChange}
                    />
                  </Col>
                  <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  Laboratorium
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="status"
                  classNamePrefix="Status"
                  isClearable={false}
                  cacheOptions
                  defaultOptions
                  options={listLaboratorium}
                  value={listLaboratorium.find((obj) => obj.id === lab_id)}
                  getOptionLabel={({ nama }) => nama}
                  getOptionValue={({ id }) => id}
                  onInputChange={handleInputLab}
                  onChange={handleLabChange}
                />
              </Col>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="CompanyMulti">
                      Status
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="status"
                      classNamePrefix="Status"
                      isClearable={false}
                      options={statusOptions} // Since the list is provided by the store, provide it directly
                      value={statusOptions.find((obj) => obj.value === isVerified)}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.id}
                      onInputChange={handleInputChange}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col sm="12">
                    <div className="d-flex">
                      <Button className="me-1" color="primary" type="submit">
                        Simpan
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        type="reset"
                        onClick={() => navigate(-1)}
                      >
                        Kembali
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default LaboratoriumUpdate;
