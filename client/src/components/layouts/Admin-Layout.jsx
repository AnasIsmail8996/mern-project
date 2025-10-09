import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import styles from "./Admin.module.css";
import { Menu, X } from "lucide-react"; 
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    let toastId;
    if (isLoading) {
      toastId = toast.loading("Loading......");
    } else {
      toast.dismiss(toastId);
    }
    return () => toast.dismiss(toastId);
  }, [isLoading]);

  if (isLoading) {

    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoBrand}>
            <a href="/">Admin Panel</a>
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
            <ul className={styles.navList}>
              <li><NavLink to="/admin/users" onClick={() => setMenuOpen(false)}><FaUser /> Users</NavLink></li>
              <li><NavLink to="/admin/contacts" onClick={() => setMenuOpen(false)}><FaMessage /> Contact</NavLink></li>
              <li><NavLink to="/services" onClick={() => setMenuOpen(false)}><FaRegListAlt /> Services</NavLink></li>
              <li><NavLink to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default AdminLayout;
