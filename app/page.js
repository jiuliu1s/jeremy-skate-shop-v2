// app/page.js - Mobile Optimized
'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('adminProducts');
    if (stored) {
      try {
        const allProducts = JSON.parse(stored);
        const featured = allProducts.filter(p => p && p.featured);
        setProducts(featured);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Compact */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-3 text-center">
          <h1 className="text-2xl font-bold mb-3">Jeremy's Sports Shop</h1>
          <p className="text-sm mb-4 opacity-90">Quality Sports Gear in Kenya</p>
          <div className="flex flex-col gap-2">
            <a 
              href="/shop" 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm"
            >
              🛍️ Shop Now
            </a>
            <a 
              href="#skating-club" 
              className="border border-white text-white px-4 py-2 rounded-lg font-bold text-sm"
            >
              🎯 Skating Lessons
            </a>
          </div>
        </div>
      </section>

      {/* Admin Banner - Smaller */}
      <div className="bg-yellow-500 text-white py-2 px-3">
        <div className="container mx-auto text-center">
          <a href="/admin" className="font-bold text-sm">
            ⚙️ Manage Products
          </a>
        </div>
      </div>

      {/* Features - Compact Grid */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-3">
          <h2 className="text-lg font-bold text-center mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '⭐', title: 'Quality' },
              { icon: '💰', title: 'Best Price' },
              { icon: '🚚', title: 'Free Delivery' },
              { icon: '👨‍🏫', title: 'Lessons' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg text-center border">
                <div className="text-2xl mb-1">{item.icon}</div>
                <h3 className="font-bold text-xs">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Mobile Optimized */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Featured Products</h2>
            <a href="/shop" className="text-blue-600 text-sm font-medium">View All →</a>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-bold mb-2">No Products Yet</h3>
              <p className="text-gray-600 text-sm mb-3">Add products in admin panel</p>
              <a 
                href="/admin" 
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Add Products
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="h-32 bg-gray-200 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-blue-600 font-bold text-xs mb-1">KSh {product.price?.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs mb-2">{product.category}</p>
                    <a 
                      href={`/products/${product.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-1 rounded text-xs font-medium"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skating Club - Compact */}
      <section id="skating-club" className="py-8 bg-white border-t">
        <div className="container mx-auto px-3">
          <h2 className="text-lg font-bold text-center mb-4">Skating Lessons</h2>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Ruthi Kagia Road</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Mon-Fri: 4PM+</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Sat: 10AM-1PM</span>
              </div>
            </div>
            <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded font-bold mt-3 text-sm">
              Book Lesson
            </button>
          </div>
        </div>
      </section>

      {/* Contact - Compact */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="container mx-auto px-3 text-center">
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-700 p-3 rounded">
              <p className="text-sm">📧 Email</p>
              <p className="text-xs mt-1">luizjeremykamau99@gmail.com</p>
            </div>
            <div className="bg-blue-700 p-3 rounded">
              <p className="text-sm">📞 Call</p>
              <p className="text-xs mt-1">0796193267</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}