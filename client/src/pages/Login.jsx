import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import { useAuth } from "../store/Auth";
import { toast} from "react-toastify"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { API } = useAuth();

  const navigate = useNavigate();

  const {storeTokenInLs}=useAuth();
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submitting login:", user);

      const response = await axios.post(
        `${API}/api/auth/login`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Server Response:", response.data);

      if (response.status === 200 || response.status === 201) {
              const dataToken = response.data;
              const token = dataToken.token;
              storeTokenInLs(token);
        setUser({ email: "", password: "" });


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
    <section className={styles.loginPage}>
      <div className={`${styles.container} ${styles.gridTwoCols}`}>
        {/* Left Image */}
        <div className={styles.loginImage}>
          <img
            src="/images/login.jpg"
            alt="Login illustration"
            width="500"
            height="500"
          />
        </div>

        {/* Right Form */}
        <div className={styles.loginForm}>
          <h2 className={styles.heading}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInput}
                required
              />
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
