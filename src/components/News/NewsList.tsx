import styles from './News.module.scss';
import type { NewsItem } from '@/types/news';
import NewsCard from './NewsCard';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/api/fakeApi';
import NewsSlider from "./NewsSlider";
import useMediaQuery from "@/utils/useMediaQuery"; // кастомный хук



const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>НОВОСТИ</h2>
      {isMobile ? (
        <NewsSlider news={news} />
      ) : (
        <div className={styles.grid}>
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsList;
