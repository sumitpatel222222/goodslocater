import { User, Store, Category, Product, InventoryItem } from '../types';

// Mock users data
export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'shopkeeper',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
  },
];

// Mock categories data
export const categories: Category[] = [
  { id: '1', name: 'Groceries', icon: 'shopping-basket' },
  { id: '2', name: 'Electronics', icon: 'laptop' },
  { id: '3', name: 'Clothing & Apparel', icon: 'shirt' },
  { id: '4', name: 'Home & Garden', icon: 'home' },
  { id: '5', name: 'Sports & Outdoors', icon: 'dumbbell' },
  { id: '6', name: 'Beauty & Personal Care', icon: 'sparkles' },
  { id: '7', name: 'General Store', icon: 'store' },
  { id: '8', name: 'Street Food & Food Stalls', icon: 'utensils' },
  { id: '9', name: 'Pharmacy & Health', icon: 'cross' },
  { id: '10', name: 'Toys & Gifts', icon: 'gift' },
  { id: '11', name: 'Automotive', icon: 'car' },
  { id: '12', name: 'Jewelry & Accessories', icon: 'gem' },
  { id: '13', name: 'Books & Stationery', icon: 'book' },
  { id: '14', name: 'Mobile & Accessories', icon: 'smartphone' },
  { id: '15', name: 'Footwear', icon: 'shoe' },
  { id: '16', name: 'Furniture', icon: 'couch' },
  { id: '17', name: 'Pet Supplies', icon: 'paw' },
  { id: '18', name: 'Food & Beverage', icon: 'coffee' },
  { id: '19', name: 'Bakery', icon: 'bread' },
  { id: '20', name: 'Stationery', icon: 'pencil' },
  // Add more as needed!
];

// Mock stores data
export const stores: Store[] = [
  {
    id: '1',
    name: 'SuperMart',
    address: 'Dashashwamedh Ghat Rd, Godowlia, Varanasi, Uttar Pradesh 221001',
    ownerId: '1',
    phone: '(542) 123-4567',
    email: 'info@supermart.com',
    openingHours: 'Mon-Sun: 8AM-10PM',
    latitude: 25.3069,    
    longitude: 83.0104,  
  },
  {
    id: '2',
    name: 'ElectroWorld',
    address: 'Bhelupur, Varanasi, Uttar Pradesh 221010',
    ownerId: '1',
    phone: '(542) 234-5678',
    email: 'info@electroworld.com',
    openingHours: 'Mon-Sat: 9AM-9PM, Sun: 10AM-7PM',
    latitude: 25.2950,
    longitude: 83.0027,
  },
  {
    id: '3',
    name: 'Fashion Center',
    address: 'Lanka, Varanasi, Uttar Pradesh 221005',
    ownerId: '1',
    phone: '(542) 345-6789',
    openingHours: 'Mon-Sat: 10AM-8PM, Sun: 11AM-6PM',
    latitude: 25.2677,
    longitude: 82.9913,
  },
];

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, locally sourced.',
    price: 1.99,
    categoryId: '1',
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Apple MacBook Pro',
    description: 'The latest Apple MacBook Pro with M2 chip.',
    price: 1999.99,
    categoryId: '2',
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Men\'s Casual Shirt',
    description: 'Comfortable cotton shirt for casual wear.',
    price: 39.99,
    categoryId: '3',
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Garden Shovel',
    description: 'Durable steel garden shovel with wooden handle.',
    price: 24.99,
    categoryId: '4',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    name: 'Basketball',
    description: 'Official size basketball for indoor and outdoor play.',
    price: 29.99,
    categoryId: '5',
    image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    name: 'Face Moisturizer',
    description: 'Hydrating face moisturizer for all skin types.',
    price: 19.99,
    categoryId: '6',
    image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock inventory data
export const inventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    storeId: '1',
    quantity: 50,
    lastUpdated: '2023-06-01T10:00:00Z',
  },
  {
    id: '2',
    productId: '2',
    storeId: '2',
    quantity: 15,
    lastUpdated: '2023-06-02T14:30:00Z',
  },
  {
    id: '3',
    productId: '3',
    storeId: '3',
    quantity: 30,
    lastUpdated: '2023-06-03T09:15:00Z',
  },
  {
    id: '4',
    productId: '4',
    storeId: '1',
    quantity: 20,
    lastUpdated: '2023-06-04T11:45:00Z',
  },
  {
    id: '5',
    productId: '5',
    storeId: '1',
    quantity: 12,
    lastUpdated: '2023-06-05T16:20:00Z',
  },
  {
    id: '6',
    productId: '6',
    storeId: '1',
    quantity: 25,
    lastUpdated: '2023-06-06T13:10:00Z',
  },
  {
    id: '7',
    productId: '1',
    storeId: '2',
    quantity: 30,
    lastUpdated: '2023-06-07T10:30:00Z',
  },
  {
    id: '8',
    productId: '1',
    storeId: '3',
    quantity: 25,
    lastUpdated: '2023-06-08T14:00:00Z',
  },
];