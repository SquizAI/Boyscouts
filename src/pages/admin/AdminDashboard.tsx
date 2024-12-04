import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, Award, Calendar } from 'lucide-react';
import { Card } from '../../components/shared/Card';
import { useDonors } from '../../context/DonorContext';

export default function AdminDashboard() {
  const { donors } = useDonors();

  const stats = [
    {
      name: 'Total Donations',
      value: `$${donors.reduce((acc, donor) => acc + donor.donationAmount, 0).toLocaleString()}`,
      icon: DollarSign,
      change: '+14.5%',
      changeType: 'positive',
    },
    {
      name: 'Active Donors',
      value: donors.length.toString(),
      icon: Users,
      change: '+5.2%',
      changeType: 'positive',
    },
    {
      name: 'Campaigns',
      value: '12',
      icon: Award,
      change: '+2',
      changeType: 'positive',
    },
    {
      name: 'Monthly Growth',
      value: '18%',
      icon: Calendar,
      change: '+4%',
      changeType: 'positive',
    },
  ];

  const donationData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 2000 },
    { month: 'Apr', amount: 2780 },
    { month: 'May', amount: 1890 },
    { month: 'Jun', amount: 2390 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Donation Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Donations</h3>
            <div className="space-y-4">
              {donors.slice(0, 5).map((donor) => (
                <div key={donor.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{donor.lastName}</p>
                    <p className="text-sm text-gray-500">{donor.city}, {donor.state}</p>
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    ${donor.donationAmount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}