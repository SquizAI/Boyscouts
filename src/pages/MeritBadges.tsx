import React from 'react';
import { Award, Search } from 'lucide-react';

const badges = [
  {
    id: 1,
    name: 'First Aid',
    description: 'Learn essential first aid and emergency response skills',
    requirements: 8,
    image: 'https://images.unsplash.com/photo-1584308878768-57d3eda2772e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Health and Safety',
  },
  {
    id: 2,
    name: 'Environmental Science',
    description: 'Study ecosystems and environmental conservation',
    requirements: 6,
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Nature',
  },
  {
    id: 3,
    name: 'Camping',
    description: 'Master outdoor living and survival skills',
    requirements: 7,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Outdoor Skills',
  },
  {
    id: 4,
    name: 'Citizenship',
    description: 'Learn about civic duties and community service',
    requirements: 5,
    image: 'https://images.unsplash.com/photo-1524769998309-dd89294ce42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Citizenship',
  },
];

const categories = ['All', 'Health and Safety', 'Nature', 'Outdoor Skills', 'Citizenship'];

export default function MeritBadges() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBadges = badges
    .filter(badge => selectedCategory === 'All' || badge.category === selectedCategory)
    .filter(badge => 
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Merit Badges</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search badges..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBadges.map((badge) => (
          <div key={badge.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={badge.image}
                alt={badge.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">{badge.name}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">{badge.description}</p>
              <div className="mt-4">
                <span className="text-xs font-medium text-gray-500">
                  {badge.requirements} requirements to complete
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {badge.category}
                </span>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}