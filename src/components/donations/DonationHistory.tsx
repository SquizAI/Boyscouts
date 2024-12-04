import React from 'react';
import { DonorRecord } from '../../types/donor';
import { Card } from '../shared/Card';
import { formatCurrency } from '../../utils/format';
import { Calendar } from 'lucide-react';

interface DonationHistoryProps {
  donations: DonorRecord[];
}

export function DonationHistory({ donations }: DonationHistoryProps) {
  const sortedDonations = [...donations].sort((a, b) => b.year - a.year);

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-100 mb-4">Recent Donations</h3>
        <div className="space-y-4">
          {sortedDonations.slice(0, 5).map((donation, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50 border border-dark-700/50"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-200">{donation.appealName}</p>
                  <p className="text-sm text-gray-400">{donation.year}</p>
                </div>
              </div>
              <span className="text-lg font-medium text-primary-100">
                {formatCurrency(donation.donationAmount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}