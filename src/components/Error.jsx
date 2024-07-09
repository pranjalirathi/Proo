import React from 'react';
import error from '../assets/error.png';

const Error = () => {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="bg-white p-12 rounded-lg shadow-xl mx-6 max-w-lg text-center">
        <img src={error} alt="Error" className="mx-auto mb-6" />
        <p className="text-gray-700 text-lg">An error has occurred. Please try again later.</p>
      </div>
    </div>
  );
};

export default Error;
