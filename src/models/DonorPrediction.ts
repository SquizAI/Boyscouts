import { DonorFeatures } from '../types/donor';
import { RandomForestClassifier } from 'ml-random-forest';

export class DonorPredictionModel {
  private model: RandomForestClassifier;

  constructor() {
    this.model = new RandomForestClassifier({
      nEstimators: 100,
      maxDepth: 10,
      seed: 42
    });
  }

  async train(features: DonorFeatures[], labels: number[]) {
    const trainingData = features.map(f => [
      f.totalDonations,
      f.frequency,
      f.avgAmount,
      f.lastDonationDays,
      f.campaignParticipation
    ]);

    this.model.train(trainingData, labels);
  }

  async predictEngagement(features: DonorFeatures): Promise<number> {
    const featureArray = [
      features.totalDonations,
      features.frequency,
      features.avgAmount,
      features.lastDonationDays,
      features.campaignParticipation
    ];

    return this.model.predict([featureArray])[0];
  }
}