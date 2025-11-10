import React, { useState, useEffect } from "react";
import image from "../images/549e4ace584b8829c78f9baaeb3a045b.png";
import styles from "./Contact.module.css";
import { useAuth } from "../store/Auth";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
    doctor: "",
    appointmentDate: ""
  });

  const [doctors, setDoctors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isBooked, setIsBooked] = useState(false);

  const { user, API } = useAuth();

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API}/api/data/service`);

      if (res.status === 200 || res.status === 201) {
        const data = res.data.res;
        setDoctors(data || []);
        console.log("Doctors fetched:", data);
      }
    } catch (err) {
      console.error("❌ Error fetching doctors:", err);
    }
  };
  fetchDoctors();
}, [API]);


 
  useEffect(() => {
    if (user) {
      setContact((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
       if (!contact.doctor) {
    toast.error("Please select a doctor!");
    return;
  }

  setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/api/form/contact`, contact, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200 || response.status === 201) {
         toast.success("✅ Appointment request sent successfully!");
      setIsBooked(true); 
        setContact({
          username: user?.username || "",
          email: user?.email || "",
          message: "",
          doctor: "",
          appointmentDate: ""
        });
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      toast.error("Something went wrong!");
    }finally{

      setIsSubmitting(false)
    }
  };

  return (
    <section className={styles.sectionContact}>
      <div className={styles.container}>
        <h1 className={styles.mainHeading}>Book Your Appointment</h1>

        <div className={styles.contactRow}>
          {/* Left Side - Image */}
          <div className={styles.contactImage}>
            <img src={image} alt="Doctor consultation" />
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
                <label htmlFor="doctor">Select Doctor</label>
           <select name="doctor" value={contact.doctor} onChange={handleInput} required>
    <option value="">-- Choose a Doctor --</option>
  {doctors.map((doc, index) => (

    <option key={index} value={doc.provider}>
      {doc.provider} — {doc.service}
    </option>
  ))}
</select>

              </div>

              {/* 📅 Date Selector */}
              <div className={styles.formGroup}>
                <label htmlFor="appointmentDate">Select Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  id="appointmentDate"
                  value={contact.appointmentDate}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
               <label htmlFor="message">Describe Your Health Concern</label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={contact.message}
                  onChange={handleInput}
                  placeholder="Describe your health issue..."
                ></textarea>
              </div>

         <button 
  type="submit" 
  className={`${styles.btn} ${isBooked ? styles.booked : ""}`} 
  disabled={isSubmitting || isBooked}
>
  {isBooked 
    ? "Appointment Booked" 
    : isSubmitting 
      ? "Processing..." 
      : "Book Appointment"}
</button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
