import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import '../../static/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Card } from 'react-bootstrap';
import natpark from '../../images/undraw_trip_re_f724.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authenticate/AuthContext'; // Import the useAuth hook

const Profile = () => {
  const { authToken, logout } = useAuth(); // Access the authentication status and logout function
  const [profile, setProfile] = useState({});
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const navigate = useNavigate();


  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/profile/profile/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.log('Profile Data:', response.data);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };

  useEffect(() => {
    if (!authToken) {
      // If not authenticated, navigate to the login page
      navigate('/login');
    } else {
      fetchProfile()
      // navigate('/profile')

    }
  }, [authToken, navigate]);

  const handleEdit = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const saveProfileChanges = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/profile/profile/${profile.id}/`, editedProfile, {
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
        <div className="container bootstra snippets bootdey">
          <div className="row" style={{ backgroundColor: '#121661' }}>
            <div className="profile-nav col-md-3" style={{ marginTop: '12vh', backgroundColor: 'rgb(18, 187, 18)' }}>
              <div className="panel" style={{ backgroundColor: '#121661' }}>
                <div className="user-heading round">
                  <a href="#">
                    <img src={profile.profile_pic} alt="" />
                  </a>
                  <h2>{profile.first_name}</h2>
                  <h1>{profile.current_city}</h1>
                  <p>{profile.created_at}</p>
                </div>

                <ul className="nav nav-pills nav-stacked">
                  <li className="active"><a href="#" onClick={() => console.log('Profile page')}> <i className="fa fa-user"></i> Profile</a></li>
                  <li><a href="#" onClick={() => console.log('/recent-activity')}> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
                  <li><a href="#" onClick={() => console.log('/edit-profile')}> <i className="fa fa-edit"></i> Edit profile</a></li>
                </ul>
              </div>
            </div>
            <div className="profile-info col-md-9" style={{ marginTop: '12vh' }}>
              <div className="panel">
                {/* Profile content */}
                {/* Add your profile content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
