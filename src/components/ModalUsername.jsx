import React, { useState } from 'react';
import axios from 'axios';

const ModalUsername = ({ isOpen, onClose, currentUsername, fetchUserData }) => {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [error, setError] = useState(null);

  const handleUpdateUsername = async () => {
    setError(null);
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axios.patch('http://127.0.0.1:8000/api/update_profile', 
      { username: newUsername }, 
      { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserData();
      onClose();
    } catch (error) {
      setError('Error updating username');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-customBackground2 bg-opacity-75 z-50 backdrop-filter backdrop-blur-sm rounded-xl">
      <div className="bg-gray-900 bg-opacity-60 border border-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Username</h2>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="New Username"
          className="shadow bg-gray-600 bg-opacity-40 border-white appearance-none rounded border p-2 text-gray-200 mb-4 w-full"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button type="button" onClick={handleUpdateUsername} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUsername;
