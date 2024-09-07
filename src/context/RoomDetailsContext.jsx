import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const RoomDetailsContext = createContext();

export const RoomDetailsProvider = ({ children }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = 'http://127.0.0.1:8000';

  const fetchRoomDetails = useCallback(async (roomId) => {
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
      const errorMessage = error.response?.data?.message || 'Error fetching the room details';
      setError(errorMessage);
      console.error('Error fetching the room details: ', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  return (
    <RoomDetailsContext.Provider value={{ roomDetails, loading, error, fetchRoomDetails }}>
      {children}
    </RoomDetailsContext.Provider>
  );
};
