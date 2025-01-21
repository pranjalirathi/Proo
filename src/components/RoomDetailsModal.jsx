import React from 'react';
import { X } from 'lucide-react';

const RoomDetails = ({ roomDetails, onClose }) => {
  const calculateDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  const formatDaysAgo = (dateString) => {
    const daysAgo = calculateDaysAgo(dateString);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  };

  return (
    <div>
    <div className="bg-customBackground1 text-white p-2 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md relative">
      <button className="absolute top-1 right-1 text-gray-400 hover:text-gray-200" onClick={onClose}>
        <X size={18} />
      </button>
      
      <div className="flex items-center mb-4">
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Host: </span>
        {roomDetails.host}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Topic: </span>
        {roomDetails.topic}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Description: </span>
        {roomDetails.description}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Members: </span>
        {roomDetails.member_count}
      </div>
      <div className="mb-2 text-sm">
        <span className="font-bold">Created: </span>
        {formatDaysAgo(roomDetails.created)}
      </div>
      <div className="flex justify-end pr-2 pb-2">
      </div>
    </div>
    </div>
  );
};

export default RoomDetails;
