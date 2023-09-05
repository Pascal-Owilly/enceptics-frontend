import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup({ setToken }) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password1: '', // Corrected state field name
    password2: '', // Corrected state field name
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const signup = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      // Check if the password and confirmPassword match
      if (userData.password1 !== userData.password2) { // Corrected state field name
        alert("Passwords do not match");
        return;
      }

      // Remove confirmPassword from the data before sending it to the server
      const { password2, ...userDataWithoutConfirmPassword } = userData; // Corrected state field name

      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', userDataWithoutConfirmPassword);
      setIsLoggedIn(true); // Update authentication state
      setToken(response.data.token); // Set the token here
      localStorage.setItem('authToken', response.data.token); // Store token in localStorage
      navigate('/booking', { replace: true });
    } catch (error) {
      alert("Sign-up failed, please try again");
    }
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    signup();
  };

  const handleSignupChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-form" style={{ backgroundColor: '#121661', height: '100vh', color: 'white' }}>
      <h3 style={{ height: '15vh'}}>Please sign up to continue</h3>
      <form className="col-md-3 col-lg-4 col-sm-10 col-xm-12" onSubmit={handleSignupSubmit}>
        <div className="form-group">
          <label className="mt-4" htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={userData.first_name}
            placeholder="Enter first name"
            onChange={handleSignupChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={userData.last_name}
            placeholder="Enter last name"
            onChange={handleSignupChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={userData.username}
            placeholder="Enter username"
            onChange={handleSignupChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="email">email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleSignupChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            id="password"
            name="password1" // Corrected state field name
            value={userData.password1} // Corrected state field name
            onChange={handleSignupChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-control"
            id="confirmPassword"
            name="password2" // Corrected state field name
            value={userData.password2} // Corrected state field name
            onChange={handleSignupChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm mt-4"
          style={{ backgroundColor: '#000092', borderColor: '#000092', width: '100%' }}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

Signup.propTypes = {
  setToken: PropTypes.func.isRequired
}
