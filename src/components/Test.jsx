import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topics from './Topics';
import RoomList from './RoomList';
import Blogs from './Blogs';
import TopicBottom from './TopicBottom';

const Test = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  const [activeComponent, setActiveComponent] = useState('Rooms');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
      if (window.innerWidth <= 780) {
        setActiveComponent('Rooms');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectTopic = (topic) => {
    if (topic === 'All') {
      window.location.reload();
    } else {
      setSelectedTopic(topic);
      setActiveComponent('Rooms');
    }
  };

  return (
    <div className='h-screen bg-customBackground1 overflow-hidden'>
      <Sidebar setIsSearchActive={setIsSearchActive} setActiveComponent={setActiveComponent} />
      <div className='flex-1 flex'
        style={{"marginLeft": '4rem' }}
      >
        {isMobile && activeComponent === 'Topics' && <TopicBottom onSelectTopic={handleSelectTopic} selectedTopic={selectedTopic} />}
        {isMobile && activeComponent === 'Rooms' && <RoomList isSearchActive={isSearchActive} selectedTopic={selectedTopic} />}
        {isMobile && activeComponent === 'Blogs' && <Blogs />}
        {!isMobile && (
          <>
            <Topics onSelectTopic={handleSelectTopic} selectedTopic={selectedTopic} />
            {activeComponent === 'Topics' && <TopicBottom onSelectTopic={handleSelectTopic} selectedTopic={selectedTopic} />}
            {activeComponent === 'Rooms' && <RoomList isSearchActive={isSearchActive} selectedTopic={selectedTopic} />}
            {activeComponent === 'Blogs' && <Blogs />}
          </>
        )}
      </div>
    </div>
  );
};

export default Test;