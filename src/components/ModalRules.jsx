import React from 'react';

const ModalRules = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 mycontainer">
      <div className="bg-customBackground2 bg-opacity-70 border border-gray-400 p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-center text-gray-200 w-full">Community Rules</h2>
          <button onClick={onClose}className="text-gray-300 hover:text-gray-100 text-2xl">
            &times;
          </button>
        </div>
        <ul className="text-white list-disc pl-6">
          <li>Be respectful to everyone.</li>
          <li>No harassment or hate speech.</li>
          <li>No spamming or flooding the chat.</li>
          <li>Keep content relevant to the topic.</li>
          <li>No sharing of personal information.</li>
          <li>Follow all applicable laws and regulations.</li>
        </ul>
        
      </div>
    </div>
  );
};

export default ModalRules;
