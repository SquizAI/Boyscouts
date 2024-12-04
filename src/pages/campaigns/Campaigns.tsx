import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Campaign } from '../../types/campaign';
import { campaignService } from '../../services/campaignService';
import { CampaignList } from '../../components/campaigns/CampaignList';
import { CampaignForm } from '../../components/campaigns/CampaignForm';
import { Dialog } from '../../components/shared/Dialog';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { useApi } from '../../hooks/useApi';

export default function Campaigns() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: campaigns, loading, error, refetch } = useApi<Campaign[]>(
    () => campaignService.getCampaigns()
  );

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading campaigns</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </button>
      </div>

      <CampaignList campaigns={campaigns || []} onUpdate={refetch} />

      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Create Campaign"
      >
        <CampaignForm onSubmit={handleFormSubmit} />
      </Dialog>
    </div>
  );
}