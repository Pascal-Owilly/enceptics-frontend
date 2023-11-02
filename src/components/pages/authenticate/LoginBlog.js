import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from './authService';

const LoginBlog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({});

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
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        setErrorMessages({ invalidCredentials: "Invalid username or password" });
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }

    // Redirect to another page if the user is already logged in
    if (isLoggedIn) {
      navigate('/blog'); // Replace '/dashboard' with your desired route
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className='container-fluid' style={{ backgroundColor: '#121661' }}>
      <div className='row' style={{ height: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <form className='what-card-navbar p-4' onSubmit={handleLoginSubmit} style={{ width: '100%', backgroundColor: '#121661' }}>
            <h5 className='text-secondary'>Please login to join the conversation</h5>
            <hr style={{ color: '#d9d9d9' }} />
            <div className="form-group" style={{ color: '#d9d9d9', fontSize: '18px' }}>
              <label className="mt-1 text-secondary" htmlFor="username">Username</label>
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

            <div className="form-group" style={{ color: '#d9d9d9', fontSize: '18px' }}>
              <label className="mt-1 text-secondary" htmlFor="password">Password</label>
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
              {errorMessages.invalidCredentials && (
                <p style={{ color: 'greenyellow', fontSize:'12px'}}>{errorMessages.invalidCredentials}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-outline-secondary text-center mt-2 what-card-price btn-sm mt-4"
              style={{ backgroundColor: '#121661', borderColor: '#000092', width: '100%', margin: 'auto' }}
            >
              Login
            </button>
            <hr />
            <p className='mb-2 text-secondary'>
              Don't have an account? <Link to='/signup-blog'>Signup</Link>
            </p>
            <p className='mb-2 text-secondary'>
              <Link to='/forgot-password'>Forgot your password?</Link>
            </p>
          </form>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
};

export default LoginBlog;
