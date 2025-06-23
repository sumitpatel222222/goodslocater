import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InventoryManager from '../components/inventory/InventoryManager';
import { products, inventory as mockInventory } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeOpenTime, setStoreOpenTime] = useState('');
  const [storeCloseTime, setStoreCloseTime] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Load shopkeeper's stores
  useEffect(() => {
    if (
      currentUser &&
      ((currentUser.role && currentUser.role === 'shopkeeper') ||
        (currentUser.userType && currentUser.userType === 'shopkeeper'))
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
    if (!storeName || !storeCategory || !storeAddress || !storeOpenTime || !storeCloseTime) return;
    if (!currentUser) return;
    const newStore = {
      id: Date.now().toString(),
      name: storeName,
      category: storeCategory,
      address: storeAddress,
      openTime: storeOpenTime,
      closeTime: storeCloseTime,
      phone: storePhone,
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
    setStoreAddress('');
    setStoreOpenTime('');
    setStoreCloseTime('');
    setStorePhone('');
  };

  // Handle store edit save
  const handleEditSave = () => {
    if (!selectedStore || !editName || !editCategory) return;
    const updatedStore = { ...selectedStore, name: editName, category: editCategory };
    const updatedStores = stores.map((s: any) =>
      s.id === selectedStore.id ? updatedStore : s
    );
    setStores(updatedStores);
    setSelectedStore(updatedStore);

    // Update in localStorage
    const allStores = JSON.parse(localStorage.getItem('stores') || '[]');
    const allStoresUpdated = allStores.map((s: any) =>
      s.id === selectedStore.id ? updatedStore : s
    );
    localStorage.setItem('stores', JSON.stringify(allStoresUpdated));
    setIsEditing(false);
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
            <input
              type="text"
              placeholder="Store Address"
              value={storeAddress}
              onChange={e => setStoreAddress(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
            <div className="flex gap-2">
              <input
                type="time"
                placeholder="Opening Time"
                value={storeOpenTime}
                onChange={e => setStoreOpenTime(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
                required
              />
              <input
                type="time"
                placeholder="Closing Time"
                value={storeCloseTime}
                onChange={e => setStoreCloseTime(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              value={storePhone}
              onChange={e => setStorePhone(e.target.value)}
              className="w-full border rounded px-2 py-1"
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
    // Get inventory for this store (from mock or localStorage)
    const allInventory = JSON.parse(localStorage.getItem('inventory') || 'null') || mockInventory;
    const storeInventory = allInventory.filter((item: any) => item.storeId === selectedStore.id);

    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold mb-4">Store Details</h2>
          <div className="mb-8 p-4 border rounded bg-gray-50">
            {isEditing ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleEditSave();
                }}
                className="space-y-2"
              >
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  required
                  placeholder="Store Name"
                />
                <input
                  type="text"
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  required
                  placeholder="Store Category"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={storeAddress}
                    onChange={e => setStoreAddress(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    required
                    placeholder="Store Address"
                  />
                  <input
                    type="time"
                    value={storeOpenTime}
                    onChange={e => setStoreOpenTime(e.target.value)}
                    className="w-1/2 border rounded px-2 py-1"
                    required
                  />
                  <input
                    type="time"
                    value={storeCloseTime}
                    onChange={e => setStoreCloseTime(e.target.value)}
                    className="w-1/2 border rounded px-2 py-1"
                    required
                  />
                </div>
                <input
                  type="tel"
                  value={storePhone}
                  onChange={e => setStorePhone(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Phone Number (optional)"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-1 rounded"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {selectedStore.name}
                </p>
                <p>
                  <strong>Category:</strong> {selectedStore.category}
                </p>
                <p>
                  <strong>Address:</strong> {selectedStore.address}
                </p>
                <p>
                  <strong>Open Time:</strong> {selectedStore.openTime}
                </p>
                <p>
                  <strong>Close Time:</strong> {selectedStore.closeTime}
                </p>
                {selectedStore.phone && (
                  <p>
                    <strong>Phone:</strong> {selectedStore.phone}
                  </p>
                )}
                <button
                  className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded"
                  onClick={() => {
                    setEditName(selectedStore.name);
                    setEditCategory(selectedStore.category);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
          <InventoryManager
            storeId={selectedStore.id}
            inventory={storeInventory}
            availableProducts={products}
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