import React from 'react';
import { ShoppingCart, Filter } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Official Scout Uniform Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Uniforms',
  },
  {
    id: 2,
    name: 'Merit Badge Sash',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1617503752587-97d2103a96ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
  },
  {
    id: 3,
    name: 'Camping Equipment Set',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Equipment',
  },
  {
    id: 4,
    name: 'Scout Handbook',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Books',
  },
];

const categories = ['All', 'Uniforms', 'Accessories', 'Equipment', 'Books'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Scout Shop</h2>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart (0)
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}