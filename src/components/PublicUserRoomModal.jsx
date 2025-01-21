import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PublicUserRoomModal = ({ isOpen, onClose, roomId }) => {
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    topic: '',
    description: '',
    host: '',
    members: [],
    created: '',
    updated: '',
    is_public: false,
    room_pic: '',
  });
  const navigate = useNavigate();

  const baseURL = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('access_token');
      
      axios.get(`${baseURL}/api/room_details/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoomDetails(response.data.detail);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.clear();
            navigate('/login');
          } else {
            console.error('Error fetching the room details: ', error.response.data);
          }
        } else {
          console.error('Error fetching the room details: ', error.message);
        }
      });
    }
  }, [isOpen, roomId]);
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 mycontainer p-4 ">
      <div className="relative bg-gray-700 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 sm:max-w-full sm:w-full border border-gray-400">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">{roomDetails.name}</h2>
        <hr className="border-gray-500 mb-4" />
        <div className="flex flex-col space-y-2">
          <img
            src={`${baseURL}${roomDetails.room_pic}`}
            className="h-24 w-24 sm:h-32 sm:w-32 rounded-full mx-auto mb-4"
          />
          <div className="text-white text-md sm:text-xl">
            <strong>Topic:</strong> {roomDetails.topic}
          </div>
          <div className="text-white  text-md sm:text-xl">
            <strong>Description:</strong> {roomDetails.description || 'No description provided.'}
          </div>
          <div className="text-white  text-md sm:text-xl">
            <strong>Host:</strong> {roomDetails.host}
          </div>
          <div className="text-white  text-md sm:text-xl">
            <strong>Members:</strong> {roomDetails.members.length} members
          </div>
          <div className="text-white text-md sm:text-xl">
            <strong>Created:</strong> {new Date(roomDetails.created).toLocaleDateString()}
          </div>
          <div className="text-white text-md sm:text-xl">
            <strong>Public:</strong> {roomDetails.is_public ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicUserRoomModal;