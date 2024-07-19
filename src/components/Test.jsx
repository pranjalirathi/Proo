import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import RoomChat from './RoomChat';
import Topics from './Topics';
import RoomList from './RoomList';
import Navigation from './Navigation';
import Blogs from './Blogs';

const Test = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  const [activeComponent, setActiveComponent] = useState('Rooms');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
      if (window.innerWidth < 750) {
        setActiveComponent('Rooms');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex ml-20 md:ml-20'>
        <Topics/>
        {/* {activeComponent === 'Topics' && <Topics />} */}
        {activeComponent === 'Rooms' && <RoomList />}
        {activeComponent === 'Blogs' && <Blogs />}
        {/* {activeComponent === 'RoomChat' && <RoomChat />} */}
      </div>
      {isMobile && (
        <Navigation setActiveComponent={setActiveComponent} defaultActive="Rooms" />
      )}
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


    // ------------------------------------


//     import React from 'react';
// import Sidebar from './Sidebar';
// import RoomChat from './RoomChat';
// import Topics from './Topics';
// import RoomList from './RoomList';

// const Test = () => {
//   return (
//     <div className='flex h-screen bg-customBackground1 overflow-hidden'>
//       <Sidebar />
//       <div className='flex-1 flex ml-20 md:ml-20'>
//       <Topics />
//       <RoomList />
//         {/* <RoomChat /> */}
//       </div>
//     </div>
//   );
// };

// export default Test;
          


