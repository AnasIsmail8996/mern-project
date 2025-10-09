import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";
import { useParams } from "react-router-dom";
import styles from "./AdminUpdate.module.css"; 

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });
console.log(data, 'data');

  const { AuthorizationToken, API } = useAuth();
  const params = useParams();


  const getSingleUserData = async () => {
    try {
      const response = await axios.get(
        `${API}/api/admin/users/${params.id}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );

    console.log(response.data, "Fetched user data");

   
    const getData = response.data.message;
    setData(getData);
     

      if (response.status === 200 || response.status === 201) {
        toast.success("User data fetched successfully!");
      } else {
        toast.warn("Failed to fetch user data!");
      }
    } catch (error) {
      console.log(error.message, "Error fetching user data");
      toast.error("Failed to fetch user data!");
    }
  };



  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
   const name= e.target.name;
   const value= e.target.value;

   setData({
    ...data,
    [name]:value,
   })
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.patch(
      `http://localhost:3000/api/admin/users/update/${params.id}`,
      data,
      {
        headers: {
          Authorization: AuthorizationToken,
        },
      }
    );

    console.log(response.data);
    
    if (response.status === 200 || response.status === 201) {
      toast.success("User updated successfully!");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Error submitting data");
  }
};


  return (
    <section className={styles.sectionUpdate}>
      <div className={styles.container}>
        <h1 className={styles.mainHeading}>Update User Data</h1>

        <div className={styles.formWrapper}>
          <form  className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>

            <button type="submit" className={styles.btn}>
              Update User
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminUpdate;
