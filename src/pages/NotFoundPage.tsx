import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button leftIcon={<Home className="h-5 w-5" />}>
                Return Home
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" leftIcon={<Search className="h-5 w-5" />}>
                Search Products
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">You might be looking for:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <li>
              <Link to="/products" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                Browse All Products
              </Link>
            </li>
            <li>
              <Link to="/stores" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                Find Nearby Stores
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                Sign In / Register
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                Manage Inventory (Shopkeepers)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;