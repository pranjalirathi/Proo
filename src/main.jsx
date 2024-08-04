import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import './index.css';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserProvider>
    <AppWrapper />
  </UserProvider>
      
  // </React.StrictMode>
);

