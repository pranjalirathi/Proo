import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';
import ReactDOM from 'react-dom';

const RoomDetails = ({ roomDetails, onClose }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.get('http://127.0.0.1:8000/api/user_detail', config);
        const userDetails = response.data;
        setIsAdmin(userDetails.username === roomDetails.host);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [roomDetails.host]);

  const handleDeleteRoom = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete_room/${roomDetails.id}`, config);
      if (response.status === 200) {
        setSuccessMessage('Room deleted successfully');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/test');
          onClose();
        }, 2000);
      } else {
        alert('Failed to delete the room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('An error occurred while trying to delete the room');
    }
  };

  const calculateDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  const formatDaysAgo = (dateString) => {
    const daysAgo = calculateDaysAgo(dateString);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  };

  return (
    <div>
      {successMessage && ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Success!</span> {successMessage}
        </div>,
        document.body
      )}
    <div className="bg-customBackground1 text-white p-2 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md relative">
      <button className="absolute top-1 right-1 text-gray-400 hover:text-gray-200" onClick={onClose}>
        <X size={18} />
      </button>
      
      <div className="flex items-center mb-4">
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Host: </span>
        {roomDetails.host}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Topic: </span>
        {roomDetails.topic}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Description: </span>
        {roomDetails.description}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Members: </span>
        {roomDetails.member_count}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Created: </span>
        {formatDaysAgo(roomDetails.created)}
      </div>
      <div className="flex justify-end pr-2 pb-2">
      {isAdmin && (
        <button
          onClick={handleDeleteRoom}
          className="text-white right-0 bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2.5 mt-4"
        >
          Delete Room
        </button>
      )}
      </div>
    </div>
    </div>
  );
};

export default RoomDetails;
