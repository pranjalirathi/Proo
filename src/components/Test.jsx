import React from 'react';

import Sidebar from './Sidebar';
import Topics from './Topics'
import RoomList from './RoomList';

const Test = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <Topics/>
      <RoomList/>
    </div>
  )
}

export default Test;


