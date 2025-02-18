"use client";
import styles from "@/styles/Articles.module.sass";
import Link from "next/link";
import Myeditor from "./_components/Myeditor";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublishPage(){
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const saveToDb = async () => {
    try {
      const response = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          article: data,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("資料寫入成功");
        router.push('/article');
      } else {
        alert(`寫入失敗: ${result.message}`);
      }
    } catch (error) {
      console.error("寫入文章失敗", error);
      alert("寫入發生錯誤，稍後再試。");
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <main className="container">
      <div className="d-flex align-items-center">
        <div className={styles.h1}>發表文章 </div>
        <div>
          <Link href="/article" className="btn btn-primary btn-sm ms-2">回文章列表</Link>
        </div>
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text">文章標題</span>
        <input className="form-control" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text">作者</span>
        <input className="form-control" type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <Myeditor
        name="article"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />
      <div className="input-group mt-2">
        <button className="btn btn-primary ms-auto" onClick={saveToDb}>送出</button>
      </div>
    </main>
  );
}