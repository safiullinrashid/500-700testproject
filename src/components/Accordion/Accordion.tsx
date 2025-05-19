import { useState } from "react";
import styles from "./Accordion.module.scss";
import arrowIcon from "@/assets/arrow-external.svg";

const faqList = [
  "КАКИЕ УСЛУГИ ПРЕДОСТАВЛЯЕТ ВАША СТУДИЯ?",
  "КАК ВЫ ОБЕСПЕЧИВАЕТЕ КАЧЕСТВО И УНИКАЛЬНОСТЬ ДИЗАЙНА?",
  "ПРЕДОСТАВЛЯЕТЕ ЛИ ВЫ УСЛУГИ ПО СОЗДАНИЮ КОНТЕНТА ДЛЯ САЙТОВ И ПРИЛОЖЕНИЙ?"
];

const answer = `Мы придерживаемся высоких стандартов качества и стремимся создавать уникальный дизайн, отвечающий потребностям и ожиданиям наших клиентов. Наши дизайнеры постоянно совершенствуют свои навыки и следят за новыми трендами в дизайне.`;

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className={styles.accordion}>
      <div className={styles.header}>FAQ</div>
      <ul className={styles.list}>
        {faqList.map((question, index) => (
          <li key={index} className={styles.item}>
            <button
              onClick={() => toggle(index)}
              className={styles.trigger}
              aria-expanded={openIndex === index}
            >
              <span className={styles.question}>{question}</span>
              <img
                src={arrowIcon}
                alt="arrow"
                className={`${styles.arrow} ${openIndex === index ? styles.rotated : ""}`}
              />
            </button>
            <div
              className={`${styles.answerWrapper} ${openIndex === index ? styles.expanded : ""}`}
            >
              <p className={styles.answer}>{answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Accordion;
