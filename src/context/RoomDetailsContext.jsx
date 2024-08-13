import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RoomDetailsContext = createContext();

export const RoomDetailsProvider = ({ children }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = 'http://127.0.0.1:8000';

  const fetchRoomDetails = async (roomId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${baseURL}/api/room_details/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomDetails(response.data.detail);
    } catch (error) {
      setError('Error fetching the room details');
      console.error('Error fetching the room details: ', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoomDetailsContext.Provider value={{ roomDetails, loading, error, fetchRoomDetails }}>
      {children}
    </RoomDetailsContext.Provider>
  );
};
