import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./../Profile";
import BookingPage from "../BookingPage";

const Auth = () => {
    return (
        <React.Fragment>
            <Profile />
            <Outlet />
            <BookingPage />
        </React.Fragment>
    );
}
export default Auth;