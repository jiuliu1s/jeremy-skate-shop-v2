// app/admin/page.js - Password protected version
'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    featured: false,
    image: null
  });

  // Admin credentials
  const ADMIN_USERNAME = 'AdminJeremy';
  const ADMIN_PASSWORD = '2030';

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, []);

  const loadProducts = () => {
    try {
      const storedProducts = localStorage.getItem('adminProducts');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        }
      }
    } catch (error) {
      console.error('Error loading products:', error);
      localStorage.setItem('adminProducts', JSON.stringify([]));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      loadProducts();
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('adminAuthenticated');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert('Please fill in all required fields (Name, Price, and Image)');
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category || 'General',
      description: newProduct.description || '',
      featured: Boolean(newProduct.featured),
      image: newProduct.image,
      features: newProduct.description ? [newProduct.description] : ['High-quality product']
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    
    // Save to localStorage safely
    try {
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      alert('Error saving product. Please try again.');
      return;
    }
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      category: '',
      description: '',
      featured: false,
      image: null
    });

    alert('Product added successfully!');
  };

  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      
      try {
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600">Jeremy's Skate & Sports Shop</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              Login to Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Contact Jeremy for access</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel (after authentication)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Admin Header */}
      <div className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Price (KSh) *</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter price"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="Skates">Skates</option>
                <option value="Apparel">Apparel</option>
                <option value="Safety Gear">Safety Gear</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter product description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Product Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              {newProduct.image && (
                <div className="mt-2">
                  <img 
                    src={newProduct.image} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={newProduct.featured}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">Featured Product (shows on homepage)</label>
            </div>
          </div>
          
          <button
            onClick={addProduct}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

        {/* Products List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Manage Products ({products.length})</h2>
          
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet. Start by adding your first product above.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-blue-600 font-bold">KSh {product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  {product.featured && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                      Featured
                    </span>
                  )}
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}