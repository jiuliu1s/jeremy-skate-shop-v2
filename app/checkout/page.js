// app/checkout/page.js
'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'mpesa'
  });

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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your payment gateway
    alert('Order placed successfully! We will contact you for payment confirmation.');
    // Clear cart after successful order
    localStorage.removeItem('cart');
    window.location.href = '/order-success';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-3 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">No Items in Cart</h1>
            <p>Please add items to your cart before checkout.</p>
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
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="mpesa">M-Pesa</option>
                    <option value="cash">Cash on Delivery</option>
                    <option value="card">Credit Card</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm mt-6 hover:bg-blue-700"
              >
                Place Order - KSh {(getTotalPrice() + 200 + (getTotalPrice() * 0.16)).toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">KSh {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              
              <hr className="my-4" />
              
              <div className="space-y-2">
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}