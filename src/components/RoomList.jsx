import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ onClose, onRoomCreated }) => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleCheckboxChange = () => {
    setIsPublic(!isPublic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRoom = {
      name: roomName,
      description,
      topic,
      is_public: isPublic,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_room', newRoom);
      if (response.data.detail === 'Room created successfully') {
        onRoomCreated(response.data.data);
        onClose();
      } else {
        console.error('Room creation failed:', response.data);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-900 bg-opacity-20 p-6 rounded-lg border border-white max-w-lg mx-4 sm:w-2/3 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-100">Create a New Room</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-600 text-3xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="roomName">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="shadow bg-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter room name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow bg-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="topic">
              Topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="shadow bg-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select the room topic</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="django">Django</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2">Room Type</label>
            <div className="flex items-center">
              <div className="mr-4">
                <input
                  type="checkbox"
                  id="public"
                  checked={isPublic}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="public" className="text-gray-100">Public</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="private"
                  checked={!isPublic}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="private" className="text-gray-100">Private</label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
