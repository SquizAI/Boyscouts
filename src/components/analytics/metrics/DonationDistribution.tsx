import React from 'react';
import { Card } from '../../shared/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DonorRecord } from '../../../types/donor';
import { formatCurrency } from '../../../utils/format';

interface DonationDistributionProps {
  donors: DonorRecord[];
}

export function DonationDistribution({ donors }: DonationDistributionProps) {
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Donation Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donors}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar dataKey="donationAmount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}