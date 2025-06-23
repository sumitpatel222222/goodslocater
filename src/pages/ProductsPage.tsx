import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { 
  getAllProducts,
  getProductsByCategory,
  searchProducts 
} from '../services/inventoryService';
import { getMockLocation } from '../services/locationService';
import { inventory, stores, categories } from '../data/mockData';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getMockLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const queryParam = searchParams.get('query');
    const categoryParam = searchParams.get('category');
    
    if (queryParam) {
      setSearchQuery(queryParam);
      handleSearch(queryParam);
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      setProducts(getProductsByCategory(categoryParam));
    } else {
      setProducts(getAllProducts());
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchProducts(query);
      setProducts(results);
    } else {
      setProducts(getAllProducts());
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
    
    handleSearch(searchQuery);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (categoryId) params.set('category', categoryId);
    else params.delete('category');
    setSearchParams(params);
    
    if (categoryId) {
      setProducts(getProductsByCategory(categoryId));
    } else {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setProducts(getAllProducts());
      }
    }
  };

  const handleSortChange = (sortType: 'name' | 'price') => {
    if (sortBy === sortType) {
      // Toggle sort order if clicking the same sort type
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortOrder('asc');
    }
  };

  // Apply sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    }
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">Products</h1>

          <div className="w-full md:w-auto flex gap-2">
            <form onSubmit={handleSearchSubmit} className="flex-grow md:max-w-md">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="w-full"
              />
            </form>
            <Button
              variant="outline"
              leftIcon={<Filter className="h-5 w-5" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
        </div>

        {/* Filters and Sort Controls */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-8 bg-white p-4 rounded-lg shadow-sm`}>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-4 md:mb-0 md:mr-8">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Categories</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedCategory === '' ? 'primary' : 'outline'}
                  onClick={() => handleCategoryChange('')}
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={selectedCategory === category.id ? 'primary' : 'outline'}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-8">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Sort By</h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sortBy === 'name' ? 'primary' : 'outline'}
                  onClick={() => handleSortChange('name')}
                  rightIcon={sortBy === 'name' && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'price' ? 'primary' : 'outline'}
                  onClick={() => handleSortChange('price')}
                  rightIcon={sortBy === 'price' && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                >
                  Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="text-sm text-gray-600">
            {sortedProducts.length === 0 ? (
              <p>No products found. Try a different search or category.</p>
            ) : (
              <p>Showing {sortedProducts.length} products</p>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <ProductGrid 
            products={sortedProducts} 
            inventory={inventory} 
            stores={stores} 
            userLocation={userLocation || undefined}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try a different search term or category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;