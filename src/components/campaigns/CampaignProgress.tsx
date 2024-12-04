import React from 'react';
import { Campaign } from '../../types/campaign';

interface CampaignProgressProps {
  campaign: Campaign;
}

export function CampaignProgress({ campaign }: CampaignProgressProps) {
  const percentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block text-blue-600">
            {percentage.toFixed(1)}% Complete
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
        <div
          style={{ width: `${percentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
        />
      </div>
    </div>
  );
}