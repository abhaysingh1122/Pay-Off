import React from 'react';
import Navbar from './Navbar';
import { useUser } from '../../contexts/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireAuth = false }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  // If auth is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login\" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;