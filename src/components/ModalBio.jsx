import React, { useState } from 'react';
import axios from 'axios';

const ModalBio = ({ isOpen, onClose, currentBio, fetchUserData }) => {
  const [newBio, setNewBio] = useState(currentBio);

  const handleUpdateBio = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axios.patch('http://127.0.0.1:8000/api/update_profile', 
      { bio: newBio }, 
      { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserData();
      onClose();
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Update Bio</h2>
        <input
          type="text"
          className="bg-gray-700 p-2 rounded w-full"
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-red-600 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 px-4 py-2 rounded" onClick={handleUpdateBio}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBio;
