import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, CodeXml, BadgeX, Trash, EllipsisVertical, ClipboardList } from 'lucide-react';
import { isMobile } from 'react-device-detect'
import RoomDetails from './RoomDetailsModal';
import MembersList from './MembersList';
import PublicRoomJoinModal from './PublicRoomJoinModal';
import ModalLeaveRoom from './ModalLeaveRoom';
import ModalDeleteRoom from './ModalDeleteRoom';
import tgbg1 from '../assets/tgbg1.png';

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
  const [isCopied, setIsCopied] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const baseURL = 'http://127.0.0.1:8000';
  const navigate = useNavigate();

  let lastMessageDate = null;

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
    const fetchRoomDetails = () => {
      const token = localStorage.getItem('access_token');
  
      axios.get(`${baseURL}/api/room_details/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.detail) {
          setRoomDetails(response.data.detail);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized. Please log in again.');
            localStorage.removeItem('access_token');
            navigate('/login');
          } else {
            setError('Error fetching room details.');
          }
        } else {
          setError('An unknown error occurred.');
        }
        console.error('Error fetching room details:', error);
      });
    };
  
    fetchRoomDetails();
  }, [roomId]);
  

  useEffect(() => {
    const fetchMessages = () => {
      const token = localStorage.getItem('access_token');
  
      axios.get(`${baseURL}/api/message/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.detail) {
          console.log('Fetched messages:', response.data.detail);
          setMessages(response.data.detail);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error('Unauthorized. Redirecting to login.');
            setError('Unauthorized. Please log in again.');
            localStorage.removeItem('access_token');
            navigate('/login');
          } else {
            console.error('Error fetching messages:', error.response.data);
            setError('Error fetching messages.');
          }
        } else {
          console.error('An unknown error occurred:', error.message);
          setError('An unknown error occurred.');
        }
      });
    };
  
    fetchMessages();
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
        console.log('Received message:', data);
        if(data.status_code === 404) setIsPublicJoinModalOpen(true);
        else {
          setMessages((prevMessages) => [...prevMessages, data]);
          setTimeout(() => {
            const chatContainer = document.querySelector('.messages-container');
            if (chatContainer) {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }
          }, 100);
        }
      };

      socketRef.current.onclose = () => {
        console.error('Chat socket closed unexpectedly');
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

    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.rows = 1;
    }

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

  
  //For days tag in the roomchat messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    const timeDifference = today.getTime() - date.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, '0');

    const time = `${formattedHours}:${minutes} ${ampm}`;

    let formattedDate;

    if (dayDifference === 0) {
        formattedDate = "Today";
    } else if (dayDifference === 1) {
        formattedDate = "Yesterday";
    } else if (dayDifference <= 7) {
        formattedDate = date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
        formattedDate = `${day}-${month}-${year}`;
    }

    return { time, isToday: dayDifference === 0, date: formattedDate };
};

//For copying of the content of the code messages
const handleCopy = (content) => {
  if (document.hasFocus()) {
    navigator.clipboard.writeText(content)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
      })
      .catch(err => console.error('Failed to copy text: ', err));
  } else {
    console.error('Cannot copy text: Document is not focused.');
  }
}


