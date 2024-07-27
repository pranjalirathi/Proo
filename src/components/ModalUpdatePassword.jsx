import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ModalUpdatePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('No access token found');
      return;
    }

    try {
      const response = await axios.patch('http://127.0.0.1:8000/api/updateuserpassword', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccess('Password changed successfully');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'Error changing password');
        setSuccess('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-bold mb-4 text-white">Change Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-white mb-2">Current Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded w-full text-white">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdatePassword;
