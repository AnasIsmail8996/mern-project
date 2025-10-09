import React from "react";
import styles from "./Home.module.css";
import image from "/images/ecommerce-2.png";
import image1 from "/images/e-commerce.gif";
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
              <p>This is my Mern stack Project</p>
            <h1>
        {user
          ? <>Welcome <span style={{ color: "#00bcd4" }}>{user.username}</span> To my MERN Stack Project</>
          : <>Welcome To my MERN Stack Project</>}
      </h1>
                  
              <p>
                Are you ready to see this project? It’ll be awesome if you visit and
                share your ideas in a message.
              </p>

              <div className={styles.btnGroup}>
                <a href="/contact">
                  <button className={styles.btn}>Connect Now</button>
                </a>
                <a href="/services">
                  <button className={`${styles.btn} ${styles.secondaryBtn}`}>
                    Learn Now
                  </button>
                </a>
              </div>
            </div>

            <div className={styles.heroImage}>
              <img src={image} alt="Ecommerce" width="500" height="500" />
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
              <p>This is For my Learning Demo Project</p>
              <h1>You can also send a message on the contact form</h1>

              <p>
                Are you ready to see this project? It’ll be awesome if you visit and
                share your ideas in a message.
              </p>

              <div className={styles.btnGroup}>
                <a href="/contact">
                  <button className={styles.btn}>Connect Now</button>
                </a>
                <a href="/services">
                  <button className={`${styles.btn} ${styles.secondaryBtn}`}>
                    Learn Now
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

