import React, { useState, useEffect } from 'react';
import { X, Hammer } from 'lucide-react';

const ModalRules = ({ onClose }) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setIsShaking(true);

    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="rules-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 max-h-full"
      style={{ backgroundColor: 'rgb(17,18,22, 0.83)' }}
    >
      <div className="relative border border-gray-400 p-2 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-w-md bg-gray-700 rounded-xl">
        {/* Modal content */}
        <div className="bg-opacity-85 p-1 rounded-xl">
          {/* Modal header */}
          <div className="flex p-4 md:p-5 border-b rounded-t border-gray-600 relative">
            <Hammer
              className={`text-white mr-2 w-6 h-6 ${isShaking ? 'shake-rotation' : ''}`}
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Rules
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            >
              <X />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <ul className="text-gray-200 text-sm sm:text-base list-disc pl-6">
              <li>Be respectful to everyone.</li>
              <li>No harassment or hate speech.</li>
              <li>No spamming or flooding the chat.</li>
              <li>Keep content relevant to the topic.</li>
              <li>No sharing of personal information.</li>
              <li>Follow all applicable laws and regulations.</li>
            </ul>
          </div>
          {/* Modal body ends */}
        </div>
      </div>
    </div>
  );
};

export default ModalRules;
