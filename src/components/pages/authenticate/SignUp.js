import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();

  const baseUrl = 'https://enc.pythonanywhere.com'

  const [registrationData, setRegistrationData] = useState({

    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleRegistrationChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/register/`, registrationData);
      navigate('/login')
      // Handle successful sign-up here, e.g., show a success message or redirect to login.
    } catch (error) {
      // Handle sign-up error here, e.g., display an error message.
      console.error('Sign-up error:', error);
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor:'#121661' }}>
      <div className='container'>
        <div className='row' >
          <div className='col-md-4'></div>
          <div className='col-md-4' style={{marginTop:'17vh'}}>
            <form className='card p-3 what-card-navbar m-1' style={{background:'#121661', color:'white'}} onSubmit={signUp}>
            <h3 className=' text-secondary'>Sign Up</h3>

              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control mb-1'
                  id='username'
                  name='username'
                  value={registrationData.username}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
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
                  value={registrationData.password1}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={registrationData.password2}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <button type='submit' className='btn btn-sm text-white what-card-btn mt-4' style={{background:'#121661'}}>
                Sign Up
              </button>
              <hr />
              <p>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
