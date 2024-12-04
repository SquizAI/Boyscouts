import { DonorFeatures } from '../types/donor';

export function extractFeatures(donor: DonorFeatures): number[] {
  return [
    donor.totalDonations,
    donor.frequency,
    donor.avgAmount,
    donor.lastDonationDays,
    donor.campaignParticipation
  ];
}

export function normalizeFeatures(features: number[]): number[] {
  const min = Math.min(...features);
  const max = Math.max(...features);
  return features.map(val => (val - min) / (max - min || 1));
}