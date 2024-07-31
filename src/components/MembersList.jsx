import React from 'react';
import { X } from 'lucide-react';

const MembersList = ({ members, onClose, baseURL }) => {
  return (
    <div className="bg-customBackground1 text-white p-2 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md relative">
      <button className="absolute top-1 right-1 text-gray-400 hover:text-gray-200" onClick={onClose}>
        <X size={18} />
      </button>
      <h2 className="text-sm sm:text-md md:text-lg font-semibold mb-4">Members</h2>
      <div>
        {members.map((member) => (
          <div key={member.id} className="flex items-center mb-1">
            <img
              src={`${baseURL}${member.profile_pic}`}
              alt={member.username}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full mr-2"
              onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/default-image.png'; }} 
            />
            <span className="text-xs sm:text-sm md:text-base">{member.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
