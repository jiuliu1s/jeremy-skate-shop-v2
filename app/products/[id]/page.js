// app/products/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const { id } = use(params);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = () => {
      try {
        const storedProducts = localStorage.getItem('adminProducts');
        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          const foundProduct = products.find(p => p.id.toString() === id);
          setProduct(foundProduct || null);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          ...product,
          quantity: quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      if (confirm('Product added to cart! Would you like to view your cart and proceed to checkout?')) {
        window.location.href = '/cart';
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  const buyNow = () => {
    if (!product) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          ...product,
          quantity: quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      window.location.href = '/cart';
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-3 py-8 text-center">
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-3 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <div className="space-y-3">
              <Link 
                href="/shop" 
                className="block bg-blue-600 text-white py-3 rounded-lg font-bold text-sm"
              >
                Continue Shopping
              </Link>
              <Link 
                href="/admin" 
                className="block border border-blue-600 text-blue-600 py-3 rounded-lg font-bold text-sm"
              >
                Add Products in Admin
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-3 py-6">
        <nav className="flex gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-blue-600">Shop</Link>
          <span>›</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-gray-100 h-64 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-h-64 object-contain"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop';
              }}
            />
          </div>

          <div className="p-4">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                {product.category || 'General'}
              </span>
              {product.featured && (
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-medium ml-2">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              KSh {product.price?.toLocaleString()}
            </p>

            {product.description && (
              <div className="mb-4">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="font-medium w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={buyNow}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors"
              >
                🚀 Buy Now
              </button>
              <button 
                onClick={addToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                🛒 Add to Cart
              </button>
              <Link 
                href="/shop"
                className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-bold text-sm text-center hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg border shadow-sm p-4">
          <h2 className="text-lg font-bold mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{product.category || 'General'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Availability:</span>
              <span className="font-medium text-green-600">In Stock</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}