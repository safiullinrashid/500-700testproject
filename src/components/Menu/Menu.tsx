// src/components/Menu/Menu.tsx
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';

interface MenuProps {
  isMobile: boolean;
  onClose?: () => void;
}

const Menu = ({ isMobile, onClose }: MenuProps) => {
  const handleClick = () => {
    if (isMobile && onClose) onClose();
  };

  return (
    <ul className={styles.menu}>
      <li className={styles.item}>
        <span>Раздел 1</span>
        <ul className={styles.submenu}>
          <li><Link to="/" onClick={handleClick}>Подпункт 1</Link></li>
          <li><Link to="/" onClick={handleClick}>Подпункт 2</Link></li>
        </ul>
      </li>
      <li className={styles.item}>
        <Link to="/" onClick={handleClick}>О компании</Link>
      </li>
      <li className={styles.item}>
        <Link to="/" onClick={handleClick}>Контакты</Link>
      </li>
    </ul>
  );
};

export default Menu;
