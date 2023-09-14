import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, authenticated, redirectTo }) {
  return authenticated ? (
    element
  ) : (
    <Navigate to={redirectTo} state={{ from: window.location.pathname }} />
  );
}

export default PrivateRoute;
