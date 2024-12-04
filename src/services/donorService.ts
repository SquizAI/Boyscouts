import { supabase } from '../config/supabase';
import { DonorRecord } from '../types/donor';

class DonorService {
  async getDonors() {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return this.mapDonorsFromDb(data || []);
    } catch (error) {
      console.error('Error fetching donors:', error);
      return [];
    }
  }

  async getDonorById(id: string) {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return this.mapDonorFromDb(data);
    } catch (error) {
      console.error('Error fetching donor:', error);
      throw error;
    }
  }

  async importDonors(donors: Partial<DonorRecord>[]) {
    try {
      const { data, error } = await supabase
        .from('donors')
        .insert(donors.map(donor => ({
          appeal_code: donor.appealCode,
          year: donor.year,
          appeal_name: donor.appealName,
          structure: donor.structure,
          giving_category: donor.givingCategory,
          last_name: donor.lastName,
          city: donor.city,
          state: donor.state,
          zip: donor.zip,
          email: donor.email,
          donation_amount: donor.donationAmount
        })))
        .select();

      if (error) throw error;
      return this.mapDonorsFromDb(data || []);
    } catch (error) {
      console.error('Error importing donors:', error);
      throw error;
    }
  }

  async searchDonors(query: string) {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .or(`last_name.ilike.%${query}%,city.ilike.%${query}%,email.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return this.mapDonorsFromDb(data || []);
    } catch (error) {
      console.error('Error searching donors:', error);
      return [];
    }
  }

  private mapDonorFromDb(dbDonor: any): DonorRecord {
    return {
      id: dbDonor.id,
      appealCode: dbDonor.appeal_code || '',
      year: dbDonor.year || new Date().getFullYear(),
      appealName: dbDonor.appeal_name || '',
      structure: dbDonor.structure || '',
      givingCategory: dbDonor.giving_category || '',
      lastName: dbDonor.last_name || '',
      city: dbDonor.city || '',
      state: dbDonor.state || '',
      zip: dbDonor.zip || '',
      email: dbDonor.email || '',
      donationAmount: parseFloat(dbDonor.donation_amount) || 0
    };
  }

  private mapDonorsFromDb(dbDonors: any[]): DonorRecord[] {
    return dbDonors.map(this.mapDonorFromDb);
  }
}

export const donorService = new DonorService();