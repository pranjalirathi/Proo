import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = ({ onClose }) => {
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    profile_pic: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token'); 
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_detail', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData({
          username: response.data.username,
          bio: response.data.bio,
          profile_pic: response.data.profile_pic
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleAccountSettings = () => {
    navigate('/myAccount');
  };

  const isAccountPage = location.pathname === '/myAccount';

  return (
    <div className="relative max-w-sm left-4 mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg my-5">
      <div className="relative bg-logoColour3 h-20">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          ×
        </button>
        <div className="absolute -bottom-10 left-4">
          <img
            className="w-20 h-20 rounded-full border-4 border-gray-800"
            src={userData.profile_pic}
            alt={`${userData.username} profile`}
          />
        </div>
      </div>
      <div className="mt-5 p-4">
        <div className="mt-4">
          <h2 className="text-gray-400 text-sm font-bold">Username</h2>
          <h1 className="text-white text-xl font-bold">@{userData.username}</h1>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-400 text-sm font-bold">Bio</h2>
          <p className="text-gray-100 text-sm mt-1">{userData.bio}</p>
        </div>
        <div className="mt-4">
          <button
            className={`w-full text-left ${isAccountPage ? 'text-gray-200' : 'text-gray-400 hover:text-logoColour3'} mt-2`}
            onClick={handleAccountSettings}
          >
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


//purple-700