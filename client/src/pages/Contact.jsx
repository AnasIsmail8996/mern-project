import React, { useState, useEffect } from 'react';
import image from "/images/developer-code.gif";
import styles from './Contact.module.css';
import { useAuth } from '../store/Auth';
import axios from 'axios';
import { toast} from "react-toastify";
const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { user ,API } = useAuth();


  

  useEffect(() => {
    if (user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const response= await axios.post(`${API}/api/form/contact`,contact, 
        {
        headers: { "Content-Type": "application/json" }   
      })

       if (response.status === 200 || response.status === 201){
          setContact({
    username: "",
    email: "",
    message: "",
  })
toast("✅ Message Sent SuccessFully!");
  

  
       }
    } catch (error) {
        console.error("❌ Error sending message:", error);
      
    }
  };

  return (
    <section className={styles.sectionContact}>
      <div className={styles.container}>
        <h1 className={styles.mainHeading}>Contact Us</h1>

        <div className={styles.contactRow}>
          {/* Left Side - Image */}
          <div className={styles.contactImage}>
            <img src={image} alt="Developer coding" />
          </div>

          {/* Right Side - Form */}
          <div className={styles.sectionForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={contact.message}
                  onChange={handleInput}
                ></textarea>
              </div>

              <button type="submit" className={styles.btn}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
