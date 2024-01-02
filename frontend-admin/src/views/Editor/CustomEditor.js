// ** React Imports
import { useState, useEffect, Fragment, React } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components


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

const CustomEditor = ({ initialContent, onEditorStateChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialContent) {
      const contentBlock = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState);
    }
  }, [initialContent]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    onEditorStateChange(html);
  }, [editorState, onEditorStateChange]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
    />
  );
};

export default CustomEditor;
