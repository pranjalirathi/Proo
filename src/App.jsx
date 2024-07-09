import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './components/Login'; 
import Register from './components/Register';
import Test from './components/Test';
import Error from './components/Error';

const App = () => {
  const location = useLocation();
  const pathsWithoutNavbar = ['*', '/test'];
  const showNavbar = !pathsWithoutNavbar.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test/>} />
        <Route path="*" element={<Error/>} />
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
