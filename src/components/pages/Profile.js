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

import { login, isAuthenticated, logout } from './authenticate/authService'; // Make sure to use the correct path

const Profile = () => {
  const authToken = isAuthenticated(); // Use AuthService to check if the user is authenticated

  const [profile, setProfile] = useState({});
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();

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
    if (!isAuthenticated) {
      // If not authenticated, navigate to the login page
      navigate('/login');
      console.log(profile)
    } else {
      fetchProfile();
    }
  }, [authToken, navigate]);

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
        <div className="container bootstra snippets bootdey">
          <div className="row" style={{ backgroundColor: '#121661' }}>
            <div className="profile-nav col-md-3" style={{ marginTop: '15vh', backgroundColor: 'rgb(18, 187, 18)' }}>
              <div className="panel" style={{ backgroundColor: '#121661' }}>
                <div className="user-heading round">
                  <div className="user-heading round">
                    <div>
                      <img src={profile.profile_pic} alt="Pic" style={{ width: '100px', height: '100px' }} />
                      <h2>{profile.user}</h2>
                      <p>Current City: {profile.current_city}</p>
                      <p>Bio: {profile.bio}</p>
                    </div>
                  </div>
                </div>

                <ul className="nav nav-pills nav-stacked">
                  <li className="active"><a href="#" onClick={() => console.log('Profile page')}> <i className="fa fa-user"></i> Profile</a></li>
                  <li><a href="#" onClick={() => console.log('/recent-activity')}> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
                  <li><a href="#" onClick={() => console.log('/edit-profile')}> <i className="fa fa-edit"></i> Edit profile</a></li>
                </ul>
              </div>
            </div>
            <div className="profile-info col-md-9 text-center" style={{ marginTop: '12vh', color: '#d9d9d9' }}>
              <div className="panel">
                <p>What's your favorite quote?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
