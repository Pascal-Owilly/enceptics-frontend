import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import '../../static/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Card } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';
import natpark from '../../images/undraw_trip_re_f724.svg';

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };

  const handleEdit = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const saveProfileChanges = async () => {
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/auth/profile/', editedProfile);
      setProfile(response.data);
      setEditingProfile(false);
    } catch (error) {
      console.error('Error saving profile changes:', error);
    }
  };

  return (
<>
<div style={{backgroundColor:'#121661', height:'100vh'}}>

<div className="container bootstra snippets bootdey" >
<div className="row" style={{backgroundColor: '#121661'}}>
  <div className="profile-nav col-md-3" style={{marginTop:'12vh', backgroundColor: 'rgb(18, 187, 18)'}}>

      <div key={profile.user} className="panel" style={{backgroundColor: '#121661'}}>
          <div className="user-heading round">
              <a href="#">
                  <img src={natpark} alt="" />
              </a>
              <h1>Pascal Owilly</h1>
              <p>owillypascal@gmail.com</p>
          </div>

          <ul className="nav nav-pills nav-stacked">
              <li className="active"><a href="#"> <i class="fa fa-user"></i> Profile</a></li>
              <li><a href="#"> <i className="fa fa-calendar"></i> Recent Activity <span class="label label-warning pull-right r-activity">9</span></a></li>
              <li><a href="#"> <i className="fa fa-edit"></i> Edit profile</a></li>
          </ul>
      </div>
   
  </div>
  <div className="profile-info col-md-9" style={{marginTop:'12vh'}}>
      <div className="panel">
          {/* <form>
              <textarea placeholder="Whats in your mind today?" rows="2" className="form-control input-lg p-text-area"></textarea>
          </form> */}

      </div>
      <div className="panel" style={{marginTop:'1vh'}}>
          <div className="bio-graph-heading">
              I find it interesting moving to new places. Am like a little bird exploring other teritories
          </div>
          <div className="panel-body bio-graph-info">
              <h1>Bio </h1>
              <div className="row">

                  <div className="bio-row">
                      <p><span>Country </span>: Kenya</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Birthday</span>: July 13</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Occupation </span>: UI Designer</p>
                  </div>
              </div>
          </div>
      </div>
      <div>

          </div>
      </div>
  </div>
</div>
</div>
</>
);
};


export default Profile;