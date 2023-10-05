import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import './Profile.js';
import { Button, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import SearchBar from './SearchBar';


// import { useAuth } from "../pages/authenticate/AuthContext";
import { useNavigate } from 'react-router-dom';


function FlashMessage({ message, type }) {
  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

function NavigationBar() {
  
const [flashMessage, setFlashMessage] = useState(null); // Initialize with null

// const handleInputChange = (event) => {
//   setSearchTerm(event.target.value);
// };

const navigate = useNavigate()

useEffect(() => {
  if (flashMessage) {
    const timer = setTimeout(() => {
      setFlashMessage(null); // Remove the flash message after 2 seconds
    }, 4000); 

    return () => clearTimeout(timer);
  }
}, [flashMessage]);


const [registrationData, setRegistrationData] = useState({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password1: '',
  password2: '',
});

const [loginData, setLoginData] = useState({
  username: '',
  password: '',
});

const [profile, setProfile] = useState([]);
const [user, setUser] = useState(null);
const authToken = Cookies.get('authToken');


const login = async (e) => {
  if (e) {
    e.preventDefault();
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
  
    const authToken = response.data.key;

    setIsLoggedIn(true);

    Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });    

    setFlashMessage({ message: `Welcome back ${loginData.username} !`, type: 'success' });
    closeModal();
    window.location.reload()

  } catch (error) {
    setFlashMessage({ message: "That didn't go well!", type: 'error' });
  }
};

useEffect(() => {
  const storedToken = Cookies.get('authToken'); // Retrieve the token from the cookie
  if (storedToken) {
    setIsLoggedIn(true);
  }
  fetchProfile();
  fetchUserData()
}, []);

const fetchUserData = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/auth/user/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    const userData = response.data;
    setUser(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const fetchProfile = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/profile/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    const userProfile = response.data;
    setProfile(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
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
    setFlashMessage({ message: `Welcome ${registrationData.username} !`, type: 'success' }); // Set flash message
    closeModal();
    navigate('/login')

    window.location.reload()
  } catch (error) {
    alert(`Oops something went wrong but we are working on it`);
  }
};

const handleRegistrationSubmit = (e) => {
  e.preventDefault();
  signUp();
};

// Inside NavigationBar component



const logout = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/auth/logout/');
    setIsLoggedIn(false);
    
    // Remove the authToken cookie
    Cookies.remove('authToken', { sameSite: 'None', secure: true });
    setFlashMessage({ message: 'You have successfully logged out', type: 'success' });
    window.location.reload()
  } catch (error) {
    setFlashMessage({ message: 'Failed to logout', type: 'error' });
  }
};



