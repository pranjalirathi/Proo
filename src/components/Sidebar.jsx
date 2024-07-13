import React, { useState } from 'react';
import coderoom1 from '../assets/coderoom1.png';
import {
  MessageSquareText,
  Search,
  Circle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ModalRules from './ModalRules';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showModalRules, setShowModalRules] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModalRules = () => {
    setShowModalRules(!showModalRules);
  };

  const handleSearchButtonClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className={`h-screen bg-customBackground1 text-white flex flex-col justify-between ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col p-2">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img src={coderoom1} alt="Logo" className="h-8 w-8" />
            {!collapsed && <span className="text-lg font-semibold ml-2">CodeRoom</span>}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <SidebarItem icon={<MessageSquareText />} label="Chats" color="text-blue-600" collapsed={collapsed} />
          <SidebarItem icon={<Search />} color="text-green-400" label="Search" collapsed={collapsed} onClick={handleSearchButtonClick} />
          {showSearch && !collapsed && (
            <div className="flex items-center p-2 space-y-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 rounded bg-customBackground2 text-white"
                placeholder="Search..."
              />
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-gray-700 pt-4">
          <SidebarLabel label="A must Read" collapsed={collapsed} />
          <SidebarItem icon={<Circle />} label="Welcome" color="text-orange-500" collapsed={collapsed} />
          <SidebarItem 
            icon={<Circle />} 
            label="Rules" 
            color="text-purple-500" 
            collapsed={collapsed} 
            onClick={toggleModalRules}
          />
        </div>
      </div>
      <div className="flex items-center p-4 border-t border-gray-700">
        <img src="path/to/profile-pic.png" alt="Profile" className={`h-8 w-8 rounded-full ${collapsed ? 'mx-auto' : 'mr-2'}`} />
        {!collapsed && (
          <div className="flex-1">
            <div className="text-sm">Pranjali Rathi</div>
            <div className="text-xs text-green-400">iPrash05</div>
          </div>
        )}
      </div>
      {showModalRules && <ModalRules onClose={toggleModalRules} />}
    </div>
  );
};

const SidebarItem = ({ icon, label, color = "text-gray-400", count, shortcut, collapsed, onClick }) => (
  <div 
    className={`flex items-center p-2 hover:bg-customBackground2 rounded ${collapsed ? 'justify-center' : ''}`} 
    onClick={onClick}
  >
    <div className={`w-6 h-6 ${color}`}>{icon}</div>
    {!collapsed && <span className="ml-4 flex-1">{label}</span>}
    {!collapsed && count && <span className="text-xs bg-gray-700 rounded px-2 py-0.5">{count}</span>}
    {!collapsed && shortcut && <span className="text-xs text-gray-500 ml-2">{shortcut}</span>}
  </div>
);

const SidebarLabel = ({ label, collapsed }) => (
  <div className={`flex items-center p-2 text-xs text-gray-500 uppercase ${collapsed ? 'hidden' : ''}`}>{label}</div>
);

export default Sidebar;
