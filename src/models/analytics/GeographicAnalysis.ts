import { DonorRecord } from '../../types/donor';
import { getStateName } from '../../utils/csv/stateUtils';

export interface StateMetrics {
  totalDonors: number;
  totalDonations: number;
  averageDonation: number;
  growthRate: number;
}

export interface RegionalInsight {
  region: string;
  insight: string;
  metric: number;
  trend: 'up' | 'down' | 'stable';
}

export class GeographicAnalysis {
  analyzeByState(donors: DonorRecord[]): Map<string, StateMetrics> {
    const metrics = new Map<string, StateMetrics>();

    // Group donors by state
    const stateGroups = new Map<string, DonorRecord[]>();
    donors.forEach(donor => {
      if (!donor.state) return;
      
      if (!stateGroups.has(donor.state)) {
        stateGroups.set(donor.state, []);
      }
      stateGroups.get(donor.state)!.push(donor);
    });

    // Calculate metrics for each state
    stateGroups.forEach((stateDonors, state) => {
      const totalDonations = stateDonors.reduce((sum, d) => sum + d.donationAmount, 0);
      const currentYear = new Date().getFullYear();
      const lastYearDonors = stateDonors.filter(d => d.year === currentYear - 1);
      const thisYearDonors = stateDonors.filter(d => d.year === currentYear);
      
      const growthRate = lastYearDonors.length > 0 
        ? (thisYearDonors.length - lastYearDonors.length) / lastYearDonors.length
        : 0;

      metrics.set(state, {
        totalDonors: stateDonors.length,
        totalDonations,
        averageDonation: totalDonations / stateDonors.length,
        growthRate
      });
    });

    return metrics;
  }

  generateInsights(stateMetrics: Map<string, StateMetrics>): RegionalInsight[] {
    const insights: RegionalInsight[] = [];

    // Find top performing states
    const sortedByTotal = Array.from(stateMetrics.entries())
      .sort((a, b) => b[1].totalDonations - a[1].totalDonations);

    const topState = sortedByTotal[0];
    if (topState) {
      insights.push({
        region: getStateName(topState[0]) || topState[0],
        insight: 'Highest total donations',
        metric: topState[1].totalDonations,
        trend: 'up'
      });
    }

    // Find fastest growing states
    const sortedByGrowth = Array.from(stateMetrics.entries())
      .sort((a, b) => b[1].growthRate - a[1].growthRate);

    const topGrowth = sortedByGrowth[0];
    if (topGrowth && topGrowth[1].growthRate > 0) {
      insights.push({
        region: getStateName(topGrowth[0]) || topGrowth[0],
        insight: 'Fastest growing donor base',
        metric: topGrowth[1].growthRate * 100,
        trend: 'up'
      });
    }

    // Find states with highest average donations
    const sortedByAverage = Array.from(stateMetrics.entries())
      .sort((a, b) => b[1].averageDonation - a[1].averageDonation);

    const topAverage = sortedByAverage[0];
    if (topAverage) {
      insights.push({
        region: getStateName(topAverage[0]) || topAverage[0],
        insight: 'Highest average donation',
        metric: topAverage[1].averageDonation,
        trend: 'up'
      });
    }

    return insights;
  }
}