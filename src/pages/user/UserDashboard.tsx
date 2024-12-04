import React from 'react';
import { HeartHandshake, Calendar, DollarSign, Award } from 'lucide-react';
import { Card } from '../../components/shared/Card';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDonors } from '../../context/DonorContext';
import { DonationHistory } from '../../components/donations/DonationHistory';
import { ImpactSummary } from '../../components/donations/ImpactSummary';
import { UpcomingEvents } from '../../components/events/UpcomingEvents';
import { MeritBadgeProgress } from '../../components/badges/MeritBadgeProgress';

export default function UserDashboard() {
  const { user } = useAuth();
  const { donors } = useDonors();

  const userDonations = donors.filter(donor => donor.email === user?.email);
  const totalDonated = userDonations.reduce((acc, donor) => acc + donor.donationAmount, 0);

  const userStats = [
    {
      name: 'Total Donations',
      value: `$${totalDonated.toLocaleString()}`,
      icon: DollarSign,
      description: 'Your lifetime contributions',
      color: 'primary'
    },
    {
      name: 'Active Campaigns',
      value: '3',
      icon: HeartHandshake,
      description: 'Campaigns you can support',
      color: 'accent'
    },
    {
      name: 'Merit Badges',
      value: '12',
      icon: Award,
      description: 'Badges in progress',
      color: 'emerald'
    },
    {
      name: 'Next Event',
      value: 'Summer Camp',
      icon: Calendar,
      description: 'July 15-22, 2024',
      color: 'violet'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-100">Welcome, {user?.name}</h1>
        <Link
          to="/user/donate"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Make a Donation
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
          <Card 
            key={stat.name}
            className={`bg-${stat.color}-500/10 border border-${stat.color}-500/20`}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{stat.name}</p>
                  <p className={`text-2xl font-bold mt-1 text-${stat.color}-100`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{stat.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <DonationHistory donations={userDonations} />
          <ImpactSummary totalDonated={totalDonated} />
        </div>
        <div className="space-y-6">
          <UpcomingEvents />
          <MeritBadgeProgress />
        </div>
      </div>
    </div>
  );
}