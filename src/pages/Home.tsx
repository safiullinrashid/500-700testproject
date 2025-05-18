import React from 'react';
import Header from '../components/Header/Header';
import NewsList from '../components/News/NewsList';
import styles from './Home.module.scss';
import Accordion from '@/components/Accordion/Accordion';
import Footer from '@/components/Footer/Footer';

const Home: React.FC = () => (
  <div className={styles.home}>
    <Header />
    <NewsList/>
    <Accordion/>
    <Footer/>
    
    {/* TODO: здесь появятся остальные секции: Новости, FAQ, ContactForm и т.д. */}
  </div>
);

export default Home;
