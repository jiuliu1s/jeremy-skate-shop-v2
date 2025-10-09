// Simple Header Component 
export default function Header() { 
  return ( 
    <header className="bg-white shadow-sm border-b"> 
      <div className="container mx-auto px-3 py-3"> 
        <div className="flex justify-between items-center"> 
          <div className="flex items-center space-x-2"> 
            <div className="bg-blue-600 text-white p-2 rounded-lg"> 
              <span className="font-bold text-sm">JS</span> 
            </div> 
            <div> 
              <h1 className="text-sm font-bold text-gray-800">Jeremy's Shop</h1> 
              <p className="text-xs text-gray-500">Sports & Skates</p> 
            </div> 
          </div> 
          <nav className="flex space-x-3"> 
            <a href="/" className="text-gray-700 text-sm">Home</a> 
            <a href="/shop" className="text-gray-700 text-sm">Shop</a> 
            <a href="/admin" className="text-gray-700 text-sm">Admin</a> 
          </nav> 
        </div> 
      </div> 
    </header> 
  ); 
} 
