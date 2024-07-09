import React from 'react';
import { BookOpenCheck } from 'lucide-react';

const Topics = () => {
  const languages = [
    { name: 'JavaScript', count: 7 },
    { name: 'Python', count: 12 },
    { name: 'Java', count: 9 },
    { name: 'C++', count: 5 },
    { name: 'Ruby', count: 4 },
  ];

  return (
    <div className="w-full max-w-xs bg-gray-800 p-4 rounded-lg">
      <div className="text-white flex items-center mb-4">
      <span className="ml-2 text-gray-400">#  </span>
        <h2 className="font-bold text-lg">Topics</h2>
        
      </div>
      <ul className="space-y-3">
        {languages.map((language, index) => (
          <li
            key={index}
            className="flex items-center text-gray-400 bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
          >
            <BookOpenCheck className="text-blue-500" />
            <span className="ml-3 flex-grow">{language.name}</span>
            <span className="text-sm text-gray-500">[{language.count}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
