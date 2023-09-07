import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    }
    setLoading(false); // Set loading to false after checking for a stored token
  }, []);

  const login = async (loginData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", loginData);
      const authToken = response.data.token;
      setAuthToken(authToken); // Set the token
      localStorage.setItem("authToken", authToken);
      navigate('/profile'); // Redirect to the profile page upon successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate('/login'); // Redirect to the login page upon logout
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
