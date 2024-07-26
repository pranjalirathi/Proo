import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topics from './Topics';
import RoomList from './RoomList';
import Navigation from './Navigation';
import Blogs from './Blogs';
import TopicBottom from './TopicBottom';

const Test = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  const [activeComponent, setActiveComponent] = useState('Rooms');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

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

  const handleSelectTopic = (topic) => {
    if(topic === 'All Rooms'){
      window.location.reload();
    }
    else{
      setSelectedTopic(topic);
      setActiveComponent('Rooms');
    }
    
  };

  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar setIsSearchActive={setIsSearchActive} />
      <div className='flex-1 flex ml-20 md:ml-20'>
         <Topics onSelectTopic={handleSelectTopic} selectedTopic={selectedTopic} />
        {activeComponent === 'Topics' && <TopicBottom onSelectTopic={handleSelectTopic} selectedTopic={selectedTopic}/>}
        {activeComponent === 'Rooms' && <RoomList isSearchActive={isSearchActive} selectedTopic={selectedTopic} />}
        {activeComponent === 'Blogs' && <Blogs />}
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
          


