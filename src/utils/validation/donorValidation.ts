import { z } from 'zod';
import { isValidStateCode } from '../csv/csvUtils';

export const donorSchema = z.object({
  lastName: z.string()
    .min(1, 'Organization name is required')
    .transform(s => s?.trim()),
  
  state: z.string()
    .max(2, 'State must be a 2-letter code')
    .refine(
      (val) => !val || isValidStateCode(val),
      'Must be a valid US state code'
    )
    .transform(s => s ? s.toUpperCase() : null)
    .nullable()
    .optional(),
  
  donationAmount: z.number()
    .positive('Donation amount must be greater than 0')
    .transform(n => Number(n.toFixed(2))),
  
  year: z.number()
    .int('Year must be a whole number')
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .default(new Date().getFullYear()),
  
  appealCode: z.string().nullish(),
  appealName: z.string().nullish(),
  structure: z.string().nullish(),
  givingCategory: z.string().nullish(),
  city: z.string().nullish(),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits').nullish(),
  email: z.string().email('Invalid email format').nullish()
});

export type DonorValidationResult = {
  isValid: boolean;
  errors: string[];
};

export function validateDonor(donor: Record<string, any>): DonorValidationResult {
  try {
    // Pre-process required fields
    const processedDonor = {
      ...donor,
      lastName: donor.lastName || '',
      donationAmount: donor.donationAmount || 0,
      year: donor.year || new Date().getFullYear()
    };

    donorSchema.parse(processedDonor);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return {
      isValid: false,
      errors: ['Invalid donor data']
    };
  }
}