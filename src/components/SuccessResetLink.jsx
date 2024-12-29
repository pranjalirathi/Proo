import React from 'react';
import successVideo from '../assets/successVideo.webm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import midbot from '../assets/midbot.svg';

const SuccessResetLink = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white text-center font-sans"
      style={{ backgroundImage: `url(${midbot})` }}
    >
      <div className="mb-8">
        <video autoPlay loop muted width="200">
          <source src={successVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h3 className="text-3xl font-semibold text-neutral">Check email</h3>
      <p className="text-lg font-normal mt-2">
        We have sent the link to reset your password to your email.
        <span className="font-semibold text-slate-600"></span>
      </p>
      <p className="text-sm font-normal text-slate-500 mt-2">
        The link will expire soon. If you did not receive the email, please check your spam folder.
      </p>
      <button
        onClick={() => (window.location.href = '/login')}
        className="mt-4 px-6 py-3 text-base bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 uppercase"
      >
        <FontAwesomeIcon icon={faUndo} className="mr-2 text-white" />
        Back to Login
      </button>
    </div>
  );
};

export default SuccessResetLink;
