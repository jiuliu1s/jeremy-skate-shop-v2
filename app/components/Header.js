// components/Header.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    // Initial load
    updateCartCount();

    // Listen for custom cart update events
    const handleCartUpdate = () => updateCartCount();
    
    // Add event listeners
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', updateCartCount);

    // Poll for cart changes (fallback for cross-tab updates)
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  // Function to manually trigger cart update (can be called from other components)
  const triggerCartUpdate = () => {
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-3 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <span className="font-bold text-sm">JS</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">Jeremy's Shop</h1>
              <p className="text-xs text-gray-500">Sports & Skates</p>
            </div>
          </Link>
          
          {/* Navigation with Cart */}
          <nav className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium text-sm whitespace-nowrap transition-colors"
            >
              🏠 Home
            </Link>
            <Link 
              href="/shop" 
              className="text-gray-700 hover:text-blue-600 font-medium text-sm whitespace-nowrap transition-colors"
            >
              🛍️ Shop
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-700 hover:text-blue-600 font-medium text-sm whitespace-nowrap transition-colors"
            >
              ⚙️ Admin
            </Link>
            
            {/* Cart Button with Badge */}
            <Link 
              href="/cart" 
              className="relative text-gray-700 hover:text-blue-600 font-medium text-sm whitespace-nowrap transition-colors"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}