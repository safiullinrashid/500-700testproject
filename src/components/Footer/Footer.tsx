import React from 'react';
import styles from './Footer.module.scss';
import footerImage from '@/assets/logo-footer.svg';

/**
 * Footer компонент с логотипом и слоганом
 */
const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img src={footerImage} alt="Logo 500NA700" className={styles.logo} />
      </div>
      <div className={styles.taglineWrapper}>
        <p className={styles.tagline}>{`КРЕАТИВНОЕ
АГЕНТСТВО
500NA700`}</p>
      </div>
    </div>
  </footer>
);

export default Footer;