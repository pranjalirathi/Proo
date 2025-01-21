import React from 'react';
import { Navigate } from 'react-router-dom';

const LoggedInCheck = ({children}) => {
    let token = localStorage.getItem('access_token');
    if (token) {
        return <Navigate to="/home" />;
      }
    return children;
}

export default LoggedInCheck;

