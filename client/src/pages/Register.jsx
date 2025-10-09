import React, { useState } from 'react';
import styles from './Register.module.css';
import image from "/images/login.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast} from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
   
  const {storeTokenInLs , API}= useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting user:", user);

      const response = await axios.post(
        `${API}/api/auth/register`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    
      if (response.status === 200 || response.status === 201) {
        const dataToken = response.data;
        const token = dataToken.token;
        storeTokenInLs(token); 
        setUser({ username: "", email: "", phone: "", password: "" });
        
        toast.success(`✅ ${response.data.message}`);
       setTimeout(() => navigate("/"), 1000);
       
      } 
  } catch (error) {
  if (error.response) {
    console.error("❌ Backend Error:", error.response.data);

    const { message, extraDetails } = error.response.data;

    if (Array.isArray(extraDetails)) {
      extraDetails.forEach((errMsg) => {
        toast.error(`❌ ${errMsg}`);
      });
    } else {
      toast.error(`❌ ${message}`);
    }

  } else if (error.request) {
    toast.error("❌ No response from server");
  } else {
    toast.error("❌ Something went wrong");
  }
}





  };

  return (
    <section className={styles.sectionRegistration}>
      <main>
        <div className={`${styles.container} ${styles.gridTwoCols}`}>
          {/* Left Side Image */}
          <div className={styles.registrationImage}>
            <img
              src={image}
              alt="A person registering on a website"
              width="500"
              height="500"
            />
          </div>

          {/* Right Side Form */}
          <div className={styles.registrationForm}>
            <h1 className={styles.mainHeading}>Registration Form</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your name"
                  value={user.username}
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
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={user.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleInput}
                  required
                />
              </div>

              <button type="submit" className={styles.btnSubmit}>
                Register Now
              </button>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Register;
