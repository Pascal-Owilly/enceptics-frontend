import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login({ setToken }){
    const navigate = useNavigate();


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
      });

      useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      }, []);

      const login = async (e) => {
        if (e) {
          e.preventDefault();
        }
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
          setIsLoggedIn(true); // Update authentication state
          setToken(response.data.token); // Set the token here
          localStorage.setItem('authToken', response.data.token); // Store token in localStorage
          navigate('/booking', { replace: true });
        } catch (error) {
          alert("That didn't go well, try again");
        }
      };
      
      

      const handleLoginSubmit = (event) => {
        event.preventDefault();
        login();
      };

      const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };

    return (
        <div className="login-form" style={{backgroundColor:'#121661', height:'100vh', color:'white'}}>
        <h3>Please login to continue</h3>
            <form className="col-md-3  col-lg-4 col-sm-10 col-xm-12"

             onSubmit={handleLoginSubmit}
            >
                      <div className="form-group">
                        <label className="mt-4" htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={loginData.username}
                          placeholder="Enter username"
                          onChange={handleLoginChange}
                        />
                      </div>

                       <div className="form-group">
                        <label className="mt-4" htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="form-control "
                          id="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                        />
                      </div> 
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm mt-4"
                        style={{ backgroundColor: '#000092', borderColor: '#000092', width:'100%' }}
                      >
                        Login
                      </button>
                    </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }