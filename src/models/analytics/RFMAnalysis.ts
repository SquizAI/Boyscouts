import { DonorRecord } from '../../types/donor';
import { differenceInDays } from 'date-fns';

export interface RFMScores {
  recency: number;
  frequency: number;
  monetary: number;
  total: number;
}

export class RFMAnalysis {
  private readonly recencyWeight = 0.35;
  private readonly frequencyWeight = 0.35;
  private readonly monetaryWeight = 0.3;

  analyze(donors: DonorRecord[]): Map<string, RFMScores> {
    const scores = new Map<string, RFMScores>();
    const now = new Date();

    // Calculate raw values
    const rawScores = donors.map(donor => ({
      id: donor.id,
      recency: differenceInDays(now, new Date(donor.year, 0)),
      frequency: 1, // This would be calculated from historical data
      monetary: donor.donationAmount
    }));

    // Calculate quartiles for normalization
    const recencyQuartiles = this.calculateQuartiles(rawScores.map(s => s.recency));
    const frequencyQuartiles = this.calculateQuartiles(rawScores.map(s => s.frequency));
    const monetaryQuartiles = this.calculateQuartiles(rawScores.map(s => s.monetary));

    // Calculate normalized scores
    rawScores.forEach(raw => {
      const recency = this.normalizeScore(raw.recency, recencyQuartiles);
      const frequency = this.normalizeScore(raw.frequency, frequencyQuartiles);
      const monetary = this.normalizeScore(raw.monetary, monetaryQuartiles);

      const total = (
        recency * this.recencyWeight +
        frequency * this.frequencyWeight +
        monetary * this.monetaryWeight
      );

      scores.set(raw.id, {
        recency,
        frequency,
        monetary,
        total
      });
    });

    return scores;
  }

  private calculateQuartiles(values: number[]): number[] {
    const sorted = [...values].sort((a, b) => a - b);
    const q1Index = Math.floor(sorted.length * 0.25);
    const q2Index = Math.floor(sorted.length * 0.5);
    const q3Index = Math.floor(sorted.length * 0.75);

    return [
      sorted[q1Index],
      sorted[q2Index],
      sorted[q3Index]
    ];
  }

  private normalizeScore(value: number, quartiles: number[]): number {
    if (value <= quartiles[0]) return 4;
    if (value <= quartiles[1]) return 3;
    if (value <= quartiles[2]) return 2;
    return 1;
  }
}