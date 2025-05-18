import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./NewsDetail.module.scss";

interface NewsItem {
  id: string;
  title: string;
  text: string;
  fullText: string;
  image: string;
  date: string;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data: NewsItem[]) => {
        const found = data.find((item) => item.id === id);
        setNews(found || null);
      });
  }, [id]);

  if (!news) return <div className={styles.detail}>Новость не найдена.</div>;

  return (
    <section className={styles.detail}>
      <div className={styles.imageWrapper}>
        <img src={news.image} alt={news.title} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{news.title}</h1>
        <p className={styles.date}>{news.date}</p>
        <p className={styles.text}>{news.text}</p>
        <p className={styles.fullText}>{news.fullText}</p>
      </div>
    </section>
  );
};

export default NewsDetail;