const handleLoginSubmit = (event) => {
  event.preventDefault();
  login();
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
      password: '',
    });
  };

  const greatvibes = {
    fontFamily: 'lobster',
    fontSize: '14px',
    textDecoration: 'overline',
    textDecorationColor: 'green',
    textDecorationSkipInk: "3rem",
    color:'rgb(18, 187, 18)',
    fontWeight:'500',

  };
  
  return (
<>
<nav
        className="navbar navbar-expand-lg what-card-price"
        variant="fixed"
        style={{ backgroundColor: '#121661', position: '', zIndex: '2', width:'auto', top: 0 }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white mx-2" href="/">
            <span className="brand-first-letter">E</span>
            <sub className="brand-text">nceptics</sub>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
               
                <a className="nav-link text-white" href="/places">
                <button className='btn btn-sm what-card' style={{backgroundColor:'#121661', color:'#fff', fontWeight:'bolder'}}>
                  Book Now
                  </button>
                </a>
                
              </li>
              <li>

{/* <SearchBar /> */}

              </li>   

                <li className="nav-item">
                <a className="nav-link text-white" href="#">
                    <form className='search-form align-right' 
                    // onSubmit={handleSubmit}
                    >
                    <input
                      placeholder='Search in places...'
                      type="text"
                      // value={query}
                      // onChange={(event) => setQuery(event.target.value)}
                      style={{width:'150px', height:'28px', padding:'10px',backgroundColor:'#121661', border:'1px solid #a9a9a9'
                    }}
                    />
                      <button
                        className='search-btn d-inline p-1'
                        style={{
                          borderRadius: '0 25px 25px 25px',
                          width: '30px',
                          // marginLeft: '-3.1rem',
                          fontSize: '11px',
                          height:'25px',
                          fontWeight:'500',
                          border:'none'
                        }}
                        type="submit"
                      >
                        {/* <FaSearch /> */}
                        <FaSearch />
                      </button>
                    </form>
                </a>
              </li>
              <li>
              <a href="/blog">
              <button className="btn btn-sm mx-4 what-card" 
                    style={{borderRadius:'0 20px 20px 20px', fontSize:'11px', color:'rgb(87, 187,87)'}}
                    >
                      
                    <IoMdChatboxes style={{fontSize:'19px'}} /> chat
                      
                    
                  </button> </a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link" href="/currencyconverter" style={greatvibes}>
                  Convert Currency
                </a>
              </li>

              <li>

              </li>


            </ul>

            {!isLoggedIn && ( // Render only if not logged in
          <div>
            <button
              type="button"
              className="btn btn-sm mx-4 what-card"
              style={{ backgroundColor: '', color: '#d9d9d9', border: 'none' }}
              onClick={openSignUpModal}
            >
              Sign Up 
            </button>
            
            <button
              type="button"
              className="btn btn-sm m-1 what-card"
              style={{color: '#d9d9d9', border: 'none' }}
              onClick={openLoginModal}
            >
              Login
            </button>
          </div>
        )} 

      {isLoggedIn && ( 
            
<>
<div>
{user && (
  <li className="nav-item mx-2" style={{ backgroundColor: 'transparent', width: '45px', height: '45px', borderRadius: '100%', listStyleType: 'none' }}>
    <a className="nav-link text-white" href="/profile">
      {profile && profile.profile_pic ? (
        <img src={profile.profile_pic} style={{ width: '40px', height: '40px', borderRadius: '100%' }} alt="" />
      ) : (
        <span></span>
      )}
      <span>{profile && user.username}</span>
    </a>
  </li>
)}

</div>


                <button
                                type="button"
                                className="btn btn-sm mx-4 what-card"
                                style={{  color: '#d9d9d9', border: 'none'}}
                                onClick={logout}
                              >
                                Logout
                                  
                                </button>
                                </>
                              )} 
      {showModal && (
          <div className="modal" style={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'rgb(0, 0, 0, 0.8)' }}>
            <div className="modal-dialog">
              <div className="modal-content what-card-price text-secondary" style={{background:'#121661', width:'400px'}}>
                <div className="modal-header">
                  <h5 className="modal-title text-secondary">{isSignUpModal ? 'Sign Up' : 'Login'}</h5>
                  <button style={{backgroundColor:'', border:'none', color:'white', width:'40px', borderRadius:'4px'}} type="button" className="close" onClick={closeModal}>
                    <span className='text-dark' aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body ">
                  {isSignUpModal ? (
                    <form onSubmit={handleRegistrationSubmit}>
                          <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="first_name"
                                      name="first_name"
                                      value={registrationData.first_name}
                                      onChange={handleRegistrationChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="last_name"
                                      name="last_name"
                                      value={registrationData.last_name}
                                      onChange={handleRegistrationChange}
                                      required
                                    />
                                  </div>
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
                    <>
                    
                    <form onSubmit={handleLoginSubmit} >
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
                        style={{ backgroundColor: '#121661', borderColor: '#000092', width:'100%' }}
                      >
                        Login
                      </button>
                    </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )} 
          </div>
        </div>
      </nav>

      {flashMessage && (
        <div className="flash-message text-secondary" style={{backgroundColor:'transparent',  fontWeight:'normal'}}>
          {flashMessage.message}
        </div>
    )}
      </>
      )}
      export default NavigationBar;