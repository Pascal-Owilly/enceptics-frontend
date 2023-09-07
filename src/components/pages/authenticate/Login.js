import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
      const authToken = response.data.token;
  
      // Store the authToken in localStorage
      localStorage.setItem('authToken', authToken);
      console.log(JSON.stringify(response.data))
  
      // Attempt to retrieve the token from localStorage
      const storedToken = localStorage.getItem('authToken');
  
      if (storedToken === null) {
        console.error('Token not found in localStorage');
      } else {
        console.log('Stored Token:', storedToken);
      }
  
      // Redirect the user to another page (e.g., '/profile') after successful login
      // You can use a router for this purpose (e.g., React Router)
      // Example:
      // history.push('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  



  return (
    <div>
      <h2 style={{ height: '100vh' }}>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
