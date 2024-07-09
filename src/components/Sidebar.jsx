import React, { useState } from 'react';
import { MessageSquareDot, Search, FolderOpen, CircleUserRound } from 'lucide-react';
import ModalRules from './ModalRules';

const Sidebar = () => {
  const [showModalRules, setShowModalRules] = useState(false);

  const toggleModalRules = () => {
    setShowModalRules(!showModalRules);
  };

  return (
    <div className="flex flex-col h-screen w-1/5 bg-gray-900 text-white">
      {/* ------------------------SIDE NAVBAR UPPER SECTION ------------------------- */}
      <div className="flex items-center p-4 bg-gray-800">
        <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center">
          <span className="font-bold text-xl">B</span>
        </div>
        <h1 className="ml-3 text-lg font-bold">CODEROOM</h1>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center p-4 text-gray-400 hover:text-white">
          <MessageSquareDot className="text-blue-500" />
          <span className="ml-3">Chats</span>
        </div>
        <div className="flex items-center p-4 text-gray-400 hover:text-white">
          <Search className="text-green-500" />
          <span className="ml-3">Search</span>
        </div>
        <div
          className="flex items-center p-4 text-gray-400 hover:text-white cursor-pointer"
          onClick={toggleModalRules}
        >
          <FolderOpen className="text-orange-500" />
          <span className="ml-3">Rules</span>
        </div>
      </div>

      {/* ----------------------PROFILE SECTION---------------------------------------------------------------------- */}
       <div className="m-4 p-4 bg-gray-700 rounded-lg flex items-center">
        <CircleUserRound className="w-10 h-10 text-gray-300" />
        <div className="ml-3">
          <p className="text-lg font-semibold">Riyansh Gupta</p>
          <p className="text-sm text-gray-400">arjunMBT</p>
        </div>
      </div>

      {showModalRules && <ModalRules onClose={toggleModalRules} />}
    </div>
  );
};

export default Sidebar;
