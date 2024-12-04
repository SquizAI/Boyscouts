import { supabase } from '../config/supabase';
import { DonationRequest, DonationResponse } from '../types/donation';
import { toast } from 'react-toastify';

class DonationService {
  async processDonation(request: DonationRequest): Promise<DonationResponse> {
    try {
      // In a real app, this would integrate with a payment processor
      const { data, error } = await supabase
        .from('donations')
        .insert([{
          amount: request.amount,
          frequency: request.frequency,
          campaign_id: request.campaignId,
          payment_method: request.paymentMethod,
          metadata: request.metadata,
          status: 'completed', // In real app, this would be 'pending' until payment confirmation
          transaction_id: `tr_${Math.random().toString(36).substr(2, 9)}` // Mock transaction ID
        }])
        .select()
        .single();

      if (error) throw error;

      // Update campaign raised amount
      if (request.campaignId) {
        const { error: campaignError } = await supabase.rpc('increment_campaign_amount', {
          campaign_id: request.campaignId,
          amount: request.amount
        });

        if (campaignError) {
          console.error('Error updating campaign amount:', campaignError);
        }
      }

      return {
        id: data.id,
        status: data.status,
        amount: data.amount,
        createdAt: data.created_at,
        transactionId: data.transaction_id
      };
    } catch (error) {
      console.error('Error processing donation:', error);
      throw new Error('Failed to process donation');
    }
  }

  async getSuggestedAmount(donorId?: string): Promise<number> {
    try {
      const { data: donations } = await supabase
        .from('donations')
        .select('amount')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!donations?.length) return 50;

      const avgDonation = donations.reduce((sum, d) => sum + d.amount, 0) / donations.length;
      return Math.round(avgDonation);
    } catch (error) {
      console.error('Error getting suggested amount:', error);
      return 50;
    }
  }

  async getImpactLevels(): Promise<{ amount: number; impact: string }[]> {
    try {
      const { data: donations } = await supabase
        .from('donations')
        .select('amount')
        .order('amount', { ascending: true });

      if (!donations?.length) {
        return this.getDefaultImpactLevels();
      }

      const amounts = donations.map(d => d.amount);
      const quartiles = this.calculateQuartiles(amounts);

      return [
        { amount: quartiles[0], impact: "Provides essential supplies for one Scout" },
        { amount: quartiles[1], impact: "Funds a Scout's monthly activities" },
        { amount: quartiles[2], impact: "Sponsors a camping trip" },
        { amount: quartiles[2] * 1.5, impact: "Supports multiple Scouts' activities" }
      ];
    } catch (error) {
      console.error('Error getting impact levels:', error);
      return this.getDefaultImpactLevels();
    }
  }

  private calculateQuartiles(values: number[]): number[] {
    const sorted = [...values].sort((a, b) => a - b);
    return [
      sorted[Math.floor(sorted.length * 0.25)],
      sorted[Math.floor(sorted.length * 0.5)],
      sorted[Math.floor(sorted.length * 0.75)]
    ];
  }

  private getDefaultImpactLevels(): { amount: number; impact: string }[] {
    return [
      { amount: 25, impact: "Provides essential supplies for one Scout" },
      { amount: 50, impact: "Funds a Scout's monthly activities" },
      { amount: 100, impact: "Sponsors a camping trip" },
      { amount: 250, impact: "Supports multiple Scouts' activities" }
    ];
  }
}

export const donationService = new DonationService();