// import React, { useState } from 'react';
// import { MessageSquareDot, Search, FolderOpen, CircleUserRound } from 'lucide-react';
// import ModalRules from './ModalRules';

// const Sidebar = () => {
//   const [showModalRules, setShowModalRules] = useState(false);

//   const toggleModalRules = () => {
//     setShowModalRules(!showModalRules);
//   };

//   return (
//     <div className="flex flex-col h-screen w-1/5 bg-gray-900 text-white m-2 rounded-lg">
//       {/* ------------------------SIDE NAVBAR UPPER SECTION ------------------------- */}
//       <div className="flex items-center p-4 bg-gray-800">
//         <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center">
//           <span className="font-bold text-xl">B</span>
//         </div>
//         <h1 className="ml-3 text-lg font-bold">CODEROOM</h1>
//       </div>
//       <div className="p-4 flex flex-col flex-grow">
//         <div className="flex items-center p-4 text-gray-400 hover:text-white">
//           <MessageSquareDot className="text-blue-500" />
//           <span className="ml-3">Chats</span>
//         </div>
//         <div className="flex items-center p-4 text-gray-400 hover:text-white">
//           <Search className="text-green-500" />
//           <span className="ml-3">Search</span>
//         </div>
//         <div
//           className="flex items-center p-4 text-gray-400 hover:text-white cursor-pointer"
//           onClick={toggleModalRules}
//         >
//           <FolderOpen className="text-orange-500" />
//           <span className="ml-3">Rules</span>
//         </div>
//       </div>

//       {/* ----------------------PROFILE SECTION---------------------------------------------------------------------- */}
//        <div className="m-4 p-4 bg-gray-700 rounded-lg flex items-center">
//         <CircleUserRound className="w-10 h-10 text-gray-300" />
//         <div className="ml-3">
//           <p className="text-lg font-semibold">Riyansh Gupta</p>
//           <p className="text-sm text-gray-400">arjunMBT</p>
//         </div>
//       </div>

//       {showModalRules && <ModalRules onClose={toggleModalRules} />}
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useState } from 'react';
// import {
//   MessageSquare,
//   Search,
//   Clipboard,
//   HelpCircle,
//   Settings,
//   User,
//   PlusCircle,
//   Circle,
//   Star,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className={`h-screen bg-gray-900 text-white flex flex-col justify-between ${collapsed ? 'w-20' : 'w-64'}`}>
//       <div className="flex flex-col p-2">
//         <div className="flex items-center justify-between p-4">
//           <div className="flex items-center">
//             <img src="path/to/your/logo.png" alt="Logo" className="h-8 w-8" />
//             {!collapsed && <span className="text-lg font-semibold ml-2">Brainwave</span>}
//           </div>
//           <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none">
//             {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//           </button>
//         </div>
//         <div className="mt-4 space-y-2">
//           <SidebarItem icon={<MessageSquare />} label="Chats" collapsed={collapsed} />
//           <SidebarItem icon={<Search />} label="Search" shortcut="⌘F" collapsed={collapsed} />
//           <SidebarItem icon={<Clipboard />} label="Manage subscription" collapsed={collapsed} />
//           <SidebarItem icon={<HelpCircle />} label="Updates & FAQ" collapsed={collapsed} />
//           <SidebarItem icon={<Settings />} label="Settings" collapsed={collapsed} />
//         </div>
//         <div className="mt-4 border-t border-gray-700 pt-4">
//           <SidebarLabel label="Chat list" collapsed={collapsed} />
//           <SidebarItem icon={<Circle />} label="Welcome" count={48} collapsed={collapsed} />
//           <SidebarItem icon={<Circle />} label="UI8 Production" color="text-purple-500" count={16} collapsed={collapsed} />
//           <SidebarItem icon={<Star />} label="Favorites" color="text-blue-500" count={8} collapsed={collapsed} />
//           <SidebarItem icon={<Circle />} label="Archived" color="text-orange-500" count={128} collapsed={collapsed} />
//           <SidebarItem icon={<PlusCircle />} label="New list" collapsed={collapsed} />
//         </div>
//       </div>
//       <div className="flex items-center p-4 border-t border-gray-700">
//         <img src="path/to/profile-pic.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
//         {!collapsed && (
//           <div className="flex-1">
//             <div className="text-sm">Tran Mau Tri Tam</div>
//             <div className="text-xs text-green-400">Free</div>
//           </div>
//         )}
//         {!collapsed && <button className="bg-gray-800 text-sm py-1 px-3 rounded">Upgrade to Pro</button>}
//       </div>
//     </div>
//   );
// };

// const SidebarItem = ({ icon, label, color = "text-gray-400", count, shortcut, collapsed }) => (
//   <div className="flex items-center p-2 hover:bg-gray-800 rounded">
//     <div className={`w-6 h-6 ${color}`}>{icon}</div>
//     {!collapsed && <span className="ml-4 flex-1">{label}</span>}
//     {!collapsed && count && <span className="text-xs bg-gray-700 rounded px-2 py-0.5">{count}</span>}
//     {!collapsed && shortcut && <span className="text-xs text-gray-500 ml-2">{shortcut}</span>}
//   </div>
// );

// const SidebarLabel = ({ label, collapsed }) => (
//   <div className={`flex items-center p-2 text-xs text-gray-500 uppercase ${collapsed ? 'hidden' : ''}`}>{label}</div>
// );

// export default Sidebar;


// Sidebar.jsx



import React, { useState } from 'react';
import coderoom1 from '../assets/coderoom1.png';
import {
  MessageSquareText,
  Search,
  Circle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col justify-between ${collapsed ? 'w-20' : 'w-64'}`}>
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
          <SidebarItem icon={<Search />} color="text-green-400" label="Search" collapsed={collapsed} />
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4">
          <SidebarLabel label="A must Read" collapsed={collapsed} />
          <SidebarItem icon={<Circle />} label="Welcome" color="text-orange-500" collapsed={collapsed} />
           <SidebarItem icon={<Circle />} label="Rules" color="text-purple-500" collapsed={collapsed} />
        </div>
      </div>
      <div className="flex items-center p-4 border-t border-gray-700">
        <img src="path/to/profile-pic.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
        {!collapsed && (
          <div className="flex-1">
            <div className="text-sm">Pranjali Rathi</div>
            <div className="text-xs text-green-400">iPrash05</div>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, color = "text-gray-400", count, shortcut, collapsed }) => (
  <div className={`flex items-center p-2 hover:bg-gray-800 rounded ${collapsed ? 'justify-center' : ''}`}>
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







