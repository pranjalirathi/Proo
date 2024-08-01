import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Send, Code } from 'lucide-react';
import RoomDetails from './RoomDetailsModal';
import MembersList from './MembersList';

const AvatarSkeleton = () => (
  <svg className="w-6 h-6 text-gray-500 dark:text-gray-700 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
  </svg>
);

const LoadingSkeleton = () => (
  <div className="flex flex-col h-full w-full p-4 space-y-4 border border-gray-500 divide-y divide-gray-500 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 m-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-2.5">
          <AvatarSkeleton />
          <div className="h-2.5 bg-gray-500 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
      </div>
      <div className="flex space-x-0">
        <AvatarSkeleton />
        <AvatarSkeleton />
      </div>
    </div>
    <div className="flex-1"></div>
    <div className="flex items-center p-2 sm:p-4 rounded-lg border-t border-gray-700 bg-gray-800 mt-auto space-x-4">
      <div className="h-2.5 bg-gray-500 rounded-full dark:bg-gray-600 flex-1 mb-2.5"></div>
      <div className="h-8 w-8 bg-gray-500 rounded-full dark:bg-gray-700"></div>
      <div className="h-8 w-8 bg-gray-500 rounded-full dark:bg-gray-700"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);


const RoomChat = ({ roomId }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isCode, setIsCode] = useState(false);
  const socketRef = useRef(null);
  const baseURL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseURL}/api/room_details/${roomId}`, {
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

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomId}`);

      socketRef.current.onopen = () => {
        console.log('WebSocket connection opened');
        socketRef.current.send(JSON.stringify({ type: 'authenticate', token }));
      };

      socketRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socketRef.current.onclose = () => {
        console.error('Chat socket closed unexpectedly');
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (socketRef.current && message.trim() !== '') {
      socketRef.current.send(JSON.stringify({
        message,
        is_code: isCode,
        timestamp: new Date().toISOString(), // Add timestamp to message data
      }));
      setMessage('');
      setIsCode(false);
    }
  };

  const openRoomDetails = () => {
    setActiveModal('roomDetails');
  };

  const openMembersList = () => {
    setActiveModal('membersList');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (!roomDetails) {
    return <LoadingSkeleton />;
  }

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
            <MembersList members={roomDetails.members} onClose={closeModal} baseURL={baseURL} />
          </div>
        )}
        <img
          src={`${baseURL}${roomDetails.room_pic}`}
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
              src={`${baseURL}${member.profile_pic}`}
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${msg.sender_id === localStorage.getItem('user_id') ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${msg.sender_id === localStorage.getItem('user_id') ? 'flex-row-reverse' : ''}`}>
              <img
                src={`${baseURL}${msg.profile_pic}`}
                alt="Profile Pic"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col max-w-xs">
                <div
                  className={`p-2 rounded-lg ${msg.is_code ? 'bg-gray-800' : msg.sender_id === localStorage.getItem('user_id') ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  {msg.is_code ? (
                    <pre className="whitespace-pre-wrap">{msg.message}</pre>
                  ) : (
                    <span>{msg.message}</span>
                  )}
                </div>
                <span className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Typing Bar */}
      <div className="flex items-center p-2 sm:p-4 border-t border-gray-700 bg-gray-800 mt-auto">
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-customBackground1 text-white p-1 sm:p-2 rounded-lg outline-none border-none text-sm sm:text-base"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if ( e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Code
          size={38}
          className={`ml-2 sm:ml-4 p-1 cursor-pointer flex items-center justify-center ${isCode ? 'text-white bg-gray-500 rounded-full' : 'text-gray-400 hover:text-gray-200 rounded-full hover:bg-gray-500'}`}
          onClick={() => setIsCode(!isCode)}
        />
        <button
          className="ml-2 sm:ml-4 p-1 sm:p-2 bg-blue-600 rounded-full hover:bg-blue-700 flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <Send
            size={24}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default RoomChat;
