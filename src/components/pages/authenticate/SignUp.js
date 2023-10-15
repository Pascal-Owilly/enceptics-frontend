import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();

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
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', registrationData);
      navigate('/login')
      // Handle successful sign-up here, e.g., show a success message or redirect to login.
    } catch (error) {
      // Handle sign-up error here, e.g., display an error message.
      console.error('Sign-up error:', error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <h3 className='mt-4'>Sign Up</h3>
            <form className='card p-3' onSubmit={signUp}>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control'
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
              <button type='submit' className='btn btn-primary mt-1'>
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
