import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import { useSearch } from './../SearchContext';

import authService from './authService';

const LoginTest = () => {

  const { id } = useParams();


  console.log('Place ID:', id);

  const { searchTerm } = useSearch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = new URLSearchParams(location.search);
  const placeName = searchParams.get("placeName");
  const price = searchParams.get("price");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const login = async (e) => {

    // Use the placeName and price as needed
    console.log("Place Name:", placeName);
    console.log("Price:", price);

    if (e) {
      e.preventDefault();
    }
    try {
      const authToken = await authService.login(loginData);
      setIsLoggedIn(true);
      Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });

      // Redirect to the booking page after successful login
      navigate(`/booking?placeName=${placeName}&price=${price}`);
    } catch (error) {
      // Handle login error
      alert('Login failed:', error);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }

    // // Access query parameters from the URL
    // const query = new URLSearchParams(location.search);
    // const placeName = query.get("placeName");
    // const price = query.get("price");

    // // Use the placeName and price as needed
    // console.log("Place Name:", placeName);
    // console.log("Price:", price);

    // // Redirect to another page if the user is already logged in
    // if (isLoggedIn) {
    //   navigate(`/booking?placeName=${placeName}&price=${price}`);
    // }
  }, [location.search, isLoggedIn]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '' }}>
      <form className='what-card' onSubmit={handleLoginSubmit} style={{ width: '350px', height: '400px', marginTop: '', marginLeft: '', backgroundColor: '#121661' }}>
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
  );
};

export default LoginTest;
