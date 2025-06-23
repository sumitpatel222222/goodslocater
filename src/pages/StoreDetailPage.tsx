import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Mail, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { getStoreInventory } from '../services/inventoryService';
import { stores } from '../data/mockData';
import { Store, Product } from '../types';

interface InventoryItemWithProduct {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  lastUpdated: string;
  product: Product;
}

const StoreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [inventory, setInventory] = useState<InventoryItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      
      // Find store
      const storeData = stores.find(s => s.id === id);
      setStore(storeData || null);
      
      if (storeData) {
        // Get store inventory
        const storeInventory = getStoreInventory(storeData.id);
        setInventory(storeInventory);
      }
      
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  bg-white dark:bg-gray-900 transition-colors">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="h-60 bg-gray-200 rounded"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!store) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  bg-white dark:bg-gray-900 transition-colors">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Store Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The store you're looking for doesn't exist or has been removed.</p>
            <Link to="/stores">
              <Button leftIcon={<ArrowLeft className="h-5 w-5" />}>
                Back to Stores
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  bg-white dark:bg-gray-900 transition-colors">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/stores" className="text-gray-500 hover:text-gray-700">Stores</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {store.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Information */}
          <div className="md:col-span-1">
            <Card>
              <CardBody className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{store.name}</h1>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Address</h3>
                      <p className="text-gray-700">{store.address}</p>
                      {store.distance !== undefined && (
                        <Badge variant="info" className="mt-1">
                          {store.distance} km away
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Opening Hours</h3>
                      <p className="text-gray-700">{store.openingHours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-700">{store.phone}</p>
                    </div>
                  </div>
                  
                  {store.email && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-700">{store.email}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Store Inventory */}
          <div className="md:col-span-2">
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Available Products</h2>
                
                {inventory.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {inventory.map(item => (
                      <Link key={item.id} to={`/products/${item.product.id}`}>
                        <Card hoverEffect className="h-full">
                          <CardBody className="p-4">
                            <div className="flex items-center">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="h-16 w-16 object-cover rounded-md"
                              />
                              <div className="ml-4">
                                <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-1">{item.product.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="font-medium text-indigo-600">${item.product.price.toFixed(2)}</span>
                                  <span className={`text-sm font-medium ${
                                    item.quantity > 10 
                                      ? 'text-green-600' 
                                      : item.quantity > 0 
                                        ? 'text-amber-600' 
                                        : 'text-red-600'
                                  }`}>
                                    {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of stock'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 mb-2">No products available in this store.</p>
                    <p className="text-sm text-gray-500">Check back later for inventory updates.</p>
                  </div>
                )}
                
                <div className="mt-8">
                  <Link to="/stores">
                    <Button 
                      variant="outline" 
                      leftIcon={<ArrowLeft className="h-5 w-5" />}
                    >
                      Back to Stores
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoreDetailPage;