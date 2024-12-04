import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Card } from '../shared/Card';

interface AnalyticsFiltersProps {
  onFilterChange: (filters: AnalyticsFilters) => void;
  filters: AnalyticsFilters;
}

export interface AnalyticsFilters {
  donorType: string[];
  minAmount: number;
  maxAmount: number;
  states: string[];
  categories: string[];
}

export function AnalyticsFilters({ onFilterChange, filters }: AnalyticsFiltersProps) {
  const handleFilterChange = (key: keyof AnalyticsFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <SlidersHorizontal className="h-5 w-5 text-primary-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-100">Customize Analytics</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Donation Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', Number(e.target.value))}
                className="w-24 rounded-md bg-dark-700 border-dark-600 text-gray-100 
                  placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Min"
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', Number(e.target.value))}
                className="w-24 rounded-md bg-dark-700 border-dark-600 text-gray-100 
                  placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Donor Type
            </label>
            <select
              multiple
              value={filters.donorType}
              onChange={(e) => handleFilterChange('donorType', 
                Array.from(e.target.selectedOptions, option => option.value)
              )}
              className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
              <option value="recurring">Recurring</option>
              <option value="one-time">One-time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              States
            </label>
            <select
              multiple
              value={filters.states}
              onChange={(e) => handleFilterChange('states',
                Array.from(e.target.selectedOptions, option => option.value)
              )}
              className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">All States</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="CA">California</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Categories
            </label>
            <select
              multiple
              value={filters.categories}
              onChange={(e) => handleFilterChange('categories',
                Array.from(e.target.selectedOptions, option => option.value)
              )}
              className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="general">General Fund</option>
              <option value="programs">Programs</option>
              <option value="equipment">Equipment</option>
              <option value="events">Events</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
}