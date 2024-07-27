import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalUsername from './ModalUsername';
import ModalBio from './ModalBio';

const UserAccount = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    profile_pic: ''
  });

  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

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
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        bio: response.data.bio,
        profile_pic: response.data.profile_pic
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col m-2 rounded-xl w-full max-w-2xl bg-customBackground2 text-white">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full">
        <div className="relative bg-purple-700 p-6 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full border-4 border-gray-800"
              src={userData.profile_pic}
              alt={`${userData.username} profile`}
            />
            <div className="ml-4">
              <h1 className="text-xl font-bold">{userData.username}</h1>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-900">
          <h2 className="text-lg font-bold mb-4">My Account</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded">
              <div>
                <p className="text-gray-400 text-xs">DISPLAY NAME</p>
                <p>{userData.name || 'Name not set'}</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded">
              <div>
                <p className="text-gray-400 text-xs">EMAIL</p>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded">
              <div>
                <p className="text-gray-400 text-xs">USERNAME</p>
                <p>{userData.username}</p>
              </div>
              <button 
                className="bg-customBackground2 hover:bg-gray-900 px-3 py-1 rounded text-sm"
                onClick={() => setIsUsernameModalOpen(true)}
              >
                Edit
              </button>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded">
              <div>
                <p className="text-gray-400 text-xs">BIO</p>
                <p>{userData.bio}</p>
              </div>
              <button 
                className="bg-customBackground2 hover:bg-gray-900 px-3 py-1 rounded text-sm"
                onClick={() => setIsBioModalOpen(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ModalUsername
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
        currentUsername={userData.username}
        fetchUserData={fetchUserData}
      />
      <ModalBio
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        currentBio={userData.bio}
        fetchUserData={fetchUserData}
      />
    </div>
  );
};

export default UserAccount;
