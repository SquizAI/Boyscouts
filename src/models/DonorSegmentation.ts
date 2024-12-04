import { DonorFeatures } from '../types/donor';

export class DonorSegmentationModel {
  private centroids: number[][] = [];
  private numClusters: number;
  private maxIterations: number;

  constructor(numClusters: number = 4, maxIterations: number = 100) {
    this.numClusters = numClusters;
    this.maxIterations = maxIterations;
  }

  private distance(a: number[], b: number[]): number {
    return Math.sqrt(
      a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
    );
  }

  private initializeCentroids(data: number[][]): void {
    // Simple k-means++ initialization
    const firstIndex = Math.floor(Math.random() * data.length);
    this.centroids = [data[firstIndex]];

    while (this.centroids.length < this.numClusters) {
      const distances = data.map(point => 
        Math.min(...this.centroids.map(centroid => 
          this.distance(point, centroid)
        ))
      );
      
      const sum = distances.reduce((a, b) => a + b, 0);
      const probs = distances.map(d => d / sum);
      
      let r = Math.random();
      let index = 0;
      while (r > 0 && index < probs.length) {
        r -= probs[index];
        index++;
      }
      
      this.centroids.push(data[Math.max(0, index - 1)]);
    }
  }

  async train(features: DonorFeatures[]) {
    const data = features.map(f => [
      f.totalDonations,
      f.frequency,
      f.avgAmount,
      f.lastDonationDays,
      f.campaignParticipation
    ]);

    this.initializeCentroids(data);

    for (let iteration = 0; iteration < this.maxIterations; iteration++) {
      // Assign points to clusters
      const assignments = data.map(point => {
        const distances = this.centroids.map(centroid => 
          this.distance(point, centroid)
        );
        return distances.indexOf(Math.min(...distances));
      });

      // Update centroids
      const newCentroids = Array(this.numClusters).fill(0).map(() => 
        Array(data[0].length).fill(0)
      );
      const counts = Array(this.numClusters).fill(0);

      data.forEach((point, i) => {
        const cluster = assignments[i];
        counts[cluster]++;
        point.forEach((value, dim) => {
          newCentroids[cluster][dim] += value;
        });
      });

      // Calculate new centroids
      this.centroids = newCentroids.map((centroid, i) => 
        centroid.map(sum => sum / (counts[i] || 1))
      );
    }
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
      this.distance(point, centroid)
    );
    return distances.indexOf(Math.min(...distances));
  }
}