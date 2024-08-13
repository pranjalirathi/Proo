import React from 'react';
import Sidebar from '../components/Sidebar';
import PublicUser from '../components/PublicUser';
import { useParams } from 'react-router-dom';


const PublicUserPage = () => {
  const { username } = useParams();
  return (
    <div className='h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex ml-10 md:ml-20'>
        <PublicUser username={username}/>
      </div>
    </div>
  );
};

export default PublicUserPage;

          


