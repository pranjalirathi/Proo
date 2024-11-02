import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlueTick from '../assets/blueTick.svg';
import PublicUserRoomModal from './PublicUserRoomModal';
import { useNavigate } from 'react-router-dom';

const PublicUser = ({ username }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    bio: '',
    name: '',
    profile_pic: '',
    verified: false,
    rooms: [],
    joined_rooms_count: 0,
  });

  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetails = () => {
      const token = localStorage.getItem('access_token');

      axios
        .get(`http://127.0.0.1:8000/api/user_public_details/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data.detail;

            if (!userData.bio) {
              userData.bio = "Hey Everyone!, I'm new here and exploring the community. 😊";
            }
            if (!userData.name) {
              userData.name = 'Anonymous User';
            }
            if (!userData.rooms) {
              userData.rooms = [];
            }

            setUserDetails(userData);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.clear();
            navigate('/login');
          } else {
            console.error('Error fetching the user details: ', error.response ? error.response.data : error.message);
          }
        });
    };

    fetchUserDetails();
  }, [username]);

  const handleViewClick = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoomId(null);
  };

  return (
    <div className="w-full mr-2 mt-2 mb-2 rounded-lg overflow-y-auto h-screen bg-customBackground2 custom-scrollbar">
      <div className="flex flex-wrap h-full w-full pr-0 pl-2 pt-2 pb-2 text-white relative">
        
        {/* User Section */}
        <div className="w-full md:w-1/5 p-4 flex-shrink-0">
          <div className="bg-customBackground2 p-0 sm:p-4 rounded h-full">
            <div className="flex flex-col items-center h-full">
              <div className="rounded-full bg-white h-24 w-24 mb-4">
                {userDetails.profile_pic && (
                  <img
                    src={userDetails.profile_pic}
                    alt="Profile"
                    className="h-24 w-24 rounded-full"
                  />
                )}
              </div>
              <div className="text-lg font-bold mb-1">{userDetails.name}</div>
              <div className="w-full h-[1px] bg-gray-600 my-2"></div>
              <div className="text-sm sm:text-lg mb-4">
                @{userDetails.username}
                {userDetails.verified && (
                  <img src={BlueTick} alt="Verified" className="inline-block ml-2 h-4 w-4 sm:h-6 sm:w-6" />
                )}
              </div>
              <div className="text-[0.8rem] text-center">{userDetails.bio}</div>
            </div>
          </div>
        </div>
  
        {/* Content Section */}
        <div className="w-full md:w-4/5 p-0 sm:p-4 flex-grow">
          <div className="flex flex-col space-y-4 h-full items-center">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-center w-full">
              <div className="justify-center items-center w-4/5 md:w-1/2 p-4 rounded-2xl shadow text-black min-h-[100px] md:min-h-[150px] backdrop-blur backdrop-brightness-75 relative room-card">
                <div className="text-xl sm:text-4xl text-gray-200 pl-2">Created</div>
                <div className="text-white mt-2 pt-4 text-4xl sm:text-7xl bottom-0 gradient-text pl-2">
                  {userDetails.rooms.length} <span className="text-2xl">rooms</span>
                </div>
              </div>
  
              <div className="justify-center items-center w-4/5 md:w-1/2 p-4 rounded-2xl shadow text-black min-h-[100px] md:min-h-[150px] backdrop-blur backdrop-brightness-75 relative room-card">
                <div className="text-xl sm:text-4xl text-gray-200 pl-2">Joined</div>
                <div className="text-white mt-2 pt-4 text-4xl sm:text-7xl bottom-0 gradient-text pl-2">
                  {userDetails.joined_rooms_count} <span className="text-2xl">rooms</span>
                </div>
              </div>
            </div>
  
            {/* Rooms Header */}
            <div className="text-center w-full">
              <div className="text-sm sm:text-xl font-bold"></div>
              <div className="w-full h-[1px] bg-gray-600 my-2"></div>
            </div>

            {/* Rooms Table */}
            <div className="flex justify-center items-center w-4/5 sm:w-full text-white mb-4 rounded-2xl shadow flex-grow room-card overflow-y-auto p-4 pt-1">
              <div className="text-gray-200 text-center w-full">
                <div className="room-table-container w-full">
                  <table className="table-auto w-full text-left text-gray-200">
                    <thead>
                      <tr>
                        <th className="text-xl px-4 py-2">Created Rooms
                        </th>
                        <th className="text-xl px-4 py-2">Type</th>
                        <th className="text-xl px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails.rooms.length > 0 ? (
                        userDetails.rooms.map((room) => (
                          <tr key={room.id} className="border-b border-gray-600">
                            <td className="px-4 py-2 flex items-center">
                              <img src={room.room_pic} alt="Room" className="rounded-full h-6 w-6 mr-2" />
                              <span className="text-xs sm:text-base">{room.name}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`sm:text-sm text-xs ${
                                  room.is_public ? 'text-green-400' : 'text-red-400'
                                }`}
                              >
                                {room.is_public ? 'Public' : 'Private'}
                              </span>
                            </td>
                            <td className="px-4 py-1">
                              <button
                                className="w-12 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg sm:text-sm text-xs px-1 py-2"
                                onClick={() => handleViewClick(room.id)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-gray-400 py-4">
                            Oops! No rooms created till now.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <PublicUserRoomModal isOpen={isModalOpen} onClose={handleCloseModal} roomId={selectedRoomId} />
      </div>
    </div>
  );
}

export default PublicUser;
