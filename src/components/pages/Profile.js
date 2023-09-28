import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import '../../static/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Card } from 'react-bootstrap';
import natpark from '../../images/undraw_trip_re_f724.svg';
import { useNavigate } from 'react-router-dom';
import img from '../../images/about.svg';
import Cookies from 'js-cookie';

import { login, isAuthenticated, logout } from './authenticate/authService'; // Make sure to use the correct path

const Profile = () => {
  const authToken = Cookies.get('authToken');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();

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
      console.log('User Profile Data:', userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserData(); // Fetch user data
      fetchProfile(); // Fetch profile data including the profile picture
      alert()
    }
  }, [authToken]);

  const handleEdit = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const saveProfileChanges = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/${profile.id}/`, editedProfile, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      setProfile(response.data);
      setEditingProfile(false);
    } catch (error) {
      console.error('Error saving profile changes:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#121661', height: '100vh' }}>
        {user && Object.keys(profile).length > 0 ? (
          <div className="container bootstra snippets bootdey">

            <div className="row" style={{ backgroundColor: '#121661', magrginTop:'15vh' }}>

                <div className='row'>
                <div className='col-md-3'>
                <h5 className='text-white mt-5' style={{textTransform:'capitalize'}}>{user.username}'s Profile</h5>

                  </div>
               
                    <div className='col-md-3 '>
                    <p style={{}} className='mt-5'> <a href="#" onClick={() => console.log('/edit-profile')}> <i className="fa fa-edit"></i> Edit profile</a></p>

                    </div>
                  </div>
            

<hr className='text-white'/>
              <div className="profile-nav col-md-3">

                <div className="panel p-3 what-card-price" style={{ border:' 1px solid #d9d9d9', borderRadius:'12px'  }}>
                  <div className="user-heading round">
                    <img
                      src={profile.profile_pic} // Use the profile picture from the profile endpoint
                      alt="Pic"
                      style={{ width: '100%', height: 'auto' }}
                    />
                   
                  </div>

                  {/* Navigation Links */}
                 
                </div>
              </div>

              {/* Right Column - User Info */}
              <div className="profile-info col-md-4 mx-2" style={{color: '#d9d9d9' }}>
                {/* User Bio */}
                <div className="panel" style={{ backgroundColor: '#121661' }}>
                    <h4>{user.first_name} {user.last_name}</h4>
<hr />
                  
                </div>

                {/* Current City */}
                <div className="panel" style={{ backgroundColor: '#121661' }}>
                <p className='text-white'>Username : &nbsp; <span className='text-secondary'>{user.username}</span></p>
                

                  <p className='text-white'>Current City : &nbsp; <span className='text-secondary'>{profile.current_city}</span>
</p>
                </div>

                <p className='text-white'>Bio : &nbsp;<span className='text-secondary'>{profile.bio}</span></p>

                {/* Additional Profile Information */}
              </div>
              <div className='col-md-4'>
        

                  <ul className="text-secondary" style={{listStyleType:'none'}}>
                  <p>  <li><a href="#" onClick={() => console.log('/recent-activity')}> <i className="fa fa-user"></i> Following <span className="label"></span></a>&nbsp; 12</li><hr /></p>
                  <p>  <li className="active"><a href="#" onClick={() => console.log('Profile page')}> <i className="fa fa-calendar"></i> Wishlist</a></li><hr /></p>
                  </ul>
              </div>
            </div>
          </div>
          
        ) : (
          <p style={{ height: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Please login to access your profile...</p>
        )}
      </div>
      
    </>
  );
};

export default Profile;
