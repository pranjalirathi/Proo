import React, { useState } from 'react';
import axios from 'axios';

const JoinByCode = ({ onClose, onSubmit, roomId }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `http://127.0.0.1:8000/api/join_room/${roomId}`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.detail === 'Added as a member') {
        onSubmit(code);
      } else {
        setError(response.data.detail || 'Invalid code');
      }
    } catch (error) {
      setError('Invalid code or an error occurred');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-customBackground2 bg-opacity-75 z-50 backdrop-filter backdrop-blur-sm rounded-xl">
      <div className="bg-gray-900 bg-opacity-60 border border-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter the code to join this private room</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Code Here"
            className="shadow bg-gray-600 bg-opacity-40 border-white appearance-none rounded border p-2 text-gray-200 mb-4 w-full"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinByCode;
