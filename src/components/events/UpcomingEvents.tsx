import React from 'react';
import { Card } from '../shared/Card';
import { Calendar, MapPin, Users } from 'lucide-react';

export function UpcomingEvents() {
  const events = [
    {
      title: 'Summer Camp 2024',
      date: 'July 15-22, 2024',
      location: 'Camp Crystal Lake',
      participants: '87/150',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d'
    },
    {
      title: 'Merit Badge Workshop',
      date: 'June 1, 2024',
      location: 'Scout Center',
      participants: '45/50',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-100 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg border border-dark-700/50"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 bg-dark-800/95">
                <h4 className="font-medium text-gray-100">{event.title}</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    {event.participants} registered
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}