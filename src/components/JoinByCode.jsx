import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';

const JoinByCode = ({ onClose, onSubmit, roomId }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    console.log(e.target.value);
  };
  console.log("Here is my: ", roomId);
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
      if (response.status===200){
        navigate(`/roomchat/${roomId}`);
      }
      else {
        setError(response.data.detail || 'Invalid code');
      }
    } catch (error) {
      setError('Enter the code above');
    }
  };

  return (
    <div className="fixed inset-0 shadow flex items-center justify-center mycontainer z-50 rounded-xl">
      <div className="bg-customBackground2 bg-opacity-85 border border-gray-400 p-8 rounded shadow-xl">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-medium mt-2 text-white mb-4">Enter the code to join this private room</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Code Here"
            className="inpt bg-gray-600 text-gray-200 bg-opacity-40 border-gray-400 appearance-none rounded border p-2 mb-4 w-full focus:ring-blue-500 focus:border-blue-500"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium text-white py-2 px-4 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinByCode;
