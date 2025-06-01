import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { Sun, Moon, Menu, X, Home, Scan, QrCode, Clock } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Scan', path: '/scan', icon: <Scan size={20} /> },
    { name: 'QR Code', path: '/qr-code', icon: <QrCode size={20} /> },
    { name: 'History', path: '/history', icon: <Clock size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">Pay-off</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:space-x-8 sm:items-center">
            {isAuthenticated && (
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-150 ease-in-out ${
                      isActive(item.path)
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none mr-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated && navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium border-l-4 ${
                  isActive(item.path)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'border-transparent text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 pb-3">
                <div className="px-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      {user?.name?.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-neutral-800 dark:text-neutral-200">{user?.name}</div>
                    <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="block px-3 py-2 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;