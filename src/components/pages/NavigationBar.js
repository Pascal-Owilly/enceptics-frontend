import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import '../../static/customFont.css';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import './Profile.js';
import {Navbar, Nav } from 'react-bootstrap';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import { useNavigate} from 'react-router-dom';


function NavigationBar() {

  const navigate = useNavigate()
  const [flashMessage, setFlashMessage] = useState(null); // Initialize with null
  const [expanded, setExpanded] = useState(false);

  const baseUrl = 'https://enc.pythonanywhere.com'

   const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
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
    }, 5000); 

    return () => clearTimeout(timer);
  }
}, [flashMessage]);

const [profile, setProfile] = useState([]);

const authToken = Cookies.get('authToken');
const [user, setUser] = useState({})


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

const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication state


const logout = async () => {
  try {
    await axios.post(`${baseUrl}/api/auth/logout/`);
    
    // Remove the authToken cookie
    Cookies.remove('authToken', { sameSite: 'None', secure: true });
    window.location.reload()

    setFlashMessage({ message: 'You have successfully logged out', type: 'success' });
    navigate('/')

  } catch (error) {
    setFlashMessage({ message: 'Failed to logout', type: 'error' });
  }
};

return (
<>
<Navbar className={`what-card-navbar ${expanded ? 'collapsed-navbar' : ''} custom-navbar`} variant="primary" expand="md" style={{ backgroundColor: '#121661', position: 'fixed', zIndex: '2', width: '100%', borderRadius: '0' }}>

        <div className="container-fluid">
          <a className="navbar-brand text-white mx-2" href="/">
            <span style={{fontFamily:'CustomFont', fontSize:'28px', letterSpacing:'3px'}} className="brand-first-letter">E</span>
            <sub style={{fontFamily:'cursive', fontWeight:'bold', letterSpacing:'2px', fontSize:'16px'}} className="brand-text">nceptics</sub>
          </a>

<Nav className="" style={{textAlign:'center'}}>
<Navbar.Toggle
    aria-controls="basic-navbar-na"
    style={{ marginRight: '0.5rem', fontSize: '18px', padding:'5px' }}
    onClick={toggleExpanded}
 >     
{expanded ? <FaTimes style={{fontSize:'20px', color:'#a9a9a9'}}/> : <FaBars style={{fontSize:'20px', color:'#a9a9a9', border:'none', fontWeight:'200'}} />}
</Navbar.Toggle>
<Navbar.Collapse id="basic-navbar-nav" style={{ zIndex: 999}}>
    <hr style={{color:'#a9a9a9'}}/>
         <ul className="navbar-nav">
              <li className="nav-items">
                <div className="container h-100">
                  <div className="d-flex justify-content-center h-100">
                    <div className="searchbar mx-5">
                      <input className="search_input" type="text" name="" placeholder="Search in places..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                       />
              <a className="search_icon" onClick={handleSearch}><FaSearch /></a>
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
                 <span style={{padding:'10px'}}> Destinations</span>
                  </button>
                  </a>
              </li>
              <li className="nav-item mx-2 ">
              <a style={{fontFamily:'cursive', fontWeight:'400', letterSpacing:'1px', fontSize:'16px', color:'goldenrod'}} className="nav-link" href="/currencyconverter">
                  Currency
                </a>
              </li>
              <li>
              <a href="/blog">
              <button className="btn btn-sm  mt-2 mx-4 what-card-btn" 
                    style={{borderRadius:'0 20px 20px 20px', fontSize:'11px', color:'rgb(87, 187,87)'}}
                    >
                      <span style={{padding:'10px'}}>
                    <IoMdChatboxes style={{fontSize:'19px'}} /> chat
                    </span>
                  </button> 
                  </a>
              </li>
            </ul>

        {!isLoggedIn && ( 
          <div>
            <a href='/signup'>
            <button
              type="button"
              className="btn btn-sm m-1 what-card-btn"
              style={{color: '#d9d9d9', border: 'none' }}
            >
              <span style={{fontFamily:'sans', fontWeight:'200px', letterSpacing:'1px', fontSize:'14px'}} className="nav-lin text-white" >
              <span style={{padding:'5px'}}>
              Sign Up 
              </span>
              </span>
            </button>
            </a>
            <a href='/login'>
            <button
              type="button"
              className="btn btn-sm m-1 what-card-btn"
              style={{color: '#d9d9d9', border: 'none' }}
            >
              <span style={{fontFamily:'sans', fontWeight:'200px', letterSpacing:'1px', fontSize:'14px'}} className="nav-lin text-white" >
              <span style={{padding:'5px'}}>
              Login
              </span>
              </span>
            </button>
            </a>
          </div>
        )} 
      {isLoggedIn && ( 
        <>
        <li className="nav-items mx-4" style={{ backgroundColor: 'transparent', width: '40px', height: '40px', borderRadius: '100%', listStyleType: 'none', marginTop:'-33px' }}>
          <a className="nav-link text-white" href="/profile" >
            {profile && profile.profile_pic && (
              <>
                <img
                  src={`${baseUrl}${profile.profile_pic}`} // Use the full URL
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
        <span style={{fontFamily:'sans', fontWeight:'200px', letterSpacing:'1px', fontSize:'14px'}} className="nav-lin text-white">
        <span style={{padding:'5px'}}>
            Logout
        </span>
        </span>                                  
        </button>
         </>
            )} 
          </Navbar.Collapse>
          </Nav>
          </div>
      </Navbar>
      {flashMessage && (
        <div className="flash-message text-secondary" style={{backgroundColor:'transparent',  fontWeight:'normal'}}>
          {flashMessage.message}
        </div>
    )}
      </>
      )}
      export default NavigationBar;