import React from 'react';

import Sidebar from './Sidebar';
import Topics from './Topics';
import RoomList from './RoomList';
import RoomChat from './RoomChat'

const Test = () => {
  return (
    <div className='flex h-screen bg-customBackground1 '>
      <Sidebar/>
      <Topics/>
      <RoomList/>
      {/* <RoomChat/> */}
    </div>
  )
}

export default Test;


