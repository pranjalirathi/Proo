import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ModalUserPubDetails = ({ isOpen, onClose, userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDetails();
    }
  }, [isOpen, userId]);

  const fetchUserDetails = () => {
    const token = localStorage.getItem('access_token');
  
    axios.get(`http://127.0.0.1:8000/api/user_public_details/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.detail);
      setUserDetails(response.data.detail);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
        console.error('Unauthorized: Redirecting to login');
      } else {
        setError(error.response?.data?.detail || "An error occurred");
        console.error('Error fetching user details:', error.response?.data || error.message);
      }
    });
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative"> 
      <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={onClose}>
        <X className="w-6 h-6" />
      </button>
      {error ? (
        <div className="text-red-600">{error}</div>
      ) : userDetails ? (
        <div className="text-black text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              className="w-24 h-24 rounded-full"
              src={userDetails.profile_pic}
              alt={userDetails.username}
            />
            {userDetails.verified && <BlueTick className="ml-2 w-6 h-6" />}
          </div>
          <div className="text-black space-y-2">
            <p className='text-xl font-bold'>@{userDetails.username}</p>
            <p>{userDetails.name}</p>
            <p>{userDetails.bio}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  </div>
);
};

export default ModalUserPubDetails;