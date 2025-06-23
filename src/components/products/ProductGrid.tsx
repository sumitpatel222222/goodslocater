import React from 'react';
import { Product, Store, InventoryItem } from '../../types';
import ProductCard from './ProductCard';
import { categories } from '../../data/mockData';

interface ProductGridProps {
  products: Product[];
  inventory?: InventoryItem[];
  stores?: Store[];
  userLocation?: { latitude: number; longitude: number };
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  inventory = [],
  stores = [],
  userLocation,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => {
        // Find inventory items for this product
        const productInventory = inventory.filter(item => item.productId === product.id);
        
        // Count stores where this product is available
        const storeCount = new Set(productInventory.map(item => item.storeId)).size;
        
        // Get nearest store if user location is available
        let nearestStoreName: string | undefined;
        let nearestDistance: number | undefined;
        
        if (userLocation && storeCount > 0) {
          // Find stores with this product
          const storesWithProduct = stores.filter(store => 
            productInventory.some(item => item.storeId === store.id)
          );
          
          if (storesWithProduct.length > 0) {
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
            
            // Get nearest store
            const nearest = storesWithDistance[0];
            nearestStoreName = nearest.name;
            nearestDistance = parseFloat(nearest.distance.toFixed(2));
          }
        }
        
        // Find category name
        const category = categories.find(c => c.id === product.categoryId);
        
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.image}
            description={product.description}
            categoryName={category?.name}
            storeCount={storeCount}
            nearestStore={nearestStoreName}
            nearestDistance={nearestDistance}
          />
        );
      })}
    </div>
  );
};

// Helper function to convert degrees to radians
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default ProductGrid;