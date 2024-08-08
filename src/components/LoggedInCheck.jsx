import React from 'react';
import { Navigate } from 'react-router-dom';

const LoggedInCheck = ({children}) => {
    let token = localStorage.getItem('access_token');
    console.log(token)
    if (token) {
        return <Navigate to="/test" />;
      }
    return children;
}

export default LoggedInCheck;

