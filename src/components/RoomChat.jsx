import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import RoomDetails from './RoomDetailsModal';
import MembersList from './MembersList';

const RoomChat = ({ roomId }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/room_details/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.detail) {
          setRoomDetails(response.data.detail);
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (!roomDetails) {
    return <div>Loading...</div>;
  }

  const openRoomDetails = () => {
    setActiveModal('roomDetails');
  };

  const openMembersList = () => {
    setActiveModal('membersList');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex flex-col h-full m-2 rounded-lg w-full bg-customBackground2 text-white relative">
      {/* Room Title and Room Pic */}
      <div className="flex items-center p-2 sm:p-4 border-b border-gray-700 bg-customBackground2 rounded-lg">
        {activeModal === 'roomDetails' && (
          <div className="absolute left-2 top-16 w-full sm:w-80">
            <RoomDetails roomDetails={roomDetails} onClose={closeModal} />
          </div>
        )}
        {activeModal === 'membersList' && (
          <div className="absolute right-2 top-16 w-full sm:w-80">
            <MembersList members={roomDetails.members} onClose={closeModal} />
          </div>
        )}
        <img
          src="path/to/roompic.png"
          alt="Room"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ml-2 mr-4 sm:mr-6 cursor-pointer"
          onClick={openRoomDetails}
        />
        <h1 className="text-base sm:text-xl font-medium flex-1">{roomDetails.name}</h1>
        <div className="flex -space-x-2 rtl:space-x-reverse ml-2 sm:ml-4">
          {roomDetails.members.map((member) => (
            <img
              key={member.id}
              className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-full dark:border-gray-800 cursor-pointer"
              src={member.profile_pic}
              alt={member.username}
              onClick={openMembersList}
            />
          ))}
          <a
            className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            href="#"
            onClick={openMembersList}
          >
            +{roomDetails.member_count}
          </a>
        </div>
      </div>

      {/* Messaging Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        {/* Render previous messages here */}
      </div>

      {/* Typing Bar */}
      <div className="flex items-center p-2 sm:p-4 border-t border-gray-700 bg-gray-800 mt-auto">
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-customBackground1 text-white p-1 sm:p-2 rounded-lg outline-none border-none text-sm sm:text-base"
        />
        <button className="ml-2 sm:ml-4 p-1 sm:p-2 bg-blue-600 rounded-full hover:bg-blue-700">
          <Send className="text-white text-xs sm:text-base" />
        </button>
      </div>
    </div>
  );
};

export default RoomChat;
