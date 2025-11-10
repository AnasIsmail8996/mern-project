import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify"; // 👈 import toast
import "react-toastify/dist/ReactToastify.css";
import styles from "./AdminUsers.module.css";
import { Link} from "react-router-dom"


const AdminUsers = () => {
  const [usersData, setUserData] = useState([]);
  const { AuthorizationToken, API } = useAuth();

  // 🔹 Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/users`, {
        headers: {
          Authorization: AuthorizationToken, 
        },
      });
      console.log(response.data, "users data fetched");
      const responseData=response.data;
      if(responseData){
        
        setUserData(responseData);

      }
    } catch (error) {
      console.log(error.message, "Error fetching users");
      toast.error("Failed to fetch users!");
    }
  };


  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete(
        `${API}/api/admin/users/delete/${id}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );

      console.log(response.data, "Delete response");

      
      if (response.status === 200 || response.status === 201) {
        toast.success("User deleted successfully!");
        getAllUsers(); 
      } else {
        toast.warn("Something went wrong while deleting user!");
      }
    } catch (error) {
      console.log(error.message, "User not deleted");
      toast.error("Failed to delete user!");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className={styles.adminSection}>
      <div className={styles.header}>
        <h1>👥 Admin Patients Dashboard</h1>
        <p>Manage all registered Patients from one place</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length > 0 ? (
              usersData.map((user, index) => {
                const { _id, username, email, phone } = user;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>
                      <button className={styles.editBtn}> 
                         <Link to={`/admin/users/${user._id}/edit`}> Edit  </Link>
                         </button>
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteUser(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className={styles.noData}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;
