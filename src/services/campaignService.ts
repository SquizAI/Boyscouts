import { supabase } from '../config/supabase';
import { Campaign } from '../types/campaign';

class CampaignService {
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    }
  }

  async getCampaignById(id: string): Promise<Campaign | null> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error;
    }
  }

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([campaign])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }

  async deleteCampaign(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  }

  async trackShare(campaignId: string, platform: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('campaign_shares')
        .insert([{
          campaign_id: campaignId,
          platform,
          shared_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking share:', error);
      throw error;
    }
  }
}

export const campaignService = new CampaignService();