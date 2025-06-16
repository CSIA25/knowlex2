import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const UserRoute = () => {
  const { user, isFather, isSuperadmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  // If the user is an admin, redirect them away from the user dashboard.
  if (user && (isFather || isSuperadmin)) {
    return <Navigate to="/admin" />;
  }
  
  // If the user is a standard user, show the content.
  // If not logged in at all, redirect to login.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;