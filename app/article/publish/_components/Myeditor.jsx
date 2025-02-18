"use client"
import React, { useEffect, useRef } from "react";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("articleImage", file);
          fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) =>{
              console.log(response);
              return response.json()
            })
            .then((result) => {
              console.log(`upload result : ${result.url}`);
              resolve({
                default: result.url
              });
            })
            .catch(reject);
        })
    );
  }
}

function MyCustomUploadAdapterPlugin( editor ) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
};
};

const Myeditor = ({ onChange, editorLoaded, name, value }) => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
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
          config={{
            extraPlugins: [ MyCustomUploadAdapterPlugin ],
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
};

export default Myeditor;
