export interface Campaign {
  id: string;
  name: string;
  description?: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'draft' | 'completed';
  createdAt?: string;
}

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  averageDonation: number;
}