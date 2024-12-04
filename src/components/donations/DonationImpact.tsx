import React from 'react';
import { Award, Users, Tent } from 'lucide-react';
import { Card } from '../shared/Card';

interface DonationImpactProps {
  amount: number;
  frequency: 'one-time' | 'monthly' | 'yearly';
}

export function DonationImpact({ amount, frequency }: DonationImpactProps) {
  const annualAmount = amount * (frequency === 'monthly' ? 12 : frequency === 'yearly' ? 1 : 1);

  const getImpactItems = () => {
    if (annualAmount >= 1000) {
      return [
        { icon: Users, label: 'Sponsor multiple Scouts for a year' },
        { icon: Tent, label: 'Fund camping equipment for a troop' },
        { icon: Award, label: 'Support leadership development programs' }
      ];
    }
    if (annualAmount >= 500) {
      return [
        { icon: Users, label: 'Sponsor a Scout for a year' },
        { icon: Tent, label: 'Fund camping trips' },
        { icon: Award, label: 'Support merit badge programs' }
      ];
    }
    return [
      { icon: Users, label: 'Help provide Scout uniforms' },
      { icon: Award, label: 'Support merit badge activities' },
      { icon: Tent, label: 'Contribute to camping equipment' }
    ];
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-100 mb-4">Your Impact</h3>
        
        <div className="space-y-4">
          {getImpactItems().map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="p-2 rounded-lg bg-primary-500/10">
                <item.icon className="h-5 w-5 text-primary-400" />
              </div>
              <span className="ml-3 text-sm text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>

        {frequency !== 'one-time' && (
          <div className="mt-6 p-4 rounded-lg bg-primary-500/5 border border-primary-500/10">
            <p className="text-sm text-primary-300">
              Your {frequency} donation will provide continuous support for our Scouts
              {frequency === 'monthly' && ` ($${(amount * 12).toLocaleString()} annually)`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}