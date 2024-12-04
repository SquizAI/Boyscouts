import { DonorFeatures } from '../../types/donor';

export function normalizeFeatures(features: DonorFeatures): number[] {
  const featureArray = [
    features.totalDonations,
    features.frequency,
    features.avgAmount,
    features.lastDonationDays,
    features.campaignParticipation
  ];

  // Min-max normalization
  const min = Math.min(...featureArray);
  const max = Math.max(...featureArray);
  return featureArray.map(val => (val - min) / (max - min || 1));
}

export function extractFeatureArray(features: DonorFeatures): number[] {
  return [
    features.totalDonations,
    features.frequency,
    features.avgAmount,
    features.lastDonationDays,
    features.campaignParticipation
  ];
}