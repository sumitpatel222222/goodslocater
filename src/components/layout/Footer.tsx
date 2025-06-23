import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Mail, Phone, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const [showPricingPopup, setShowPricingPopup] = useState(false);

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPricingPopup(true);
    setTimeout(() => setShowPricingPopup(false), 2200); // Hide after 2.2s
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-indigo-900 to-gray-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center group">
              <ShoppingBag className="h-8 w-8 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-indigo-400 transition-colors">
                Goodslocater
              </span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm italic">
              Real-time inventory management and <span className="text-indigo-300 font-semibold">product availability</span> checker for local shops.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.linkedin.com/in/sumit-patel-3981662a6/" target='_blank' rel="noopener noreferrer" className="text-indigo-400 hover:text-pink-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/sumitpatel222222" target='_blank' rel="noopener noreferrer" className="text-indigo-400 hover:text-pink-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/ieieueoehei/" target='_blank' rel="noopener noreferrer" className="text-pink-400 hover:text-indigo-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-indigo-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">Products</Link>
              </li>
              <li>
                <Link to="/stores" className="footer-link">Stores</Link>
              </li>
              <li>
                <Link to="/search" className="footer-link">Search</Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-pink-300">For Businesses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="footer-link">Shopkeeper Login</Link>
              </li>
              <li>
                <Link to="/howitworks" className="footer-link">How It Works</Link>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link"
                  onClick={handlePricingClick}
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/success-stories" className="footer-link">Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-indigo-300">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-pink-300" />
                <span className="text-gray-200 hover:text-indigo-300 transition-colors">sumit.00001.0003@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-pink-300" />
                <span className="text-gray-200 hover:text-indigo-300 transition-colors">(+91) 91403-01169</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-indigo-300 font-semibold">Goodslocater</span>. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="footer-link text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="footer-link text-sm">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="footer-link text-sm">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Add a little animated bar at the bottom for extra flair */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 animate-pulse"></div>

      {/* Pricing Popup */}
      {showPricingPopup && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="mb-24 px-6 py-4 rounded-xl shadow-2xl bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 text-white text-2xl font-bold flex items-center gap-3 animate-bounce pointer-events-auto border-4 border-white">
            <span role="img" aria-label="smile" className="text-3xl">😊</span>
            <span>
              <span className="bg-white bg-opacity-30 px-2 py-1 rounded text-yellow-900 font-extrabold">It&apos;s Free!</span>
            </span>
          </div>
        </div>
      )}
    </footer>
  );
};

// Add this to your global CSS or Tailwind config for .footer-link
// .footer-link {
//   @apply text-gray-300 hover:text-indigo-300 hover:underline transition-all duration-200 font-medium;
// }

export default Footer;