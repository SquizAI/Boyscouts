import { kmeans } from 'ml-kmeans';
import { DonorFeatures } from '../types/donor';

export class KMeansModel {
  private centroids: number[][] = [];
  private readonly numClusters: number;

  constructor(numClusters: number = 4) {
    this.numClusters = numClusters;
  }

  async train(features: DonorFeatures[]): Promise<void> {
    const data = features.map(f => [
      f.totalDonations,
      f.frequency,
      f.avgAmount,
      f.lastDonationDays,
      f.campaignParticipation
    ]);

    const result = kmeans(data, this.numClusters, {
      initialization: 'kmeans++',
      seed: 42,
      maxIterations: 100
    });
    
    this.centroids = result.centroids;
  }

  async predict(features: DonorFeatures): Promise<number> {
    const point = [
      features.totalDonations,
      features.frequency,
      features.avgAmount,
      features.lastDonationDays,
      features.campaignParticipation
    ];

    const distances = this.centroids.map(centroid => 
      this.euclideanDistance(point, centroid)
    );
    return distances.indexOf(Math.min(...distances));
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(
      a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
    );
  }
}