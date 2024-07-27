import React from 'react';
import Sidebar from '../components/Sidebar';
import UserAccount from '../components/UserAccount';
import Continue from '../components/Continue';
import GitHubIcon from '../assets/github.svg';

const AccountPage = () => {
  return (
    <div
      className='flex h-screen'
      style={{
        backgroundImage: `url(${GitHubIcon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Sidebar />
      <div className='flex-1 flex flex-col items-center p-4'>
        <UserAccount />
        <Continue />
      </div>
    </div>
  );
};

export default AccountPage;
