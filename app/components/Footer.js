// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <span className="font-bold">JS</span>
              </div>
              <h3 className="text-xl font-bold">Jeremy's Skate & Sports Shop</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your premier destination for quality sports equipment in Kenya. 
              We specialize in roller skates, football gear, and sports apparel 
              for enthusiasts of all levels.
            </p>
            <p className="text-blue-300 font-semibold">🎯 Gear Up for the Ride!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </Link>
              <Link href="/shop" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Shop
              </Link>
              <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Admin Panel
              </Link>
              <Link href="#skating-club" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Skating Club
              </Link>
              <Link href="/cart" className="block text-gray-300 hover:text-white transition-colors duration-300">
                Shopping Cart
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <span>📧</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>luizjeremykamau99@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span>📞</span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>0796193267</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span>📍</span>
                <div>
                  <p className="font-semibold">Location</p>
                  <p>Ruthi Kagia New Road</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Jeremy's Skate & Sports Shop. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with passion for the sports community in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}