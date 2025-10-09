// components/Footer.js - Mobile Optimized
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-3">
        <div className="text-center">
          <p className="text-sm mb-2">&copy; 2024 Jeremy's Sports Shop</p>
          <p className="text-gray-400 text-xs mb-3">Gear Up for the Ride</p>
          <div className="flex justify-center space-x-4 text-xs">
            <a href="/" className="text-gray-400 hover:text-white">Home</a>
            <a href="/shop" className="text-gray-400 hover:text-white">Shop</a>
            <a href="/admin" className="text-gray-400 hover:text-white">Admin</a>
            <a href="#skating-club" className="text-gray-400 hover:text-white">Lessons</a>
          </div>
        </div>
      </div>
    </footer>
  );
}