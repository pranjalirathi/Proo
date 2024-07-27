import React, { useState } from 'react';
import axios from 'axios';

const ModalDeactivateUser = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete('http://127.0.0.1:8000/api/delete', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      onClose();
    } catch (err) {
      setError('Failed to delete account.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Account</h2>
        <p className="text-gray-400 mb-4">Are you sure you want to deactivate your account?</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-600 rounded text-white"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-600 rounded text-white"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeactivateUser;
