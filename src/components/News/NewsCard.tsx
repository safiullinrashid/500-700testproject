import type { FC } from "react";
import type { NewsItem } from "@/types/news";
import styles from "./News.module.scss";
import { Link } from "react-router-dom";

interface Props {
  news: NewsItem;
}

const NewsCard: FC<Props> = ({ news }) => {
  return (
    <Link to={`/news/${news.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={news.image} alt={news.title} />
      </div>
      <div className={styles.textContent}>
        <h2 className={styles.title}>{news.title}</h2>
        <p className={styles.description}>{news.text}</p>
        <span className={styles.date}>{news.date}</span>
      </div>
    </Link>
  );
};

export default NewsCard;
