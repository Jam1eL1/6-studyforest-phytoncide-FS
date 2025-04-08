import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo1 from "/images/logo/logo_icon.svg";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  // TODO: isOpen 의미가 적합하지 않음
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/study/create") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.header__wrapper}>
          <Link to="/" className={styles.logo}>
            <img src={logo1} alt="Study Forest Logo" />
          </Link>

          {isOpen && (
            <Link to="/studies/create" className={styles.create__study__button}>
              <span className={styles.create__study__button__text__bg}>
                스터디 만들기
              </span>
              <span className={styles.create__study__button__text}>
                스터디 만들기
              </span>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
