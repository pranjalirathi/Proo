import React, { useEffect, useState } from 'react';
import axios from 'axios';
import homeimg from '../assets/home.jpg'

const Topics = ( {onSelectTopic, selectedTopic} ) => {
  const [topics, setTopics] = useState([]);
  // const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/topics');
        // setLanguages(response.data);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="flex flex-col w-full m-2 p-2 bg-customBackground2 rounded-lg overflow-auto">
      <div className="text-white text-xl flex items-center mt-3 mb-4">
        <span className="ml-2 pt-2 text-gray-400">#</span>
        <h2 className="font-bold pt-2 text-xl sm:text:xl">Topics</h2>
      </div>
      <ul className="space-y-2">
      <li
          className={`flex items-center text-gray-400 mr-0 p-2 rounded-lg cursor-pointer transition-colors justify-center ${
            selectedTopic === 'All' ? 'bg-customBackground1 text-white' : 'hover:bg-customBackground1'
          }`}
          onClick={() => onSelectTopic('All')}
        >
          <img
            src={homeimg}
            alt="All"
            className="h-8 w-8 rounded-full"
          />
            <span className="ml-3 flex-grow">All</span>
          
        </li>
        {topics.map((topic, index) => (
          <li
            key={index}
            className="flex items-center text-gray-400 mr-0 p-2 rounded-lg cursor-pointer hover:bg-customBackground1 transition-colors"
            onClick={() => onSelectTopic(topic.name)}
          >
            <img
              src="path/to/your/image.png"
              alt="Topic"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-3 flex-grow">{topic.name}</span>
            <span className="text-sm text-gray-500">[{topic.room_count}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
