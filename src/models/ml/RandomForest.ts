import { RandomForestClassifier } from 'ml-random-forest';
import { DonorFeatures } from '../../types/donor';
import { MLModel, ModelConfig } from './types';
import { normalizeFeatures } from './utils';
import { validateFeatures } from './validation';
import { ModelNotTrainedError, TrainingError, PredictionError } from './errors';

export class RandomForestModel implements MLModel {
  private model: RandomForestClassifier;
  private isTrained: boolean = false;
  private readonly config: Required<ModelConfig>;

  constructor(config: ModelConfig = {}) {
    this.config = {
      seed: config.seed ?? 42,
      maxIterations: config.maxIterations ?? 100,
      learningRate: config.learningRate ?? 0.1
    };

    this.model = new RandomForestClassifier({
      nEstimators: this.config.maxIterations,
      maxDepth: 10,
      seed: this.config.seed
    });
  }

  async train(features: DonorFeatures[], labels: number[]): Promise<void> {
    try {
      if (features.length !== labels.length) {
        throw new Error('Number of features must match number of labels');
      }

      features.forEach(validateFeatures);
      const normalizedData = features.map(normalizeFeatures);
      
      this.model.train(normalizedData, labels);
      this.isTrained = true;
    } catch (error) {
      throw new TrainingError(error instanceof Error ? error.message : 'Unknown error during training');
    }
  }

  async predict(features: DonorFeatures): Promise<number> {
    try {
      if (!this.isTrained) {
        throw new ModelNotTrainedError();
      }

      validateFeatures(features);
      const normalizedFeatures = normalizeFeatures(features);
      
      return this.model.predict([normalizedFeatures])[0];
    } catch (error) {
      if (error instanceof ModelNotTrainedError) {
        throw error;
      }
      throw new PredictionError(error instanceof Error ? error.message : 'Unknown error during prediction');
    }
  }
}