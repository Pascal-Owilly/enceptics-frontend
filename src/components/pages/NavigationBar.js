import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import axios from 'axios';
import { Button, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
// import placeholderImage1 from '../../images/placeholder1.jpg'; // Import placeholder images
// import placeholderImage2 from '../../images/placeholder2.jpg'; // Import placeholder images
// import placeholderImage3 from '../../images/placeholder3.jpg'; // Import placeholder images

function FlashMessage({ message, type }) {
  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

function NavigationBar() {
  
  const [flashMessage, setFlashMessage] = useState(null); // Initialize with null

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
  const [showModal, setShowModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication state

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
    fetchProfile(); // Fetch profile even if not logged in, in case it's needed for displaying user info.
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {});
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };

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

  const login = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginData);
      setIsLoggedIn(true); // Update authentication state
      localStorage.setItem('authToken', response.data.token); // Store token in localStorage

      setFlashMessage({ message: `Welcome back ${loginData.username} !`, type: 'success' }); // Set flash message
      closeModal();
    } catch (error) {
      setFlashMessage({ message: "That didn't go well!", type: 'error' }); // Set flash message
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/logout/');
      setIsLoggedIn(false); // Update authentication state
      localStorage.removeItem('authToken'); // Remove token from localStorage

      setFlashMessage({ message: 'You have successfully logged out', type: 'success' }); // Set flash message
    } catch (error) {
      setFlashMessage({ message: 'Failed to logout', type: 'error' }); // Set flash message
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
    fontFamily: 'great_vibes',
    fontSize: '20px',
    textDecoration: 'overline',
    textDecorationColor: 'green',
    textDecorationSkipInk: '2rem',
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        variant="fixed"
        style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '2', width: '100%' }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
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
                  <button className='btn btn-sm' style={{ backgroundColor: 'rgb(18, 187, 18)', color: '#121661', fontWeight: 'bolder' }}>
                    Book Now
                  </button>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <form className='search-form align-right'>
                    <input
                      placeholder='Search...'
                      type="text"
                      style={{ width: '160px', height: '28px', padding: '10px' }}
                    />
                    <button
                      className='search-btn d-inline p-1'
                      style={{
                        borderRadius: '0 25px 25px 25px',
                        width: '55px',
                        fontSize: '11px',
                        height: '25px',
                        fontWeight: 'bold',
                      }}
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white " href="/currencyconverter" style={greatvibes}>
                  Currency Converter
                </a>
              </li>
            </ul>
            {!isLoggedIn && ( // Render only if not logged in
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-light m-1"
                  style={{ backgroundColor: 'white', color: '#000092', border: 'none' }}
                  onClick={openSignUpModal}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light m-1"
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
                      style={{ backgroundColor: 'transparent', marginRight: '1rem', width: '45px', height: '45px', borderRadius: '100%' }}
                    >
                      <a className="nav-link text-white" href="/profile">
                        <img src={profile.image} style={{ width: '40px', height: '40px', borderRadius: '100%', margin: 'auto' }} />
                        {profile.user}
                        Profile
                      </a>
                    </button>
                  ))}
                </div>
                <button className="nav-item"
                  style={{ backgroundColor: 'transparent', marginRight: '1rem', border: 'none' }}
                >
                  <a className="nav-link text-white" href="/blog">
                    Join Chat
                  </a>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light ml-4"
                  style={{ backgroundColor: 'white', color: '#000092', border: 'none' }}
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {flashMessage && (
        <div className="flash-message">
          {flashMessage.message}
        </div>
      )}

    </>
  );
}

export default NavigationBar;
