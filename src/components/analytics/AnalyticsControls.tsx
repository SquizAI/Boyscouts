import React from 'react';
import { Calendar, Filter, RefreshCw, Download } from 'lucide-react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

interface AnalyticsControlsProps {
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  onRefresh: () => void;
  onExport: () => void;
  dateRange: { start: Date; end: Date };
  loading?: boolean;
}

export function AnalyticsControls({
  onDateRangeChange,
  onRefresh,
  onExport,
  dateRange,
  loading
}: AnalyticsControlsProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange({
      start: new Date(e.target.value),
      end: dateRange.end
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateRangeChange({
      start: dateRange.start,
      end: new Date(e.target.value)
    });
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary-400" />
              <input
                type="date"
                value={dateRange.start.toISOString().split('T')[0]}
                onChange={handleStartDateChange}
                className="rounded-md bg-dark-700 border-dark-600 text-gray-100 
                  shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={dateRange.end.toISOString().split('T')[0]}
                onChange={handleEndDateChange}
                className="rounded-md bg-dark-700 border-dark-600 text-gray-100 
                  shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={onRefresh}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              icon={Download}
              onClick={onExport}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}