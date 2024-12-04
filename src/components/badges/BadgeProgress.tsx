import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import { Award, CheckCircle, Circle } from 'lucide-react';

interface Requirement {
  id: string;
  description: string;
  completed: boolean;
}

interface BadgeProgressProps {
  badgeName: string;
  requirements: Requirement[];
  completedCount: number;
  totalCount: number;
}

export function BadgeProgress({ badgeName, requirements, completedCount, totalCount }: BadgeProgressProps) {
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Award className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">{badgeName}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {completedCount} of {totalCount} requirements completed
        </span>
      </div>

      <Progress.Root
        className="relative overflow-hidden bg-blue-100 rounded-full w-full h-4"
        value={progress}
      >
        <Progress.Indicator
          className="bg-blue-500 w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>

      <div className="mt-4 space-y-2">
        {requirements.map((req) => (
          <div key={req.id} className="flex items-start">
            {req.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300 mt-0.5 mr-2" />
            )}
            <span className={`text-sm ${req.completed ? 'text-gray-700' : 'text-gray-500'}`}>
              {req.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}