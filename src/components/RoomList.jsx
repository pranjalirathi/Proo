import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalUserPubDetails from './ModalUserPubDetails';
import Modal from './CreateRoomModal';
import JoinByCode from './JoinByCode';
import { Search} from 'lucide-react';
import  BlueTick from '../assets/blueTick.svg';

const RoomList = ({ isSearchActive, selectedTopic }) => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);
  const [loading, setLoading] = useState(true);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const baseURL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseURL}/api/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: selectedTopic,
          },
        });
        if (response.data.detail && Array.isArray(response.data.detail)) {
          setRooms(response.data.detail);
          setSearchResults(response.data.detail);
        } else {
          console.error('API response does not contain an array:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };
  
    fetchRooms();
  
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedTopic]);
  

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.detail) {
          // console.log(response.data.detail);
          setSearchResults(response.data.detail.rooms);
          setUserSearchResults(response.data.detail.users);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults(rooms);
      setUserSearchResults([]);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleJoinModal = (room) => {
    if (!room.is_member) {
      setSelectedRoom(room);
      setShowJoinModal(true);
    }
    else if (!room.is_member && room.is_public) {
      setSelectedRoom(room);
      setShowJoinModal(true);
    }
  };

  const handleJoinByCode = async (code) => {
    try {
      console.log("From RoomList: ", selectedRoom.id);
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`http://127.0.0.1:8000/api/join_room/${selectedRoom.id}`, { code }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.detail === 'Added as a member') {
        navigate(`/roomchat/${selectedRoom.id}`);
        setShowJoinModal(false);
      } 
      if(response.data.detail === 'Already a member'){
        navigate(`/roomchat/${selectedRoom.id}`);
        setShowJoinModal(false);
      }
      else {
        alert('Invalid code. Please try again.');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Invalid code. Please try again.');
    }
  };

  const calculateDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="w-full mr-2 mt-2 rounded-lg flex flex-col h-screen bg-customBackground2 text-white p-4 overflow-auto">
      {isSearchActive && (
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full p-2 rounded-full bg-customBackground1 text-white pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl mt-1 font-bold sm:text-xl">Rooms</h1>
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-3xl h-12 w-12 flex items-center justify-center transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {loading ? (
        <div role="status" className="max-w-full p-2 space-y-2 border border-gray-500 divide-y divide-gray-500 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-500 rounded-full dark:bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-500 rounded-full dark:bg-gray-700"></div>   
              </div>
              <div className="relative top-0 right-1">
                  <svg className="w-6 h-6 mb-3 text-gray-500 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                  <div className="h-2.5 bg-gray-500 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
            </div>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      ) : searchResults.length > 0 ? (
        searchResults.map((room) => (
          <div
            key={room.id}
            className={`border border-gray-600 p-4 mb-4 rounded-lg bg-customBackground1 sm:p-3 sm:mb-3 ${isMobile ? 'p-2 mb-2' : ''}`}
          >
            <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-1">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className={`bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center mr-3 sm:h-8 sm:w-8 sm:mr-2 ${isMobile ? 'h-8 w-8' : ''}`}>
                  <img
                    className="rounded-full h-full w-full object-cover"
                    src={room.room_pic}
                    alt={room.name}
                  />
                </div>
                <div className="max-w-full truncate">
                  <h2 className={`text-lg font-bold sm:text-base ${isMobile ? 'text-xs' : ''} truncate`}>{room.name}</h2>
                  <p className={`text-sm text-gray-400 sm:text-xs ${isMobile ? 'text-xs' : ''}`}>by @{room.host}</p>
                </div>
              </div>
              {!isMobile && (
                <div className="flex items-center">
                  <div className="flex items-center">
                    {room.members.length > 0 ? (
                      <div className="flex items-center">
                        <div className="flex -space-x-2 rtl:space-x-reverse ml-2 sm:ml-4">
                          {room.members.slice(0, 5).map((member) => (
                            <img
                              key={member.id}
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full dark:border-gray-800"
                              src={`${baseURL}`+member.profile_pic}
                              alt={member.username}
                            />
                          ))}
                          {room.members.length > 5 && (
                            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full dark:border-gray-800">
                              +{room.members.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm sm:text-xs ml-2">0 members</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
              {!isMobile && (
                <p className="text-sm text-gray-400 sm:text-xs">Created {calculateDaysAgo(room.created)} days ago</p>
              )}
              <div className="flex items-center mt-2 sm:mt-0">
                <span className={`text-sm mr-2 ${room.is_public ? 'text-yellow-400' : 'text-red-400'} sm:text-l ${isMobile ? 'text-xs' : ''}`}>
                  {room.is_public ? 'Public' : 'Private'}
                </span>
                <button
                  className={`font-bold py-1 px-3 rounded sm:py-0.5 sm:px-2 sm:text-xs ${isMobile ? 'py-0.5 px-0.5 text-xs' : ''} ${room.is_public ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-700'}`}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (room.is_member){
                      navigate(`/roomchat/${room.id}`);
                    }
                     else {
                      toggleJoinModal(room);
                    }
                  }}
                >
                  {room.is_member ? 'Open' : 'Join'}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-400">Oopsi! No rooms available for this topic</p>
        </div>
      )}


{isSearchActive && userSearchResults.length > 0 && (
  <div className="mt-4">
    <h2 className="text-xl font-bold mb-2">Users</h2>
    <div className="flex overflow-x-scroll space-x-4 p-2 no-scrollbar">
      {userSearchResults.map((user) => (
        <div key={user.id} className="relative h-35 w-32 bg-customBackground1 rounded-lg flex flex-col items-center overflow-hidden" 
        >
          <div className="w-full h-12 bg-logoColour3"></div>
          <div className="relative -mt-10">
            <img
              className="w-16 mt-4 h-16 rounded-full"
              src={`${baseURL}${user.profile_pic}`}
              alt={`${user.username} profile`}
            />
          </div>
          <div className="mt-2 mb-5 text-center">
            {/* <h2 className="text-gray-400 text-sm font-bold">Username</h2> */}
            <h1 className="text-white text-xl" onClick={() => openModal(user.id)}>@{user.username}</h1>
            {user.verified && (
              <BlueTick className="ml-1 w-4 h-4" />
            )}
            {user.verified && console.log("done")}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

<ModalUserPubDetails isOpen={isModalOpen} onClose={closeModal} userId={selectedUserId} />

      {showModal && (
        <Modal isOpen={showModal} onClose={toggleModal} />
      )}
      {showJoinModal && selectedRoom && (
        <JoinByCode isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} roomId={selectedRoom.id}/>
      )}
      
    </div>
  );
  
  
};

export default RoomList;



// what i added in this for the user Modal
{/* <ModalUserPubDetails isOpen={isModalOpen} onClose={closeModal} userId={selectedUserId} /> */}

// onClick={() => openModal(user.id)}


// const openModal = (userId) => {
//   setSelectedUserId(userId);
//   setIsModalOpen(true);
// };

// const closeModal = () => {
//   setIsModalOpen(false);
//   setSelectedUserId(null);
// };

// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedUserId, setSelectedUserId] = useState(null);

