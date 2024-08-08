import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import coderoom1 from '../assets/coderoom1.png';
import { Hash, User, MessageCircle } from 'lucide-react';
import { Search, ChevronLeft, ChevronRight, Folder, Settings } from 'lucide-react';

import ModalRules from './ModalRules';
import WelcomeModal from './WelcomeModal';
import Profile from './Profile';

const Sidebar = ({ setIsSearchActive, setActiveComponent }) => {

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [userData, setUserData] = useState({
    username: '',
    profile_pic: '',
    name: ''
  });
  const baseURL = 'http://127.0.0.1:8000';

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token'); 
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/user_detail`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData({
          username: response.data.username,
          profile_pic: `${response.data.profile_pic}`,
          name: response.data.name
        });
        localStorage.setItem('username', response.data.username);
      } 
      catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const Menus = [
    { title: "Search", icon: <Search className='text-green-500' />, search: true, onClick: () => setIsSearchActive(true) },
    { title: "Topics", icon: <Hash className='text-orange-500' />, onClick: () => setActiveComponent('Topics') },
    { title: "Rooms", icon: <User className='text-blue-600' />, onClick: () => setActiveComponent('Rooms') },
    { title: "Blogs", icon: <MessageCircle className='text-green-700' />, onClick: () => setActiveComponent('Blogs') },
    { title: "Welcome", icon: <Folder className='text-yellow-500' />, gap: true, onClick: () => setIsWelcomeModalOpen(true) },
    { title: "Rules", icon: <Settings className='text-gray-400' />, onClick: () => setIsModalOpen(true) },
  ];



  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const filteredMenus = screenWidth <= 780 
    ? Menus 
    : Menus.filter(menu => ["Search", "Welcome", "Rules"].includes(menu.title));

  return (
    <div className={`fixed top-0 left-0 h-screen z-50 ${open ? 'w-56 bg-customBackground1' : 'w-20 bg-customBackground1 '} p-4 pt-8 transition-width duration-300 flex flex-col justify-between`}>
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
          {filteredMenus.map((Menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-4 p-2 text-sm text-gray-300 cursor-pointer hover:bg-gray-800 rounded-md ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              onClick={Menu.onClick}
            >
              <div className="w-6 h-6">{Menu.icon}</div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
            
            </li>
          ))}
        </ul>
      </div>

      {/* PROFILE SECTION */}
      <div className={`flex flex-col items-center pt-1 pb-1 border-t bg-customBackground2 rounded-lg border-gray-700 ${!open ? 'justify-center' : ''}`}>
        <div className="flex items-center">
          <img
            src={userData.profile_pic}
            alt="Profile"
            className="h-10 w-10 rounded-full hover:cursor-pointer"
            onClick={handleProfileClick}
          />
          {open && (
            <div className="ml-2">
              <div className="text-sm">{userData.name || 'No Name'}</div>
              <div className="text-sm mt-1 text-logoColour2 hover:text-logoColour3 hover:underline hover:cursor-pointer" onClick={handleProfileClick}>@{userData.username}</div>
            </div>
          )}
        </div>
        {open && (
          <div className="mt-4 w-full px-4">
            <button onClick={handleLogout} className="w-full py-1 mb-2 border border-gray-400 hover:bg-red-600 text-white rounded-md">Logout</button>
          </div>
        )}
      </div>

      {isProfileOpen && (
        <div className="absolute bottom-16 left-0 w-56">
          <Profile onClose={() => setIsProfileOpen(false)} />
        </div>
      )}

      {isModalOpen && <ModalRules onClose={() => setIsModalOpen(false)} />}
      {isWelcomeModalOpen && <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />}
    </div>
  );
};

export default Sidebar;

