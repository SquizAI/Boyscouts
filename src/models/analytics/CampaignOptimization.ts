import { Campaign } from '../../types/campaign';
import { DonorRecord } from '../../types/donor';
import { SimpleLinearRegression } from 'ml-regression';
import { differenceInDays } from 'date-fns';

export interface CampaignInsight {
  type: 'success' | 'warning' | 'info';
  message: string;
  metric?: number;
  recommendation?: string;
}

export interface OptimizationResult {
  suggestedGoal: number;
  suggestedDuration: number;
  predictedDonors: number;
  insights: CampaignInsight[];
  confidenceScore: number;
}

export class CampaignOptimization {
  private regressionModel: SimpleLinearRegression;

  constructor() {
    this.regressionModel = new SimpleLinearRegression();
  }

  analyzeCampaign(campaign: Campaign, donors: DonorRecord[]): OptimizationResult {
    const campaignDonors = this.getCampaignDonors(campaign, donors);
    const insights: CampaignInsight[] = [];
    
    // Analyze campaign performance
    const progress = campaign.raised / campaign.goal;
    const daysRemaining = differenceInDays(new Date(campaign.endDate), new Date());
    const dailyRate = campaign.raised / differenceInDays(new Date(), new Date(campaign.startDate));
    
    // Generate insights
    if (progress < 0.3 && daysRemaining < 30) {
      insights.push({
        type: 'warning',
        message: 'Campaign is significantly behind target',
        recommendation: 'Consider extending the campaign duration or adjusting the goal'
      });
    }

    if (dailyRate > campaign.goal / 30) {
      insights.push({
        type: 'success',
        message: 'Campaign is exceeding daily targets',
        metric: dailyRate,
        recommendation: 'Consider increasing the campaign goal'
      });
    }

    // Calculate optimal goal and duration
    const suggestedGoal = this.calculateSuggestedGoal(campaign, campaignDonors);
    const suggestedDuration = this.calculateOptimalDuration(campaign, dailyRate);
    const predictedDonors = this.predictDonorParticipation(campaign, donors);
    
    // Calculate confidence score
    const confidenceScore = this.calculateConfidenceScore(campaign, campaignDonors);

    return {
      suggestedGoal,
      suggestedDuration,
      predictedDonors,
      insights,
      confidenceScore
    };
  }

  private getCampaignDonors(campaign: Campaign, donors: DonorRecord[]): DonorRecord[] {
    const campaignStart = new Date(campaign.startDate);
    const campaignEnd = new Date(campaign.endDate);
    
    return donors.filter(donor => {
      const donationDate = new Date(donor.year, 0);
      return donationDate >= campaignStart && donationDate <= campaignEnd;
    });
  }

  private calculateSuggestedGoal(campaign: Campaign, donors: DonorRecord[]): number {
    if (donors.length === 0) return campaign.goal;

    const averageDonation = donors.reduce((sum, d) => sum + d.donationAmount, 0) / donors.length;
    const projectedDonors = Math.ceil(donors.length * 1.2); // 20% growth projection
    
    return Math.round(averageDonation * projectedDonors);
  }

  private calculateOptimalDuration(campaign: Campaign, dailyRate: number): number {
    if (dailyRate <= 0) return 90; // Default duration
    
    const daysToGoal = campaign.goal / dailyRate;
    return Math.min(Math.max(Math.ceil(daysToGoal * 1.2), 30), 120);
  }

  private predictDonorParticipation(campaign: Campaign, allDonors: DonorRecord[]): number {
    const totalDonors = allDonors.length;
    const avgParticipationRate = 0.15; // Historical average
    
    return Math.ceil(totalDonors * avgParticipationRate);
  }

  private calculateConfidenceScore(campaign: Campaign, donors: DonorRecord[]): number {
    if (donors.length === 0) return 0.5;

    const factors = [
      donors.length > 10 ? 0.3 : 0.1, // Donor base size
      campaign.raised / campaign.goal, // Progress towards goal
      donors.length / (differenceInDays(new Date(), new Date(campaign.startDate)) + 1) > 1 ? 0.2 : 0.1 // Daily acquisition rate
    ];

    return Math.min(factors.reduce((sum, factor) => sum + factor, 0), 1);
  }
}