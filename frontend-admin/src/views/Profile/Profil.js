// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

import { useNavigate, useParams } from "react-router-dom";

import {
  updateProfile,
  getProfileID,
  getAllProfile,
} from "../../actions/profile";

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


const profileUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [profile, setConverted] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();

 
  };


  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConverted(html);
  }, [editorState]); 


  return (
    <Fragment>
      <Row className="invoice-list-wrapper">
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Profile</CardTitle>
            </CardHeader>

            <CardBody>
              <Form onSubmit={handlesubmit}>
                
                <Row>
                  <Col sm="12" className="mb-1">
  

                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      toolbar={{
                        image: { uploadCallback: handlesubmit, alt:{present : true, manndatory:true}}
                      }}
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
export default profileUpdate;
