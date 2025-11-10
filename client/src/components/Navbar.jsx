import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react"; 
import {useAuth} from "../store/Auth.jsx" 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
   const { isLoggedIn, logoutUser } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoBrand}>
          <a href="/">Brand's Hospital</a>
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
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Health</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Book Appointment</NavLink></li>
            <li><NavLink to="/services" onClick={() => setMenuOpen(false)}>Doctors</NavLink></li>

            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    logoutUser();  
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li><NavLink to="/register" onClick={() => setMenuOpen(false)}>SignUp</NavLink></li>
                <li><NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
