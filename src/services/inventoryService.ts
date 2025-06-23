import { Product, Store, InventoryItem, ProductWithAvailability } from '../types';
import { products, stores, inventory } from '../data/mockData';
import { calculateDistance } from './locationService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

// Search products by name or description
export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
  );
};

// Get product with availability information
export const getProductWithAvailability = (productId: string, userLat?: number, userLng?: number): ProductWithAvailability | null => {
  const product = products.find(p => p.id === productId);
  if (!product) return null;

  const productInventory = inventory.filter(item => item.productId === productId);
  
  const productWithAvailability: ProductWithAvailability = {
    ...product,
    stores: productInventory.map(item => {
      const store = stores.find(s => s.id === item.storeId);
      if (!store) throw new Error(`Store with id ${item.storeId} not found`);
      
      let storeWithDistance = { ...store };
      
      // Calculate distance if user location is provided
      if (userLat !== undefined && userLng !== undefined) {
        storeWithDistance.distance = calculateDistance(
          userLat,
          userLng,
          store.latitude,
          store.longitude
        );
      }
      
      return {
        store: storeWithDistance,
        quantity: item.quantity,
        lastUpdated: item.lastUpdated
      };
    }).sort((a, b) => {
      // Sort by distance if available, otherwise by store name
      if (a.store.distance !== undefined && b.store.distance !== undefined) {
        return a.store.distance - b.store.distance;
      }
      return a.store.name.localeCompare(b.store.name);
    })
  };
  
  return productWithAvailability;
};

// Get all stores
export const getAllStores = (userLat?: number, userLng?: number): Store[] => {
  let storesWithDistance = [...stores];
  
  // Calculate distance for each store if user location is provided
  if (userLat !== undefined && userLng !== undefined) {
    storesWithDistance = storesWithDistance.map(store => ({
      ...store,
      distance: calculateDistance(userLat, userLng, store.latitude, store.longitude)
    }));
    
    // Sort by distance
    storesWithDistance.sort((a, b) => {
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      return 0;
    });
  }
  
  return storesWithDistance;
};

// Get inventory for a store
export const getStoreInventory = (storeId: string): Array<InventoryItem & { product: Product }> => {
  const storeInventory = inventory.filter(item => item.storeId === storeId);
  
  return storeInventory.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) throw new Error(`Product with id ${item.productId} not found`);
    
    return {
      ...item,
      product
    };
  });
};

// Update inventory item
export const updateInventoryItem = (
  storeId: string,
  productId: string,
  quantity: number
): InventoryItem => {
  const itemIndex = inventory.findIndex(
    item => item.storeId === storeId && item.productId === productId
  );
  
  if (itemIndex >= 0) {
    // Update existing item
    inventory[itemIndex] = {
      ...inventory[itemIndex],
      quantity,
      lastUpdated: new Date().toISOString()
    };
    return inventory[itemIndex];
  } else {
    // Create new item
    const newItem: InventoryItem = {
      id: `${inventory.length + 1}`,
      storeId,
      productId,
      quantity,
      lastUpdated: new Date().toISOString()
    };
    inventory.push(newItem);
    return newItem;
  }
};

// Custom hook to manage user stores
export const useUserStores = (selectedStoreId: string | null, setSelectedStoreId: (id: string) => void, setUserStores: (stores: Store[]) => void) => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Fix: Check both role and userType
    if (
      (currentUser.role && currentUser.role !== 'shopkeeper') ||
      (currentUser.userType && currentUser.userType !== 'shopkeeper')
    ) {
      navigate('/');
      return;
    }

    // Get stores owned by current user
    const stores = JSON.parse(localStorage.getItem('stores') || '[]');
    const ownedStores = stores.filter((store: any) => store.ownerId === currentUser.id);
    setUserStores(ownedStores);

    // Select first store by default
    if (ownedStores.length > 0 && !selectedStoreId) {
      setSelectedStoreId(ownedStores[0].id);
    }
  }, [navigate, selectedStoreId, setUserStores, setSelectedStoreId]);
};