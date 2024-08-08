import React from 'react';
import Sidebar from '../components/Sidebar';
import PublicUser from '../components/PublicUser';

const PublicUserPage = () => {
  return (
    <div className='h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex ml-20 md:ml-20'>
        <PublicUser/>
      </div>
    </div>
  );
};

export default PublicUserPage;

          


