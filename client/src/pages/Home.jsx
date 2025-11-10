import React from "react";
import styles from "./Home.module.css";
import image from "../images/92d4b2ad855e6c0e03902ecd695c7739.png";
import image1 from "../images/0e6818c3ec650461cf809ad87b707b94.png";

import {useAuth} from "../store/Auth.jsx"
const Home = () => {
  const { user }=useAuth();
   
   
  return (
    <>
      <main>
        {/* Section 1 */}
        <section className={styles.sectionHero}>
          <div className={`${styles.container} ${styles.gridTwoCols}`}>
            <div className={styles.heroContent}>
              <h1>This is  Brand's Hospital</h1>
            <h1>
        {user
          ? <>Welcome <span style={{ color: "#00bcd4" }}>{user.username}</span> To Brand's Hospital</>
          : <>Brand's Hospital</>}
      </h1>
                  
         <p>
  Ready to meet our amazing doctors? We’d love to help you — feel free to visit
  and share your health concerns with our caring medical team.
</p>

              <div className={styles.btnGroup}>
                <a href="/contact">
                  <button className={styles.btn}>Book Appointment</button>
                </a>
                <a href="/services">
                  <button className={`${styles.btn} ${styles.secondaryBtn}`}>
                  Meet Our Doctors
                  </button>
                </a>
              </div>
            </div>

            <div className={styles.heroImage}>
              <img src={image} alt="Doctor Image" width="500" height="500" />
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.sectionHero}>
          <div className={`${styles.container} ${styles.gridTwoColsReverse}`}>
            <div className={styles.heroImage}>
              <img src={image1} alt="Demo" width="500" height="500" />
            </div>

              <div className={styles.heroContent}>
                <h1>This is  Brand's Hospital</h1>
              <h1>🏥 “ Schedule your appointment <br /> with our professional doctors anytime. ”</h1>
                <p>
                  Are you ready to see this project? It’ll be awesome if you visit and
                  share your ideas in a message.
                </p>

                <div className={styles.btnGroup}>
                  <a href="/contact">
                    <button className={styles.btn}> Book Appointment </button>
                  </a>
                  <a href="/services">
                    <button className={`${styles.btn} ${styles.secondaryBtn}`}>
                     Meet Our Doctors
                    </button>
                  </a>
                </div>
              </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

