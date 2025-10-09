// app/components/AddToCart.js
'use client';

import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function AddToCart({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold text-lg"
        >
          Add to Cart - KSh {(product.price * quantity).toLocaleString()}
        </button>
      </div>
    </div>
  );
}