import React, { useState, useEffect } from 'react';
import '../../static/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Profile.css';
import { Card, Modal, Button } from 'react-bootstrap';

const Profile = () => {
  const authToken = Cookies.get('authToken');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [editedProfilePic, setEditedProfilePic] = useState(null);
  const [editedProfile, setEditedProfile] = useState({
    profile_pic: null,
    current_city: '',
    bio: '',
    first_name: '',
    last_name: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditProfilePic = (file) => {
    resizeAndSetProfilePic(file);
  };

  const resizeAndSetProfilePic = (file, quality) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Define your desired maximum width here
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
  
        ctx.drawImage(img, 0.6, 0.8, canvas.width, canvas.height);
  
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], 'profile_pic.jpg', {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
  
          setEditedProfilePic(resizedFile);
        }, 'image/jpeg', quality); // Adjust quality (e.g., quality between 0 and 1)
      };
    };
  
    reader.readAsDataURL(file);
  };
  

  const saveProfileChanges = async () => {
    try {
      const formData = new FormData();

      if (editedProfilePic) {
        formData.append('profile_pic', editedProfilePic);
      }

      formData.append('user', user.pk);
      formData.append('current_city', editedProfile.current_city);
      formData.append('bio', editedProfile.bio);
      formData.append('first_name', editedProfile.first_name);
      formData.append('last_name', editedProfile.last_name);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/profile/${profile.id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      setProfile(response.data);
      setShowEditModal(false);
    } catch (error) {
      if (error.response) {
        console.error('Error saving profile changes:', error.response.data);
      } else {
        console.error('Error saving profile changes:', error.message);
      }
    }
  };

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
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data

        },
      });
      const userProfile = response.data;
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserData();
      fetchProfile();
    } else {
      // Handle authentication error
    }
  }, [authToken]);

  const handleEdit = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };
  
  return (
    <>
      <div style={{ backgroundColor: '#121661', height: '100vh' }}>
        {user && Object.keys(profile).length > 0 ? (
          <div className="container bootstrap snippets bootdey">
            <div className="row" style={{ backgroundColor: '#121661', marginTop: '13vh' }}>
              <div className='col-md-3'>
                <h5 className='text-white mt-5 user-heading' style={{ textTransform: '' }}>
                  {user.username ? <span style={{ textTransform: 'capitalize' }}>{user.username}'s</span> : ''}
                  &nbsp; Profile
                </h5>
              </div>
              <div className='col-md-3 '>
                <p style={{}} className='mt-5'>
                  <button onClick={() => setShowEditModal(true)} className="btn btn-link">
                    <i className="fa fa-edit"></i> Edit profile
                  </button>
                </p>
              </div>
              <hr className='text-white' />
              <div className="profile-nav col-md-4">
                <div className="panel" style={{width:'100%', borderRadius:'5px', border:'none'}}>
                  <div className="user-heading" >
                    <img
                      src={`http://localhost:8000${profile.profile_pic}`} // Use the full URL
                      style={{width:'100%', borderRadius:'50%', border:'none'}}
                    />
                  </div>
                </div>
              </div>
              <div className="profile-info col-md-4 mx-2" style={{ color: '#d9d9d9' }}>
                <div className="panel" style={{ backgroundColor: '#121661' }}>
                  <h4>
                    {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : ''}

                  </h4>
                  <span className='text-white'  style={{fontFamily:'cursive', forntSize:'14px'}}> <span className='text-secondary' style={{fontFamily:'cursive', forntSize:'10px'}}>{user.email}</span></span>

                  <hr />  
                </div>
                <div className="panel" style={{ backgroundColor: '#121661' }}>
                  {/* <p className='text-white'>Username : &nbsp; <span className='text-secondary'>{user.username}</span></p> */}

                  {/* Display Bio */}
                  <p className='bio-graph-heading'>Bio : &nbsp;</p>
                  <span className=' bio-graph-info'>{profile.bio}</span>
                  {/* Display Current City */}
                </div>
                <ul className="text-secondary" style={{ listStyleType:'none' }}>
                <hr />

                  <p>
                    <span><a href="#" onClick={() => console.log('/recent-activity')}> <i className="fa fa-user profile-activity"></i> Following <span className="label"></span></a>&nbsp; 12</span>
                    <span className="active mx-4"><a href="#" onClick={() => console.log('Profile page')}> <i className="fa fa-calendar "></i> Wishlist</a></span>

                  </p>
                  <p>
                    <hr />
                    <p className='text-white summary-head'>Current City : &nbsp; <span className='text-secondary'>{profile.current_city}</span></p>

                  </p>
                </ul>
              </div>
              <div className='col-md-3'>
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
            <label htmlFor="profile_pic">Profile Picture</label>
            <input
              type="file"
              id="profile_pic"
              className="form-control"
              onChange={(e) => handleEditProfilePic(e.target.files[0])}
            />
            {editedProfilePic && (
              <img src={URL.createObjectURL(editedProfilePic)} alt="Profile Picture Preview" />
            )}
          </div>
        
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              className="form-control"
              value={editedProfile.bio}
              onChange={(e) => handleEdit('bio', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="current_city">Current City</label>
            <input
              type="text"
              id="current_city"
              className="form-control"
              value={editedProfile.current_city}
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
