import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import './Profile.js';
import { Button, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';

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

const navigate = useNavigate()

useEffect(() => {
  if (flashMessage) {
    const timer = setTimeout(() => {
      setFlashMessage(null); // Remove the flash message after 2 seconds
    }, 3000); // 2 seconds in milliseconds

    return () => clearTimeout(timer);
  }
}, [flashMessage]);


const [registrationData, setRegistrationData] = useState({
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


const login = async (e) => {
  if (e) {
    e.preventDefault();
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
  
    const authToken = response.data.key;

    setIsLoggedIn(true);

    // Store the token in a cookie with an expiration date (e.g., 1 day)
    Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });    
    console.log('Token is', JSON.stringify(response.data))
    console.log(authToken)

    setFlashMessage({ message: `Welcome back ${loginData.username} !`, type: 'success' });
    closeModal();
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
}, []);

const fetchProfile = async () => {
  try {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const response = await axios.get('http://127.0.0.1:8000/profile/profile/', {
        headers: {
          Authorization: `Token ${storedToken}`,
        },
      });
      setProfile(response.data);
    } 
    
    else {
      navigate('/login');
    }
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
    setFlashMessage({ message: `Welcome ${registrationData.username} !`, type: 'success' }); // Set flash message
    closeModal();
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
        className="navbar navbar-expand-lg what-card"
        variant="fixed"
        style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '2', width: '100%', top: 0 }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            <span className="brand-first-letter">E</span>
            <sub className="brand-text">nceptics</sub>
          </a>
          <button
            class="navbar-toggler"
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



              {/* <li>
              <Dropdown className='btn-sm'
                style={{marginRight:'1rem'}}
              >
                <Dropdown.Toggle variant="dark" id="dropdownMenu " style={{marginRight:'', backgroundColor:'transparent', border:'none'}}> 
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
                </li> */}
                <li className="nav-item">
                <a className="nav-link text-white" href="#">
                    <form className='search-form align-right' 
                    // onSubmit={handleSubmit}
                    >
                    <input
                      placeholder='Search...'
                      type="text"
                      // value={query}
                      // onChange={(event) => setQuery(event.target.value)}
                      style={{width:'150px', height:'28px', padding:'10px',backgroundColor:'#d9d9d9'
                    }}
                    />
                      <button
                        className='search-btn d-inline p-1 what-card'
                        style={{
                          borderRadius: '0 25px 25px 25px',
                          width: '55px',
                          // marginLeft: '-3.1rem',
                          fontSize: '11px',
                          height:'25px',
                          fontWeight:'bold',
                          border:'none'
                        }}
                        type="submit"
                      >
                        {/* <FaSearch /> */}
                        Search
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
              <div>
                {profile.map((profile) => (
                  <button className="nav-item"
                    style={{backgroundColor:'transparent', marginRight:'1rem', width: '45px', height:'45px', borderRadius: '100%' }}
                  >
                  <a className="nav-link text-white" href="/profile">
                    <img src={profile.profile_pic} style={{width:'40px',height:'40px', borderRadius:'100%', margin:'auto'}}/>
                   {profile.current_city} 
                   </a>
                   </button> 
                  ))} 
                  </div> 
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
          <div className="modal" style={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
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
                        style={{ backgroundColor: '#000092', borderColor: '#000092', width:'100%' }}
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
        <div className="flash-message" style={{backgroundColor:'#121661',  fontWeight:'normal'}}>
          {flashMessage.message}
        </div>
    )}
      </>
      )}
      export default NavigationBar;