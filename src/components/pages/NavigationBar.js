import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import axios from 'axios';
import './ProfilePage.js';
import { Button, Dropdown } from 'react-bootstrap';

function NavigationBar() {

const [registrationData, setRegistrationData] = useState({
  username: '',
  email: '',
  password1: '',
  password2: '',
});

const [loginData, setLoginData] = useState({
  username: '',
  // email: '',
  password: '',
});

const [profile, setProfile] = useState([]);


useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {

    });
    setProfile(response.data);
  } catch (error) {
    console.error('Error fetching profile info:', error);
  }
};

const [showModal, setShowModal] = useState(false);
const [isSignUpModal, setIsSignUpModal] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication state

const openSignUpModal = () => {
  setShowModal(true);
  setIsSignUpModal(true);
};

const openLoginModal = () => {
  setShowModal(true);
  setIsSignUpModal(false);
};

const signUp = async (e) => {
  if (e) {
    e.preventDefault();
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', registrationData);
    alert('Welcome stranger!');
  } catch (error) {
    alert("Oops! That didn't work!");
  }
};

const handleRegistrationSubmit = (e) => {
  e.preventDefault();
  signUp();
};

const handleLoginSubmit = (event) => {
  event.preventDefault();
  login();
};

const logout = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/auth/logout/ ');
    setIsLoggedIn(false); // Update authentication state
    alert ('Logout successful');
  } catch (error) {
    alert('Failed to logout');
  }
};

const login = async (e) => {
  if (e) {
    e.preventDefault();
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
    setIsLoggedIn(true); // Update authentication state
    alert('Login successful');
  } catch (error) {
    alert("That didn't go well!");
  }
};

const handleRegistrationChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRegistrationData({
      username: '',
      email: '',
      password1: '',
      password2: '',
    });
    setLoginData({
      username: '',
      // email: '',
      password: '',
    });
  };


  /***/
    // const [showModal, setShowModal] = useState(false);

    // const [isSignUpModal, setIsSignUpModal] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication state

//   const openSignUpModal = () => {
//     setShowModal(true);
//     setIsSignUpModal(true);
//   };

//   const openLoginModal = () => {
//     setShowModal(true);
//     setIsSignUpModal(false);
//   };

//   const signUp = async (e) => {
//     if (e) {    
//       e.preventDefault();
//     }
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', registrationData);
//       alert(`Welcome ${registrationData.username} !`);
//     } catch (error) {
//       alert("Oops! That didn't work!");
//     }
//   };

//     const handleRegistrationSubmit = (e) => {
//       e.preventDefault();
//       signUp();
//     };

//   const handleLoginSubmit = (event) => {
//     event.preventDefault();
//     login();
//   };

//   const logout = async () => {
//     try {
//       await axios.post('http://127.0.0.1:8000/api/auth/logout/ ');
//       setIsLoggedIn(false); // Update authentication state
//       alert ('Logout successful');
//     } catch (error) {
//       alert('Failed to logout');
//     }
//   };

//   const login = async (e) => {
//     if (e) {
//       e.preventDefault();
//     }
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
//       setIsLoggedIn(true); // Update authentication state
//       alert('Login successful');
//     } catch (error) {
//       alert("That didn't go well!");
//     }
//   };
   

  return (

<>
<nav
        className="navbar navbar-expand-lg navbar-dark"
        variant="fixed"
        style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '1', width: '100%' }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            <span className="brand-first-letter">E</span>
            <sub className="brand-text">nceptics</sub>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-white" href="/about">
                  About Enceptics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  Places
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  Hotels
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/places">
                  Book
                </a>
              </li>

              <li>
              <Dropdown className='btn-sm'
                style={{marginRight:'1rem'}}
              >
                <Dropdown.Toggle variant="dark" id="dropdownMenu btn-sm"> 
                  Categories
              </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Staycation</Dropdown.Item>
                  <Dropdown.Item href="#">Camping</Dropdown.Item>
                  <Dropdown.Item href="#">Sight Seeing</Dropdown.Item>
                  <Dropdown.Item href="#">Sports</Dropdown.Item>
                  <Dropdown.Item href="#">Beach</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                </li>
            </ul>

            {!isLoggedIn && ( // Render only if not logged in
          <div>
            <button
              type="button"
              className="btn btn-sm btn-light ml-4"
              style={{ backgroundColor: 'white', color: '#000092', border: 'none' }}
              onClick={openSignUpModal}
            >
              Sign Up 
            </button>
              
            <button
              type="button"
              className="btn btn-sm btn-light ml-4"
              style={{ backgroundColor: 'white', color: '#000092', border: 'none' }}
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        )} 

      {isLoggedIn && ( 
            
                <>
                <div>
                {profile.map((profile) => (
                  <button className="nav-item"
                    style={{backgroundColor:'transparent', marginRight:'1rem', width: '45px', height:'45px', borderRadius: '100%' }}
                  >
                  <a className="nav-link text-white" href="/profile">
                    <img src={profile.image} style={{width:'40px',height:'40px', borderRadius:'100%', margin:'auto'}}/>
                   {profile.user} 
                   </a>
                   </button> 
                  ))} 
                  </div> 
                  <button className="nav-item" 
                    style={{backgroundColor:'transparent', marginRight:'1rem', border:'none'}}
                    >
                  <a className="nav-link text-white" href="/blogs">
                    Blog
                  </a>
                  </button> 
                <button
                                type="button"
                                className="btn btn-sm btn-light ml-4"
                                style={{ backgroundColor: 'white', color: '#000092', border: 'none'}}
                                onClick={logout}
                              >
                                Logout
                                  
                                </button>
                                </>
                              )} 
      {showModal && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isSignUpModal ? 'Sign Up' : 'Login'}</h5>
                  <button style={{backgroundColor:'green', border:'none', color:'white', width:'40px', borderRadius:'4px'}} type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {isSignUpModal ? (
                    <form onSubmit={handleRegistrationSubmit}>
                      <div className="form-group">
                        <label className="mt-4" htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={registrationData.username}
                          placeholder="Enter username"
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="mt-4" htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control "
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={registrationData.email}
                          onChange={handleRegistrationChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="mt-4" htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="form-control"
                          id="password1"
                          name="password1"
                          value={registrationData.password1}
                          onChange={handleRegistrationChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="mt-4" htmlFor="confirm_password">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Confirm password"
                          className="form-control"
                          id="password2"
                          name="password2"
                          value={registrationData.password2}
                          onChange={handleRegistrationChange}
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm mt-3"
                        style={{ backgroundColor: '#000092', borderColor: '#000092' , width:'100%'}}
                      >
                        Sign Up
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleLoginSubmit}>
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
                  )}
                </div>
              </div>
            </div>
          </div>
        )} 
          </div>
        </div>
      </nav>
      </>
      )}
      export default NavigationBar;