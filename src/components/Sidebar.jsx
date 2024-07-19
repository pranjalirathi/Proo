import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coderoom1 from '../assets/coderoom1.png';
import {
  MessageSquareText,
  Search,
  ChevronLeft,
  ChevronRight,
  Folder,
  Settings,
} from 'lucide-react';
import ModalRules from './ModalRules';
import ModalProfile from './ModalProfile'; // Import the ModalProfile component

const Sidebar = () => {
  const [open, setOpen] = useState(false); 
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for profile modal
  const navigate = useNavigate();

  const Menus = [
    { title: "Search", icon: <Search className='text-green-500' />, search: true },
    { title: "Chats", icon: <MessageSquareText className='text-blue-600' /> },
    { title: "Welcome", icon: <Folder className='text-yellow-500' />, gap: true },
    { title: "Rules", icon: <Settings className='text-gray-400' />, onClick: () => setIsModalOpen(true) },
  ];

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    if (searchQuery === "") {
      setSearchActive(false);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={`fixed top-0 left-0 h-screen z-50 ${open ? 'w-56 bg-customBackground1' : 'w-20 bg-dark-purple'} p-5 pt-8 transition-width duration-300 flex flex-col justify-between`}>
      <div>
        <button
          className="absolute -right-3 top-11 w-5 border-dark-purple border-2 rounded-full"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
        <div className="flex gap-x-4 items-center">
          <img
            src={coderoom1}
            className={`h-10 w-10 cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
            alt="Coderoom Logo"
            onClick={handleLogoClick}
          />
          <h1 className={`text-white origin-left font-bold text-xl duration-200 ${!open && "scale-0"}`}>
            CODEROOM
          </h1>
        </div>
        <ul className="pt-6 flex-1">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-4 p-2 text-sm text-gray-300 cursor-pointer hover:bg-gray-800 rounded-md ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              onClick={Menu.onClick}
            >
              <div className="w-6 h-6">{Menu.icon}</div>
              {Menu.search ? (
                searchActive ? (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={handleSearchBlur}
                    autoFocus
                    className="bg-gray-800 rounded-2xl border-none outline-none text-white h-7 w-full"
                  />
                ) : (
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                    onClick={handleSearchClick}
                  >
                    {Menu.title}
                  </span>
                )
              ) : (
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* -----------USER PROFILE SECTION----------------*/}
      <div 
        className={`flex items-center pt-3 bottom-0 border-t border-gray-700 ${!open ? 'justify-center' : ''}`}
        onClick={() => setIsProfileModalOpen(true)} // Open the profile modal on click
      >
        <img
          src="path/to/profile-pic.png"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
        {open && (
          <div className="ml-2">
            <div className="text-sm">Pranjali Rathi</div>
            <div className="text-xs text-green-400">@iPrash05</div>
          </div>
        )}
      </div>

      {isModalOpen && <ModalRules onClose={() => setIsModalOpen(false)} />}
      {isProfileModalOpen && (
        <ModalProfile
          username="Pranjali Rathi"
          bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel."
          onClose={() => setIsProfileModalOpen(false)} // Add an onClose prop to close the modal
        />
      )}
    </div>
  );
};

export default Sidebar;
