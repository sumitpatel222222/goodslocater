import React, { useState } from 'react';
import { PlusCircle, Save, Trash, Image as ImageIcon } from 'lucide-react';
import { Product, InventoryItem } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardBody, CardHeader } from '../ui/Card';
import { updateInventoryItem } from '../../services/inventoryService';
import { categories as allCategories } from '../../data/mockData';

interface InventoryItemRow {
  id?: string;
  productId: string;
  quantity: number;
  lastUpdated?: string;
  product: Product;
}

interface InventoryManagerProps {
  storeId: string;
  inventory: Array<InventoryItem & { product: Product }>;
  availableProducts: Product[];
}

const InventoryManager: React.FC<InventoryManagerProps> = ({
  storeId,
  inventory,
  availableProducts,
}) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemRow[]>(
    inventory.map(item => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      lastUpdated: item.lastUpdated,
      product: item.product,
    }))
  );

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ 
    text: '', 
    type: null 
  });

  // New product state
  const [newProduct, setNewProduct] = useState<Partial<Product> & { quantity?: number }>({
    name: '',
    categoryId: '',
    price: 0,
    description: '',
    image: '',
    quantity: 1,
  });

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct(p => ({ ...p, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    setIsAdding(true);
    setNewProduct({
      name: '',
      categoryId: '',
      price: 0,
      description: '',
      image: '',
      quantity: 1,
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveNewItem = () => {
    // Validate fields
    if (!newProduct.name || !newProduct.categoryId || !newProduct.price || !newProduct.quantity) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return;
    }
    // Create new product object
    const productId = 'custom-' + Date.now();
    const product: Product = {
      id: productId,
      name: newProduct.name!,
      categoryId: newProduct.categoryId!,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      image: newProduct.image || '',
    };
    // Add to inventory
    setInventoryItems(prevItems => [
      ...prevItems,
      {
        id: productId,
        productId,
        quantity: newProduct.quantity!,
        lastUpdated: new Date().toISOString(),
        product,
      },
    ]);
    setMessage({ text: 'Product added to inventory successfully', type: 'success' });
    setIsAdding(false);
    setTimeout(() => setMessage({ text: '', type: null }), 3000);
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    setInventoryItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: newQuantity,
      };
      return updatedItems;
    });
  };

  const handleSaveItem = (index: number) => {
    const item = inventoryItems[index];
    try {
      // Update inventory on the backend
      const updatedItem = updateInventoryItem(storeId, item.productId, item.quantity);

      // Update UI
      setInventoryItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
          ...updatedItems[index],
          lastUpdated: updatedItem.lastUpdated,
        };
        return updatedItems;
      });

      setMessage({ text: 'Inventory updated successfully', type: 'success' });

      // Clear message after a delay
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 3000);
    } catch (error) {
      setMessage({ text: 'Error updating inventory', type: 'error' });
    }
  };

  const handleRemoveItem = (index: number) => {
    try {
      const item = inventoryItems[index];
      
      // Update inventory on the backend with quantity 0 (removing)
      updateInventoryItem(storeId, item.productId, 0);

      // Update UI
      setInventoryItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });

      setMessage({ text: 'Product removed from inventory', type: 'success' });

      // Clear message after a delay
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 3000);
    } catch (error) {
      setMessage({ text: 'Error removing product from inventory', type: 'error' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Manage Inventory</h2>
          {!isAdding && (
            <Button 
              variant="primary" 
              size="sm" 
              leftIcon={<PlusCircle className="h-4 w-4" />}
              onClick={handleAddItem}
            >
              Add Product
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {message.text && (
          <div 
            className={`mb-4 p-3 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {isAdding && (
          <div className="mb-6 p-4 border border-indigo-100 rounded-lg bg-indigo-50">
            <h3 className="text-lg font-medium text-indigo-900 mb-3">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <Input
                  type="text"
                  value={newProduct.name}
                  onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
                  placeholder="Product Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={newProduct.categoryId}
                  onChange={e => setNewProduct(p => ({ ...p, categoryId: e.target.value }))}
                >
                  <option value="">-- Select a category --</option>
                  {allCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <Input
                  type="number"
                  min="0"
                  value={newProduct.price}
                  onChange={e => setNewProduct(p => ({ ...p, price: Number(e.target.value) }))}
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  value={newProduct.quantity}
                  onChange={e => setNewProduct(p => ({ ...p, quantity: Number(e.target.value) }))}
                  placeholder="Quantity"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={newProduct.description}
                  onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))}
                  placeholder="Description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="flex items-center space-x-2">
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {newProduct.image && (
                    <img src={newProduct.image} alt="Preview" className="h-12 w-12 object-cover rounded" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancelAdd}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSaveNewItem}>Add to Inventory</Button>
            </div>
          </div>
        )}

        {inventoryItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products in inventory yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Last Updated</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inventoryItems.map((item, index) => (
                  <tr key={item.productId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <span className="font-medium text-gray-900">{item.product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">${item.product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 w-32">
                      <Input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {item.lastUpdated ? new Date(item.lastUpdated).toLocaleString() : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Save className="h-4 w-4" />}
                          onClick={() => handleSaveItem(index)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          leftIcon={<Trash className="h-4 w-4" />}
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default InventoryManager;