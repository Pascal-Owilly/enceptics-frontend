import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import authService from './authService'; // Import the authService

const LoginTest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  const [placeName, setPlaceName] = useState(""); 
  const [ price, setPrice ] = useState(0);

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setIsLoggedIn(true);

      // Check if there's placeName and price data in the location state
      const locationState = location.state;
      if (locationState && locationState.placeName && locationState.price) {
        // Do something with placeName and price here
        const { placeName, price } = locationState;
        setPlaceName(placeName);
        setPrice(price);
      }

      // Redirect to another page if the user is already logged in
      navigate('/places');
    }
  }, []);
  

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
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = await authService.login(loginData);
      setIsLoggedIn(true);
      Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });
  
      // Retrieve the booking data from the cookie
      const placeBookingDataString = Cookies.get('placeBookingData');
      if (placeBookingDataString) {
        const placeBookingData = JSON.parse(placeBookingDataString);
        const { placeName, price } = placeBookingData;
        
        // Navigate to the booking page with the correct values
        navigate(`/booking?placeName=${encodeURIComponent(placeName)}&price=${price}`);
      } else {
        // Handle the case when booking data is not available
        console.error('Booking data not found.');
      }
  
      window.location.reload();
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };
  

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '' }}>
      <form className='what-card ' onSubmit={handleLoginSubmit} style={{ width: '350px', height: 'auto', marginTop: '', marginLeft: '', backgroundColor: '#121661' }}>
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
          className="btn btn-outline-secondary text-center mt-3 mb-3 what-card-btn btn-sm mt-4"
          style={{ backgroundColor: '#121661', borderColor: '#000092', width:'100%', margin:'auto', float:'right' }}
        >
          Login
        </button>
        <hr />
         <p className='mb-2  mt-2 text-secondary'>
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
