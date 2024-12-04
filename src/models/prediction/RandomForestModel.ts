import { RandomForestClassifier } from 'ml-random-forest';
import { DonorFeatures } from '../../types/donor';
import { extractFeatureArray } from './utils';

export class RandomForestModel {
  private model: RandomForestClassifier;

  constructor() {
    this.model = new RandomForestClassifier({
      nEstimators: 100,
      maxDepth: 10,
      seed: 42
    });
  }

  async train(features: DonorFeatures[], labels: number[]): Promise<void> {
    const trainingData = features.map(extractFeatureArray);
    this.model.train(trainingData, labels);
  }

  async predict(features: DonorFeatures): Promise<number> {
    const featureArray = extractFeatureArray(features);
    return this.model.predict([featureArray])[0];
  }
}