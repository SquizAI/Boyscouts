import { DonorFeatures } from '../../types/donor';

export interface MLModel {
  train(features: DonorFeatures[], labels?: number[]): Promise<void>;
  predict(features: DonorFeatures): Promise<number>;
}

export interface PredictionResult {
  value: number;
  confidence: number;
}

export interface ModelConfig {
  seed?: number;
  maxIterations?: number;
  learningRate?: number;
}