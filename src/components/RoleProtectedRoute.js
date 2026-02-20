import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (userRole !== requiredRole) {
    const redirectPath = userRole === 'client' ? '/home-client' : '/home-freelancer';
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default RoleProtectedRoute;
