import { DonorFeatures } from '../../types/donor';

export function extractFeatureArray(features: DonorFeatures): number[] {
  return [
    features.totalDonations,
    features.frequency,
    features.avgAmount,
    features.lastDonationDays,
    features.campaignParticipation
  ];
}