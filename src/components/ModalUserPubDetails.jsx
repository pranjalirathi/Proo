import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalUserPubDetails = ({ isOpen, onClose, userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDetails();
    }
  }, [isOpen, userId]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('access_token'); 
      const response = await axios.get(`http://127.0.0.1:8000/api/user_public_details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.detail);
      setUserDetails(response.data.detail);
    } catch (error) {
      setError(error.response?.data?.detail || "An error occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
          Close
        </button>
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : userDetails ? (
          <div className="text-black">
            <div className="flex items-center justify-center mb-4">
              <img
                className="w-24 h-24 rounded-full"
                src={userDetails.profile_pic}
                alt={userDetails.username}
              />
              {userDetails.verified && <BlueTick className="ml-2 w-6 h-6" />}
            </div>
            <div className="text-left text-black">
              <p><strong>Username:</strong> {userDetails.username}</p>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Bio:</strong> {userDetails.bio}</p>
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


// -------------------------------------------------


                // circular profile pic {BlueTick}           


// ----------------------------------------------------

//   Username :      username
//   Name :          name of the user
//   Bio:            bio of the user

// -----------------------------------------------------
