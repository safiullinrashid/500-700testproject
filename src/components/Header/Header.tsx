import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './Header.module.scss';

import logo from '../../assets/logo-header.svg';
import arrowIcon from '../../assets/arrow-external.svg';
import hamburgerIcon from '../../assets/hamburger.svg';
import closeIcon from '../../assets/close.svg';

export const Header: React.FC = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [hoverProj, setHoverProj] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const aboutItems = [
    { to: '/about/500',    label: 'О 500на700',    delay: '1s'   },
    { to: '/about/docs',   label: 'Документы',     delay: '1.2s' },
    { to: '/about/sustain',label: 'Устойчивое развитие', delay: '1.4s' },
  ];
  const projectItems = [
    { to: '/about/team',    label: 'Команда',    delay: '1.6s' },
    { to: '/about/strategy',label: 'Стратегия',  delay: '1.8s' },
  ];

  // Модалка "Связаться с нами"
  const ContactModal = () => (
    <div className={styles.contactModalOverlay}>
      <div className={styles.contactModal}>
        <button className={styles.closeContactModal} onClick={() => setContactOpen(false)}>
          <img src={closeIcon} alt="Закрыть" />
        </button>
        <h2 className={styles.modalTitle}>СВЯЗАТЬСЯ С НАМИ</h2>
        <form className={styles.form} onSubmit={e => { e.preventDefault(); }}>
          <input type="text" placeholder="Имя" />
          <input type="tel" placeholder="Телефон" />
          <input type="email" placeholder="E-mail" />
          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>Я СОГЛАСЕН (-А) НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</span>
          </label>
          {/* Кнопка как в макете, черный текст, прижата влево */}
          <button type="submit" className={styles.submit}>Отправить</button>
        </form>
      </div>
    </div>
  );

  // Логика для сброса всех подменю при закрытии моб. меню
  React.useEffect(() => {
    if (!mobileOpen) {
      setMobileAboutOpen(false);
      setMobileProjectsOpen(false);
    }
  }, [mobileOpen]);

  return (
    <header
      className={`${styles.header} ${openAbout ? styles.opened : ''}`}
      onMouseLeave={() => {
        setOpenAbout(false);
        setHoverProj(false);
      }}
    >
      <div className={styles.bg} />

      <div className={styles.content}>
        {/* Логотип всегда */}
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="500na700" className={styles.logo} />
        </Link>

        {/* Десктопная навигация */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li
              className={styles.navItem}
              onMouseEnter={() => setOpenAbout(true)}
              onMouseLeave={() => setOpenAbout(false)}
            >
              <Link to="/about" className={styles.navLink}>
                О нас
                <img
                  src={arrowIcon}
                  alt=""
                  className={`${styles.arrow} ${openAbout ? styles.rotated : ''}`}
                />
              </Link>
              <div className={styles.dropdown}>
                <div className={styles.column}>
                  {aboutItems.map((it) => (
                    <Link
                      key={it.to}
                      to={it.to}
                      className={styles.dropLink}
                      style={{ '--delay': it.delay } as React.CSSProperties}
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
                <div className={styles.column}>
                  {projectItems.map((it) => (
                    <Link
                      key={it.to}
                      to={it.to}
                      className={styles.dropLink}
                      style={{ '--delay': it.delay } as React.CSSProperties}
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li
              className={styles.navItem}
              onMouseEnter={() => setHoverProj(true)}
              onMouseLeave={() => setHoverProj(false)}
            >
              <Link to="/projects" className={styles.navLink}>
                Проекты
                <img
                  src={arrowIcon}
                  alt=""
                  className={`${styles.arrow} ${hoverProj ? styles.rotated : ''}`}
                />
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/news" className={styles.navLink}>Новости</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/faq" className={styles.navLink}>FAQ</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contacts" className={styles.navLink}>Контакты</Link>
            </li>
          </ul>
        </nav>

        {/* Десктопная кнопка CTA */}
        <div className={styles.cta}>
          <Button variant="gradient-outline" onClick={() => setContactOpen(true)}>
            Связаться с нами
          </Button>
        </div>

        {/* Бургер (мобильная навигация) */}
        <button
          className={styles.burger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <img src={mobileOpen ? closeIcon : hamburgerIcon} alt="Меню" />
        </button>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            <li>
              <button
                className={styles.mobileToggle}
                onClick={() => setMobileAboutOpen((v) => !v)}
                aria-expanded={mobileAboutOpen}
                aria-controls="about-mobile-submenu"
              >
                О нас
                <img
                  src={arrowIcon}
                  alt=""
                  className={`${styles.arrow} ${mobileAboutOpen ? styles.rotated : ''}`}
                />
              </button>
              <ul
                id="about-mobile-submenu"
                className={`${styles.submenu} ${mobileAboutOpen ? styles.submenuOpen : ''}`}
              >
                {aboutItems.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} onClick={() => setMobileOpen(false)}>
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button
                className={styles.mobileToggle}
                onClick={() => setMobileProjectsOpen((v) => !v)}
                aria-expanded={mobileProjectsOpen}
                aria-controls="projects-mobile-submenu"
              >
                Проекты
                <img
                  src={arrowIcon}
                  alt=""
                  className={`${styles.arrow} ${mobileProjectsOpen ? styles.rotated : ''}`}
                />
              </button>
              <ul
                id="projects-mobile-submenu"
                className={`${styles.submenu} ${mobileProjectsOpen ? styles.submenuOpen : ''}`}
              >
                {projectItems.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} onClick={() => setMobileOpen(false)}>
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/news" onClick={() => setMobileOpen(false)}>Новости</Link>
            </li>
            <li>
              <Link to="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
            </li>
            <li>
              <Link to="/contacts" onClick={() => setMobileOpen(false)}>Контакты</Link>
            </li>
          </ul>
          <div className={styles.mobileCta}>
            <Button
              variant="gradient-outline"
              onClick={() => {
                setContactOpen(true);
                setMobileOpen(false);
              }}
              style={{ color: '#191919', justifyContent: 'flex-start' }} // для чёрного текста
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      )}

      {/* Модальное окно "Связаться с нами" */}
      {contactOpen && <ContactModal />}
    </header>
  );
};

export default Header;
