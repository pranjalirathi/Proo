import React from 'react';
import welcomeImage from '../assets/welcome.png';
import { X } from 'lucide-react'; // Importing X icon from lucide-react

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-customBackground2 bg-opacity-75 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm">
      <div className="relative bg-gray-900 bg-opacity-60 border border-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-4 text-gray-400 hover:text-gray-200 text-2xl"
        >
          <X />
        </button>
        <img src={welcomeImage} alt="Welcome" className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg mb-4" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-100">Welcome to CodeRoom!</h2>
        <ul className="list-disc list-inside mb-4 text-gray-200 text-sm sm:text-base">
          <li>Engage with fellow coders and enhance your skills.</li>
          <li>Join coding communities and participate in discussions.</li>
          <li>Access resources and tutorials to improve your coding knowledge.</li>
          <li>Collaborate on projects and learn from each other.</li>
          <li>Stay updated with the latest trends in technology.</li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeModal;
