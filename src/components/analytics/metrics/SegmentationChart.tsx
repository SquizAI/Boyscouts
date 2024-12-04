
import React from 'react';
import { Card } from '../../shared/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DonorSegment } from '../../../models/analytics/DonorSegmentation';

interface SegmentationChartProps {
  segments: DonorSegment[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function SegmentationChart({ segments }: SegmentationChartProps) {
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Donor Segments</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="donorCount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {segments.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
