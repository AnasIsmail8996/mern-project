// Logout.jsx
import { useEffect } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    navigate("/login");
  }, []);


};

export default Logout;
