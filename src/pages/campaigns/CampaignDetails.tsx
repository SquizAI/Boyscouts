import React from 'react';
import { useParams } from 'react-router-dom';
import { Campaign } from '../../types/campaign';
import { campaignService } from '../../services/campaignService';
import { Card } from '../../components/shared/Card';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { useApi } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/format';
import { CampaignProgress } from '../../components/campaigns/CampaignProgress';
import { CampaignDonors } from '../../components/campaigns/CampaignDonors';
import { CampaignShare } from '../../components/campaigns/CampaignShare';

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: campaign, loading, error } = useApi<Campaign>(
    () => campaignService.getCampaignById(id!),
    [id]
  );

  const handleShare = async (platform: string) => {
    if (campaign) {
      try {
        await campaignService.trackShare(campaign.id, platform);
      } catch (error) {
        console.error('Error tracking share:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!campaign) return <ErrorMessage message="Campaign not found" />;

  const shareUrl = `${window.location.origin}/campaigns/${campaign.id}`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">{campaign.name}</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-100 mb-4">Campaign Overview</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-400">Goal</dt>
                <dd className="mt-1 text-lg text-gray-100">{formatCurrency(campaign.goal)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Raised</dt>
                <dd className="mt-1 text-lg text-gray-100">{formatCurrency(campaign.raised)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-300">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-400">End Date</dt>
                <dd className="mt-1 text-sm text-gray-300">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <CampaignProgress campaign={campaign} />
            </div>
          </div>
        </Card>

        <CampaignShare
          campaignId={campaign.id}
          campaignName={campaign.name}
          goal={campaign.goal}
          raised={campaign.raised}
          shareUrl={shareUrl}
          onShare={handleShare}
        />
      </div>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-100 mb-4">Description</h3>
          <p className="text-gray-300">{campaign.description}</p>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-100 mb-4">Recent Donors</h3>
          <CampaignDonors campaignId={campaign.id} />
        </div>
      </Card>
    </div>
  );
}