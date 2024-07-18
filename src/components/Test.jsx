import React from 'react';
import Sidebar from './Sidebar';
import RoomChat from './RoomChat';
import Topics from './Topics';
import RoomList from './RoomList';

const Test = () => {
  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex ml-20 md:ml-20'>
      <Topics />
      <RoomList />
        {/* <RoomChat /> */}
      </div>
    </div>
  );
};

export default Test;



{/* <div className='flex-1 overflow-auto ml-20 md:ml-20'>
      <Sidebar/>
         <div className='flex'>
          <Topics />
          <RoomList />
          </div>
      </div> */}


      // < className='flex h-screen bg-customBackground1 overflow-hidden'>
    //   <Sidebar />
    //   <div className='flex flex-1 flex-col'>
    //     <RoomChat />
    //   </div>
          


