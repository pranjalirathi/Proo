import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import midbot from '../assets/midbot.svg';
import { Bell } from 'lucide-react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
      if (alertMessage) {
        const timeout = setTimeout(() => setAlertMessage(""), 3500); 
        return () => clearTimeout(timeout);
      }
    }, [alertMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8000/api/forgot-password', { email }) 
      .then((response) => {
        const successMessage = response.data.detail;
        setAlertMessage(successMessage);
        setAlertColor("bg-green-500/50 backdrop-blur-lg text-white");
        setEmail('');
      })
      .catch((error) => {
        console.log('Error:', error.response); 
        const errorMsg =
          error.response && error.response.data && error.response.data.detail
            ? error.response.data.detail
            : 'Something went wrong. Please try again.';
        setAlertMessage(errorMsg);
        setAlertColor("bg-red-500/50 backdrop-blur-lg text-white");
      });
  };

  return (
    <section
      className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-br"
      style={{
        backgroundImage: `url(${midbot})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Alert Notification */}
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 ${alertColor} text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in border border-white/20 z-50`}
        >
          <Bell className="w-6 h-6 shake shake-rotation" />
          <span>{alertMessage}</span>
          <button
            onClick={() => setAlertMessage('')}
            className="text-lg font-bold ml-4 hover:text-gray-200 focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}

      {/* Form Container */}
      <div className="relative z-10 w-[28rem] h-auto bg-transparent border-none rounded-2xl backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center p-8">
        <div className="w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl text-white text-center mb-8">Reset Password</h2>
            
            {/* Email Input */}
            <div className="relative mb-10 w-full border-b-2 border-white">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12"
                value={email}
                onChange={handleEmailChange}
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full h-12 bg-white text-black rounded-full font-semibold hover:bg-gray-200">
              Submit
            </button>

            {/* Login */}
            <div className="text-md text-white text-center mt-8">
              <Link to="/login" className="font-semibold hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;

