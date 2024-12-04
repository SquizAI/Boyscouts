import { DonorAnalytics } from '../models/DonorAnalytics';
import { DonorFeatures, DonorPrediction } from '../types/donor';

class AIService {
  private analytics: DonorAnalytics;

  constructor() {
    this.analytics = new DonorAnalytics();
  }

  async trainModels(features: DonorFeatures[], labels: number[]): Promise<void> {
    try {
      await this.analytics.trainModels(features, labels);
    } catch (error) {
      console.error('Error training AI models:', error);
      throw new Error('Failed to train AI models');
    }
  }

  async predictEngagement(features: DonorFeatures): Promise<number> {
    try {
      const prediction = await this.analytics.analyzeDonor(features);
      return prediction.engagementScore;
    } catch (error) {
      console.error('Error predicting engagement:', error);
      return 0;
    }
  }

  async getSegment(features: DonorFeatures): Promise<number> {
    try {
      const prediction = await this.analytics.analyzeDonor(features);
      return prediction.segment;
    } catch (error) {
      console.error('Error getting segment:', error);
      return 0;
    }
  }

  async getFullPrediction(features: DonorFeatures): Promise<DonorPrediction> {
    try {
      return await this.analytics.analyzeDonor(features);
    } catch (error) {
      console.error('Error getting full prediction:', error);
      throw new Error('Failed to get donor prediction');
    }
  }
}

export const aiService = new AIService();