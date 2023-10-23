import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import '../../static/customFont.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import './Profile.js';
import { Button, Dropdown, Navbar, Nav, Container, Row, Col, NavLink, Form, FormControl } from 'react-bootstrap';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import dash from '../../images/three-dashes.svg';
import SearchResults from './SearchResults';
import Places from './Places'; // Import your Places component
import Blogs from './Blogs'; // Import your Blogs component
// import { useAuth } from "../pages/authenticate/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


function FlashMessage({ message, type }) {
  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

function NavigationBar() {

  const navigate = useNavigate()
  const [flashMessage, setFlashMessage] = useState(null); // Initialize with null
  const [expanded, setExpanded] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseUrl = 'http://127.0.0.1:8000'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Add an event handler to close the navbar when a nav link is clicked and scroll to the top
  const handleNavigationLinkClick = () => {
    setIsMenuOpen(false); // Close the navbar
    // Use JavaScript to scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  


    // Add an event handler to close the navbar when a nav link is clicked

  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // Adjust the maxWidth as needed

// search
  const [searchQuery, setSearchQuery] = useState("");


 // Function to handle search input changes
 const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
};


  // Function to handle the search button click
  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    // Check if searchQuery is not empty before navigating
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      window.location.reload();

    }
  };

useEffect(() => {
  if (flashMessage) {
    const timer = setTimeout(() => {
      setFlashMessage(null); // Remove the flash message after 2 seconds
    }, 2000); 

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
// const [user, setUser] = useState(null);
const authToken = Cookies.get('authToken');
const [user, setUser] = useState({})

const login = async (e) => {
  if (e) {
    e.preventDefault();
  }
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login/`, loginData);
  
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
    const response = await axios.get(`${baseUrl}/api/auth/user/`, {
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
    const response = await axios.get(`${baseUrl}/api/profile/`, {
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
    const response = await axios.post(`${baseUrl}/api/auth/register/`, registrationData);
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
    await axios.post(`${baseUrl}/api/auth/logout/`);
    setIsLoggedIn(false);
    
    // Remove the authToken cookie
    Cookies.remove('authToken', { sameSite: 'None', secure: true });
    setFlashMessage({ message: 'You have successfully logged out', type: 'success' });
    navigate('/')

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
<Navbar className={`what-card-navbar ${expanded ? 'collapsed-navbar' : ''}`} variant="primary" expand="md" style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '2', width: '100%', borderRadius: '0',}}>
  {/* <Container fluid> */}
    <Navbar.Brand className="text-white" as={Link} to="/" >
      <span style={{ fontFamily: 'CustomFont', fontSize: '28px', letterSpacing: '3px' }} className="brand-first-letter">E</span>
      <sub style={{ fontFamily: 'cursive', fontWeight: 'bold', letterSpacing: '2px', fontSize: '16px' }} className="brand-text">nceptics</sub>
    </Navbar.Brand>
    <Navbar.Toggle
       aria-controls="basic-navbar-na"
       style={{ marginRight: '0.5rem', fontSize: '18px', border:'1px solid #a9a9a9', padding:'5px' }}
       onClick={toggleExpanded}
    >     
  {expanded ? <FaTimes style={{fontSize:'20px', color:'#a9a9a9'}}/> : <FaBars style={{fontSize:'20px', color:'#a9a9a9', border:'none', fontWeight:'200'}} />}
</Navbar.Toggle>
    <Navbar.Collapse id="basic-navbar-nav text-center" style={{ zIndex: 999 }}>
    <hr style={{color:'#a9a9a9'}}/>
      <Nav className="mx-auto text-center">
      <li className="nav-items nav-border mx-5">
                <div className="container h-100"> 
                  <div className="d-flex justify-content-center h-100 toggled-link">
                    <div className="searchbar " onClick={handleSearch}>
                      <input className="search_input" type="text" name="" placeholder="Search in places..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                       />
              <a className="search_icon"><FaSearch /></a>
                </div>
                </div>
            </div>

              </li> 
        <li className="nav-items mx-3">
              {/* Close the navbar when this link is clicked */}
              <a style={{ fontFamily: 'sanserif', fontWeight: '200px', letterSpacing: '2px', fontSize: '16px' }} className="nav-link text-white toggled-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-items mx-3">
              {/* Close the navbar when this link is clicked */}
              <a style={{ fontFamily: 'sanserif', fontWeight: '200px', letterSpacing: '2px', fontSize: '16px' }} className="nav-link text-white toggled-link" href="/about">
                About Us
              </a>
            </li>
        <li className="nav-items">
          {/* Close the navbar when this link is clicked */}
          <a style={{ fontFamily: 'arial', fontWeight: '200px', letterSpacing: 'px', fontSize: '16px' }} className="nav-link text-white toggled-lin" href="/places">
                <button className='btn btn-sm what-card-btn mx-3' style={{ backgroundColor: 'green', color: '#fff', fontWeight: 'bolder', padding: '' }}>
                  <span className='mx-2' style={{ padding: '' }}> Book Now </span>
                </button>
              </a>
        </li>
        <li className="nav-items mx-3 ">
          <a onClick={handleNavigationLinkClick} style={{ fontFamily: 'arial', fontWeight: '500px', letterSpacing: '2px', fontSize: '16px', color: 'goldenrod',textDecoration:'none' }} className="nav-link toggled-lik" href="/currencyconverter">
            Currency
          </a>
        </li>
        {isLoggedIn ? (
          <>
                        
                        <li className='nav-items ' style={{listStyleType:'none'}}>
              <a href="/blog">
              <button className="btn btn-sm mt-2 what-card-btn" 
                    style={{borderRadius:'0 20px 20px 20px', fontSize:'11px', color:'rgb(87, 187,87)'}}
                    >
                      <span style={{padding:'10px'}}>
                    <IoMdChatboxes style={{fontSize:'19px'}} /> chat
                    </span>
                    
                  </button> </a>
              </li>
            <li className="nav-items mx-4" style={{ backgroundColor: 'transparent', width: '40px', height: '40px', borderRadius: '100%', listStyleType: 'none', marginTop:'-17px' }}>
  <a className="nav-link text-white" href="/profile">
    {profile && profile.profile_pic && (
      <>
        <img
          src={`http://localhost:8000${profile.profile_pic}`} // Use the full URL
          style={{ width: '40px', height: '40px', borderRadius: '100%' }}
          alt=""
        />
        <div style={{ maxWidth: '30px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', opacity: '.9', fontFamily: 'cursive', letterSpacing: '1px', lineHeight: '1px' }} className='text-white text-center'>{profile && user.username}</span>
        </div>
      </>
    )}
  </a>
</li>
            <li className="nav-items">
          {/* Close the navbar when this link is clicked */}
          <a style={{ fontFamily: 'arial', fontWeight: '200px', letterSpacing: 'px', fontSize: '16px' }} className="nav-link text-white toggled-lin">
                <button onClick={logout} className='btn btn-sm what-card-btn mx-4' style={{ backgroundColor: '#121661', color: '#fff', fontWeight: 'bolder', padding: '' }}>
                  <span className='mx-2' style={{ padding: '', right: 0 }}>Logout</span>
                </button>
              </a>
        </li>
          </>
        ) : (
          <>
                    <span className="nav-items">
          {/* Close the navbar when this link is clicked */}
          <a style={{ fontFamily: 'arial', fontWeight: '200px', letterSpacing: 'px', fontSize: '16px' }} className="nav-link text-white toggled-lin">
                <button onClick={openSignUpModal} className='btn btn-sm what-card-btn' style={{ backgroundColor: '#121661', color: '#fff', fontWeight: 'bolder', padding: '' }}>
                  <span className='mx-2' style={{ padding: '' }}>Sign Up</span>
                </button>
              </a>
      </span>
        <span className="nav-items">
          {/* Close the navbar when this link is clicked */}
          <a style={{ fontFamily: 'arial', fontWeight: '200px', letterSpacing: 'px', fontSize: '16px' }} className="nav-link text-white toggled-lin">
                <button onClick={openLoginModal} className='btn btn-sm what-card-btn ' style={{ backgroundColor: '#121661', color: '#fff', fontWeight: 'bolder', padding: '' }}>
                  <span className='mx-2' style={{ padding: '', right:0 }}>Login</span>
                </button>
              </a>
        </span>
          </>
        )}

        {showModal && (
          <div className="modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="modal-dialog">
              <div className="modal-content what-card-bt text-secondary" style={{ background: '#121661', width: '300px' }}>
                <div className="modal-header">
                  <h5 className="modal-title text-secondary">{isSignUpModal ? 'Sign Up' : 'Login'}</h5>
                  <button style={{ backgroundColor: '', border: 'none', color: 'white', width: '40px', borderRadius: '4px' }} type="button" className="close" onClick={closeModal}>
                    <span className="text-dark" aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body ">
                  {isSignUpModal ? (
                    <form className="m-1" onSubmit={handleRegistrationSubmit}>
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
                        style={{ backgroundColor: '#000092', borderColor: '#000092', width: '100%' }}
                      >
                        Sign Up
                      </button>
                      <hr />
                      <p>Already have an account? <a href="/login">Login</a></p>
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
                          style={{ backgroundColor: '#121661', borderColor: '#000092', width: '100%' }}
                        >
                          Login
                        </button>
                        <hr />
                        <p>Don't have an account? <a href="/signup">SignUp</a></p>
                        <p className="mb-2 text-secondary">
                          <a href="/forgot-password" onClick={closeModal}>Forgot your password?</a>
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Nav>
    </Navbar.Collapse>
  {/* </Container> */}
</Navbar>

      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>{flashMessage.message}</div>
      )}
      </>
      )}
      export default NavigationBar;

















