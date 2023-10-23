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
      setIsLoggedIn(true);
      Cookies.set('authToken', authToken, { expires: 10, sameSite: 'None', secure: true });
  
      // Reload the page after successful login
      window.location.reload();
  
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

    // Access query parameters from the URL
    const query = new URLSearchParams(location.search);
    const placeName = query.get("placeName");
    const price = query.get("price");

    // Use the placeName and price as needed
    console.log("Place Name:", placeName);
    console.log("Price:", price);

    // Redirect to another page if the user is already logged in
    if (isLoggedIn) {
      navigate('/'); // Replace '/dashboard' with your desired route
    }
  }, [location.search, isLoggedIn]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className='container-fluid' style={{backgroundColor:'#121661'}}>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6' style={{ height: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '14vh' }}>
        <div >
      <form className='what-card-nav' onSubmit={handleLoginSubmit} style={{ width: '350px', height: '400px', marginTop: '', marginLeft: '', backgroundColor: '#121661' }}>
        <h3 className='text-center text-white'>Login</h3>
        <hr style={{ color: '#d9d9d9' }} />
        <div className="form-group" style={{ color:'#d9d9d9', fontSize:'18px'}}>
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

        <div className="form-group" style={{ color:'#d9d9d9', fontSize:'18px'}}>
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
          className="btn btn-outline-secondary text-center mt-2 what-card-price btn-sm mt-4"
          style={{ backgroundColor: '#121661', borderColor: '#000092', width:'100%', margin:'auto'}}
          onClick={handleLoginSubmit}
        >
          Login
        </button>
        <hr />
        <p className='mb-2 text-secondary'>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </p>
        <p className='mb-2 text-secondary'>
          <Link to='/forgot-password'>Forgot your password?</Link>
        </p>
      </form>
    </div>

        </div>
        <div className='col-md-3'></div>

      </div>
      </div>
      </>
      );
};

export default LoginTest;
