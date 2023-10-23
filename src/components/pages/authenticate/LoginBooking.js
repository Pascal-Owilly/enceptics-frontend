import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from './authService';

const LoginTest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const login = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const authToken = await authService.login(loginData);
      Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });

      // Set a flag in localStorage to indicate successful login
      localStorage.setItem('isLoggedIn', 'true');

      // Refresh the page
      window.location.reload();
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const placeName = query.get("placeName");
    const price = query.get("price");

    const storedToken = Cookies.get('authToken');

    if (storedToken) {
      setIsLoggedIn(true);
    }

    // Check if the flag is set in localStorage
    const isLoggedInFlag = localStorage.getItem('isLoggedIn');
    if (isLoggedInFlag === 'true') {
      // Clear the flag to avoid repeated navigation
      localStorage.removeItem('isLoggedIn');
      // Navigate to "/places"
      navigate('/places');
    }
  }, [location.search, navigate]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius:'10px' }}>
      <form className='what-card-navbar p-1' onSubmit={handleLoginSubmit} style={{ width: '350px', backgroundColor: '#121661' }}>
        <h3 className='text-center text-white'>Login</h3>
        <hr style={{ color: '#d9d9d9' }} />
        <div className="form-group p-1" style={{ color:'#d9d9d9', fontSize:'18px'}}>
          <label className="mt-1" htmlFor="username">Username</label>
          <input
            type="text"
            style={{ background: '#d9d9d9' }}
            className="form-control"
            id="username"
            name="username"
            value={loginData.username}
            placeholder="Enter username"
            onChange={handleLoginChange}
          />
        </div>

        <div className="form-group p-1" style={{ color:'#d9d9d9', fontSize:'18px'}}>
          <label className="mt-1" htmlFor="password">Password</label>
          <input
            type="password"
            style={{ background: '#d9d9d9' }}
            placeholder="Enter password"
            className="form-control"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-secondary text-center mt-2 what-card-btn p-1 btn-sm mt-4"
          style={{ backgroundColor: '#121661', borderColor: '#000092', width:'200px'}}
        >
          Login
        </button>
        <hr />
        <p className='mb-2 text-secondary p-1'>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </p>
        <p className='mb-2 text-white p-1'>
          <Link to='/forgot-password'>Forgot your password?</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginTest;
