import React from 'react';
import styles from './About.module.css';
import aboutImage from "../images/dcdabd2322d442ee50aff70e49c2f8d3.png";

const About = () => {
  return (
    <section className={styles.sectionAbout}>
      <div className={`${styles.container} ${styles.gridTwoCols}`}>

        {/* Left side image */}
        <div className={styles.aboutImage}>
          <img src={aboutImage} alt="About Project" width="300" height="300" />
        </div>

        {/* Right side text */}
        <div className={styles.aboutContent}>
          <p>Welcome to Brand's Hospital — your trusted healthcare partner.</p>
          <h1>
            If you're not feeling well or need to consult a doctor, 
            you can easily book an appointment online and get the care you deserve.
          </h1>

          <p>
            Our professional doctors are here to listen, guide, and help you feel better.
            Whether it’s a routine check-up or a specific concern, we’re just one click away.
            Take care of your health — start your recovery journey with us today.
          </p>

          <div className={styles.btnGroup}>
            <a href="/contact"><button className={styles.btn}>Book Appointment</button></a>
            <a href="/services"><button className={`${styles.btn} ${styles.secondaryBtn}`}>Meet Our Doctors</button></a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
