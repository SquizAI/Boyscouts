import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { donorService } from '../../services/donorService';
import { parseCsvFile, type CsvParseResult } from '../../utils/csv/csvParser';
import { DonorImportSummary } from './DonorImportSummary';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface DonorImportProps {
  onImportComplete?: () => void;
}

export function DonorImport({ onImportComplete }: DonorImportProps) {
  const [importing, setImporting] = useState(false);
  const [parseResult, setParseResult] = useState<CsvParseResult | null>(null);

  const processFile = async (file: File) => {
    setImporting(true);
    try {
      const result = await parseCsvFile(file);
      setParseResult(result);
      
      if (result.invalidDonors.length > 0) {
        toast.warning(`Found ${result.invalidDonors.length} invalid records`);
      }
      
      if (result.validDonors.length === 0) {
        toast.error('No valid donors found in the file');
        return;
      }

      // Import valid donors
      await donorService.importDonors(result.validDonors);
      toast.success(`Successfully imported ${result.validDonors.length} donors`);
      onImportComplete?.();
    } catch (error) {
      toast.error('Error processing file');
      console.error('Import error:', error);
    } finally {
      setImporting(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        await processFile(file);
      }
    },
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {importing ? (
          <LoadingSpinner />
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? 'Drop the CSV file here'
                : 'Drag and drop a CSV file here, or click to select'}
            </p>
          </>
        )}
      </div>

      {parseResult && (
        <DonorImportSummary
          parseResult={parseResult}
          onClose={() => setParseResult(null)}
        />
      )}

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">Expected CSV Format:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>LastOrgName (required)</li>
              <li>DonationAmount (required, numeric)</li>
              <li>Year (optional, defaults to current year)</li>
              <li>State (optional, 2-letter code)</li>
              <li>AppealCode (optional)</li>
              <li>AppealName (optional)</li>
              <li>Structure (optional)</li>
              <li>GivingCategory (optional)</li>
              <li>City (optional)</li>
              <li>ZIP (optional, 5 digits)</li>
              <li>Org/Contact (optional, email)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}