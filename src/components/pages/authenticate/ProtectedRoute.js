import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ path, element }) => {
  // Check if the user is authenticated (e.g., has a valid token)
  const authToken = Cookies.get('authToken');

  return authToken ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
