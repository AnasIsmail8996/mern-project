import React, { useEffect, useRef, useState } from 'react';
import developerimage from "/images/developerimage.gif";
import { useAuth } from '../store/Auth';
import styles from './Services.module.css';
import { toast } from "react-toastify";

const Services = () => {
  const { services = [] } = useAuth() || {};
  
  const toastId = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (toastId.current === null) {
      toastId.current = toast.loading("⏳ Loading data from server database...");
    }

    if (Array.isArray(services) && services.length > 0) {
      setIsLoading(false);
    }
  }, [services]);

  useEffect(() => {
    
    if (!isLoading && toastId.current) {
      toast.update(toastId.current, {
        render: "✅ Data loaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        closeOnClick: true,
      });
      toastId.current = null;
    }
  }, [isLoading]);

  return (
    <section className={styles.sectionServices}>
      <div className={styles.container}>
        <h1 className={styles.mainHeading}>Our Services</h1>
        <p className={styles.subHeading}>
          We provide high-quality digital solutions to help your business grow.
        </p>
      </div>

      <div className={`${styles.container} ${styles.grid}`}>
        {isLoading ? (
          <p className={styles.loading}>Loading services...</p>
        ) : (
          services.map((currData, index) => {
            const { price, service, description, provider } = currData;
            return (
              <div className={styles.card} key={index}>
                <div className={styles.cardImage}>
                  <img src={developerimage} alt={`${service} illustration`} />
                </div>
                <div className={styles.cardDetails}>
                  <h3 className={styles.serviceName}>{service}</h3>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.provider}>{provider}</span>
                    <span className={styles.price}>${price}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Services;
