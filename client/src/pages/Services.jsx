import React, { useEffect, useRef, useState } from 'react';
import doctorImage from "../images/ebfcf57b7bf1bd2e040999ead553792a.png";
import { useAuth } from '../store/Auth';
import styles from './Services.module.css';
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Services = () => {

  const { user, API, services, AuthorizationToken } = useAuth(); // ✅ Correct
  const navigate = useNavigate();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  const toastId = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleVerifyAdmin = async () => {
    try {
   const res = await axios.post(
  `${API}/api/admin/verify-admin`,
  { adminKey },
  { headers: { Authorization: AuthorizationToken } }
);

      if (res.data.success) {
        toast.success("Admin Verified ✅");
        setShowAdminModal(false);
        navigate("/admin");
      } else {
        toast.error("Invalid Admin Key ❌");
      }
    } catch (error) {
      toast.error("Verification failed!", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(services) && services.length > 0) {
      setIsLoading(false);
    }
  }, [services]);

  return (
    <>
    

      <section className={styles.sectionServices}>
        <div className={styles.container}>
          <h1 className={styles.mainHeading}>Our Doctors</h1>
          <p className={styles.subHeading}>We provide high-quality Doctors For The solutions to help your Health grow.</p>
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
                    <img src={doctorImage} alt={`${service} illustration`} />
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

  {user?.isAdmin && (
        <button className={styles.adminBtn} onClick={() => setShowAdminModal(true)}>
           Doctors Panel
        </button>
      )}

      {showAdminModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>🔐 Admin Verification</h3>
            <input 
              type="password"
              placeholder="Enter Admin Security Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button className={styles.verifyBtn} onClick={handleVerifyAdmin}>Verify</button>
              <button className={styles.cancelBtn} onClick={() => setShowAdminModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Services;
