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
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <h3>Forgot Password</h3>
            <p>Enter your email to reset your password.</p>

            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </form>

            {message && <p>{message}</p>}

            <p>
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
