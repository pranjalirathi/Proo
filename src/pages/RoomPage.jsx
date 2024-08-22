import React from 'react'
import Sidebar from '../components/Sidebar';
import RoomChat from '../components/RoomChat';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const { roomId } = useParams();
  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar />
      <div className='flex flex-1 overflow-x-auto w-full' style={{"marginLeft": '4rem' }}>
        <RoomChat roomId={roomId} />
      </div>
      
    </div>
  );
};

export default RoomPage;

          


