import React from 'react';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
import { DonorRecord } from '../../../types/donor';
import { formatCurrency } from '../../../utils/format';
import { Card } from '../../shared/Card';

interface BasicMetricsProps {
  donors: DonorRecord[];
}

export function BasicMetrics({ donors }: BasicMetricsProps) {
  const totalDonations = donors.reduce((sum, d) => sum + d.donationAmount, 0);
  const averageDonation = totalDonations / donors.length || 0;

  const metrics = [
    {
      label: 'Total Donations',
      value: formatCurrency(totalDonations),
      icon: DollarSign,
      bgColor: 'bg-primary-500/10',
      textColor: 'text-primary-100',
      iconColor: 'text-primary-400',
      borderColor: 'border-primary-500/20'
    },
    {
      label: 'Average Donation',
      value: formatCurrency(averageDonation),
      icon: TrendingUp,
      bgColor: 'bg-accent-500/10',
      textColor: 'text-accent-100',
      iconColor: 'text-accent-400',
      borderColor: 'border-accent-500/20'
    },
    {
      label: 'Total Donors',
      value: donors.length.toLocaleString(),
      icon: Users,
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-100',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card 
          key={index} 
          className={`${metric.bgColor} border ${metric.borderColor}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${metric.bgColor} backdrop-blur-xl`}>
                  <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{metric.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${metric.textColor}`}>
                    {metric.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}