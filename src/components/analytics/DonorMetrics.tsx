import React from 'react';
import { DonorRecord } from '../../types/donor';
import { RFMAnalysis } from '../../models/analytics/RFMAnalysis';
import { DonorSegmentation } from '../../models/analytics/DonorSegmentation';
import { BasicMetrics } from './metrics/BasicMetrics';
import { SegmentationChart } from './metrics/SegmentationChart';
import { DonationDistribution } from './metrics/DonationDistribution';
import { RFMScorecard } from './metrics/RFMScorecard';
import { DraggableLayout } from './DraggableLayout';

interface DonorMetricsProps {
  donors: DonorRecord[];
  dateRange: { start: Date; end: Date };
}

export function DonorMetrics({ donors, dateRange }: DonorMetricsProps) {
  const [metrics, setMetrics] = React.useState<any>({
    segments: [],
    rfmScores: new Map()
  });

  React.useEffect(() => {
    const calculateMetrics = async () => {
      try {
        const rfm = new RFMAnalysis();
        const segmentation = new DonorSegmentation();

        const rfmScores = rfm.analyze(donors);
        const segments = await segmentation.segmentDonors(donors);

        setMetrics({
          segments,
          rfmScores
        });
      } catch (error) {
        console.error('Error calculating metrics:', error);
      }
    };

    if (donors.length > 0) {
      calculateMetrics();
    }
  }, [donors]);

  const metricComponents = React.useMemo(() => [
    {
      id: 'basic-metrics',
      title: 'Basic Metrics',
      component: <BasicMetrics key="basic-metrics" donors={donors} />
    },
    {
      id: 'segmentation',
      title: 'Donor Segments',
      component: <SegmentationChart key="segmentation" segments={metrics.segments} />
    },
    {
      id: 'distribution',
      title: 'Distribution',
      component: <DonationDistribution key="distribution" donors={donors} />
    },
    {
      id: 'rfm',
      title: 'RFM Analysis',
      component: <RFMScorecard key="rfm" scores={metrics.rfmScores} />
    }
  ], [donors, metrics]);

  return (
    <div className="space-y-6">
      <DraggableLayout
        items={metricComponents}
        donors={donors}
        dateRange={dateRange}
      />
    </div>
  );
}