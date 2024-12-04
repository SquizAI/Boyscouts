import { DonorRecord } from '../../types/donor';
import { kmeans } from 'ml-kmeans';

export interface DonorSegment {
  id: number;
  name: string;
  description: string;
  donors: DonorRecord[];
  averageDonation: number;
  totalDonations: number;
  donorCount: number;
}

export class DonorSegmentation {
  async segmentDonors(donors: DonorRecord[]): Promise<DonorSegment[]> {
    if (donors.length < 2) {
      return [{
        id: 0,
        name: 'All Donors',
        description: 'Single segment for all donors',
        donors,
        averageDonation: donors[0]?.donationAmount || 0,
        totalDonations: donors[0]?.donationAmount || 0,
        donorCount: donors.length
      }];
    }

    // Prepare data for clustering
    const data = donors.map(donor => [
      donor.donationAmount,
      donor.year
    ]);

    // Perform k-means clustering with dynamic k based on data size
    const k = Math.min(4, Math.floor(donors.length / 2));
    const result = kmeans(data, k, {
      initialization: 'kmeans++',
      seed: 42
    });

    // Group donors by cluster
    const segments = new Map<number, DonorRecord[]>();
    donors.forEach((donor, index) => {
      const cluster = result.clusters[index];
      if (!segments.has(cluster)) {
        segments.set(cluster, []);
      }
      segments.get(cluster)!.push(donor);
    });

    // Create segments with metrics
    return Array.from(segments.entries()).map(([id, segmentDonors]) => {
      const totalDonations = segmentDonors.reduce((sum, d) => sum + d.donationAmount, 0);
      const averageDonation = totalDonations / segmentDonors.length;

      return {
        id,
        name: this.getSegmentName(averageDonation, segmentDonors.length),
        description: this.getSegmentDescription(averageDonation, segmentDonors.length),
        donors: segmentDonors,
        averageDonation,
        totalDonations,
        donorCount: segmentDonors.length
      };
    });
  }

  private getSegmentName(avgDonation: number, count: number): string {
    if (avgDonation >= 1000) return 'Major Donors';
    if (avgDonation >= 500) return 'Regular Supporters';
    if (avgDonation >= 100) return 'Active Donors';
    return 'New Donors';
  }

  private getSegmentDescription(avgDonation: number, count: number): string {
    if (avgDonation >= 1000) {
      return 'Consistent major donors with significant impact';
    }
    if (avgDonation >= 500) {
      return 'Regular supporters providing steady contributions';
    }
    if (avgDonation >= 100) {
      return 'Active donors with growing engagement';
    }
    return 'New or occasional donors with potential for growth';
  }
}