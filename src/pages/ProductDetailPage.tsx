import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { getProductWithAvailability } from '../services/inventoryService';
import { getMockLocation } from '../services/locationService';
import { categories } from '../data/mockData';
import { ProductWithAvailability } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithAvailability | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get user location
        const location = await getMockLocation();
        setUserLocation(location);
        
        // Get product data with availability
        if (id) {
          const productData = getProductWithAvailability(id, location.latitude, location.longitude);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Find category name
  const categoryName = product 
    ? categories.find(c => c.id === product.categoryId)?.name 
    : '';

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 transition-colors ">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded w-2/4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 transition-colors">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Product Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products">
              <Button leftIcon={<ArrowLeft className="h-5 w-5" />}>
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 transition-colors">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center mt-2">
                {categoryName && (
                  <Badge variant="primary" className="mr-2">
                    {categoryName}
                  </Badge>
                )}
                <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available At</h2>
              
              {product.stores.length > 0 ? (
                <div className="space-y-4">
                  {product.stores.map((store, index) => (
                    <Card key={store.store.id}>
                      <CardBody className="p-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-gray-900">{store.store.name}</h3>
                          {store.store.distance !== undefined && (
                            <Badge variant="info">
                              {store.store.distance} km
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">{store.store.address}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-gray-700">{store.store.phone}</span>
                          </div>
                          
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">{store.store.openingHours}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-900">In Stock: </span>
                            <span className={`font-medium ${store.quantity > 10 ? 'text-green-600' : store.quantity > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                              {store.quantity} units
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              Last updated: {new Date(store.lastUpdated).toLocaleString()}
                            </div>
                          </div>
                          
                          <Link to={`/stores/${store.store.id}`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              rightIcon={<ExternalLink className="h-4 w-4" />}
                            >
                              View Store
                            </Button>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2">This product is currently unavailable in all stores.</p>
                  <p className="text-sm text-gray-500">Try checking back later.</p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Link to="/products">
                <Button 
                  variant="outline" 
                  leftIcon={<ArrowLeft className="h-5 w-5" />}
                >
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;