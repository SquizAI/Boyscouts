import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/shared/Card';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { useApi } from '../../hooks/useApi';
import { donorService } from '../../services/donorService';
import { aiService } from '../../services/aiService';
import { DonorRecord, DonorFeatures } from '../../types/donor';
import { formatCurrency } from '../../utils/format';

export default function DonorDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: donor, loading, error } = useApi<DonorRecord>(
    () => donorService.getDonorById(id!),
    [id]
  );

  const [engagementScore, setEngagementScore] = React.useState<number | null>(null);
  const [segment, setSegment] = React.useState<number | null>(null);

  React.useEffect(() => {
    const analyzeDonor = async () => {
      if (donor) {
        const features: DonorFeatures = {
          totalDonations: donor.donationAmount,
          frequency: 1, // This should be calculated based on historical data
          avgAmount: donor.donationAmount,
          lastDonationDays: 0, // This should be calculated
          campaignParticipation: 1, // This should be calculated
        };

        const score = await aiService.predictEngagement(features);
        const donorSegment = await aiService.getSegment(features);

        setEngagementScore(score);
        setSegment(donorSegment);
      }
    };

    analyzeDonor();
  }, [donor]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!donor) return <ErrorMessage message="Donor not found" />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Donor Details</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{donor.lastName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{donor.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{donor.city}, {donor.state}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">{donor.givingCategory}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Donation History</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Donated</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatCurrency(donor.donationAmount)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Donation</dt>
                <dd className="mt-1 text-sm text-gray-900">{donor.year}</dd>
              </div>
              {engagementScore !== null && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Engagement Score</dt>
                  <dd className="mt-1 text-sm text-gray-900">{(engagementScore * 100).toFixed(1)}%</dd>
                </div>
              )}
              {segment !== null && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Donor Segment</dt>
                  <dd className="mt-1 text-sm text-gray-900">Segment {segment + 1}</dd>
                </div>
              )}
            </dl>
          </div>
        </Card>
      </div>
    </div>
  );
}