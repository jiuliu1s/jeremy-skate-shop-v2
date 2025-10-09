// app/cart/page.js
'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-3 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some products to your cart to continue shopping.</p>
            <Link 
              href="/shop" 
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
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
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border shadow-sm p-4 mb-4">
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="max-h-16 object-contain"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-blue-600 font-bold">KSh {item.price?.toLocaleString()}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right">
                    <p className="font-bold">KSh {(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm mt-2 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KSh {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>KSh 200</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>KSh {(getTotalPrice() * 0.16).toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>KSh {(getTotalPrice() + 200 + (getTotalPrice() * 0.16)).toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={proceedToCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>

              <Link 
                href="/shop"
                className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-bold text-sm text-center mt-3 hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}