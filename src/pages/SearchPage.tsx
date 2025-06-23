import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody } from '../components/ui/Card';
import { searchProducts } from '../services/inventoryService';
import { getMockLocation } from '../services/locationService';
import { inventory, stores, categories } from '../data/mockData';
import { Product, Store } from '../types';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const [results, setResults] = useState<Product[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getMockLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
    
    // If there's a query parameter, perform search on load
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [searchParams]);

  const handleSearch = (searchQuery: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Update URL parameter
    setSearchParams({ q: searchQuery });
    
    setTimeout(() => {
      const results = searchProducts(searchQuery);
      setResults(results);
      setIsLoading(false);
    }, 500); // Simulate search delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  // Find nearest store for each product
  const getProductNearestStore = (productId: string): Store | undefined => {
    if (!userLocation) return undefined;
    
    // Find inventory items for this product
    const productInventory = inventory.filter(item => item.productId === productId);
    
    // Get stores that have this product
    const storesWithProduct = stores.filter(store => 
      productInventory.some(item => item.storeId === store.id)
    );
    
    if (storesWithProduct.length === 0) return undefined;
    
    // Calculate distances
    const storesWithDistance = storesWithProduct.map(store => {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(userLocation.latitude - store.latitude);
      const dLon = deg2rad(userLocation.longitude - store.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(store.latitude)) * Math.cos(deg2rad(userLocation.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      
      return { ...store, distance };
    });
    
    // Sort by distance
    storesWithDistance.sort((a, b) => a.distance - b.distance);
    
    // Return nearest store
    return storesWithDistance[0];
  };

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12  bg-white dark:bg-gray-900 transition-colors">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Search Products</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Find products available in stores near you</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow"
                leftIcon={<Search className="h-5 w-5" />}
              />
              <Button 
                type="submit" 
                className="w-full sm:w-auto"
                isLoading={isLoading}
              >
                Search
              </Button>
            </div>
          </form>
          
          {hasSearched && (
            <div className="mt-4 mb-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="text-gray-600">
                  {results.length === 0 
                    ? <p>No results found for "{query}"</p>
                    : <p>Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>
                  }
                </div>
              )}
            </div>
          )}
          
          {!isLoading && hasSearched && results.length > 0 && (
            <div className="space-y-4">
              {results.map(product => {
                const category = categories.find(c => c.id === product.categoryId);
                const nearestStore = getProductNearestStore(product.id);
                
                // Count stores where this product is available
                const productInventory = inventory.filter(item => item.productId === product.id);
                const storeCount = new Set(productInventory.map(item => item.storeId)).size;
                
                return (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <Card hoverEffect>
                      <CardBody className="p-4">
                        <div className="flex">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-24 w-24 object-cover rounded-md mr-4"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                {category && (
                                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full mt-1">
                                    {category.name}
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                            
                            <div className="mt-2">
                              {storeCount > 0 ? (
                                <div className="flex flex-col gap-1">
                                  <span className="text-sm font-medium text-green-600">
                                    Available in {storeCount} store{storeCount !== 1 ? 's' : ''}
                                  </span>
                                  
                                  {nearestStore && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>
                                        Nearest: {nearestStore.name} ({nearestStore.distance?.toFixed(2)} km)
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-red-600">
                                  Currently unavailable in all stores
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
          
          {!isLoading && hasSearched && results.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{query}". Try a different search term.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setQuery('');
                    setSearchParams({});
                    setHasSearched(false);
                  }}
                >
                  Clear Search
                </Button>
              </div>
            </div>
          )}
          
          {!hasSearched && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Popular Searches</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {['Organic', 'Electronics', 'Clothing', 'Garden', 'Sports', 'Beauty'].map(term => (
                  <Button 
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(term);
                      handleSearch(term);
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;