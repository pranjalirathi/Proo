import React from 'react';

const ModalRules = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 text-center w-full">Community Rules</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Be respectful to everyone.</li>
          <li>No harassment or hate speech.</li>
          <li>No spamming or flooding the chat.</li>
          <li>Keep content relevant to the topic.</li>
          <li>No sharing of personal information.</li>
          <li>Follow all applicable laws and regulations.</li>
        </ul>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRules;
