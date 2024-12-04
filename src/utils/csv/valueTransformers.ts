import { cleanupValue, normalizeAmount, formatZipCode, formatStateCode } from './csvUtils';

export type ValueTransformer = (value: any) => any;

export const transformers: Record<string, ValueTransformer> = {
  lastName: (value: any) => {
    const cleaned = cleanupValue(value);
    if (!cleaned) return null;
    
    // Remove common business suffixes
    return cleaned
      .replace(/\b(INC|LLC|LTD|CORP|CO|COMPANY|CORPORATION)\b\.?$/i, '')
      .trim();
  },

  donationAmount: (value: any) => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    
    // Remove currency symbols and commas
    const cleaned = String(value).replace(/[$,]/g, '').trim();
    const amount = parseFloat(cleaned);
    return isNaN(amount) ? 0 : Math.abs(amount);
  },

  year: (value: any) => {
    if (!value) return new Date().getFullYear();
    
    const cleaned = String(value).trim();
    const year = parseInt(cleaned);
    
    if (isNaN(year)) return new Date().getFullYear();
    if (year >= 1900 && year <= 2100) return year;
    if (year >= 0 && year <= 99) {
      return year >= 50 ? 1900 + year : 2000 + year;
    }
    
    return new Date().getFullYear();
  },

  state: (value: any) => {
    if (!value) return null;
    return formatStateCode(String(value).trim());
  },

  zip: (value: any) => {
    if (!value) return null;
    return formatZipCode(String(value).trim());
  },

  email: (value: any) => {
    const cleaned = cleanupValue(value);
    if (!cleaned) return null;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(cleaned) ? cleaned.toLowerCase() : null;
  },

  default: cleanupValue
};

export function transformValue(value: any, field: string): any {
  const transformer = transformers[field] || transformers.default;
  try {
    return transformer(value);
  } catch (error) {
    console.error(`Error transforming field ${field}:`, error);
    return null;
  }
}