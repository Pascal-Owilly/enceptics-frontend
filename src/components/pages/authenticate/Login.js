import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from './authService'; // Adjust the path to authService.js as needed
import Cookies from 'js-cookie';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated using the token in cookies
    if (isAuthenticated()) {
      navigate('/');
    }
  }, []); // Run this effect only once, similar to componentDidMount

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = await login(loginData.username, loginData.password);

      if (authToken) {
        // Check if there's a stored intended destination
        const intendedDestination = Cookies.get('intendedDestination');
        if (intendedDestination) {
          // Redirect to the intended destination
          navigate(intendedDestination);
          // Clear the stored intended destination
          Cookies.remove('intendedDestination');
        }
        else {
          // If no intended destination, you can redirect to a default page (e.g., home)
          navigate('/');
        }
        console.log('You are authenticated');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121661',
  };

  const forgottenPasswordStyle = {
    marginTop: '10px',
    textAlign: 'center',
  };

  const handleLinkClick = (path) => {
    // Store the intended destination in cookies
    Cookies.set('intendedDestination', path);
  };

  return (
    <div style={containerStyle}>
      <div className='what-card mt-4 p-2' style={{ width: '350px', height: '400px' }}>
        <h2 className='text-white' style={{ textAlign: 'center' }}>Login</h2>
        <p></p>
        <form className='p-4' onSubmit={handleLoginSubmit}>
          <p className='text-white'>Username</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <p className='text-white'>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />
          <p></p>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'rgb(18, 187, 18)', color: 'white', border: 'none', borderRadius: '25px' }}>
            Log In
          </button>
        </form>
        <div style={forgottenPasswordStyle}>
          <Link to="/forgot-password">Forgotten Password?</Link>
        </div>
        {/* Add links that set the intended destination */}
        <div style={forgottenPasswordStyle}>
          <Link to="/profile" onClick={() => handleLinkClick('/profile')}>Profile</Link>
          <Link to="/settings" onClick={() => handleLinkClick('/settings')}>Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
