import { DonorRecord } from '../../types/donor';

export const CSV_HEADER_MAP: Record<string, keyof DonorRecord> = {
  // Standard headers
  'ID': 'id',
  'APPEALCODE': 'appealCode',
  'YEAR': 'year',
  'APPEALNAME': 'appealName',
  'STRUCTURE': 'structure',
  'GIVINGCATEGORY': 'givingCategory',
  'LASTORGNAME': 'lastName',
  'CITY': 'city',
  'STATE': 'state',
  'ZIP': 'zip',
  'ORGCONTACT': 'email',
  'DONATIONAMOUNT': 'donationAmount',
  
  // Common variations
  'APPEAL CODE': 'appealCode',
  'APPEAL NAME': 'appealName',
  'GIVING CATEGORY': 'givingCategory',
  'LAST/ORG NAME': 'lastName',
  'LAST ORG NAME': 'lastName',
  'ORG/CONTACT': 'email',
  'DONATION AMOUNT': 'donationAmount',
  'AMOUNT': 'donationAmount',
  
  // Case variations
  'Appeal Code': 'appealCode',
  'Appeal Name': 'appealName',
  'Giving Category': 'givingCategory',
  'Last/Org Name': 'lastName',
  'Last Org Name': 'lastName',
  'Org/Contact': 'email',
  'Donation Amount': 'donationAmount'
};

export function normalizeHeader(header: string): string {
  return header
    .replace(/^\uFEFF/, '') // Remove BOM
    .replace(/[\s/-]/g, '') // Remove spaces, hyphens, and forward slashes
    .toUpperCase()
    .trim();
}

export function mapHeader(header: string): keyof DonorRecord | null {
  const normalizedHeader = normalizeHeader(header);
  const mappedHeader = CSV_HEADER_MAP[header] || CSV_HEADER_MAP[normalizedHeader];
  
  if (!mappedHeader) {
    console.warn(`Unrecognized header: ${header} (normalized: ${normalizedHeader})`);
  }
  
  return mappedHeader || null;
}