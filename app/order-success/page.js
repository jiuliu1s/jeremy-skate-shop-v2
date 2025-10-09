// app/order-success/page.js
'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate a random order number
    const generateOrderNumber = () => {
      return 'JS' + Date.now().toString().slice(-6);
    };
    
    setOrderNumber(generateOrderNumber());
    
    // Clear the cart after successful order
    localStorage.removeItem('cart');
    
    // Update cart count in header
    window.dispatchEvent(new Event('cartUpdated'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-3 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg border shadow-sm p-6 text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-4">🎉</div>
          
          {/* Success Message */}
          <h1 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
          
          {/* Order Details */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your order has been received and is being processed.</p>
            <p className="font-bold text-lg">Order #: {orderNumber}</p>
            <p className="text-sm text-gray-600 mt-2">
              We'll contact you shortly for payment confirmation via M-Pesa.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-bold text-blue-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• You'll receive an M-Pesa prompt for payment</li>
              <li>• We'll verify your payment within 24 hours</li>
              <li>• Your order will be shipped within 2-3 business days</li>
              <li>• You'll receive tracking information via SMS/Email</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600">
              Contact us: <span className="font-medium">+254 7XX XXX XXX</span>
            </p>
            <p className="text-sm text-gray-600">
              Email: <span className="font-medium">support@jeremyshop.com</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link 
              href="/shop" 
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/" 
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Go Home
            </Link>
          </div>

          {/* Thank You Message */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Thank you for shopping with Jeremy's Shop! 🛍️
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}