// For textarea auto resizing according to the message content length
const handleMessageChange = (e) => {
  const textareaLineHeight = 24; 
  const minRows = 1;
  const maxRows = 4;

  const textarea = e.target;
  textarea.rows = minRows; 
  const currentRows = Math.floor(textarea.scrollHeight / textareaLineHeight);

  if (currentRows >= maxRows) {
    textarea.rows = maxRows; 
    textarea.scrollTop = textarea.scrollHeight;
  } else {
    textarea.rows = currentRows; 
  }

  setMessage(textarea.value);
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
    <div className="flex flex-col mt-2 mr-2 mb-2 rounded-lg w-full text-white bg-customBackground2 relative custom-scrollbar" style={{ backgroundImage: `url(${tgbg1})` }}>
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
          src={`${roomDetails.room_pic}`}
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
              { (roomDetails.is_member && (localStorage.getItem('username') != roomDetails.host)) && (
                <button className="flex items-center px-4 py-2 hover:bg-gray-700" onClick={handleOpenLeaveModal}>
                <BadgeX className="w-4 h-4 mr-2" />
                Leave Room
              </button>
              )}
              
              { (localStorage.getItem('username') == roomDetails.host)  && (
                <button className="flex items-center px-4 py-2 hover:bg-gray-700" onClick={handleOpenDeleteModal}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete Room
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Messaging Area */}
      {/* <div className="flex-1 overflow-y-auto p-2 sm:p-4 custom-scrollbar messages-container" >
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
                  <div className='flex justify-between items-center'>
                      {msg.username !== localStorage.getItem('username')  ? (
                        <span className="text-xs pl-1 text-gray-400 mb-1 block">{msg.username}</span>
                      ) : <span className="text-xs pl-1 text-gray-400 mb-1 block">You</span> }

                      added this block for copying
                      {msg.is_code && (
                        <button className="text-gray-400 hover:text-gray-200 focus:outline-none p-1"
                        onClick={handleCopy}>
                          <ClipboardList size={16} />
                        </button>
                      )}
                      {isCopied && <span className="text-xs text-green-500">Copied!</span>}
                  </div>

                  {msg.is_code ? (
                    <pre className="line-numbers text-base">
                      <code className="language-javascript">{msg.content}</code>
                    </pre>
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 mt-1 self-end">{formatTime(msg.created)}</span>
{isCopied && (
                                                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs rounded py-1 px-2">
                                                  Copied!
                                                </div>
                                              )}

              </div>
            </div>
          </div>
        ))}

        For scrolling
         <div ref={messagesEndRef} />
      </div> */}



      {/* Messaging area with the dates */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-2 custom-scrollbar messages-container">
            {messages.map((msg, index) => {
                const { time, date } = formatTime(msg.created);
                const showDateTag = date !== lastMessageDate;

                lastMessageDate = date;

                return (
                    <React.Fragment key={index}>
                        {showDateTag && (
                          <div className='flex justify-center items-center'>
                            <div className="sticky top-0 z-10 flex justify-center items-center px-1 py-1 sm:px-2 sm:py-2 my-1 sm:my-2 w-auto bg-gray-900 rounded-lg text-xs sm:text-sm text-white text-center self-center">
                                {date}
                            </div>
                          </div>
                        )}
                        <div
                            className={`flex items-start mb-4 ${msg.username === localStorage.getItem('username') ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex ${msg.sender_id === localStorage.getItem('username') ? 'flex-row-reverse ' : ''}`}>
                                {msg.username !== localStorage.getItem('username') && (
                                    <img
                                        src={`${baseURL}${msg.profile_pic}`}
                                        alt="Profile Pic"
                                        className="sm:w-10 sm:h-10 w-6 h-6 rounded-full sm:mr-4 mr-1"
                                    />
                                )}
                                {/* */}
                                <div className="flex flex-col max-w-lg w-auto min-w-[50px] ">
                                    <div
                                        className={`rounded-lg m-1 p-[0.5rem] sm:m-1 sm:p-2  ${msg.is_code ? 'bg-gray-800 w-60 sm:w-auto text-xs ' : (msg.username === localStorage.getItem('username') ? 'bg-customBackground1 ' : 'bg-gray-700 text-xs sm:text-sm')} ${msg.username === localStorage.getItem('username') ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none ' : 'rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl'}`}
                                        // style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' , fontSize: 'xs'}}
                                    >
                                        <div className='flex justify-between items-center'>
                                            {msg.username !== localStorage.getItem('username') ? (
                                                <span className="text-xs pl-1 text-gray-400 mb-1 block">{msg.username}</span>
                                            ) : <span className="sm:text-[0.75rem] text-[0.50rem] sm:pl-1 text-gray-400 sm:mb-1 block">You</span>}
                                           {msg.is_code && (
                                            <div className="relative">
                                              <button
                                                className="text-gray-400 hover:text-gray-200 focus:outline-none p-1 w-15"
                                                onClick={() => handleCopy(msg.content)}
                                              >
                                                <ClipboardList size={16} />
                                              </button>
                                              
                                            </div>
                                          )} 
                                        </div>
                                        {msg.is_code ? (
                                            <pre className="line-numbers text-base">
                                                <code className="language-javascript">{msg.content}</code>
                                            </pre>
                                        ) : (
                                            <span className="whitespace-pre-wrap text-xs sm:text-sm">{msg.content}</span>
                                        )}
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-gray-400 mt-1 self-end">{time}</span>
                                </div>

                                
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
          <div ref={messagesEndRef} />
        </div>
        {/* Messaging area ends */}

      {/* Typing Bar Starts */}
      <div className="flex items-center p-2 sm:p-4 border-t border-gray-700 bg-gray-800 mt-auto">
        <textarea
          type="text"
          placeholder="Type your message here..."
          rows="1"
          className="flex-1 bg-customBackground1 custom-scrollbar text-white p-1 sm:p-2 rounded-lg outline-none border-none text-sm sm:text-base resize-none overflow-hidden"
          value={message}
          // onChange={(e) => setMessage(e.target.value)}
          onChange={handleMessageChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          style={{ height: 'auto', maxHeight: '96px' }}
        />
        <CodeXml
          size={isMobile ? 20 : 34}
          className={`ml-2 sm:ml-4 p-1 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center ${isCode ? 'text-white bg-gray-500 rounded-full' : 'text-white rounded-full hover:bg-blue-700'}`}
          onClick={() => setIsCode(!isCode)}
        />

        <button
          className="ml-2 sm:ml-4 p-1 sm:p-2 bg-blue-600 rounded-full hover:bg-blue-700 flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <Send
            size={isMobile ? 10: 20}
            className="text-white "
          />
        </button>
      </div>
      {/* Typing bar ends */}

      <ModalLeaveRoom roomId={roomId} isOpen={isLeaveModalOpen} onClose={handleCloseModals} />
      <ModalDeleteRoom roomId={roomId} isOpen={isDeleteModalOpen} onClose={handleCloseModals} />
      {isPublicJoinModalOpen && (<PublicRoomJoinModal isOpen={isPublicJoinModalOpen} onclose={handleCloseModals} roomId={roomId} />)}
    </div>
  );
};

export default RoomChat;



//search dropdown
//public user page resposnice
//room details modal
//polls
//enter does not work after code enabling

//roomchat responsive
//center the date tag
//copying of the message content of the code
//textarea auto resizing according to the content
//leave delte room authentication
//yesterday today message
//time of message
//profile pic on searched users by set
// message Box
// shape of message
//username at messages
//search user
//total topics and color on all
//margin bottom of room
//room defualt.jpg to be chnaged









