// lib/products.js - Product data and utilities

// Product-related utility functions
export const addProduct = (products, newProduct) => {
  const updatedProducts = [...products, newProduct];
  return updatedProducts;
};

export const deleteProduct = (products, productId) => {
  return products.filter(product => product.id !== productId);
};

export const updateProduct = (products, productId, updatedData) => {
  return products.map(product => 
    product.id === productId ? { ...product, ...updatedData } : product
  );
};

export const getProducts = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedProducts = localStorage.getItem('adminProducts');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }
  return [];
};

export const saveProducts = (products) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('adminProducts', JSON.stringify(products));
      return true;
    } catch (error) {
      console.error('Error saving products:', error);
      return false;
    }
  }
  return false;
};

// Get all products
export const getAllProducts = () => {
  return getProducts();
};

// Get product by ID
export const getProductById = (id) => {
  const products = getProducts();
  return products.find(product => product.id === parseInt(id));
};

// Get client product by ID (for client-side usage)
export const getClientProductById = (id) => {
  if (typeof window !== 'undefined') {
    try {
      const storedProducts = localStorage.getItem('adminProducts');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      return products.find(product => product.id === parseInt(id));
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  }
  return null;
};

// Get featured products
export const getFeaturedProducts = () => {
  const products = getProducts();
  return products.filter(product => product.featured);
};

// Get products by category
export const getProductsByCategory = (category) => {
  const products = getProducts();
  return products.filter(product => product.category === category);
};

// Search products
export const searchProducts = (query) => {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
};

// Sample product data structure
export const sampleProducts = [
  {
    id: 1,
    name: "Professional Skateboard",
    price: 4599,
    category: "Skates",
    description: "High-quality professional skateboard with durable wheels",
    featured: true,
    image: "/images/skateboard.jpg",
    features: ["Durable construction", "Smooth wheels", "Professional grade"]
  },
  {
    id: 2,
    name: "Skate Helmet",
    price: 2499,
    category: "Safety Gear",
    description: "Protective helmet for safe skating",
    featured: true,
    image: "/images/helmet.jpg",
    features: ["Safety certified", "Adjustable fit", "Ventilated design"]
  }
];

export const formatPrice = (price) => {
  return `KSh ${price?.toLocaleString() || '0'}`;
};

// Default export
export default {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  saveProducts,
  getAllProducts,
  getProductById,
  getClientProductById,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  sampleProducts,
  formatPrice
};