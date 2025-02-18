"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/Articles.module.sass"

export default function ArticleSinglePage() {
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`http://localhost:3000/api/article/${id}`);
      const data = await response.json();
      setArticle(data);
    };
    fetchArticles();
  }, [id]);

  return (
    <main className="container">
    <div className={`py-5 ${styles.article}`}>
      <h1>{article.title}</h1>
      <div className="text-muted">作者：{article.author}</div>
      <div className="text-muted mb-2">發佈日期：{new Date(article.createTime).toLocaleDateString()}</div>
      <div dangerouslySetInnerHTML={{ __html: article.article }} />
      <Link className="btn btn-primary" href="/article">
        返回文章列表
      </Link>
    </div>
  </main>
  );
}