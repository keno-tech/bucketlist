import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem('user')); 

    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, [navigate]);

  return children;
};

export default AuthMiddleware;
