import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import midbot from '../assets/midbot.svg';
import { Bell } from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match");
      setAlertColor('bg-red-500'); 
    } else {
      setAlertMessage("Password reset successfully");
      setAlertColor('bg-green-500'); 
      // API call after getting it 
    }
    setTimeout(() => {
      setAlertMessage(''); 
    }, 3000);
  };

  return (
    
    <section className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-br" style={{ 
      backgroundImage: `url(${midbot})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat'
    }}>
      {alertMessage && (
        <div className={`fixed top-4 right-4 ${alertColor} backdrop-blur-lg text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in border border-white/20`}>
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
      <div className="relative z-10 w-[28rem] h-auto bg-transparent border-none rounded-2xl backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center p-8">
        <div className="w-full">

        

          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl text-white text-center mb-8">Reset Password</h2>
            <div className="relative mb-10 w-full border-b-2 border-white">

              {/* -----EMAIL INPUT----- */}
              <input 
                type="text" 
                placeholder="Email" 
                required 
                className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12" 
                value={email}
                onChange={handleEmailChange}
              />
              <FontAwesomeIcon icon={faUser} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl" />
            </div>

            {/* -----PASSWORD INPUT----- */}
            <div className="relative mb-10 w-full border-b-2 border-white">
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12" 
                value={password}
                onChange={handlePasswordChange}
              />
              <FontAwesomeIcon icon={faLock} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl" />
            </div>

            {/* -----CONFIRM PASSWORD----- */}
            <div className="relative mb-10 w-full border-b-2 border-white">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                required 
                className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12" 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <FontAwesomeIcon icon={faLock} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl" />
            </div>

            <button className="w-full h-12 bg-white text-black rounded-full font-semibold hover:bg-gray-200">Reset Password</button>

            <div className="text-md text-white text-center mt-8">
              <Link to="/login" className="font-semibold hover:underline">Back to Login</Link>
            </div>
            
          </form>

        </div>
      </div>
    </section>
  );
};

export default ResetPassword;