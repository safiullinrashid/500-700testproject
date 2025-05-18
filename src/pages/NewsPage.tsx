import React from 'react';
import styles from "./NewsPage.module.scss";
import Footer from '@/components/Footer/Footer';
import Header from '../components/Header/Header';
import NewsDetail from '@/components/NewsDetail/NewsDetail';



const NewsPage: React.FC = () => (
  <div className={styles.home}>
    <Header />
    <NewsDetail/>

  
    <Footer/>
    
  </div>
);

export default NewsPage;
