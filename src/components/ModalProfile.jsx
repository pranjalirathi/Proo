import React from 'react';

const ModalProfile = ({ username, bio, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-500">👤</span>
          </div>
          <div className="ml-4">
            <div className="text-xl font-bold">{username}</div>
            <div className="text-sm text-gray-600">@username</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Bio:</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="3"
            value={bio}
            readOnly
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2">
          Update Password
        </button>
        <button className="w-full bg-green-500 text-white py-2 rounded-lg mb-2">
          Update Profile Pic
        </button>
        <button className="w-full bg-red-500 text-white py-2 rounded-lg" onClick={onClose}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ModalProfile;