import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import '../../static/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Card, Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
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
  const [showEditModal, setShowEditModal] = useState(false); // State to control the modal
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
      setProfile(userProfile);
      console.log('Profile Picture URL:', profile.profile_pic);


    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserData();
      fetchProfile();
    }
    else{
      navigate('/')
    }
  }, [authToken]);

  const handleEdit = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const saveProfileChanges = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/profile/${profile.id}/`, editedProfile, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      setProfile(response.data);
      setEditingProfile(false);
      setShowEditModal(false); // Close the modal after saving
    } catch (error) {
      console.error('Error saving profile changes:', error);
    }
  };

  return (
    <>  
      <div style={{ backgroundColor: '#121661', height: '100vh' }}>
        {user && Object.keys(profile).length > 0 ? (
          <div className="container bootstrap snippets bootdey">
            <div className="row" style={{ backgroundColor: '#121661', marginTop: '' }}>
              <div className='col-md-3'>
                <h5 className='text-white mt-5' style={{ textTransform: 'capitalize' }}>{user.username}'s Profile</h5>
              </div>
              <div className='col-md-3 '>
                <p style={{}} className='mt-5'>
                  <button onClick={() => setShowEditModal(true)} className="btn btn-link">
                    <i className="fa fa-edit"></i> Edit profile
                  </button>
                </p>
              </div>
              <hr className='text-white' />
              <div className="profile-nav col-md-3">

<div className="panel p-3 what-card-price" style={{ border:' 1px solid #d9d9d9', borderRadius:'12px'  }}>
  <div className="user-heading round">
    <img
    
    src={`http://localhost:8000${profile.profile_pic}`} // Use the full URL
    style={{}}
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
          <p style={{ height: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Hang tight...</p>
        )}
      </div>

      {/* Profile Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form fields for editing the profile */}
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              className="form-control"
              value={editedProfile.bio || ''}
              onChange={(e) => handleEdit('bio', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="current_city">Current City</label>
            <input
              type="text"
              id="current_city"
              className="form-control"
              value={editedProfile.current_city || ''}
              onChange={(e) => handleEdit('current_city', e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveProfileChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
