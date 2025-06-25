import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ShoppingBag, Store,
  ShoppingBasket, Laptop, Shirt, Home, Dumbbell, Sparkles, Store as StoreIcon,
  Utensils, Cross, Gift, Car, Gem, Book, Smartphone, Footprints, Armchair, PawPrint, Coffee, Croissant, Pencil, Package
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ProductGrid from '../components/products/ProductGrid';
import { products, categories, inventory, stores } from '../data/mockData';
import { getCurrentLocation } from '../services/locationService';

const categoryColors: { [key: string]: string } = {
  '1': 'text-yellow-400',      // Groceries
  '2': 'text-blue-400',        // Electronics
  '3': 'text-pink-400',        // Clothing & Apparel
  '4': 'text-green-400',       // Home & Garden
  '5': 'text-orange-400',      // Sports & Outdoors
  '6': 'text-purple-400',      // Beauty & Personal Care
  '7': 'text-indigo-400',      // General Store
  '8': 'text-red-400',         // Street Food & Food Stalls
  '9': 'text-teal-400',        // Pharmacy & Health
  '10': 'text-fuchsia-400',    // Toys & Gifts
  '11': 'text-cyan-400',       // Automotive
  '12': 'text-amber-400',      // Jewelry & Accessories
  '13': 'text-lime-400',       // Books & Stationery
  '14': 'text-sky-400',        // Mobile & Accessories
  '15': 'text-rose-400',       // Footwear
  '16': 'text-emerald-400',    // Furniture
  '17': 'text-violet-400',     // Pet Supplies
  '18': 'text-orange-300',     // Food & Beverage
  '19': 'text-yellow-300',     // Bakery
  '20': 'text-blue-300',       // Stationery
 
};


const categoryIcons: { [key: string]: React.ElementType } = {
  'shopping-basket': ShoppingBasket,
  'laptop': Laptop,
  'shirt': Shirt,
  'home': Home,
  'dumbbell': Dumbbell,
  'sparkles': Sparkles,
  'store': StoreIcon,
  'utensils': Utensils,
  'cross': Cross,
  'gift': Gift,
  'car': Car,
  'gem': Gem,
  'book': Book,
  'smartphone': Smartphone,
  'shoe': Footprints,
  'couch': Armchair,
  'paw': PawPrint,
  'coffee': Coffee,
  'bread': Croissant,
  'pencil': Pencil,
};

const HomePage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then(pos => {
        setUserLocation({
          latitude: pos.latitude,
          longitude: pos.longitude,
        });
      })
      .catch(err => {
        setLocationError('Could not get your location. Please allow location access.');
      });
  }, []);

  
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white dark:bg-gray-950 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Find Products Available Near You
              </h1>
              <p className="text-lg text-indigo-200 dark:text-indigo-300">
                Check real-time product availability in local stores and save time on your shopping trips.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    variant="primary"
                    className="w-full sm:w-auto border-white text-indigo-900 hover:bg-indigo-100 dark:text-indigo-900 dark:hover:bg-indigo-200"
                    leftIcon={<Search className="h-5 w-5" />}
                  >
                    Browse Products
                  </Button>
                </Link>
                <Link to="/stores">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-indigo-800 dark:text-white dark:hover:bg-indigo-900"
                    leftIcon={<Store className="h-5 w-5" />}
                  >
                    Find Stores
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full flex justify-center items-center">
                <svg
                  width="340"
                  height="220"
                  viewBox="0 0 340 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rounded-lg shadow-2xl max-h-96 object-cover w-full"
                >
                  {/* Galaxy center glow */}
                  <radialGradient id="galaxyGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#a5b4fc" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                  </radialGradient>
                  <circle cx="170" cy="110" r="50" fill="url(#galaxyGlow)" opacity="0.8">
                    <animate attributeName="r" values="50;60;50" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Google Maps-style man pin */}
                  <g>
                    {/* Pin body */}
                    <path
                      d="M170 90
                         C180 90, 185 105, 170 130
                         C155 105, 160 90, 170 90
                         Z"
                      fill="#fbbf24"
                      stroke="#fff"
                      strokeWidth="2"
                      opacity="0.95"
                    />
                    {/* Pin head */}
                    <circle cx="170" cy="90" r="10" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                    {/* Pin shadow */}
                    <ellipse cx="170" cy="135" rx="10" ry="4" fill="#000" opacity="0.15" />
                  </g>

                  {/* Orbiting stars */}
                  <g>
                    <circle id="star1" cx="170" cy="40" r="4" fill="#fbbf24">
                      <animateTransform attributeName="transform" type="rotate" from="0 170 110" to="360 170 110" dur="6s" repeatCount="indefinite" />
                    </circle>
                    <circle id="star2" cx="170" cy="180" r="3" fill="#f472b6">
                      <animateTransform attributeName="transform" type="rotate" from="0 170 110" to="360 170 110" dur="8s" repeatCount="indefinite" />
                    </circle>
                    <circle id="star3" cx="110" cy="110" r="2.5" fill="#34d399">
                      <animateTransform attributeName="transform" type="rotate" from="0 170 110" to="360 170 110" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <circle id="star4" cx="230" cy="110" r="3" fill="#a5b4fc">
                      <animateTransform attributeName="transform" type="rotate" from="0 170 110" to="360 170 110" dur="7s" repeatCount="indefinite" />
                    </circle>
                    <circle id="star5" cx="200" cy="60" r="2" fill="#fff">
                      <animateTransform attributeName="transform" type="rotate" from="0 170 110" to="360 170 110" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle id="star6" cx="140" cy="160" r="2" fill="#fff">
                      <animateTransform attributeName="transform" type="rotate" from="0 170 110" to="360 170 110" dur="9s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  {/* Extra sparkles */}
                  <g>
                    <circle cx="120" cy="60" r="1.5" fill="#fff" opacity="0.7">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="220" cy="70" r="1.2" fill="#fff" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="200" cy="180" r="1.2" fill="#fff" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Find what you need in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 dark:bg-gray-800 rounded-full p-6 mb-4">
                <Search className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Search for Products</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Find what you need by searching for specific products or browsing categories.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 dark:bg-gray-800 rounded-full p-6 mb-4">
                <Store className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Check Availability</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                See real-time inventory at stores near your location.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 dark:bg-gray-800 rounded-full p-6 mb-4">
                <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Visit the Store</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Head to the nearest store where your desired products are in stock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline" size="sm" className="dark:text-gray-100 dark:border-gray-700">
                View All
              </Button>
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            inventory={inventory} 
            stores={stores} 
            userLocation={userLocation || undefined}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Browse Categories</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Find products by category</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(category => {
              const Icon = categoryIcons[category.icon] || Package;
              return (
                <Link key={category.id} to={`/products?category=${category.id}`}>
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transform transition-transform">
                    <Icon
                      className={`h-10 w-10 mb-3 drop-shadow-lg ${categoryColors[category.id] || 'text-indigo-400'}`}
                      stroke="currentColor" // <-- This line ensures the color class is applied
                    />
                    <span className="text-gray-900 dark:text-gray-100 font-medium text-center">{category.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Shopkeepers */}
      <section className="py-16 bg-indigo-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Shopkeeper managing inventory"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Are You a Shopkeeper?</h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Join our platform to increase your visibility and let customers know what you have in stock.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Manage your inventory in real-time</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Attract more customers to your store</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Reduce customer frustration and increase satisfaction</span>
                </li>
              </ul>
              <Link to="/login">
                <Button size="lg" className="mt-2">
                  Register as a Shopkeeper
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;