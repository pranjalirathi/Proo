import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Test from './components/Test';
import Error from './components/Error';
import RoomPage from './pages/RoomPage';
import AccountPage from './pages/AccountPage';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicUserPage from './pages/PublicUserPage'
import LoggedInCheck from './components/LoggedInCheck';

const App = () => {
  const location = useLocation();

  const pathsWithoutNavbar = ['*', '/reset_password' , '/test',  /^\/user(\/.*)?$/ ,'/myAccount', /^\/roomchat\/.+$/];
  
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
        <Route path="/login" element={<LoggedInCheck><Login /></LoggedInCheck>} />
        <Route path="/register" element={<LoggedInCheck><Register /></LoggedInCheck>} />
        <Route path="/reset_password" element={<ResetPassword/>}></Route>
        <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
        <Route path="/user/:username" element = {
          <ProtectedRoute>
            <PublicUserPage/>
          </ProtectedRoute>} 
          />
        <Route path="/roomchat/:roomId" element={
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        } />
        <Route path="/myAccount" element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
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