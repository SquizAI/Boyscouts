import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Award } from 'lucide-react';
import { Card } from '../shared/Card';

const mockData = [
  { month: 'Jan', completed: 4 },
  { month: 'Feb', completed: 6 },
  { month: 'Mar', completed: 3 },
  { month: 'Apr', completed: 8 },
  { month: 'May', completed: 5 },
  { month: 'Jun', completed: 7 },
];

export function BadgeAnalytics() {
  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Badge Progress Analytics</h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Total Badges</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-blue-900">24</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">Completed</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-green-900">18</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-900">In Progress</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-yellow-900">6</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}