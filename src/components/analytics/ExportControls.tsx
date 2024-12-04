
import React, { useState } from 'react';
import { Download, FileJson, FileText, Table } from 'lucide-react';
import { Card } from '../shared/Card';

interface ExportControlsProps {
  onExport: (format: string, options: ExportOptions) => void;
  loading?: boolean;
}

export interface ExportOptions {
  includeMetadata: boolean;
  dateRange: boolean;
  aggregated: boolean;
}

export function ExportControls({ onExport, loading }: ExportControlsProps) {
  const [format, setFormat] = useState('json');
  const [options, setOptions] = useState<ExportOptions>({
    includeMetadata: true,
    dateRange: true,
    aggregated: false
  });

  const handleExport = () => {
    onExport(format, options);
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Download className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Export Data</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setFormat('json')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  format === 'json'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileJson className="h-4 w-4 mr-1" />
                <span className="text-sm">JSON</span>
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  format === 'csv'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Table className="h-4 w-4 mr-1" />
                <span className="text-sm">CSV</span>
              </button>
              <button
                onClick={() => setFormat('txt')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  format === 'txt'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="h-4 w-4 mr-1" />
                <span className="text-sm">Text</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeMetadata}
                onChange={(e) => setOptions({
                  ...options,
                  includeMetadata: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include metadata</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.dateRange}
                onChange={(e) => setOptions({
                  ...options,
                  dateRange: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include date range</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.aggregated}
                onChange={(e) => setOptions({
                  ...options,
                  aggregated: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Export aggregated data</span>
            </label>
          </div>

          <button
            onClick={handleExport}
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Exporting...' : 'Export Data'}
          </button>
        </div>
      </div>
    </Card>
  );
}
