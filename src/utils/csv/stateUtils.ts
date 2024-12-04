// Map of common state name variations to their codes
export const STATE_MAPPINGS: Record<string, string> = {
  'ALABAMA': 'AL', 'ALA': 'AL', 'AL.': 'AL',
  'ALASKA': 'AK', 'ALAS': 'AK', 'AK.': 'AK',
  'ARIZONA': 'AZ', 'ARIZ': 'AZ', 'AZ.': 'AZ',
  'ARKANSAS': 'AR', 'ARK': 'AR', 'AR.': 'AR',
  'CALIFORNIA': 'CA', 'CALIF': 'CA', 'CA.': 'CA', 'CAL': 'CA',
  'COLORADO': 'CO', 'COLO': 'CO', 'CO.': 'CO',
  'CONNECTICUT': 'CT', 'CONN': 'CT', 'CT.': 'CT',
  'DELAWARE': 'DE', 'DEL': 'DE', 'DE.': 'DE',
  'FLORIDA': 'FL', 'FLA': 'FL', 'FL.': 'FL', 'FLO': 'FL',
  'GEORGIA': 'GA', 'GA.': 'GA',
  'HAWAII': 'HI', 'HI.': 'HI',
  'IDAHO': 'ID', 'ID.': 'ID',
  'ILLINOIS': 'IL', 'ILL': 'IL', 'IL.': 'IL',
  'INDIANA': 'IN', 'IND': 'IN', 'IN.': 'IN',
  'IOWA': 'IA', 'IA.': 'IA',
  'KANSAS': 'KS', 'KANS': 'KS', 'KS.': 'KS',
  'KENTUCKY': 'KY', 'KY.': 'KY',
  'LOUISIANA': 'LA', 'LA.': 'LA',
  'MAINE': 'ME', 'ME.': 'ME',
  'MARYLAND': 'MD', 'MD.': 'MD',
  'MASSACHUSETTS': 'MA', 'MASS': 'MA', 'MA.': 'MA',
  'MICHIGAN': 'MI', 'MICH': 'MI', 'MI.': 'MI',
  'MINNESOTA': 'MN', 'MINN': 'MN', 'MN.': 'MN',
  'MISSISSIPPI': 'MS', 'MISS': 'MS', 'MS.': 'MS',
  'MISSOURI': 'MO', 'MO.': 'MO',
  'MONTANA': 'MT', 'MONT': 'MT', 'MT.': 'MT',
  'NEBRASKA': 'NE', 'NEBR': 'NE', 'NE.': 'NE',
  'NEVADA': 'NV', 'NEV': 'NV', 'NV.': 'NV',
  'NEW HAMPSHIRE': 'NH', 'NH.': 'NH', 'N.H.': 'NH',
  'NEW JERSEY': 'NJ', 'NJ.': 'NJ', 'N.J.': 'NJ',
  'NEW MEXICO': 'NM', 'NM.': 'NM', 'N.M.': 'NM',
  'NEW YORK': 'NY', 'NY.': 'NY', 'N.Y.': 'NY',
  'NORTH CAROLINA': 'NC', 'NC.': 'NC', 'N.C.': 'NC',
  'NORTH DAKOTA': 'ND', 'ND.': 'ND', 'N.D.': 'ND',
  'OHIO': 'OH', 'OH.': 'OH',
  'OKLAHOMA': 'OK', 'OKLA': 'OK', 'OK.': 'OK',
  'OREGON': 'OR', 'ORE': 'OR', 'OR.': 'OR',
  'PENNSYLVANIA': 'PA', 'PENN': 'PA', 'PA.': 'PA',
  'RHODE ISLAND': 'RI', 'RI.': 'RI', 'R.I.': 'RI',
  'SOUTH CAROLINA': 'SC', 'SC.': 'SC', 'S.C.': 'SC',
  'SOUTH DAKOTA': 'SD', 'SD.': 'SD', 'S.D.': 'SD',
  'TENNESSEE': 'TN', 'TENN': 'TN', 'TN.': 'TN',
  'TEXAS': 'TX', 'TEX': 'TX', 'TX.': 'TX',
  'UTAH': 'UT', 'UT.': 'UT',
  'VERMONT': 'VT', 'VT.': 'VT',
  'VIRGINIA': 'VA', 'VA.': 'VA',
  'WASHINGTON': 'WA', 'WASH': 'WA', 'WA.': 'WA',
  'WEST VIRGINIA': 'WV', 'WV.': 'WV', 'W.V.': 'WV', 'W.VA.': 'WV',
  'WISCONSIN': 'WI', 'WIS': 'WI', 'WI.': 'WI',
  'WYOMING': 'WY', 'WYO': 'WY', 'WY.': 'WY',
  'DISTRICT OF COLUMBIA': 'DC', 'D.C.': 'DC', 'DC.': 'DC',
  'PUERTO RICO': 'PR', 'PR.': 'PR'
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
  if (/^[A-Z]{2}$/.test(cleaned) && isValidStateCode(cleaned)) {
    return cleaned;
  }
  
  // Try to match against state mappings
  const mappedState = STATE_MAPPINGS[cleaned];
  if (mappedState) {
    return mappedState;
  }
  
  // Try to match partial state names
  for (const [key, value] of Object.entries(STATE_MAPPINGS)) {
    if (key.includes(cleaned) || cleaned.includes(key)) {
      return value;
    }
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

/**
 * Gets the full state name from a state code
 */
export function getStateName(stateCode: string): string | null {
  const code = stateCode.toUpperCase();
  const entry = Object.entries(STATE_MAPPINGS).find(([_, value]) => value === code);
  return entry ? entry[0] : null;
}