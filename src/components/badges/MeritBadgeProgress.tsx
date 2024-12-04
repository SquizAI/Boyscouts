import React from 'react';
import { Award, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { Card } from '../shared/Card';

interface BadgeProgress {
  id: string;
  name: string;
  category: string;
  progress: number;
  requirements: {
    id: string;
    description: string;
    completed: boolean;
  }[];
  completedAt?: string;
}

export function MeritBadgeProgress() {
  // In a real app, this would come from an API
  const badges: BadgeProgress[] = [
    {
      id: '1',
      name: 'First Aid',
      category: 'Health and Safety',
      progress: 0.75,
      requirements: [
        { id: '1a', description: 'Demonstrate bandaging skills', completed: true },
        { id: '1b', description: 'Explain first aid principles', completed: true },
        { id: '1c', description: 'Complete CPR certification', completed: false },
        { id: '1d', description: 'Create emergency action plan', completed: true }
      ]
    },
    {
      id: '2',
      name: 'Environmental Science',
      category: 'Nature',
      progress: 0.33,
      requirements: [
        { id: '2a', description: 'Study local ecosystem', completed: true },
        { id: '2b', description: 'Complete conservation project', completed: false },
        { id: '2c', description: 'Document environmental impact', completed: false }
      ]
    },
    {
      id: '3',
      name: 'Citizenship',
      category: 'Citizenship',
      progress: 1,
      requirements: [
        { id: '3a', description: 'Learn about local government', completed: true },
        { id: '3b', description: 'Participate in community service', completed: true },
        { id: '3c', description: 'Interview civic leader', completed: true }
      ],
      completedAt: '2024-02-15'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-primary-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-100">Merit Badge Progress</h3>
          </div>
          <span className="text-sm text-gray-400">
            {badges.filter(b => b.progress === 1).length} of {badges.length} completed
          </span>
        </div>

        <div className="space-y-6">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-lg border ${
                badge.progress === 1
                  ? 'bg-primary-500/10 border-primary-500/20'
                  : 'bg-dark-800/50 border-dark-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-100">{badge.name}</h4>
                  <p className="text-sm text-gray-400">{badge.category}</p>
                </div>
                {badge.completedAt ? (
                  <span className="text-sm text-primary-400">
                    Completed {new Date(badge.completedAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">
                    {Math.round(badge.progress * 100)}% complete
                  </span>
                )}
              </div>

              <div className="relative h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary-500 transition-all duration-500"
                  style={{ width: `${badge.progress * 100}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {badge.requirements.map((req) => (
                  <div key={req.id} className="flex items-start">
                    {req.completed ? (
                      <CheckCircle className="h-5 w-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      req.completed ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      {req.description}
                    </span>
                  </div>
                ))}
              </div>

              {badge.progress < 1 && (
                <button className="mt-4 flex items-center text-sm text-primary-400 hover:text-primary-300">
                  <span>Update Progress</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}