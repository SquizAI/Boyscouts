import React from 'react';
import { Card } from '../shared/Card';
import { Award, Users, Tent } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface ImpactSummaryProps {
  totalDonated: number;
}

export function ImpactSummary({ totalDonated }: ImpactSummaryProps) {
  const impacts = [
    {
      icon: Users,
      title: 'Scouts Supported',
      value: Math.floor(totalDonated / 500),
      color: 'primary'
    },
    {
      icon: Tent,
      title: 'Camping Trips Funded',
      value: Math.floor(totalDonated / 1000),
      color: 'emerald'
    },
    {
      icon: Award,
      title: 'Merit Badges Enabled',
      value: Math.floor(totalDonated / 100),
      color: 'accent'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-100 mb-4">Your Impact</h3>
        <p className="text-sm text-gray-400 mb-6">
          Your total contribution of {formatCurrency(totalDonated)} has helped:
        </p>

        <div className="space-y-4">
          {impacts.map((impact, index) => (
            <div 
              key={index}
              className={`flex items-center p-4 rounded-lg bg-${impact.color}-500/10 border border-${impact.color}-500/20`}
            >
              <div className={`p-2 rounded-lg bg-${impact.color}-500/20`}>
                <impact.icon className={`h-5 w-5 text-${impact.color}-400`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">{impact.title}</p>
                <p className={`text-2xl font-bold text-${impact.color}-100`}>
                  {impact.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}