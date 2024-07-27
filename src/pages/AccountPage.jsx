import React from 'react'
import Sidebar from '../components/Sidebar';
import UserAccount from '../components/UserAccount';

const AccountPage = () => {
  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex ml-20 md:ml-20'>
        <UserAccount/>
      </div>
      
    </div>
  );
};

export default AccountPage;

          


