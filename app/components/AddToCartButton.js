// app/components/AddToCartButton.js
'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={`w-full py-4 rounded-lg transition duration-300 font-semibold text-lg ${
        added 
          ? 'bg-green-600 text-white' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {added ? '✓ Added to Cart!' : `Add to Cart - KSh ${product.price.toLocaleString()}`}
    </button>
  );
}