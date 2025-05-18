import { useRef } from "react";
import type { NewsItem } from "@/types/news";
import NewsCard from "./NewsCard";
import styles from "./News.module.scss";

// ✅ Иконки как изображения
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";

interface Props {
  news: NewsItem[];
}

const NewsSlider = ({ news }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth"
    });
  };

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.slider} ref={sliderRef}>
        {news.map((item) => (
          <div className={styles.cardWrapper} key={item.id}>
            <NewsCard news={item} />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={() => scroll("left")} className={styles.arrow}>
          <img src={arrowLeft} alt="Назад" />
        </button>
        <button onClick={() => scroll("right")} className={styles.arrow}>
          <img src={arrowRight} alt="Вперёд" />
        </button>
      </div>
    </div>
  );
};

export default NewsSlider;
