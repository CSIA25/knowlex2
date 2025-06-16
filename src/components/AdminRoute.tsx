import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AdminRoute = () => {
  // Check if user is EITHER a father OR a superadmin
  const { user, isFather, isSuperadmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  // If user is logged in AND has either of the privileged roles, allow access.
  return user && (isFather || isSuperadmin) ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;