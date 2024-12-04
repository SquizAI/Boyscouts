import { kmeans } from 'ml-kmeans';
import { RandomForestClassifier } from 'ml-random-forest';
import { DonorFeatures, DonorPrediction } from '../types/donor';

export class DonorAnalytics {
  private rfModel: RandomForestClassifier;
  private kmeansModel: any;
  private centroids: number[][] = [];

  constructor() {
    this.rfModel = new RandomForestClassifier({
      nEstimators: 100,
      maxDepth: 10,
      seed: 42
    });
  }

  private extractFeatures(features: DonorFeatures): number[] {
    return [
      features.totalDonations,
      features.frequency,
      features.avgAmount,
      features.lastDonationDays,
      features.campaignParticipation
    ];
  }

  async trainModels(features: DonorFeatures[], labels: number[]): Promise<void> {
    const trainingData = features.map(this.extractFeatures);
    
    // Train Random Forest
    this.rfModel.train(trainingData, labels);

    // Train KMeans
    const result = kmeans(trainingData, 4, {
      initialization: 'kmeans++',
      seed: 42
    });
    
    this.centroids = result.centroids;
  }

  async analyzeDonor(features: DonorFeatures): Promise<DonorPrediction> {
    const featureArray = this.extractFeatures(features);

    // Get engagement score from Random Forest
    const engagementScore = this.rfModel.predict([featureArray])[0];

    // Get segment from KMeans
    const distances = this.centroids.map(centroid => 
      Math.sqrt(
        featureArray.reduce((sum, val, i) => 
          sum + Math.pow(val - centroid[i], 2), 0
        )
      )
    );
    const segment = distances.indexOf(Math.min(...distances));

    // Estimate next donation
    const nextDonationEstimate = this.estimateNextDonation(features, engagementScore);

    return {
      engagementScore,
      segment,
      nextDonationEstimate,
      lastUpdated: new Date()
    };
  }

  private estimateNextDonation(features: DonorFeatures, engagementScore: number): number {
    const baseEstimate = features.avgAmount * (engagementScore + 0.5);
    const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8 and 1.2
    return Math.round(baseEstimate * randomFactor);
  }
}