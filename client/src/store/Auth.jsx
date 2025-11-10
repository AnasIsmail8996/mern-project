import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
  const AuthorizationToken= `Bearer ${token}`;
const API = import.meta.env.VITE_APP_URI_API

  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = !!token;

const logoutUser = () => {
  localStorage.clear(); 
  setToken("");
  setUser(null);
};


  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/auth/user", {
        headers: {
          Authorization:AuthorizationToken,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const getData = response.data.userData;
        console.log(getData, "userData");
        setUser(getData);
        setIsLoading(false)
      }else{
        setIsLoading(false)
       console.error("Error Fetching User Check Data")
      }
    } catch (error) {
      console.log(error.response?.data || error.message, "jwt fetch error from this token");
    }
  };

// to get 
const getServices=async()=>{
  try {
    const response= await axios.get(`http://localhost:3000/api/data/service`);
         
    if (response.status === 200 || response.status === 201){
      const data= response.data.res;
          setServices(data || [])
       console.log(`data from services db `, data);
      
    }
  } catch (error) {
    console.log(`services front-end Error ${error}`);
    
  }
}

  useEffect(() => {
   getServices()

    if (token) userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, 
    logoutUser, user, services, AuthorizationToken, isLoading, API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
};
