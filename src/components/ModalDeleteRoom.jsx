import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalDeleteRoom = ({ roomId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setError(null); 
    }
  }, [isOpen]);

  const handleDeleteRoom = async () => {
    setLoading(true);
    setError(null);
  
    const token = localStorage.getItem('access_token');
    
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/api/delete_room/${roomId}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          onClose();
          navigate('/test', { state: { successMessage: 'Room deleted successfully!', action: 'delete' } });
        } else if(response.status === 400) {
          setError('You are not allowed to delete the room');
          console.error('Failed to delete the room, unexpected status:', response.status);
        } else{
          setError('Some unexpected error ooccured');
        }
      })
      .catch((error) => {
        setError('Error deleting the room');
        console.error('Error deleting the room: ', error.response?.data || error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 max-h-full"
      style={{backgroundColor: 'rgb(17,18,22, 0.83)'}}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-300 dark:text-gray-400">
              Are you sure you want to delete this room?
            </h3>
            {error && <p className="text-red-600">{error}</p>}
            <button
              onClick={handleDeleteRoom}
              type="button"
              disabled={loading}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              {loading ? 'Deleting...' : "Yes, I'm sure"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 ml-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteRoom;

  
