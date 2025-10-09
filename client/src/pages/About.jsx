import React from 'react';
import styles from './About.module.css';
import aboutImage from "/images/ecommerce-4.png";


const About = () => {
  return (
    <section className={styles.sectionAbout}>
      <div className={`${styles.container} ${styles.gridTwoCols}`}>

        {/* Left side image */}
        <div className={styles.aboutImage}>
          <img src={aboutImage} alt="About Project" width="500" height="500" />
        </div>

        {/* Right side text */}
        <div className={styles.aboutContent}>
          <p>This is my MERN Stack learning demo project.</p>
          <h1>
            I'm <strong>(Anas Ismail)</strong> building full-stack apps using MongoDB, Express, React, and Node.js.
          </h1>

          <p>
            I'm currently learning backend integration with Express and MongoDB.
            This project helps me understand how frontend and backend communicate.
            You can explore my work, visit other pages, and share your feedback.
          </p>

          <div className={styles.btnGroup}>
            <a href="/contact"><button className={styles.btn}>Connect Now</button></a>
            <a href="/services"><button className={`${styles.btn} ${styles.secondaryBtn}`}>Learn More</button></a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
