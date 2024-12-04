import { SimpleLinearRegression } from 'ml-regression';
import { DonorRecord } from '../../types/donor';
import { differenceInDays } from 'date-fns';

export interface PredictionResult {
  nextAmount: number;
  confidence: number;
  suggestedDate: Date;
}

export class DonationPrediction {
  private model: SimpleLinearRegression;

  constructor() {
    this.model = new SimpleLinearRegression();
  }

  trainModel(donors: DonorRecord[]): void {
    // Prepare training data
    const amounts = donors.map(d => d.donationAmount);
    const dates = donors.map(d => new Date(d.year, 0).getTime());

    this.model.train(dates, amounts);
  }

  predictNextDonation(donor: DonorRecord): PredictionResult {
    const lastDonationDate = new Date(donor.year, 0);
    const daysSinceLastDonation = differenceInDays(new Date(), lastDonationDate);

    // Predict next amount
    const nextAmount = Math.max(
      donor.donationAmount * (1 + (Math.random() * 0.2 - 0.1)), // ±10% variation
      0
    );

    // Calculate confidence based on recency
    const confidence = Math.max(0, 1 - (daysSinceLastDonation / 365));

    // Suggest next donation date
    const suggestedDate = new Date();
    suggestedDate.setDate(suggestedDate.getDate() + 30); // Default to 30 days

    return {
      nextAmount: Math.round(nextAmount * 100) / 100,
      confidence,
      suggestedDate
    };
  }
}