import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Card } from 'react-bootstrap';

const ProfileComponent = () => {
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
    <div style={{backgroundColor:'#121661', color:"#ffffff"}} className="team-boxed">
      <div className="container " >
      
        <div className="intro">
        
         
        </div>
        {profile.map((profile) => (
        <div key={profile.user} className="row people m-auto">
          <div className="col-md-4 col-lg-3 item">
            <hr />
          <h4 className="text-center"> {profile.user} </h4>
            <div className="box">
              <img className="rounded" src={profile.image} alt="Profile pic" />
              <h5 className="name text-dark">{profile.user}</h5>
              <p className="title">Entrepreneur</p>
              <p className="description">Aenean tortor est, vulputate quis leo in</p>
              <div className="social">
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 item">
            <hr />
         
            <div className="">
            <h5 className="text-center mt-4">Places Visited </h5>
              <p className="">My aspirations</p>
              
              <div className="social">
              <p>Aenean tortor est, vulputate quis leo in</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 item">
            <hr />
         
            <div className="">
            <h5 className="text-center mt-4">Bucket List </h5>
              <p className="">My aspirations</p>
              
              <div className="social">
              <p>Aenean tortor est, vulputate quis leo in</p>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileComponent;
