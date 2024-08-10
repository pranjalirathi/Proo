import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


const CreateRoomModal = ({ onClose, refreshRooms }) => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/topics');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

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
      data.append('topic', topic?topic:"Others");
      data.append('is_public', isPublic);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/create_room',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };

      const response = await axios.request(config);
      const responseData = response.data;

      console.log('API response: ', responseData);

      if (response.status === 200 && response.data.detail === "Room created successfully") {
        console.log('closing modal');
        // refreshRooms();
        onClose();
      } else {
        console.error('API response is not as expected:', responseData);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    setDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 shadow z-50 flex items-center justify-center mycontainer">
      <div className="relative bg-black border border-gray-400 p-6 w-full max-w-md max-h-full mycontainer rounded-xl">
        <div className="relative flex justify-between items-center mb-4 mycontainer">
          <h2 className="text-xl font-medium text-white">Create a New Room</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-100 text-3xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="roomName">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              required
              className="inpt border border-gray-400 text-gray-100 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              required
              className="inpt bg-gray-50 border border-gray-400 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="topic">
              Topic
            </label>
            <button
              type="button"
              onClick={toggleDropdown}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-50"
            >
              {topic ? topic : "Select the room topic"}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-gray-700  rounded-lg mt-2 w-full">
                {topics.map((t) => (
                  <div key={t.name} className="cursor-pointer px-4 py-2 hover:bg-gray-300 rounded-lg">
                    <label className="flex items-center cursor-pointer w-full text-white hover:text-black font-medium">
                      <input
                        type="radio"
                        name="topic"
                        value={t.name}
                        checked={topic === t.name}
                        onChange={handleTopicChange}
                        className="mr-2"
                      />
                      {t.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">Room Type</label>
            <div className="flex items-center">
              <div className="mr-4">
                <input
                  type="checkbox"
                  id="public"
                  checked={isPublic}
                  onChange={handleCheckboxChange}
                  className="mr-2 rounded-lg"
                />
                <label htmlFor="public" className="text-sm font-medium text-white">Public</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="private"
                  checked={!isPublic}
                  onChange={handleCheckboxChange}
                  className="mr-2 rounded-lg"
                />
                <label htmlFor="private" className="text-sm font-medium text-white">Private</label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="
               w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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


