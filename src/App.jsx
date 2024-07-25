import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Test from './components/Test';
import Error from './components/Error';
import RoomPage from './pages/RoomPage';

const App = () => {
  const location = useLocation();
  // const pathsWithoutNavbar = ['*', '/test', '/roomchat/:roomId'];
  // const showNavbar = !pathsWithoutNavbar.includes(location.pathname);

  const pathsWithoutNavbar = ['*', '/test', /^\/roomchat\/.+$/];
  
  const showNavbar = !pathsWithoutNavbar.some(path => {
    if (typeof path === 'string') {
      return path === location.pathname;
    }
    return path instanceof RegExp && path.test(location.pathname);
  });

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
        <Route path="/roomchat/:roomId" element={<RoomPage/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
