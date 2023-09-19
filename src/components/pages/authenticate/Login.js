import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated, setAuthTokenCookie } from './authService'; // Adjust the path to authService.js as needed
import Cookies from 'js-cookie';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('welcome to enc')
      console.log('You are authenticated with', setAuthTokenCookie);

      navigate('/');
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  const handleLoginSubmit = async () => {
    try {
      const authToken = await login(loginData.username, loginData.password);
      console.log('You are authenticated with', authToken);
      
      // Redirect or perform any other action upon successful login
      alert('logged in')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  


  // const handleLogoutSubmit = () => {
  //   authService.logout(); // Use AuthService to log out
  //   navigate('/login');
  // };

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
