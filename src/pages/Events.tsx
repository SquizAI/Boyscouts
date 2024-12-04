import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Summer Camp 2024',
    description: 'Annual summer camp at Camp Crystal Lake. Join us for a week of outdoor adventures, skill-building, and fun!',
    date: '2024-07-15',
    endDate: '2024-07-22',
    location: 'Camp Crystal Lake, Pine Valley',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    capacity: 150,
    registered: 87,
    type: 'Camp',
  },
  {
    id: 2,
    title: 'Eagle Scout Ceremony',
    description: 'Celebration ceremony for our newest Eagle Scouts. Family and friends welcome!',
    date: '2024-06-01',
    endDate: '2024-06-01',
    location: 'Community Center, Downtown',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    capacity: 200,
    registered: 145,
    type: 'Ceremony',
  },
  {
    id: 3,
    title: 'Community Service Day',
    description: 'Join us for a day of giving back to our community through various service projects.',
    date: '2024-05-15',
    endDate: '2024-05-15',
    location: 'City Park',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    capacity: 100,
    registered: 45,
    type: 'Service',
  },
];

const eventTypes = ['All', 'Camp', 'Ceremony', 'Service', 'Training'];

export default function Events() {
  const [selectedType, setSelectedType] = React.useState('All');

  const filteredEvents = selectedType === 'All'
    ? events
    : events.filter(event => event.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium text-gray-900">{event.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  event.type === 'Camp' ? 'bg-green-100 text-green-800' :
                  event.type === 'Ceremony' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {event.type}
                </span>
              </div>
              <p className="mt-2 text-gray-500">{event.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {event.registered} / {event.capacity} registered
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="relative pt-1 flex-1 mr-4">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                    <div
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}