import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import midbot from '../assets/midbot.svg';
import UserContext from '../context/UserContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const requestBody = {
      email: email,
      password: password,
    };
  
    fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => {
      if (response.status === 401) {
        localStorage.clear();
        navigate('/login');
        throw new Error('Unauthorized: Redirecting to login');
      }
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('access_token', data.access);
  
      updateUser({
        email: email,
        username: email.slice(0, 5),
        name: null,
        profilePic: 'path/to/default-profile-pic.png',
      });
  
      navigate('/test');
    })
    .catch((error) => {
      setError('Login failed. Please check your email and password and try again.');
      console.error('Error:', error);
    });
  };
  

  return (
    <section className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-br" style={{ 
      backgroundImage: `url(${midbot})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="relative z-10 w-[28rem] h-auto bg-transparent border-none rounded-2xl backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center p-8">
        <div className="w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl text-white text-center mb-8">Login</h2>
            <div className="relative mb-10 w-full border-b-2 border-white">
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
            {/* <div className="flex justify-between items-center text-md text-white mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="hover:underline">Forgot Password</a>
            </div> */}
            <button className="w-full h-12 bg-white text-black rounded-full font-semibold hover:bg-gray-200">Log In</button>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            <div className="text-md text-white text-center mt-8">
              <p>Don't have an account? <Link to="/register" className="font-semibold hover:underline">Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;