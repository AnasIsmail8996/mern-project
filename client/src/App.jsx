import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar"
import ErrorPage from './pages/ErrorPage';
import Logout from './pages/Logout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from './components/layouts/Admin-layout';
import AdminUsers from "./pages/AdminUsers"
import AdminContacts from "./pages/AdminContacts"
import AdminUpdate from './pages/AdminUpdate';

const App = () => {
  const location = useLocation();

  
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}  

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<ErrorPage />} />

        {/* 👇 Admin routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='users' element={<AdminUsers />} />
          <Route path='contacts' element={<AdminContacts />} />
          <Route path='users/:id/edit' element={<AdminUpdate />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};


export default App;