import React, { useEffect, useState } from 'react';
import axios from 'axios';
import homeimg from '../assets/home.jpg'

const Topics = ({ onSelectTopic, selectedTopic }) => {
  const [topics, setTopics] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/topics');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className={`w-full m-2 ${isMobile ? 'p-1 w-1/3' : 'p-2 w-1/4'} ${isMobile ? 'max-w-sm' : 'max-w-xs'} bg-customBackground2 rounded-lg`}>
      <div className="text-white text-xl flex items-center mt-3 mb-4">
        <span className="ml-2 pt-2 text-gray-400">#</span>
        <h2 className="font-bold pt-2 text-xl sm:text:xl">Topics</h2>
      </div>
      <ul className="space-y-2">
        <li
          className={`flex items-center text-gray-400 mr-0 p-2 rounded-lg cursor-pointer transition-colors ${isMobile ? 'justify-center' : ''} ${
            selectedTopic === 'All' ? 'bg-customBackground1 text-white' : 'hover:bg-gray-700'
          }`}
          onClick={() => onSelectTopic('All')}
        >
          <img
            src={homeimg}
            alt="All"
            className="h-8 w-8 rounded-full"
          />
          {!isMobile && (
            <span className="ml-3 flex-grow">All</span>
          )}
        </li>
        {topics.map((topic, index) => (
          <li
            key={index}
            className={`flex items-center text-gray-400 mr-0 p-2 rounded-lg cursor-pointer transition-colors ${isMobile ? 'justify-center' : ''} ${
              selectedTopic === topic.name ? 'bg-customBackground1 text-white' : 'hover:bg-gray-700'
            }`}
            onClick={() => onSelectTopic(topic.name)}
          >
            <img
              src="path/to/your/image.png"
              alt="Topic"
              className="h-8 w-8 rounded-full"
            />
            {!isMobile && (
              <>
                <span className="ml-3 flex-grow">{topic.name}</span>
                <span className="text-sm text-gray-500">[{topic.room_count}]</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
