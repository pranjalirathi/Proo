// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import UserAccount from '../components/UserAccount';
// import Continue from '../components/Continue';
// import GitHubIcon from '../assets/github.svg';

// const AccountPage = () => {
//   return (
//     <div
//       className='flex h-screen'
//       style={{
//         backgroundImage: `url(${GitHubIcon})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       <Sidebar />
//       <div className='flex-1 flex flex-col items-center p-4'>
//         <UserAccount />
//         <Continue />
//       </div>
//     </div>
//   );
// };

// export default AccountPage;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UserAccount from '../components/UserAccount';
import Continue from '../components/Continue';
import GitHubIcon from '../assets/github.svg';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; 

const AccountPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className='relative flex h-screen'
      style={{
        backgroundImage: `url(${GitHubIcon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <button
        className="absolute top-4 right-4 z-50 bg-gray-900 hover:bg-gray-600 hover:text-gray-200 text-white rounded-full p-2"
        onClick={() => navigate(-1)} 
      >
        <X size={24} />
      </button>
      {!isMobile && <Sidebar />}
      <div className={`flex-1 flex flex-col items-center p-4 ${isMobile ? 'ml-0' : 'ml-20'}`}>
        <UserAccount />
        <Continue />
      </div>
    </div>
  );
};

export default AccountPage;