import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import '../../static/customFont.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import './Profile.js';
import { Button, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import SearchResults from './SearchResults';
import Places from './Places'; // Import your Places component
import Blogs from './Blogs'; // Import your Blogs component
// import { useAuth } from "../pages/authenticate/AuthContext";
import { useNavigate, Link } from 'react-router-dom';

function FlashMessage({ message, type }) {
  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

function NavigationBar() {

  const navigate = useNavigate()

  const [flashMessage, setFlashMessage] = useState(null); // Initialize with null

// search
  const [searchQuery, setSearchQuery] = useState("");

  // if (!user) {
  //   // User data is not available, handle this case (e.g., show a loading indicator or login button)
  //   return null; // or return an appropriate component
  // }

  // // Access user properties here
  // const { username } = user;



 // Function to handle search input changes
 const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
};


  // Function to handle the search button click
  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    // Check if searchQuery is not empty before navigating
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

useEffect(() => {
  if (flashMessage) {
    const timer = setTimeout(() => {
      setFlashMessage(null); // Remove the flash message after 2 seconds
    }, 4000); 

    return () => clearTimeout(timer);
  }
}, [flashMessage]);

// const search = async () => {
//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/blogposts/?search=${query}`);
//     const results = response.data;
//     setResults(results);
//   } catch (error) {
//     console.error('Error searching:', error);
//   }
// };


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
// const [user, setUser] = useState(null);
const authToken = Cookies.get('authToken');
const [user, setUser] = useState({})

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
    navigate('/')

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

  // const handleBookNowBtn = (e) =>{
  //   navigate('/places')

  //   // window.location.reload()
  // }
  
  return (
<>
<nav
        className="navbar navbar-expand-lg what-card-navbar mx-2"
        variant="fixed"
        style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '2', width:'99%', top: '0.5rem' }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white mx-2" href="/">
            <span style={{fontFamily:'CustomFont', fontSize:'28px', letterSpacing:'3px'}} className="brand-first-letter">E</span>
            <sub style={{fontFamily:'cursive', fontWeight:'bold', letterSpacing:'2px', fontSize:'16px'}} className="brand-text">nceptics</sub>
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
              <li className="nav-items">
                <div className="container h-100">
                  <div className="d-flex justify-content-center h-100">
                    <div className="searchbar mx-5">
                      <input className="search_input" type="text" name="" placeholder="Search in places..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                       />
              <a className="search_icon"><FaSearch onClick={handleSearch}
          /></a>
        </div>
      </div>
    </div>

              </li> 
            <li className="nav-item">
                <a style={{fontFamily:'sanserif', fontWeight:'200px', letterSpacing:'2px', fontSize:'16px'}} className="nav-link text-white" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
              <a style={{fontFamily:'sanserif', fontWeight:'200px', letterSpacing:'2px', fontSize:'16px'}} className="nav-link text-white" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-items">

              <a style={{fontFamily:'arial', fontWeight:'200px', letterSpacing:'2px', fontSize:'16px'}} className="nav-link text-white" href="/places">

                <button className='btn btn-sm what-card-btn ' style={{backgroundColor:'green', color:'#fff', fontWeight:'bolder', padding:''}}>
                 <span style={{padding:'10px'}}> Book Now</span>
                  </button>
                  </a>

              </li>

              <li>

{/* <SearchBar /> */}

              </li>   

  

              <li className="nav-item mx-2 ">
              <a style={{fontFamily:'cursive', fontWeight:'400', letterSpacing:'1px', fontSize:'16px', color:'goldenrod'}} className="nav-link" href="/currencyconverter">
                  Currency
                </a>
              </li>

              <li>

              </li>


            </ul>

            {!isLoggedIn && ( // Render only if not logged in
          <div>
            {/* <Link to='/signup'> */}
            <button
              type="button"
              className="btn btn-sm m-1 what-card-btn"
              style={{color: '#d9d9d9', border: 'none' }}
              onClick={openSignUpModal}

            >
                                          <span style={{fontFamily:'sans', fontWeight:'200px', letterSpacing:'1px', fontSize:'14px'}} className="nav-link text-white" >

              <span style={{padding:'5px'}}>
              Sign Up 
              </span>
              </span>
            </button>
            {/* </Link> */}

            {/* <Link to='/login'> */}
            <button
              type="button"
              className="btn btn-sm m-1 what-card-btn"
              style={{color: '#d9d9d9', border: 'none' }}
              onClick={openLoginModal}
            >
                            <span style={{fontFamily:'sans', fontWeight:'200px', letterSpacing:'1px', fontSize:'14px'}} className="nav-link text-white" >

              <span style={{padding:'5px'}}>

              Login
                            </span>

              </span>
            </button>
            {/* </Link> */}
          </div>
        )} 

      {isLoggedIn && ( 
            
<>
<div>



</div>
<li>
              <a href="/blog">
              <button className="btn btn-sm  mt-2 what-card-btn" 
                    style={{borderRadius:'0 20px 20px 20px', fontSize:'11px', color:'rgb(87, 187,87)'}}
                    >
                      <span style={{padding:'10px'}}>
                    <IoMdChatboxes style={{fontSize:'19px'}} /> chat
                    </span>
                    
                  </button> </a>
              </li>

              <li className="nav-items mx-4" style={{ backgroundColor: 'transparent', width: '40px', height: '40px', borderRadius: '100%', listStyleType: 'none', marginTop:'-17px' }}>
  <a className="nav-link text-white" href="/profile">
    {profile && profile.profile_pic && (
      <>
        <img
          src={`http://localhost:8000${profile.profile_pic}`} // Use the full URL
          style={{ width: '40px', height: '40px', borderRadius: '100%' }}
          alt=""
        />
        <div style={{ maxWidth: '30px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', opacity: '.9', fontFamily: 'cursive', letterSpacing: '1px', lineHeight: '1px' }} className='text-white text-center'>{profile && user.username}</span>
        </div>
      </>
    )}
  </a>
</li>


                <button
                                type="button"
                                className="btn btn-sm mx-4 what-card-btn"
                                style={{  color: '#d9d9d9', border: 'none'}}
                                onClick={logout}
                              >
 <span style={{fontFamily:'sans', fontWeight:'200px', letterSpacing:'1px', fontSize:'14px'}} className="nav-link text-white">

<span style={{padding:'5px'}}>

Login
              </span>

</span>                                  
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
                      </button> <hr />
                      <p>Already have an account? <a href='/login'>Login</a></p>
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
                      <hr />
                      <p>Don't have an account? <a href='/signup'>SignUp</a></p>
                      <p className='mb-2 text-secondary'>
                        <Link to='/forgot-password' onClick={closeModal}>Forgot your password?</Link>
                      </p>
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