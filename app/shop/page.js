// app/shop/page.js
'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('adminProducts');
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts);
          setProducts(allProducts || []);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-3 py-8 text-center">
          <p>Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-3 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">All Products</h1>
          <span className="text-sm text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-lg font-bold mb-2">No Products Available</h2>
            <p className="text-gray-600 text-sm mb-4">Add products in the admin panel to start selling</p>
            <Link 
              href="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Add Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <div className="h-32 bg-gray-200 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-2">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-sm mb-1 line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-blue-600 font-bold text-xs mb-1">KSh {product.price?.toLocaleString()}</p>
                  <p className="text-gray-500 text-xs mb-2">{product.category}</p>
                  <div className="flex gap-1">
                    <Link 
                      href={`/products/${product.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 text-center py-1 rounded text-xs font-medium"
                    >
                      View
                    </Link>
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-blue-600 text-white text-center py-1 rounded text-xs font-medium"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}