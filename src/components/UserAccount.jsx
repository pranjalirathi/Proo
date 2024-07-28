import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const UserAccount = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    profile_pic: ''
  });

  const [editMode, setEditMode] = useState({
    name: false,
    username: false,
    bio: false
  });

  const [inputValues, setInputValues] = useState({
    name: '',
    username: '',
    bio: ''
  });

  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const bioRef = useRef(null);

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
      setInputValues({
        name: response.data.name,
        username: response.data.username,
        bio: response.data.bio
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async (field) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axios.patch(
        'http://127.0.0.1:8000/api/update_profile',
        { [field]: inputValues[field] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchUserData();
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (nameRef.current && !nameRef.current.contains(event.target)) {
      if (editMode.name) handleSave('name');
      setEditMode((prev) => ({ ...prev, name: false }));
    }
    if (usernameRef.current && !usernameRef.current.contains(event.target)) {
      if (editMode.username) handleSave('username');
      setEditMode((prev) => ({ ...prev, username: false }));
    }
    if (bioRef.current && !bioRef.current.contains(event.target)) {
      if (editMode.bio) handleSave('bio');
      setEditMode((prev) => ({ ...prev, bio: false }));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode]);

  return (
    <div className="flex flex-col m-2 rounded-xl w-full max-w-2xl bg-customBackground1 text-white backdrop-blur">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full">
        <div className="relative bg-logoColour3 p-6 flex justify-between items-center">
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
        <div className="p-6 bg-customBackground1">
          <h2 className="text-lg font-bold mb-4">My Account</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded">
              <div ref={nameRef} className="flex-1">
                <p className="text-gray-400 text-xs">DISPLAY NAME</p>
                {editMode.name ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValues.name}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          name: e.target.value
                        }))
                      }
                      className="bg-gray-700 border-l-0 border-r-0 border-t-0 text-white p-2 rounded w-full"
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                      onClick={() => handleSave('name')}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p>{userData.name || 'Name not set'}</p>
                )}
              </div>
              {!editMode.name && (
                <button
                  className="bg-customBackground2 hover:bg-gray-900 px-3 py-1 rounded text-sm ml-2"
                  onClick={() =>
                    setEditMode((prev) => ({
                      ...prev,
                      name: !prev.name
                    }))
                  }
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded ">
              <div>
                <p className="text-gray-400 text-xs">EMAIL</p>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded ">
              <div ref={usernameRef} className="flex-1">
                <p className="text-gray-400 text-xs">USERNAME</p>
                {editMode.username ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValues.username}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          username: e.target.value
                        }))
                      }
                      className="bg-gray-700 text-white p-2 rounded w-full border-l-0 border-r-0 border-t-0"
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                      onClick={() => handleSave('username')}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p>{userData.username}</p>
                )}
              </div>
              {!editMode.username && (
                <button
                  className="bg-customBackground2 hover:bg-gray-900 px-3 py-1 rounded text-sm ml-2"
                  onClick={() =>
                    setEditMode((prev) => ({
                      ...prev,
                      username: !prev.username
                    }))
                  }
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded">
              <div ref={bioRef} className="flex-1">
                <p className="text-gray-400 text-xs">BIO</p>
                {editMode.bio ? (
                  <div className="relative">
                    <textarea
                      value={inputValues.bio}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          bio: e.target.value
                        }))
                      }
                      className="bg-gray-700 text-white p-2 rounded w-full border-l-0 border-r-0 border-t-0"
                      rows="3"
                      maxLength="155"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-400 text-sm">{inputValues.bio.length}/155</span>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                        onClick={() => handleSave('bio')}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{userData.bio}</p>
                )}
              </div>
              {!editMode.bio && (
                <button
                  className="bg-customBackground2 hover:bg-gray-900 px-3 py-1 rounded text-sm ml-2"
                  onClick={() =>
                    setEditMode((prev) => ({
                      ...prev,
                      bio: !prev.bio
                    }))
                  }
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
