import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    { to: '/about/500', label: 'О 500на700', delay: '1s' },
    { to: '/about/docs', label: 'Документы', delay: '1.2s' },
    { to: '/about/sustain', label: 'Устойчивое развитие', delay: '1.4s' },
  ];
  const projectItems = [
    { to: '/about/team', label: 'Команда', delay: '1.6s' },
    { to: '/about/strategy', label: 'Стратегия', delay: '1.8s' },
  ];

  // v6/v7 совместимость: если useNavigate нет, замени на window.location.href = '/'
  const navigate = useNavigate ? useNavigate() : null;

  // ----- Модалка "Связаться с нами" -----
  const ContactModal = () => {
    const [values, setValues] = useState({
      name: '',
      phone: '',
      email: '',
      agree: false,
    });
    const [errors, setErrors] = useState({
      name: '',
      phone: '',
      email: '',
      agree: '',
    });

    function validate() {
      let valid = true;
      const errs = { name: '', phone: '', email: '', agree: '' };
      if (!values.name.trim()) {
        errs.name = 'Введите имя';
        valid = false;
      }
      if (!/^\+?\d{7,}$/.test(values.phone)) {
        errs.phone = 'Введите корректный телефон';
        valid = false;
      }
      if (!values.email.trim() || !values.email.includes('@')) {
        errs.email = 'Введите корректный email';
        valid = false;
      }
      if (!values.agree) {
        errs.agree = 'Обязательное поле';
        valid = false;
      }
      setErrors(errs);
      return valid;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value, type, checked } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (validate()) {
        setContactOpen(false);
        if (navigate) {
          navigate('/');
        } else {
          window.location.href = '/';
        }
      }
    }

    return (
      <div className={styles.contactModalOverlay}>
        <div className={styles.contactModal}>
          <button className={styles.closeContactModal} onClick={() => setContactOpen(false)}>
            <img src={closeIcon} alt="Закрыть" />
          </button>
          <h2 className={styles.modalTitle}>СВЯЗАТЬСЯ С НАМИ</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={values.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div style={{ color: 'red', fontSize: 12 }}>{errors.name}</div>}
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={values.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div style={{ color: 'red', fontSize: 12 }}>{errors.phone}</div>}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div style={{ color: 'red', fontSize: 12 }}>{errors.email}</div>}
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="agree"
                checked={values.agree}
                onChange={handleChange}
              />
              <span>Я СОГЛАСЕН (-А) НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</span>
            </label>
            {errors.agree && <div style={{ color: 'red', fontSize: 12 }}>{errors.agree}</div>}
            <button type="submit" className={styles.submit}>Отправить</button>
          </form>
        </div>
      </div>
    );
  };

  // Сброс подменю при закрытии моб. меню
  useEffect(() => {
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

      {/* ---- МОБИЛЬНОЕ МЕНЮ ---- */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <ul style={{ gap: '1rem', padding: 0}}>
            <li style={{ padding: 0 }}>
              <button
                className={styles.mobileToggle}
                onClick={() => setMobileAboutOpen((v) => !v)}
                aria-expanded={mobileAboutOpen}
                aria-controls="about-mobile-submenu"
                style={{ margin: 0, padding: 0 }}
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
                style={{ margin: 0, padding: 0 }}
              >
                {aboutItems.map((it) => (
                  <li key={it.to} style={{ margin: 0, padding: 0 }}>
                    <Link to={it.to} onClick={() => setMobileOpen(false)}>
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li style={{ margin: 0, padding: 0 }}>
              <button
                className={styles.mobileToggle}
                onClick={() => setMobileProjectsOpen((v) => !v)}
                aria-expanded={mobileProjectsOpen}
                aria-controls="projects-mobile-submenu"
                style={{ margin: 0, padding: 0 }}
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
                style={{ margin: 0, padding: 0 }}
              >
                {projectItems.map((it) => (
                  <li key={it.to} style={{ margin: 0, padding: 0 }}>
                    <Link to={it.to} onClick={() => setMobileOpen(false)}>
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li style={{ margin: 0, padding: 0 }}>
              <Link to="/news" onClick={() => setMobileOpen(false)}>Новости</Link>
            </li>
            <li style={{ margin: 0, padding: 0 }}>
              <Link to="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
            </li>
            <li style={{ margin: 0, padding: 0 }}>
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

      {/* ---- МОДАЛЬНОЕ ОКНО ---- */}
      {contactOpen && <ContactModal />}
    </header>
  );
};

export default Header;
