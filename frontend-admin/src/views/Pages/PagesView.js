// ** React Imports
import { useState, useEffect, Fragment, React } from "react";

// ** Third Party Components
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { Plus, Minus, FileText, X, DownloadCloud } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createPages } from "../../actions/pages";



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
    ListGroup,
  ListGroupItem,
} from "reactstrap";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import '@styles/react/libs/file-uploader/file-uploader.scss'


const LaboratoriumCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, titlechange] = useState("");
  const [slug, slugchange] = useState("");



  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [content, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

//


  const handlesubmit = (e) => {
    e.preventDefault();

    const pagesobj = {
      title,
      slug,
      content,

    };
    dispatch(createPages(pagesobj));
    navigate("/pages");
  };

  return (
    <Fragment>
       <Form onSubmit={handlesubmit}>

          <Card>
            <CardHeader>
              <CardTitle tag="h4">Tambah Halaman</CardTitle>
            </CardHeader>

            <CardBody>
             
                <Row>
                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="judulHalaman">
                      Judul
                    </Label>
                    <Input
                      type="text"
                      name="nama"
                      id="judulHalaman"
                      placeholder="Judul Halaman"
                      value={title}
                      onChange={(e) => titlechange(e.target.value)}
                    />
                  </Col>

                  <Col md="6" sm="12" className="mb-1">
                    <Label className="form-label" for="slug">
                      Slug
                    </Label>
                    <Input
                      type="text"
                      name="nama"
                      id="slug"
                      placeholder="Slug"
                      value={slug}
                      onChange={(e) => slugchange(e.target.value)}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="keteranganLokasi">
                      Konten
                    </Label>

                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
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
            </CardBody>
           </Card>
          </Form>

    </Fragment>
  );
};
export default LaboratoriumCreate;
