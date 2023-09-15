import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoute({ element }) {
  const navigate = useNavigate();

  // Check if the user is authenticated based on the presence of an authToken
  const authToken = Cookies.get('authToken');
  const isAuthenticated = !!authToken;

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    navigate('/login');
    return null; // Return null to prevent rendering of the protected component
  }

  // If authenticated, render the protected component
  return element;
}

export default PrivateRoute;
