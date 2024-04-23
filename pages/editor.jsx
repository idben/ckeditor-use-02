import Link from "next/link";
import Myeditor from "@/components/Myeditor";
import { useState, useEffect } from "react";
import styles from "@/styles/Editor.module.sass";

const Editor = ()=>{
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);


  return(
    <div className="container py-5">
      <h1>建立文章</h1>
      <Myeditor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        className={styles.myEditor}
        editorLoaded={editorLoaded}
      />
      <h4 className="mt-4">目前的 HTML code</h4>
      <div className="tip">會顯示 HTML Code 是要知道要如何抓取存入資料庫中的內容</div>
      <div>
      {JSON.stringify(data)}
      </div>
      <br/>
      <Link href="/">Back</Link>
    </div>
  );
};

export default Editor;