import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import RoomChat from '../components/RoomChat';
import { useParams, useNavigate } from 'react-router-dom';

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (activeComponent) {
      navigate('/home');
    }
  }, [activeComponent, navigate]); 


  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar setIsSearchActive={setIsSearchActive} setActiveComponent={setActiveComponent} />  
      <div className='flex flex-1 overflow-x-auto w-full' style={{"marginLeft": '4rem' }}>
        <RoomChat roomId={roomId} />
      </div>
      
    </div>
  );
};

export default RoomPage;

          


