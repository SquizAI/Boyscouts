import { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { DonorFeatures, DonorPrediction } from '../types/donor';

export function useAIAnalytics(features: DonorFeatures | null) {
  const [prediction, setPrediction] = useState<DonorPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function analyzeDonor() {
      if (!features) return;

      setLoading(true);
      setError(null);

      try {
        const result = await aiService.getFullPrediction(features);
        setPrediction(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze donor');
        setPrediction(null);
      } finally {
        setLoading(false);
      }
    }

    analyzeDonor();
  }, [features]);

  return { prediction, loading, error };
}