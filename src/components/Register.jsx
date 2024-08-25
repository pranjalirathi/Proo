import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import midbot from '../assets/midbot.svg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const requestBody = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        navigate('/login');
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError('User with this email already exists');
      }else {
        throw new Error('An unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please check your details and try again.');
    }
  };
  
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-orange-300 to-orange-600 overflow-hidden" style={{ 
      backgroundImage: `url(${midbot})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Form container */}
      <div className="relative z-10 w-[28rem] h-auto bg-transparent border-none rounded-2xl backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center p-8">
        <div className="w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl text-white text-center mb-8">Sign Up</h2>
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
            <div className="relative mb-10 w-full border-b-2 border-white">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12"
                value={password}
                onChange={handlePasswordChange}
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              />
            </div>
            <div className="relative mb-10 w-full border-b-2 border-white">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full h-14 bg-transparent border-none outline-none text-xl px-3 text-white placeholder-white pr-12"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              />
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <button className="w-full h-12 bg-white text-black rounded-full font-semibold mb-6 hover:bg-gray-200">
              Sign Up
            </button>
            <div className="text-md text-white text-center">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
