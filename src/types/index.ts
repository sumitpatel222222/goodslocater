// Define common types used throughout the application
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: 'customer' | 'shopkeeper'; // for mock users
  userType?: 'customer' | 'shopkeeper'; // for registered users
  avatar?: string;
  photo?: string;
  // ...any other fields you use
}

export interface Store {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  phone: string;
  email?: string;
  openingHours: string;
  latitude: number;
  longitude: number;
  distance?: number; // Calculated field
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  lastUpdated: string;
}

export interface ProductWithAvailability extends Product {
  stores: Array<{
    store: Store;
    quantity: number;
    lastUpdated: string;
  }>;
}