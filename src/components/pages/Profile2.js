import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/auth/';

export const fetchProfiles = () => {
  return axios.get(`${BASE_URL}profile/`);
};

export const createProfile = (profileData) => {
  return axios.post(`${BASE_URL}profile/`, profileData);
};

export const fetchProfile = (profileId) => {
  return axios.get(`${BASE_URL}profile/${profileId}/`);
};

export const updateProfile = (profileId, profileData) => {
  return axios.put(`${BASE_URL}profile/${profileId}/`, profileData);
};

export const deleteProfile = (profileId) => {
  return axios.delete(`${BASE_URL}profile/${profileId}/`);
};

function ProfilePage() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [formData, setFormData] = useState({
      bio: '',
      avatar: null,
    });
  
    useEffect(() => {
      fetchProfileData();
    }, []);
  
    const fetchProfileData = async () => {
      try {
        const response = await fetchProfiles();
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
  
    const handleCreateProfile = async () => {
      try {
        await createProfile(formData);
        fetchProfileData();
        setFormData({ bio: '', avatar: null });
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    };
  
    const handleUpdateProfile = async () => {
      try {
        await updateProfile(selectedProfile.id, formData);
        fetchProfileData();
        setSelectedProfile(null);
        setFormData({ bio: '', avatar: null });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };
  
    const handleDeleteProfile = async (profileId) => {
      try {
        await deleteProfile(profileId);
        fetchProfileData();
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    };
  
    const handleEditProfile = async (profileId) => {
      try {
        const response = await fetchProfile(profileId);
        setSelectedProfile(response.data);
        setFormData({ bio: response.data.bio, avatar: response.data.avatar });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    return (
      <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        <h2>Profiles</h2>
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              {profile.user.username} - {profile.bio}
              <button onClick={() => handleEditProfile(profile.id)}>Edit</button>
              <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h2>Create / Edit Profile</h2>
        <input
          type="text"
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
        />
        {selectedProfile ? (
          <button onClick={handleUpdateProfile}>Update Profile</button>
        ) : (
          <button onClick={handleCreateProfile}>Create Profile</button>
        )}
      </div>
    );
  }
  
  export default ProfilePage;