import Head from "next/head";
import styles from "@/styles/Articles.module.sass";
import Link from "next/link";
import { useEffect, useState } from 'react';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      if (!response.ok) {
        console.error("Failed to fetch articles:", response.statusText);
        return;
      }
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Head>
        <title>文章列表</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
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
      </main>
    </>

  );
};
export default ArticlesList;
