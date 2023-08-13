import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
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
    <div className="team-boxed">
      <div className="container">
        <div className="intro">
          {profile.map((profile) => (
            <Card className="mt-3" key={profile.user} style={{ width: '100%', margin: 'auto' }}>
              <div>
                <div className="col-md-8">
                  <Card.Body>
                    <Card.Text>
                      <img src={profile.image} style={{ width: '100%' }} alt="Profile" />
                    </Card.Text>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={editedProfile.user || profile.user}
                        onChange={(e) => handleEdit('user', e.target.value)}
                      />
                    ) : (
                      <Card.Text style={{}}>
                        <h3></h3> {profile.user}
                      </Card.Text>
                    )}
                    <div>
                      <Card.Text style={{}}></Card.Text>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))}
          <h2 className="text-center">Your Profile </h2>
          <p className="text-center">Nunc luctus in metus eget fringilla. Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet vitae.</p>
          {editingProfile ? (
            <button className="btn btn-primary" onClick={saveProfileChanges}>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditingProfile(true)}>
              Edit Profile
            </button>
          )}
        </div>
        <div className="row people">
          <div className="col-md-6 col-lg-4 item">
            <div className="box">
              <img className="rounded-circle" src="assets/img/1.jpg" alt="Ben Johnson" />
              <h3 className="name">Pascal Owilly</h3>
              <p className="title">Musician</p>
              <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo suscipit id. Etiam dictum feugiat tellus, a semper massa.</p>
              <div className="social">
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
