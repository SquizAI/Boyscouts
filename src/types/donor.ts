export interface DonorRecord {
  id: string;
  appealCode: string;
  year: number;
  appealName: string;
  structure: string;
  givingCategory: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  donationAmount: number;
  phone?: string;
  county?: string;
  createdAt?: string;
}

export interface DonorAnalytics {
  totalDonations: number;
  averageDonation: number;
  yearlyTrends: { year: number; total: number }[];
  locationBreakdown: { state: string; total: number }[];
}

export interface DonorFeatures {
  totalDonations: number;
  frequency: number;
  avgAmount: number;
  lastDonationDays: number;
  campaignParticipation: number;
}

export interface DonorPrediction {
  engagementScore: number;
  segment: number;
  nextDonationEstimate: number;
  lastUpdated: Date;
}