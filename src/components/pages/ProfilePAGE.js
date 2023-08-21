import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import '../../static/Styles.css'
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
    <>
    <div style={{}} className="team-boxed">
    {profile.map((profile) => (
        <div className='user-profile' style={{height:'100vh'}}>
        <div key={profile.user} className='container '>
            
            <div className='row'>
                <div className='col-md-5'>
                <div className='user-avatar'>
                        <img src={profile.image} style={{width:'100px',height:'100px', borderRadius:'50%'}}/>
                    </div>
                    <div className='user-header'>

                        <div className='user-info'>
                            <h1>{profile.username}</h1>
                            <p>Travel Enthusiast</p>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between', width:'120px'}}>
                        <div className='user-following'>
                    <span style={{fontSize:'11px'}} className='user-'>Following</span>
                        {/* Grt followers */}
                    </div>
                <div className='user-followers'>
                        <span style={{fontSize:'11px'}} className='user-'>Followers</span>
                        {/* Map through */}
                </div>
                </div>

                        </div>
                </div>

                <div className='col-md-4'>
                <div className='user-activity'>
                        <h2 className='user-h2'>Recent Trips</h2>
                        {/* Map to fetch apis */}
                </div>
            </div>
            
            <div className='col-md-3'>
            <div className='user-liked-destinations'>
                        <h2 className='user-h2'>Liked Destinations</h2>
                        {/* Map to fetch apis */}
                </div>  
            </div>
        </div>
        </div>
        </div>
        ))}

        </div>
        
      
    
    </>
  );
};

export default ProfileComponent;
