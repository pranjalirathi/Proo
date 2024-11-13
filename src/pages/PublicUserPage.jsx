import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PublicUser from '../components/PublicUser';
import { useParams } from 'react-router-dom';


const PublicUserPage = () => {
  const { username } = useParams();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Rooms');

  return (
    <div className='h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar setIsSearchActive={setIsSearchActive} setActiveComponent={setActiveComponent} />
      <div className='flex-1 flex ml-10 md:ml-20'>
        <PublicUser username={username}/>
      </div>
    </div>
  );
};

export default PublicUserPage;