import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import type { CsvParseResult } from '../../utils/csv/csvParser';
import { donorService } from '../../services/donorService';

interface DonorImportSummaryProps {
  parseResult: CsvParseResult;
  onClose: () => void;
}

export function DonorImportSummary({ parseResult, onClose }: DonorImportSummaryProps) {
  const { validDonors, invalidDonors, totalRows } = parseResult;
  const [importing, setImporting] = React.useState(false);

  const handleImport = async () => {
    if (validDonors.length === 0) return;

    setImporting(true);
    try {
      await donorService.importDonors(validDonors);
      toast.success(`Successfully imported ${validDonors.length} donors`);
      onClose();
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import donors. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Import Summary</h3>
        <p className="mt-1 text-sm text-gray-500">
          Total rows processed: {totalRows}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-green-700">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{validDonors.length} valid records ready to import</span>
        </div>

        {invalidDonors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex items-center text-red-700 mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{invalidDonors.length} records with errors</span>
            </div>
            
            <div className="mt-2 max-h-60 overflow-y-auto">
              <ul className="space-y-2 text-sm text-red-600">
                {invalidDonors.slice(0, 5).map((invalid, index) => (
                  <li key={index}>
                    Row {invalid.rowNumber}: {invalid.errors.join(', ')}
                  </li>
                ))}
                {invalidDonors.length > 5 && (
                  <li className="font-medium">
                    ...and {invalidDonors.length - 5} more errors
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          disabled={importing}
        >
          Close
        </button>
        {validDonors.length > 0 && (
          <button
            onClick={handleImport}
            disabled={importing}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 
              ${importing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {importing ? 'Importing...' : `Import ${validDonors.length} Records`}
          </button>
        )}
      </div>
    </div>
  );
}