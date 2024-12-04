import { parse } from 'papaparse';
import { validateDonor } from '../validation/donorValidation';
import { mapHeader } from './headerMapping';
import { transformValue } from './valueTransformers';
import { DonorRecord } from '../../types/donor';

export type CsvParseResult = {
  validDonors: Partial<DonorRecord>[];
  invalidDonors: Array<{
    rowNumber: number;
    data: any;
    errors: string[];
  }>;
  totalRows: number;
};

export async function parseCsvFile(file: File): Promise<CsvParseResult> {
  return new Promise((resolve, reject) => {
    parse(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (header) => {
        const mappedHeader = mapHeader(header);
        if (!mappedHeader) {
          console.warn(`Unrecognized header: ${header}`);
        }
        return mappedHeader || header;
      },
      transform: (value, field) => transformValue(value, field),
      complete: (results) => {
        try {
          console.log('Parsed CSV data:', results.data);
          const parsedResults = processParsedData(results.data);
          resolve(parsedResults);
        } catch (error) {
          console.error('CSV processing error:', error);
          reject(new Error(`Failed to process CSV data: ${error.message}`));
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        reject(new Error(`CSV parsing failed: ${error.message}`));
      }
    });
  });
}

function processParsedData(data: any[]): CsvParseResult {
  const validDonors: Partial<DonorRecord>[] = [];
  const invalidDonors: CsvParseResult['invalidDonors'] = [];

  data.forEach((row, index) => {
    // Skip empty rows
    if (Object.values(row).every(val => val === null || val === undefined || val === '')) {
      return;
    }

    const donor = transformRow(row);
    console.log('Transformed row:', donor);
    
    const validation = validateDonor(donor);
    console.log('Validation result:', validation);

    if (validation.isValid) {
      validDonors.push(donor);
    } else {
      invalidDonors.push({
        rowNumber: index + 2, // Account for header row and 0-based index
        data: donor,
        errors: validation.errors,
      });
    }
  });

  return {
    validDonors,
    invalidDonors,
    totalRows: data.length,
  };
}

function transformRow(row: any): Partial<DonorRecord> {
  const donor: Partial<DonorRecord> = {};

  // Map fields using consistent keys
  const fieldMappings: Record<string, keyof DonorRecord> = {
    lastName: 'lastName',
    state: 'state',
    donationAmount: 'donationAmount',
    year: 'year',
    appealCode: 'appealCode',
    appealName: 'appealName',
    structure: 'structure',
    givingCategory: 'givingCategory',
    city: 'city',
    zip: 'zip',
    email: 'email'
  };

  // Process each field
  Object.entries(fieldMappings).forEach(([key, field]) => {
    if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
      donor[field] = row[key];
    }
  });

  return donor;
}