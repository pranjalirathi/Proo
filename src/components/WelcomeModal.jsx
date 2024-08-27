import React from 'react';
import welcomeImage from '../assets/welcome.png';
import { X } from 'lucide-react';

const WelcomeModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 max-h-full"
      style={{ backgroundColor: 'rgb(17,18,22, 0.83)' }}
    >
      <div className="relative rounded-xl shadow bg-gray-700 border border-gray-400 p-2 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-w-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t border-gray-600 relative">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            Welcome to CodeRoom!
          </h3>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
          >
            <X />
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4 flex flex-col items-center">
          <img
            src={welcomeImage}
            alt="Welcome"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg mb-4"
          />
          <ul className="list-disc list-inside text-sm sm:text-base leading-relaxed text-gray-200">
            <li>Engage with fellow coders and enhance your skills.</li>
            <li>Join coding communities and participate in discussions.</li>
            <li>Access resources and tutorials to improve your coding knowledge.</li>
            <li>Collaborate on projects and learn from each other.</li>
            <li>Stay updated with the latest trends in technology.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
