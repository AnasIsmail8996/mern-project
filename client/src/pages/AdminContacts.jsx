import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserAlt, FaEnvelope, FaCommentDots, FaTrashAlt } from "react-icons/fa";
import styles from "./AdminContacts.module.css";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { AuthorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/contacts`, {
        headers: { Authorization: AuthorizationToken },
      });

      const resData = response.data;
      console.log("Fetched contacts:", resData);

      if (response.status === 200 || response.status === 201) {
  
        setContactData(Array.isArray(resData) ? resData : resData.data || []);
        toast.success("User data fetched successfully!");
      } else {
        toast.warn("Failed to fetch user data!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data!");
    }
  };

  const deleteContactByID = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/api/admin/contacts/delete/${id}`,
        { headers: { Authorization: AuthorizationToken } }
      );

      const resData = response.data;
      console.log("Delete response:", resData);

      if (response.status === 200 || response.status === 201) {
        
        setContactData((prev) => prev.filter((contact) => contact._id !== id));
        
      } else {
        toast.warn("Failed to delete contact!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Contact delete error: ${error.message}`);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  if (!Array.isArray(contactData)) {
    console.warn("contactData is not an array:", contactData);
    return <p>Loading contacts...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📬 Doctors See Appointment</h2>

      <div className={styles.cardGrid}>
        {contactData.length > 0 ? (
          contactData.map(({  username, email, message, doctor, appointmentDate, _id  }, index) => (
           <div key={_id || index} className={styles.card}>
  <div className={styles.cardHeader}>
    <h3><FaUserAlt className={styles.icon} /> {username}</h3>

    <p className={styles.email}>
      <FaEnvelope className={styles.icon} /> {email}
    </p>

    <p className={styles.doctor}>
      🩺 Doctor: <strong>{doctor}</strong>
    </p>

    <p className={styles.date}>
      📅 Appointment: {new Date(appointmentDate).toLocaleDateString()}
    </p>
  </div>

  <p className={styles.message}>
    <FaCommentDots className={styles.icon} /> {message}
  </p>

  <button className={styles.deleteBtn} onClick={() => deleteContactByID(_id)}>
    <FaTrashAlt className={styles.icon} /> Delete
  </button>
</div>

          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
