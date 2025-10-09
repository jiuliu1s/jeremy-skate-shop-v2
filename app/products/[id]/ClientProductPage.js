// app/products/[id]/ClientProductPage.js
'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getClientProductById } from '../../../lib/products';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../components/AddToCartButton';

export default function ClientProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = () => {
      try {
        const foundProduct = getClientProductById(productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <a href="/shop" className="text-blue-600 hover:text-blue-800">← Back to Shop</a>
          </nav>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:w-1/2 p-8">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">{product.category}</p>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <p className="text-blue-600 font-bold text-2xl mb-6">KSh {product.price.toLocaleString()}</p>
                
                <p className="text-gray-700 mb-6">
                  {product.description || `Premium quality ${product.category.toLowerCase()} designed for optimal performance.`}
                </p>

                {product.features && product.features.length > 0 ? (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Features:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Features:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>High-quality materials</li>
                      <li>Durable construction</li>
                      <li>Professional grade</li>
                      <li>Comfortable design</li>
                    </ul>
                  </div>
                )}

                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}