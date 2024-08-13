import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import './index.css';
import { UserProvider } from './context/UserContext';
import { RoomDetailsProvider } from './context/RoomDetailsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UserProvider>
       <RoomDetailsProvider>
        <AppWrapper/>
       </RoomDetailsProvider>
    </UserProvider>    
  // </React.StrictMode>
);

