import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function FlashMessage({ message, type }) {
  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

export default function Signup({ setToken }) {
  const navigate = useNavigate();

  const [flashMessage, setFlashMessage] = useState(null);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const signUp = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', userData);
      setFlashMessage({ message: `Welcome ${userData.username} !`, type: 'success' });
      setToken(response.data.key); // Set the token with the provided function
    } catch (error) {
      alert(`Oops something went wrong but we are working on it`);
    }
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    signUp();
  };

  const handleSignupChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-form" style={{ backgroundColor: '#121661', height: '100vh', color: 'white' }}>
      <h3 style={{ height: '15vh' }}>Please sign up to continue</h3>
      <form className="col-md-3 col-lg-4 col-sm-10 col-xm-12" onSubmit={handleSignupSubmit}>

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
            id="password1"
            name="password1"
            value={userData.password1}
            onChange={handleSignupChange}
          />
        </div>

        <div className="form-group">
          <label className="mt-4" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-control"
            id="password2"
            name="password2"
            value={userData.password2}
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

      {flashMessage && (
        <div className="flash-message" style={{ backgroundColor: '#121661', fontWeight: 'normal' }}>
          {flashMessage.message}
        </div>
      )}
    </div>
  )
}

Signup.propTypes = {
  setToken: PropTypes.func.isRequired
}
