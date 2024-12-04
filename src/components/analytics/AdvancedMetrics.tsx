
import React from 'react';
import { Card } from '../shared/Card';
import { RFMAnalysis } from '../../models/analytics/RFMAnalysis';
import { DonorSegmentation } from '../../models/analytics/DonorSegmentation';
import { GeographicAnalysis } from '../../models/analytics/GeographicAnalysis';
import { DonationPrediction } from '../../models/analytics/DonationPrediction';
import { CampaignOptimization } from '../../models/analytics/CampaignOptimization';
import { DonorCommunication } from '../../models/nlp/DonorCommunication';
import { DonorRecord } from '../../types/donor';

interface AdvancedMetricsProps {
  donors: DonorRecord[];
  dateRange: { start: Date; end: Date };
}

export function AdvancedMetrics({ donors, dateRange }: AdvancedMetricsProps) {
  const [insights, setInsights] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const analyzeData = async () => {
      setLoading(true);
      try {
        // Initialize analytics tools
        const rfm = new RFMAnalysis();
        const segmentation = new DonorSegmentation();
        const geoAnalysis = new GeographicAnalysis();
        const prediction = new DonationPrediction();
        const campaignOpt = new CampaignOptimization();
        const communication = new DonorCommunication();

        // Perform analysis
        const rfmScores = rfm.analyze(donors);
        const segments = await segmentation.segmentDonors(donors);
        const geoMetrics = geoAnalysis.analyzeByState(donors);
        const geoInsights = geoAnalysis.generateInsights(geoMetrics);

        // Generate insights
        const newInsights = [
          {
            title: 'Donor Segmentation',
            data: segments.map(segment => ({
              name: segment.name,
              value: segment.donorCount,
              description: segment.description
            }))
          },
          {
            title: 'Geographic Distribution',
            data: geoInsights
          },
          {
            title: 'Engagement Trends',
            data: Array.from(rfmScores.entries()).map(([id, scores]) => ({
              donorId: id,
              ...scores
            }))
          }
        ];

        setInsights(newInsights);
      } catch (error) {
        console.error('Error analyzing data:', error);
      } finally {
        setLoading(false);
      }
    };

    analyzeData();
  }, [donors, dateRange]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {insights.map((insight, index) => (
        <Card key={index}>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {insight.title}
            </h3>
            <div className="space-y-4">
              {insight.data.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">{item.name}</p>
                    {item.description && (
                      <p className="text-sm text-gray-500">{item.description}</p>
                    )}
                  </div>
                  {typeof item.value === 'number' && (
                    <span className="text-lg font-medium text-gray-900">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
