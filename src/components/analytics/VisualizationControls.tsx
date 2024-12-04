
import React from 'react';
import { BarChart2, PieChart, LineChart, Settings } from 'lucide-react';
import { Card } from '../shared/Card';

interface VisualizationControlsProps {
  onChartTypeChange: (type: ChartType) => void;
  onMetricChange: (metric: string) => void;
  currentChart: ChartType;
  currentMetric: string;
}

export type ChartType = 'bar' | 'line' | 'pie' | 'area';

export function VisualizationControls({
  onChartTypeChange,
  onMetricChange,
  currentChart,
  currentMetric
}: VisualizationControlsProps) {
  const chartTypes: { type: ChartType; icon: typeof BarChart2; label: string }[] = [
    { type: 'bar', icon: BarChart2, label: 'Bar Chart' },
    { type: 'line', icon: LineChart, label: 'Line Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' }
  ];

  const metrics = [
    { value: 'amount', label: 'Donation Amount' },
    { value: 'frequency', label: 'Donation Frequency' },
    { value: 'growth', label: 'Growth Rate' },
    { value: 'retention', label: 'Donor Retention' }
  ];

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Visualization Options</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Type
            </label>
            <div className="flex space-x-2">
              {chartTypes.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => onChartTypeChange(type)}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    currentChart === type
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metric
            </label>
            <select
              value={currentMetric}
              onChange={(e) => onMetricChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {metrics.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
}
