import kmeans from 'ml-kmeans';
import { DonorFeatures } from '../../types/donor';
import { MLModel, ModelConfig } from './types';
import { normalizeFeatures } from './utils';
import { validateFeatures } from './validation';
import { ModelNotTrainedError, TrainingError, PredictionError } from './errors';

export class KMeansModel implements MLModel {
  private centroids: number[][] | null = null;
  private readonly config: Required<ModelConfig>;
  private readonly numClusters: number;

  constructor(numClusters: number = 4, config: ModelConfig = {}) {
    this.numClusters = numClusters;
    this.config = {
      seed: config.seed ?? 42,
      maxIterations: config.maxIterations ?? 100,
      learningRate: config.learningRate ?? 0.1
    };
  }

  async train(features: DonorFeatures[]): Promise<void> {
    try {
      features.forEach(validateFeatures);
      const normalizedData = features.map(normalizeFeatures);
      
      const result = kmeans(normalizedData, this.numClusters, {
        maxIterations: this.config.maxIterations,
        seed: this.config.seed,
        initialization: 'kmeans++'
      });
      
      this.centroids = result.centroids;
    } catch (error) {
      throw new TrainingError(error instanceof Error ? error.message : 'Unknown error during training');
    }
  }

  async predict(features: DonorFeatures): Promise<number> {
    try {
      if (!this.centroids) {
        throw new ModelNotTrainedError();
      }

      validateFeatures(features);
      const normalizedFeatures = normalizeFeatures(features);
      
      const distances = this.centroids.map(centroid => 
        this.euclideanDistance(normalizedFeatures, centroid)
      );
      
      return distances.indexOf(Math.min(...distances));
    } catch (error) {
      if (error instanceof ModelNotTrainedError) {
        throw error;
      }
      throw new PredictionError(error instanceof Error ? error.message : 'Unknown error during prediction');
    }
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(
      a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
    );
  }
}