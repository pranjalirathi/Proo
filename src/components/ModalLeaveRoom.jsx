import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalLeaveRoom = ({ roomId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const baseURL = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (isOpen) {
      setError(null); 
    }
  }, [isOpen]);

  const handleLeaveRoom = async () => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(
      `${baseURL}/api/leave_room/${roomId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      onClose();
      navigate('/test', { state: { successMessage: 'You have successfully left the room!', action: 'leave' } });
    } else if(response.status === 400) {
      setError('Host cannot leave the room');
      console.error('Failed to leave the room, unexpected status:', response.status);
    }
  } catch (error) {
    setError('Host cannot leave the room');
    console.error('Error leaving the room: ', error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};
  

  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      ariaHidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 max-h-full"
      style={{backgroundColor: 'rgb(17,18,22, 0.83)'}}
    >
      <div className="relative  p-4 w-full max-w-md max-h-full ">
        <div className="relative bg-gray-700 rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              ariaHidden="true"
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
              className="mx-auto mb-4 w-12 h-12 text-gray-200"
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
            <h3 className="mb-5 text-lg font-normal text-gray-400">
              Are you sure you want to leave this room?
            </h3>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              onClick={handleLeaveRoom}
              type="button"
              disabled={loading}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              {loading ? 'Leaving...' : "Yes, I'm sure"}
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

export default ModalLeaveRoom;
