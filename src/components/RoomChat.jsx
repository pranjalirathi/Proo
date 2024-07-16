import React from 'react';
import { Send } from 'lucide-react';

const RoomChat = () => {
  return (
    <div className="flex m-2 rounded-lg w-full flex-col h-full bg-customBackground2 text-white">

      {/* ---------------ROOM TITLE AND ROOM PIC---------------------------------------------- */}
      <div className="flex items-center p-4 border-b border-gray-700 bg-gray-800 rounded-lg">
        <img src="path/to/roompic.png" alt="Room" className="h-10 w-10 rounded-full ml-2 mr-6" />
        <h1 className="text-xl font-medium flex-1">Room Title</h1>
        <div className="flex -space-x-4 rtl:space-x-reverse">
          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-5.jpg" alt="1" />
          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-2.jpg" alt="2" />
          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-3.jpg" alt="3" />
          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-3.jpg" alt="4" />
          <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+20</a>
        </div>
      </div>

      {/* --------MESSAGING AREA-------------- */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* FOR PREVIOUS MESSAGES */}
      </div>

      {/* -------------TYPING BAR---------------*/}
      <div className="flex items-center p-4 border-t border-gray-700 bg-gray-800">
            <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 bg-gray-900 text-white p-2 rounded-lg outline-none border-none"
            />
            <button className="ml-4 p-2 bg-blue-600 rounded-full hover:bg-blue-700">
            <Send className="text-white" />
            </button>
        </div>
       </div>
  );
};

export default RoomChat;
