import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ModalUpdatePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('No access token found');
      return;
    }

    axios.patch('http://127.0.0.1:8000/api/updateuserpassword', {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setSuccess('Password changed successfully');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    })
    .catch((error) => {
      if (error.response) {
        setError(error.response.data.detail || 'Error changing password');
        setSuccess('');
      }
    });
  };

  if (!isOpen) return null;


  return (
  //   <div className="fixed inset-0 flex items-center justify-center mycontainer z-50">
  //     <div className="relative bg-gray-800 rounded-lg p-6 w-11/12 max-w-md border border-gray-400">
  //       <button
  //         className="absolute top-2 right-2 text-white"
  //         onClick={onClose}
  //       >
  //         <X size={24} />
  //       </button>
  //       <h2 className="text-lg font-bold mb-4 text-white">Change Password</h2>
  //       {error && <p className="text-red-500 mb-4">{error}</p>}
  //       {success && <p className="text-green-500 mb-4">{success}</p>}
  //       <form onSubmit={handlePasswordChange}>
  //         <div className="mb-4">
  //           <label className="block text-white mb-2">Current Password</label>
  //           <input
  //             type="password"
  //             className="w-full p-2 rounded bg-gray-700 text-white"
  //             value={currentPassword}
  //             onChange={(e) => setCurrentPassword(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-white mb-2">New Password</label>
  //           <input
  //             type="password"
  //             className="w-full p-2 rounded bg-gray-700 text-white"
  //             value={newPassword}
  //             onChange={(e) => setNewPassword(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-white mb-2">Confirm New Password</label>
  //           <input
  //             type="password"
  //             className="w-full p-2 rounded bg-gray-700 text-white"
  //             value={confirmPassword}
  //             onChange={(e) => setConfirmPassword(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <button type="submit" className="bg-blue-500 px-4 py-2 rounded w-full text-white">
  //           Change Password
  //         </button>
  //       </form>
  //     </div>
  //   </div>
    <div
      id="authentication-modal"
      tabIndex="-1"
      ariaHidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 max-h-full"
      style={{backgroundColor: 'rgb(17,18,22, 0.83)'}}
    >
      <div className="relative p-4 w-full max-w-md rounded-lg shadow bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-600 ">
          <h3 className="text-xl font-semibold text-white">
            Change Password
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center hover:bg-gray-600 hover:text-white"
            onClick={onClose}
          >
            <X size={24} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-white mb-2">Current Password</label>
              <input
                type="password"
                id="current-password"
                className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-white mb-2">New Password</label>
              <input
                type="password"
                id="new-password"
                className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-white mb-2">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdatePassword;
