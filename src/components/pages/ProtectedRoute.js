import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest}) => {
    const navigate = useNavigate();
    
    if(!isAuthenticated){
        navigate('/login')

        return null;
    }

    return <Component {...rest} />

};

export default ProtectedRoute;