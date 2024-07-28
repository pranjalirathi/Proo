import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const CreateRoomModal = ({ onClose, refreshRooms }) => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleCheckboxChange = () => {
    setIsPublic(!isPublic);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      let data = new FormData();
      data.append('name', roomName);
      data.append('description', description);
      data.append('topic', topic);

      console.log(topic);
      console.log('helo');
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/create_room',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        data : data
      };
      
      const response = await axios.request(config);
      console.log(response);
      const responseData = response.data;
      console.log(responseData);
    

      if (response.status === 200 && responseData.detail === "Room created successfully") {
        // refreshRooms();
        onClose(); 
      } else {
        console.error('API response is not as expected:', responseData);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  // <input name="room_no" id="room_no" type="number" class="inpt bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
  //                         focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="321" required=""></input>

  return (
    <div className="fixed inset-0 bg-gray-700 shadow bg-opacity-75 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-900 bg-opacity-60 p-6 rounded-lg border border-white max-w-lg mx-4 sm:w-2/3 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-100">Create a New Room</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">
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
              className="shadow bg-gray-600 bg-opacity-40 border-white appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="shadow  bg-gray-600 bg-opacity-40 appearance-none border rounded w-full py-2 px-3 text-gray-300 border-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="topic">
              Topic
            </label>
            <select
              id="topic"
              className="shadow bg-gray-600 bg-opacity-40  appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline "
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="" disabled>Select the room topic</option>
              <option value="java">java</option>
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
              className="
               text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;



