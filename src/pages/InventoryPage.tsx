import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InventoryManager from '../components/inventory/InventoryManager';

const InventoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stores, setStores] = useState<any[]>([]);
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [selectedStore, setSelectedStore] = useState<any>(null);

  // Early return if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Load stores owned by this shopkeeper
  useEffect(() => {
    if (currentUser.userType !== 'shopkeeper' && currentUser.role !== 'shopkeeper') {
      navigate('/');
      return;
    }
    const allStores = JSON.parse(localStorage.getItem('stores') || '[]');
    const owned = allStores.filter((s: any) => s.ownerId === currentUser.id);
    setStores(owned);
    setSelectedStore(owned[0] || null);
  }, [currentUser, navigate]);

  // Handle store registration
  const handleRegisterStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !storeCategory) return;
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

  // Show store registration if no store exists
  if (!selectedStore) {
    return (
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
    );
  }

  // Show inventory manager for the selected store
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Manage Inventory for {selectedStore.name}</h2>
      <InventoryManager
        storeId={selectedStore.id}
        inventory={[]} // Load inventory as needed
        availableProducts={[]} // Load products as needed
      />
    </div>
  );
};

export default InventoryPage;