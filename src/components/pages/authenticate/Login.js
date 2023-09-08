import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
      const authToken = response.data.key;
  
      // Store the authToken in a cookie with an expiration date (e.g., 1 day)
      Cookies.set('authToken', authToken, { expires: 2, sameSite: 'None', secure: true });
  
      // Redirect to '/profile' immediately after a successful login
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor:'#121661'
  };

//   const cardStyle = {
//     width: '300px',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   };

  const forgottenPasswordStyle = {
    marginTop: '10px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div className='what-card mt-4 p-2' style={{width:'350px', height:'400px'}}>
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
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'rgb(18, 187, 18)', color: 'white', border: 'none', borderRadius:'25px' }}>
            Log In
          </button>
        </form>
        <div style={forgottenPasswordStyle}>
          <Link to="/forgot-password">Forgotten Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
