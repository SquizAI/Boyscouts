import React from 'react';
import { Link } from 'react-router-dom';
import { donorService } from '../../services/donorService';
import { DonorRecord } from '../../types/donor';
import { formatCurrency } from '../../utils/format';
import { useApi } from '../../hooks/useApi';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface CampaignDonorsProps {
  campaignId: string;
}

export function CampaignDonors({ campaignId }: CampaignDonorsProps) {
  const { data: donors, loading, error } = useApi<DonorRecord[]>(
    () => donorService.getDonorsByCampaign(campaignId),
    [campaignId]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading donors</div>;
  if (!donors?.length) return <div>No donors yet</div>;

  return (
    <div className="flow-root">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {donors.map((donor) => (
          <li key={donor.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  <Link
                    to={`/admin/donors/${donor.id}`}
                    className="hover:text-blue-600"
                  >
                    {donor.lastName}
                  </Link>
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {donor.city}, {donor.state}
                </p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {formatCurrency(donor.donationAmount)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}