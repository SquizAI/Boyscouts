import { kmeans } from 'ml-kmeans';
import { DonorFeatures } from '../../types/donor';
import { extractFeatureArray } from '../prediction/utils';

export class KMeansModel {
  private centroids: number[][] = [];
  private readonly numClusters: number;

  constructor(numClusters: number = 4) {
    this.numClusters = numClusters;
  }

  async train(features: DonorFeatures[]): Promise<void> {
    const data = features.map(extractFeatureArray);
    const result = kmeans(data, this.numClusters, {
      initialization: 'kmeans++',
      seed: 42
    });
    
    this.centroids = result.centroids;
  }

  async predict(features: DonorFeatures): Promise<number> {
    const point = extractFeatureArray(features);
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