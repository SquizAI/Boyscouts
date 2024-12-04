import React from 'react';
import { Users, MessageCircle, Calendar } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  badges: string[];
  availability: string;
}

export function PeerMentoring() {
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      badges: ['First Aid', 'Camping', 'Environmental Science'],
      availability: 'Weekends',
    },
    {
      id: '2',
      name: 'Sarah Chen',
      badges: ['Citizenship', 'Personal Management', 'Swimming'],
      availability: 'Tuesday, Thursday evenings',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Available Mentors</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Become a Mentor
        </button>
      </div>

      <div className="grid gap-4">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{mentor.name}</h4>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {mentor.availability}
                </div>
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <MessageCircle className="h-4 w-4 mr-1" />
                Contact
              </button>
            </div>

            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Expert in:</div>
              <div className="flex flex-wrap gap-2">
                {mentor.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}