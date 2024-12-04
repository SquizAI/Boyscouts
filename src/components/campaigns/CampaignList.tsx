import React from 'react';
import { Link } from 'react-router-dom';
import { Campaign } from '../../types/campaign';
import { formatCurrency } from '../../utils/format';
import { CampaignProgress } from './CampaignProgress';

interface CampaignListProps {
  campaigns: Campaign[];
  onUpdate: () => void;
}

export function CampaignList({ campaigns, onUpdate }: CampaignListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  <Link
                    to={`/admin/campaigns/${campaign.id}`}
                    className="hover:text-blue-600"
                  >
                    {campaign.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : campaign.status === 'completed'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>

            <div className="mt-4">
              <CampaignProgress campaign={campaign} />
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-gray-500">
                Goal: {formatCurrency(campaign.goal)}
              </span>
              <span className="text-gray-500">
                Raised: {formatCurrency(campaign.raised)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}