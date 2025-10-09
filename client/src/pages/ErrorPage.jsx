import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ErrorPage.module.css"; 

const ErrorPage = () => {
  return (
    <section className={styles.errorPage}>
      <div className={styles.content}>
        <h2 className={styles.header}>404</h2>
        <h4 className={styles.subHeader}>Sorry, Page Not Found!</h4>
        <p className={styles.text}>
          The page you’re looking for doesn’t exist. Please go back or contact us.
        </p>

        <div className={styles.btns}>
          <NavLink to="/" className={styles.linkBtn}>
            Go Back
          </NavLink>
          <NavLink to="/contact" className={styles.linkBtnSecondary}>
            Contact Page
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
