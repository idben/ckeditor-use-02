import React, { useEffect, useRef } from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Myeditor = ({ onChange, editorLoaded, name, value }) => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}

export default Myeditor;