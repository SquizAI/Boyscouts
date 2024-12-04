import { DonorRecord, DonorFeatures } from '../types/donor';
import { differenceInDays } from 'date-fns';

export function extractDonorFeatures(donor: DonorRecord): DonorFeatures {
  // Calculate days since last donation
  const lastDonationDate = new Date(donor.year, 0);
  const daysSinceLastDonation = differenceInDays(new Date(), lastDonationDate);

  // For this example, we'll use simplified feature extraction
  // In a real application, you'd want more sophisticated analysis
  return {
    totalDonations: donor.donationAmount,
    frequency: 1, // This would ideally be calculated from historical data
    avgAmount: donor.donationAmount,
    lastDonationDays: daysSinceLastDonation,
    campaignParticipation: 1 // This would ideally be calculated from campaign data
  };
}