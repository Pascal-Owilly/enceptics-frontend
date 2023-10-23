import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const baseUrl = 'https://enc.pythonanywhere.com'

  const [loginData, setLoginData] = useState({

    username: '',
    password1: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login/`, loginData);
      navigate('/')
      // Handle successful loginhere, e.g., show a success message or redirect to login.
      console.log('login  success')
    } catch (error) {
      // Handle Login error here, e.g., display an error message.
      console.error('login error:', error);
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor:'#121661' }}>
      <div className='container'>
        <div className='row' >
          <div className='col-md-4'></div>
          <div className='col-md-4' style={{marginTop:'17vh'}}>
            <form className='card p-3 what-card-navbar m-1' style={{background:'#121661', color:'white'}} onSubmit={signUp}>
            <h3 className=' text-secondary'>Login</h3>

              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control mb-1'
                  id='username'
                  name='username'
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password1'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password1'
                  name='password1'
                  value={loginData.password1}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type='submit' className='btn btn-sm text-white what-card-btn mt-4' style={{background:'#121661'}}>
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
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
