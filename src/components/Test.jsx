import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  // const actionType = location.state?.action;

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

  // useEffect(() => {
  //   if(successMessage){
  //     const timer = setTimeout(() => {
  //       window.history.replaceState({}, document.title);
  //     }, 4000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [successMessage]);

  return (
    <div className='h-screen bg-customBackground1 overflow-hidden'>
       {/* {successMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${actionType === 'delete' ? 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400' : 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'}`}
          role="alert"
        >
          <span className="font-medium">{actionType === 'delete' ? 'Deletion alert!' : 'Success alert!'}</span> {successMessage}
        </div>
      )} */}
      <Sidebar setIsSearchActive={setIsSearchActive} setActiveComponent={setActiveComponent} />
      <div className='flex-1 flex' 
      style={isMobile ? {"marginLeft": '4-rem'}: {"margin-left": '5-rem'}}>
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
