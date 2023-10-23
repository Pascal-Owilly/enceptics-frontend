import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from './authService'; // Import your authService

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.requestPasswordReset(email);

      // Handle the response and show a confirmation message to the user
      setMessage(response.data.detail); // Assuming the message key in the response

    } catch (error) {
      // Handle errors, e.g., if the email is not found or not verified
      setMessage(error.response.data.detail); // Assuming the message key in the response
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background:'#121661', color:'white' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 what-card-navbar p-3' >
            <h3>Forgot Password</h3>
            <p>Enter your email to reset your password.</p>

            <form onSubmit={handleSubmit} className=''>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <button type="submit" onClick={handleSubmit} className="btn what-card-btn" style={{background:'#121661', color:'white'}}>
                Reset Password
              </button>
            </form>
            <hr />
           <span  style={{color:'green', fontFamily:'cursive', fontSize:'18px', fontWeight:'700'}}> {message && <p>{message}</p>}</span>
            <hr />
            <p>
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
