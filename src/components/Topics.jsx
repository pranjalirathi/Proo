import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpenCheck } from 'lucide-react';

const Topics = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/topics');
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="w-full m-2 max-w-xs bg-gray-800 p-4 rounded-lg">
      <div className="text-white flex items-center mb-4">
        <span className="ml-2 text-gray-400">#</span>
        <h2 className="font-bold text-lg">Topics</h2>
      </div>
      <ul className="space-y-2">
        {languages.map((language, index) => (
          <li
            key={index}
            className="flex items-center text-gray-400 bg-gray-900 p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
          >
            <BookOpenCheck className="text-blue-500" />
            <span className="ml-3 flex-grow">{language.name}</span>
            <span className="text-sm text-gray-500">[{language.room_count}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
