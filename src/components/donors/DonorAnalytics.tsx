import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, MapPin, TrendingUp, Users } from 'lucide-react';
import { donorService } from '../../services/donorService';
import { Card } from '../shared/Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DonorAnalytics() {
  const analytics = donorService.getAnalytics();
  const frequencyAnalysis = donorService.getDonorFrequencyAnalysis();

  const frequencyData = [
    { name: 'Frequent', value: frequencyAnalysis.frequent },
    { name: 'Occasional', value: frequencyAnalysis.occasional },
    { name: 'One-time', value: frequencyAnalysis.onetime },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Donations</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${analytics.totalDonations.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Average Donation</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${analytics.averageDonation.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Top Location</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.locationBreakdown[0]?.state || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-indigo-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Donors</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {donorService.getDonors().length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Yearly Donation Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.yearlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Donor Frequency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={frequencyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {frequencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}