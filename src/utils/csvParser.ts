import { DonorRecord } from '../types/donor';

export function parseDonorCsv(row: any): Omit<DonorRecord, 'id'> {
  // Convert donation amount string to number, removing any currency symbols and commas
  const donationAmount = parseFloat(
    (row.DonationAmount || '0')
      .replace(/[$,]/g, '')
      .trim()
  );

  return {
    appealCode: row.AppealCode?.trim() || '',
    year: parseInt(row.Year) || new Date().getFullYear(),
    appealName: row.AppealName?.trim() || '',
    structure: row.Structure?.trim() || '',
    givingCategory: row.GivingCategory?.trim() || '',
    lastName: row['LastOrgName']?.trim() || '',
    city: row.City?.trim() || '',
    state: row.State?.trim() || '',
    zip: row.ZIP?.toString().split('-')[0]?.trim() || '',
    email: row['Org/Contact']?.trim() || '',
    donationAmount,
    phone: '',
    county: ''
  };
}

export function validateDonorData(donor: Omit<DonorRecord, 'id'>): string[] {
  const errors: string[] = [];

  // Required fields
  if (!donor.lastName?.trim()) {
    errors.push('Organization name is required');
  }

  if (!donor.state?.trim()) {
    errors.push('State is required');
  }

  // Validate donation amount
  if (isNaN(donor.donationAmount) || donor.donationAmount <= 0) {
    errors.push('Valid donation amount is required');
  }

  // Validate year
  const currentYear = new Date().getFullYear();
  if (!donor.year || donor.year < 1900 || donor.year > currentYear) {
    errors.push('Valid year is required');
  }

  // Validate state format
  if (donor.state && !/^[A-Z]{2}$/.test(donor.state)) {
    errors.push('State must be a 2-letter code (e.g., FL)');
  }

  // Validate ZIP code format (if provided)
  if (donor.zip && !/^\d{5}(-\d{4})?$/.test(donor.zip)) {
    errors.push('ZIP code must be in valid format (e.g., 12345 or 12345-6789)');
  }

  // Validate appeal code (if provided)
  if (donor.appealCode && !/^[A-Z0-9]+$/.test(donor.appealCode)) {
    errors.push('Appeal code must contain only letters and numbers');
  }

  return errors;
}