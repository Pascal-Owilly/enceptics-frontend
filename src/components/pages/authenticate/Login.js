// LoginTest.js

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from './authService'; // Import the authService

const LoginTest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const login = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const authToken = await authService.login(loginData);
      setIsLoggedIn(true);
      Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });

      // Redirect to another page after successful login if needed
      window.location.reload();

      navigate('/'); // Replace '/dashboard' with your desired route

    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
      // Redirect to another page if the user is already logged in
      navigate('/'); // Replace '/dashboard' with your desired route
    }
  }, []);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '' }}>
      <form className='what-card ' onSubmit={handleLoginSubmit} style={{ width: '350px', height: '400px', marginTop: '', marginLeft: '', backgroundColor: '#121661' }}>
        <h3 className='text-center text-white'>Login</h3>
        <hr style={{ color: '#d9d9d9' }} />
        <div className="form-group" style={{ color:'#d9d9d9', fontSize:'18px'}}>
     <p>
     <label className="mt-4" htmlFor="username">Username</label>
     </p> 
      <input
        type="text"
        style={{background:'#d9d9d9'}}
        className="form-control"
        id="username"
        name="username"
        value={loginData.username}
        placeholder="Enter username"
        onChange={handleLoginChange}
      />
    </div>

    <div className="form-group" style={{ color:'#d9d9d9', fontSize:'18px'}}>
      <p>
      <label className="mt-4" htmlFor="password">Password</label>
      </p>
      <input
        type="password"
        style={{background:'#d9d9d9'}}
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
      className="btn btn-outline-secondary text-center mt-5 what-card-price btn-sm mt-4"
      style={{ backgroundColor: '#121661', borderColor: '#000092', width:'100%', margin:'auto', float:'right' }}
    >
      Login
    </button>
          </form>
    </div>
  );
};

export default LoginTest;
