import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Send, CodeXml, BadgeX, Trash, EllipsisVertical } from 'lucide-react';
import RoomDetails from './RoomDetailsModal';
import MembersList from './MembersList';
import PublicRoomJoinModal from './PublicRoomJoinModal';
import ModalLeaveRoom from './ModalLeaveRoom';
import ModalDeleteRoom from './ModalDeleteRoom';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const AvatarSkeleton = () => (
  <svg className="w-6 h-6 text-gray-500 dark:text-gray-700 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
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
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublicJoinModalOpen, setIsPublicJoinModalOpen] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const baseURL = 'http://127.0.0.1:8000';

  const handleOpenLeaveModal = () => {
    setIsLeaveModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsLeaveModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsPublicJoinModalOpen(false);
  };

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
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${baseURL}/api/message/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.detail) {
          console.log('Fetched messages:', response.data.detail);
          setMessages(response.data.detail);

          console.log(setMessages);

        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

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
        console.log('Received message:', data);
        setMessages((prevMessages) => [...prevMessages, data]);

        setTimeout(() => {
          const chatContainer = document.querySelector('.messages-container');
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }, 100);
      };


      socketRef.current.onclose = () => {
        console.log("You are not a member");
        console.error('Chat socket closed unexpectedly');
        setIsPublicJoinModalOpen(true);
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [roomId]);

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  const handleSendMessage = () => {
    if (socketRef.current && message.trim() !== '') {
      const timestamp = getCurrentDateTime();
      const newMessage = {
        message,
        is_code: isCode,
        timestamp,
      };
      socketRef.current.send(JSON.stringify(newMessage));
      setMessage('');
      setIsCode(false);

      setTimeout(() => {
        const chatContainer = document.querySelector('.messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }
  };

  const handleJoin = () => {
    setIsPublicJoinModalOpen(false);
  }

  const openRoomDetails = () => {
    setActiveModal('roomDetails');
  };

  const toggleInfoMenu = () => {
    setIsInfoMenuOpen((prevState) => !prevState); 
  };

  const openMembersList = () => {
    setActiveModal('membersList');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getCurrentDateTime = () => {
    const current = new Date();
    const cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    const cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    return cDate + ' ' + cTime;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  

  if (!roomDetails) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col h-full m-2 rounded-lg w-full text-white relative custom-scrollbar bg-customBackground2">
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
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ml-2 mr-4 sm:mr-6"
        />
        <h1 className="text-base sm:text-xl font-medium flex-1 cursor-pointer" onClick={openRoomDetails}>{roomDetails.name}</h1>
        <div className="flex -space-x-2 rtl:space-x-reverse ml-2 sm:ml-4">     
          {roomDetails.members.slice(0, 4).map((member) => (
            <img
              key={member.id}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full dark:border-gray-800 cursor-pointer"
              src={`${baseURL}${member.profile_pic}`}
              alt={member.username}
              onClick={openMembersList}
            />
          ))}
          {roomDetails.members.length > 4 && (
            <a
              className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-xs font-medium text-white bg-gray-700 border-2 rounded-full hover:bg-gray-600 dark:border-gray-800"
              href="#"
              onClick={openMembersList}
            >
              +{roomDetails.member.length - 4}
            </a>
          )}
        </div>

        <EllipsisVertical size={28} className='ml-2 justify-start items-center mt-1 p-1 text-gray-100 cursor-pointer hover:bg-gray-500 hover:rounded-full' onClick={toggleInfoMenu}
        />
        {isInfoMenuOpen && (
            <div className="absolute right-0 top-12 z-50 mt-2 bg-gray-800 text-gray-300 rounded-lg shadow-lg w-48">
              <div className="flex flex-col py-2">
                <button className="flex items-center px-4 py-2 hover:bg-gray-700" onClick={handleOpenLeaveModal}>
                  <BadgeX className="w-4 h-4 mr-2"/>
                  Leave Room
                </button>
                <button className="flex items-center px-4 py-2 hover:bg-gray-700" onClick={handleOpenDeleteModal}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete Room
                </button>
                
              </div>
            </div>
          )}
      </div>

      {/* Messaging Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 custom-scrollbar messages-container" >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${msg.username === localStorage.getItem('username') ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${msg.sender_id === localStorage.getItem('username') ? 'flex-row-reverse ' : ''}`}>

              {msg.username !== localStorage.getItem('username') ?
                <img
                  src={`${baseURL}${msg.profile_pic}`}
                  alt="Profile Pic"
                  className="sm:w-10 sm:h-10 w-6 h-6 rounded-full sm:mr-4 mr-1"
                /> : ''}

              <div className="flex flex-col max-w-lg w-auto min-w-[50px]">
                <div
                  className={` rounded-lg m-1 p-2 sm:m-1 sm:p-2  ${msg.is_code ? 'bg-gray-800 text-sm' : (msg.username === localStorage.getItem('username') ? 'bg-customBackground1 ' : 'bg-gray-700 ')} ${msg.username === localStorage.getItem('username') ? 'rounded-tl-2xl roudned-tr-2xl rounded-bl-2xl rounded-br-none ' : 'rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl'} `}
                  style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
                >
                  {msg.username !== localStorage.getItem('username')  ? (
                    <span className="text-xs pl-1 text-gray-400 mb-1 block">{msg.username}</span>
                  ) : <span className="text-xs pl-1 text-gray-400 mb-1 block">You</span> }
                  {msg.is_code ? (
                    <pre className="line-numbers text-base">
                      <code className="language-javascript">{msg.content}</code>
                    </pre>
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 mt-1 self-end">{formatTime(msg.timestamp)}</span>


              </div>
            </div>
          </div>
        ))}

        {/* For scrolling */}
         <div ref={messagesEndRef} />
      </div>

      {/* Typing Bar */}
      <div className="flex items-center p-2 sm:p-4 border-t border-gray-700 bg-gray-800 mt-auto">
        <textarea
          type="text"
          placeholder="Type your message here..."
          rows="1"
          className="flex-1  bg-customBackground1 custom-scrollbar text-white p-1 sm:p-2 rounded-lg outline-none border-none text-sm sm:text-base resize-none overflow-hidden"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          style={{ height: 'auto', maxHeight: '100px' }}
        />
        <CodeXml
          size={34}
          className={`ml-2 sm:ml-4 p-1 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center ${isCode ? 'text-white bg-gray-500 rounded-full' : 'text-white rounded-full hover:bg-blue-700'}`}
          onClick={() => setIsCode(!isCode)}
        />

        <button
          className="ml-2 sm:ml-4 p-1 sm:p-2 bg-blue-600 rounded-full hover:bg-blue-700 flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <Send
            size={22}
            className="text-white "
          />
        </button>
      </div>
      <ModalLeaveRoom roomId={roomId} isOpen={isLeaveModalOpen} onClose={handleCloseModals} />
      <ModalDeleteRoom roomId={roomId} isOpen={isDeleteModalOpen} onClose={handleCloseModals} />
      {isPublicJoinModalOpen && (<PublicRoomJoinModal isOpen={isPublicJoinModalOpen} onclose={handleCloseModals} roomId={roomId} />)}
    </div>
  );
};

export default RoomChat;



//time of message
//profile pic on searched users by set
//search dropdown


// message Box
// shape of message
//username at messages
//search user
//total topics and color on all
//margin bottom of room
//room defualt.jpg to be chnaged









