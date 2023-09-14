import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for the authToken in cookies
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (loginData) => {
    try {

      Cookies.remove("authToken");
      
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", loginData);
      const authToken = response.data.key;
      setAuthToken(authToken);
      
      // Store the token in a cookie with an expiration date (e.g., 1 day)
      Cookies.set("authToken", authToken, { expires: 2, sameSite: "None", secure: true });

      navigate('/profile');
      console.log('User token is here', authToken)
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setAuthToken(null);

    // Remove the authToken cookie
    Cookies.remove("authToken");

    navigate('/blog');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
