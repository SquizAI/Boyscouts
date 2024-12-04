import React from 'react';
import { Card } from '../../shared/Card';
import { RFMScores } from '../../../models/analytics/RFMAnalysis';

interface RFMScorecardProps {
  scores: Map<string, RFMScores>;
}

export function RFMScorecard({ scores }: RFMScorecardProps) {
  const averageScores = Array.from(scores.values()).reduce(
    (acc, score) => ({
      recency: acc.recency + score.recency,
      frequency: acc.frequency + score.frequency,
      monetary: acc.monetary + score.monetary,
      count: acc.count + 1
    }),
    { recency: 0, frequency: 0, monetary: 0, count: 0 }
  );

  const metrics = [
    {
      label: 'Recency Score',
      value: (averageScores.recency / averageScores.count).toFixed(1),
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-100',
      borderColor: 'border-blue-500/20'
    },
    {
      label: 'Frequency Score',
      value: (averageScores.frequency / averageScores.count).toFixed(1),
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-100',
      borderColor: 'border-emerald-500/20'
    },
    {
      label: 'Monetary Score',
      value: (averageScores.monetary / averageScores.count).toFixed(1),
      bgColor: 'bg-violet-500/10',
      textColor: 'text-violet-100',
      borderColor: 'border-violet-500/20'
    }
  ];

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-100 mb-4">RFM Analysis</h3>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`text-center p-4 rounded-lg border ${metric.borderColor} ${metric.bgColor} backdrop-blur-xl`}
            >
              <div className={`text-2xl font-semibold ${metric.textColor}`}>
                {metric.value}
              </div>
              <div className="text-sm mt-1 text-gray-300">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}