import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Articles.module.sass';

const Article = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const updateImageTags = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');
    
    images.forEach(img => {
      img.classList.add('img-fluid');
    });
  
    return doc.body.innerHTML;
  };
  

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/article/?id=${id}`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        const data = await response.json();
        const updatedArticle = {
            ...data,
            article: updateImageTags(data.article) // Update the <img> tags before setting the state
          };
        setArticle(updatedArticle);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Dependency on id ensures the effect runs when id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.article} />
      </Head>
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
    </>
  );
};

export default Article;
