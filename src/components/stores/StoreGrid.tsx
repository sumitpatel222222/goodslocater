import React from 'react';
import { Store, InventoryItem } from '../../types';
import StoreCard from './StoreCard';

interface StoreGridProps {
  stores: Store[];
  inventory?: InventoryItem[];
}

const StoreGrid: React.FC<StoreGridProps> = ({ stores, inventory = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stores.map(store => {
        // Count products in this store
        const productCount = inventory
          ? new Set(inventory.filter(item => item.storeId === store.id).map(item => item.productId)).size
          : undefined;
        
        return (
          <StoreCard
            key={store.id}
            id={store.id}
            name={store.name}
            address={store.address}
            phone={store.phone}
            openingHours={store.openingHours}
            distance={store.distance}
            productCount={productCount}
          />
        );
      })}
    </div>
  );
};

export default StoreGrid;