import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import '../../static/customFont.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import './Profile.js';
import { Button, Dropdown, Navbar, Nav, Container, Row, Col, NavLink, Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
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

   const toggleExpanded = () => {
    setExpanded(!expanded);
  };


    // Add an event handler to close the navbar when a nav link is clicked

  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // Adjust the maxWidth as needed

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

 
  
  return (
<>
<Navbar className='mx-2 what-card-navbar' variant="primary" expand="md" style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '2', width: '98.5%', top: '0.4rem', borderRadius:'0' }}>
        <Container fluid>
          <Navbar.Brand className='text-white mx-2' as={Link} to="/">
          <span style={{fontFamily:'CustomFont', fontSize:'28px', letterSpacing:'3px'}} className="brand-first-letter">E</span>
            <sub style={{fontFamily:'cursive', fontWeight:'bold', letterSpacing:'2px', fontSize:'16px'}} className="brand-text">nceptics</sub>
        
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: '1rem', fontSize: '14px'}} />
          <Navbar.Collapse id="basic-navbar-nav text-center" style={{transition:'1s ease', zIndex: 999}}>
            <Nav className="mx-auto text-center" >
            <Form inline className="container h-100">
  <FormControl
    type="text"
    className="search_input" // Apply the same class as in the li element
    placeholder="Search in places..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <FaSearch
    className="search_icon"
    onClick={handleSearch}
  />
</Form>

              <Nav.Link as={Link} to="/" exact className='text-white' style={{ fontFamily: 'sanserif', fontWeight: '200px', letterSpacing: '2px', fontSize: '16px' }}>

                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ fontFamily: 'sanserif', fontWeight: '200px', letterSpacing: '2px', fontSize: '16px', color:'white' }}>
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/places" style={{ fontFamily: 'sanserif', fontWeight: '200px', letterSpacing: '2px', fontSize: '16px', color:'white' }}>
              <button className='btn btn-sm what-card-btn ' style={{ backgroundColor: 'green', color: '#fff', fontWeight: 'bolder', padding: '' }}>
                  <span style={{ padding: '10px' }}> Book Now</span>
                </button>              
                </Nav.Link>
              <Nav.Link as={Link} to="/currencyconverter" style={{ fontFamily: 'sanserif', fontWeight: '200px', letterSpacing: '2px', fontSize: '16px', color:'goldenrod' }}>
                Currency
              </Nav.Link>
            </Nav>

            {isLoggedIn ? (
              <>
                <Nav.Link as={NavLink} to="/blog">
                  <Button variant="info">
                    <IoMdChatboxes /> Chat
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  <img
                    src={`http://localhost:8000${profile.profile_pic}`}
                    alt=""
                    style={{ width: '40px', height: '40px', borderRadius: '100%' }}
                  />
                  <span className="text-white">{profile && user.username}</span>
                </Nav.Link>
                <Button variant="outline-light" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" onClick={openSignUpModal}>
                  Sign Up
                </Button>
                <Button variant="outline-light" onClick={openLoginModal}>
                  Login
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>{flashMessage.message}</div>
      )}
      </>
      )}
      export default NavigationBar;