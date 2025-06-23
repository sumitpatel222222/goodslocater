import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InventoryManager from '../components/inventory/InventoryManager';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // If shopkeeper, load their stores
    if (
      (currentUser && currentUser.role && currentUser.role === 'shopkeeper') ||
      (currentUser && currentUser.userType && currentUser.userType === 'shopkeeper')
    ) {
      const allStores = JSON.parse(localStorage.getItem('stores') || '[]');
      const owned = allStores.filter((s: any) => s.ownerId === currentUser.id);
      setStores(owned);
      setSelectedStore(owned[0] || null);
    }
  }, [currentUser]);

  // Handle store registration
  const handleRegisterStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !storeCategory) return;
    if (!currentUser) return; // Ensure currentUser is not null
    const newStore = {
      id: Date.now().toString(),
      name: storeName,
      category: storeCategory,
      ownerId: currentUser.id,
    };
    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    setSelectedStore(newStore);
    // Save to localStorage
    const allStores = JSON.parse(localStorage.getItem('stores') || '[]');
    localStorage.setItem('stores', JSON.stringify([...allStores, newStore]));
    setStoreName('');
    setStoreCategory('');
  };

  // Shopkeeper: No store yet
  if (
    currentUser &&
    ((currentUser.role && currentUser.role === 'shopkeeper') ||
     (currentUser.userType && currentUser.userType === 'shopkeeper')) &&
    stores.length === 0
  ) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold mb-4">Register Your Store</h2>
          <form onSubmit={handleRegisterStore} className="space-y-4">
            <input
              type="text"
              placeholder="Store Name"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
            <input
              type="text"
              placeholder="Store Category"
              value={storeCategory}
              onChange={e => setStoreCategory(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Register Store</button>
          </form>
        </div>
      </Layout>
    );
  }

  // Shopkeeper: Has a store
  if (
    currentUser &&
    ((currentUser.role && currentUser.role === 'shopkeeper') ||
     (currentUser.userType && currentUser.userType === 'shopkeeper')) &&
    selectedStore
  ) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold mb-4">Store Details</h2>
          <div className="mb-8 p-4 border rounded bg-gray-50">
            <p><strong>Name:</strong> {selectedStore.name}</p>
            <p><strong>Category:</strong> {selectedStore.category}</p>
          </div>
          <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
          <InventoryManager
            storeId={selectedStore.id}
            inventory={[]} // Load inventory as needed
            availableProducts={[]} // Load products as needed
          />
        </div>
      </Layout>
    );
  }

  // Customer: Show profile info
  if (currentUser) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="p-4 border rounded bg-gray-50">
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Type:</strong> {currentUser.userType || currentUser.role}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};

export default ProfilePage;