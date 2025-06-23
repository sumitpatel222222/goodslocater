import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StoreGrid from '../components/stores/StoreGrid';
import Input from '../components/ui/Input';
import { getAllStores } from '../services/inventoryService';
import { getMockLocation } from '../services/locationService';
import { inventory } from '../data/mockData';
import { Store } from '../types';

const StoresPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getMockLocation();
        setUserLocation(location);
        
        // Get stores with distances
        const storesWithDistance = getAllStores(location.latitude, location.longitude);
        setStores(storesWithDistance);
        setFilteredStores(storesWithDistance);
      } catch (error) {
        console.error('Error getting location:', error);
        
        // Fallback to getting stores without distances
        const allStores = getAllStores();
        setStores(allStores);
        setFilteredStores(allStores);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter(store => 
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  bg-white dark:bg-gray-900 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">Stores Near You</h1>
          <div className="w-full md:w-auto md:max-w-md">
            <Input
              placeholder="Search stores..."
              value={searchQuery}
              onChange={handleSearch}
              leftIcon={<Search className="h-5 w-5" />}
              className="w-full"
            />
          </div>
        </div>

        {isLoadingLocation ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredStores.length > 0 ? (
          <StoreGrid stores={filteredStores} inventory={inventory} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No stores found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try a different search term or location.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StoresPage;