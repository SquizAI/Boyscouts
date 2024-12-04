/**
 * Cleans up a string value by removing extra whitespace and handling special cases
 */
export function cleanupValue(value: any): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  // Convert to string and trim
  const stringValue = String(value).trim();
  
  // Handle common "empty" values
  if (stringValue === '' || 
      stringValue.toLowerCase() === 'null' || 
      stringValue.toLowerCase() === 'n/a' ||
      stringValue.toLowerCase() === 'none' ||
      stringValue === '0' ||
      stringValue === '-') {
    return null;
  }

  return stringValue;
}

/**
 * Normalizes a monetary amount string to a number
 */
export function normalizeAmount(value: any): number {
  if (!value) return 0;

  // Handle special case where value is already a number
  if (typeof value === 'number') {
    return Math.abs(value); // Ensure positive
  }

  // Convert to string and clean up
  let stringValue = String(value)
    .replace(/[$,\s]/g, '') // Remove dollar signs, commas, and whitespace
    .trim();

  // Handle parentheses for negative numbers
  if (stringValue.startsWith('(') && stringValue.endsWith(')')) {
    stringValue = '-' + stringValue.slice(1, -1);
  }

  // Parse the number
  const amount = parseFloat(stringValue);
  
  // Return 0 if invalid, otherwise ensure positive amount
  return isNaN(amount) ? 0 : Math.abs(amount);
}

/**
 * Validates and formats a ZIP code
 */
export function formatZipCode(zip: string | null): string | null {
  if (!zip) return null;
  
  // Remove all non-numeric characters
  const cleaned = zip.replace(/\D/g, '');
  
  // Must be either 5 or 9 digits
  if (cleaned.length !== 5 && cleaned.length !== 9) {
    return null;
  }
  
  // Return first 5 digits
  return cleaned.slice(0, 5);
}

// Map of common state name variations to their codes
const STATE_MAPPINGS: Record<string, string> = {
  'ALABAMA': 'AL', 'ALA': 'AL',
  'ALASKA': 'AK',
  'ARIZONA': 'AZ', 'ARIZ': 'AZ',
  'ARKANSAS': 'AR', 'ARK': 'AR',
  'CALIFORNIA': 'CA', 'CALIF': 'CA',
  'COLORADO': 'CO', 'COLO': 'CO',
  'CONNECTICUT': 'CT', 'CONN': 'CT',
  'DELAWARE': 'DE', 'DEL': 'DE',
  'FLORIDA': 'FL', 'FLA': 'FL',
  'GEORGIA': 'GA',
  'HAWAII': 'HI',
  'IDAHO': 'ID',
  'ILLINOIS': 'IL', 'ILL': 'IL',
  'INDIANA': 'IN', 'IND': 'IN',
  'IOWA': 'IA',
  'KANSAS': 'KS', 'KANS': 'KS',
  'KENTUCKY': 'KY',
  'LOUISIANA': 'LA',
  'MAINE': 'ME',
  'MARYLAND': 'MD',
  'MASSACHUSETTS': 'MA', 'MASS': 'MA',
  'MICHIGAN': 'MI', 'MICH': 'MI',
  'MINNESOTA': 'MN', 'MINN': 'MN',
  'MISSISSIPPI': 'MS', 'MISS': 'MS',
  'MISSOURI': 'MO',
  'MONTANA': 'MT', 'MONT': 'MT',
  'NEBRASKA': 'NE', 'NEBR': 'NE',
  'NEVADA': 'NV', 'NEV': 'NV',
  'NEW HAMPSHIRE': 'NH',
  'NEW JERSEY': 'NJ',
  'NEW MEXICO': 'NM',
  'NEW YORK': 'NY',
  'NORTH CAROLINA': 'NC',
  'NORTH DAKOTA': 'ND',
  'OHIO': 'OH',
  'OKLAHOMA': 'OK', 'OKLA': 'OK',
  'OREGON': 'OR',
  'PENNSYLVANIA': 'PA', 'PENN': 'PA',
  'RHODE ISLAND': 'RI',
  'SOUTH CAROLINA': 'SC',
  'SOUTH DAKOTA': 'SD',
  'TENNESSEE': 'TN', 'TENN': 'TN',
  'TEXAS': 'TX',
  'UTAH': 'UT',
  'VERMONT': 'VT',
  'VIRGINIA': 'VA',
  'WASHINGTON': 'WA', 'WASH': 'WA',
  'WEST VIRGINIA': 'WV',
  'WISCONSIN': 'WI', 'WIS': 'WI',
  'WYOMING': 'WY', 'WYO': 'WY',
  'DISTRICT OF COLUMBIA': 'DC', 'D.C.': 'DC'
};

/**
 * Validates and formats a state code
 */
export function formatStateCode(state: string | null): string | null {
  if (!state) return null;
  
  // Clean up the input
  const cleaned = state.trim().toUpperCase()
    .replace(/\./g, '') // Remove periods
    .replace(/\s+/g, ' '); // Normalize spaces
  
  // If it's already a valid 2-letter code
  if (/^[A-Z]{2}$/.test(cleaned)) {
    return cleaned;
  }
  
  // Try to match against state mappings
  const mappedState = STATE_MAPPINGS[cleaned];
  if (mappedState) {
    return mappedState;
  }
  
  // Try to match partial state names
  const matchingState = Object.keys(STATE_MAPPINGS).find(key => 
    key.startsWith(cleaned) || cleaned.includes(key)
  );
  if (matchingState) {
    return STATE_MAPPINGS[matchingState];
  }
  
  return null;
}

/**
 * Checks if a string is a valid US state code
 */
export function isValidStateCode(state: string): boolean {
  const validStates = new Set(Object.values(STATE_MAPPINGS));
  return validStates.has(state.toUpperCase());
}