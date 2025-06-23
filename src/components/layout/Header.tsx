import React, { useEffect, useState } from 'react';
import { Menu, X, User, LogOut, ShoppingBag, Package, Search, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Only declare darkMode once!
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );
  const location = useLocation();

  // Sync darkMode state with <html> class on mount
  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => location.pathname === path;

  // Dark mode toggle handler
  const handleDarkModeToggle = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setDarkMode(false);
    } else {
      html.classList.add('dark');
      setDarkMode(true);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-indigo-400 transition-colors">Goodslocater</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-base font-extrabold tracking-wide transition-all duration-200 shadow-sm
                ${isActive('/')
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-400 text-white scale-105 shadow-lg'
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-pink-300 dark:hover:bg-gray-800'}
              `}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg text-base font-extrabold tracking-wide transition-all duration-200 shadow-sm
                ${isActive('/products')
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-400 text-white scale-105 shadow-lg'
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-pink-300 dark:hover:bg-gray-800'}
              `}
            >
              Products
            </Link>
            <Link
              to="/stores"
              className={`px-4 py-2 rounded-lg text-base font-extrabold tracking-wide transition-all duration-200 shadow-sm
                ${isActive('/stores')
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-400 text-white scale-105 shadow-lg'
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-pink-300 dark:hover:bg-gray-800'}
              `}
            >
              Stores
            </Link>
            <Link to="/search" className="ml-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Search className="h-4 w-4" />}
                className="font-extrabold px-4 py-2 rounded-lg border-2 border-indigo-400 bg-white dark:bg-gray-900 text-indigo-600 dark:text-pink-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow"
              >
                Search
              </Button>
            </Link>
            {/* Dark mode toggle button */}
            <button
              onClick={handleDarkModeToggle}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {currentUser.role === 'shopkeeper' && (
                  <Link
                    to="/inventory"
                    className={`px-3 py-2 text-sm font-medium ${
                      isActive('/inventory')
                        ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
                    }`}
                  >
                    Inventory
                  </Link>
                )}
                <Link to="/profile">
                  <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    src={currentUser.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'}
                    alt={currentUser.name}
                  />
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button leftIcon={<User className="h-4 w-4" />}>Login</Button>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            {/* Dark mode toggle for mobile */}
            <button
              onClick={handleDarkModeToggle}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/products') 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'
            }`}
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link
            to="/stores"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/stores') 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'
            }`}
            onClick={closeMenu}
          >
            Stores
          </Link>
          <Link
            to="/search"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/search') 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'
            }`}
            onClick={closeMenu}
          >
            Search
          </Link>
          {currentUser?.role === 'shopkeeper' && (
            <Link
              to="/inventory"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/inventory') 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'
              }`}
              onClick={closeMenu}
            >
              Inventory
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          {currentUser ? (
            <div className="px-4 space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/profile" onClick={closeMenu}>
                    <img
                      className="h-10 w-10 rounded-full cursor-pointer"
                      src={currentUser.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'}
                      alt={currentUser.name}
                    />
                  </Link>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-gray-100">{currentUser.name}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{currentUser.email}</div>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  leftIcon={<LogOut className="h-4 w-4" />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <Link to="/login" onClick={closeMenu}>
                <Button
                  className="w-full justify-center"
                  leftIcon={<User className="h-4 w-4" />}
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;