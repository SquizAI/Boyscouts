
import React, { useState, useEffect } from 'react';
import { DonorMetrics } from '../components/analytics/DonorMetrics';
import { AnalyticsControls } from '../components/analytics/AnalyticsControls';
import { AnalyticsFilters, type AnalyticsFilters as FilterTypes } from '../components/analytics/AnalyticsFilters';
import { VisualizationControls, type ChartType } from '../components/analytics/VisualizationControls';
import { ExportControls, type ExportOptions } from '../components/analytics/ExportControls';
import { AdvancedMetrics } from '../components/analytics/AdvancedMetrics';
import { donorService } from '../services/donorService';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { Card } from '../components/shared/Card';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1),
    end: new Date()
  });
  const [filters, setFilters] = useState<FilterTypes>({
    donorType: [],
    minAmount: 0,
    maxAmount: 0,
    states: [],
    categories: []
  });
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [currentMetric, setCurrentMetric] = useState('amount');

  useEffect(() => {
    fetchData();
  }, [dateRange, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await donorService.getDonors();
      
      // Apply filters
      const filteredData = data.filter(donor => {
        const donationDate = new Date(donor.year, 0);
        const withinDateRange = donationDate >= dateRange.start && donationDate <= dateRange.end;
        
        const meetsAmountCriteria = 
          (!filters.minAmount || donor.donationAmount >= filters.minAmount) &&
          (!filters.maxAmount || donor.donationAmount <= filters.maxAmount);
        
        const meetsStateCriteria = 
          !filters.states.length || filters.states.includes(donor.state);
        
        return withinDateRange && meetsAmountCriteria && meetsStateCriteria;
      });

      setDonors(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: string, options: ExportOptions) => {
    try {
      setLoading(true);
      
      const data = {
        donors,
        metadata: options.includeMetadata ? {
          dateRange,
          filters,
          generatedAt: new Date().toISOString()
        } : undefined,
        aggregated: options.aggregated ? {
          totalDonors: donors.length,
          totalDonations: donors.reduce((sum, d) => sum + d.donationAmount, 0),
          averageDonation: donors.reduce((sum, d) => sum + d.donationAmount, 0) / donors.length
        } : undefined
      };

      const blob = new Blob(
        [format === 'json' ? JSON.stringify(data, null, 2) : JSON.stringify(data)],
        { type: `application/${format}` }
      );
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsControls
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onRefresh={fetchData}
            onExport={() => {}}
            loading={loading}
          />
        </div>
        <div>
          <ExportControls onExport={handleExport} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <AnalyticsFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        <div className="lg:col-span-3">
          <DonorMetrics donors={donors} dateRange={dateRange} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <VisualizationControls
            currentChart={chartType}
            currentMetric={currentMetric}
            onChartTypeChange={setChartType}
            onMetricChange={setCurrentMetric}
          />
        </div>
        <div className="lg:col-span-3">
          <Card>
            <div className="p-6">
              <AdvancedMetrics
                donors={donors}
                dateRange={dateRange}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
