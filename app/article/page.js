"use client"
import styles from "@/styles/Articles.module.sass";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:3000/api/article');
      const data = await response.json();
      
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return(
    <div className="container py-3">
      <div className="d-flex align-items-center">
        <div className={styles.h1}>文章列表</div>
        <div>
          <Link href="/article/publish" className="btn btn-primary btn-sm ms-2">發表文章</Link>
        </div>
        <div>
          <Link href="/" className="btn btn-primary btn-sm ms-2">回首頁</Link>
        </div>
      </div>
      <div>
        {articles.map(article => (
          <div key={article.id} className="card my-2">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">作者: {article.author}</h6>
              <p className="card-text">{new Date(article.createTime).toLocaleDateString()}</p>
              <div className="d-flex justify-content-end">
                <Link className="btn btn-primary" href={`/article/${article.id}`}> 
                  閱讀更多
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}