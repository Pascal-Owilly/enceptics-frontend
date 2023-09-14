// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ path, element }) => {
//   // Check if the user is authenticated (e.g., has a valid token)
//   const authToken = Cookies.get('authToken');

//   return authToken ? <Route path={path} element={element} /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkAuthToken = () => {
        const authToken = Cookies.getItem('authToken');
        if (!authToken || authToken === 'undefined') {
            setIsLoggedIn(false);
            // return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkAuthToken();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;
