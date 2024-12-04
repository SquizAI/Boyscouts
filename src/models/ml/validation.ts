import { DonorFeatures } from '../../types/donor';
import { InvalidInputError } from './errors';

export function validateFeatures(features: DonorFeatures): void {
  if (!features) {
    throw new InvalidInputError('Features object is required');
  }

  const requiredFields: (keyof DonorFeatures)[] = [
    'totalDonations',
    'frequency',
    'avgAmount',
    'lastDonationDays',
    'campaignParticipation'
  ];

  for (const field of requiredFields) {
    if (typeof features[field] !== 'number' || isNaN(features[field])) {
      throw new InvalidInputError(`${field} must be a valid number`);
    }
    if (features[field] < 0) {
      throw new InvalidInputError(`${field} cannot be negative`);
    }
  }
}