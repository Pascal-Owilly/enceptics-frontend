import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authenticate/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, authToken } = useAuth();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Check if authToken is present and redirect to the profile page if it is
    if (authToken) {
      navigate("/profile", { replace: true });
    }
    else{
      navigate('/login')
    }
  }, [authToken, navigate]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(loginData);
      navigate("/profile", { replace: true });
    } catch (error) {
      alert("Login failed, please try again");
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form" style={{ backgroundColor: "#121661", height: "100vh", color: "white" }}>
      <h3>Please login to continue</h3>
      <form
        className="col-md-3 col-lg-4 col-sm-10 col-xm-12"
        onSubmit={handleLoginSubmit}
      >
        <div className="form-group">
          <label className="mt-4" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={loginData.username}
            placeholder="Enter username"
            onChange={handleLoginChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control "
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm mt-4"
          style={{ backgroundColor: "#000092", borderColor: "#000092", width: "100%" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
