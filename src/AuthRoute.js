import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to="/" /> : children;
};

export default AuthRoute;
