export const DONATION_AMOUNTS = [25, 50, 100, 250, 500];

export const DONATION_FREQUENCIES = [
  { id: 'one-time', label: 'One-time' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' }
] as const;

export const CAMPAIGNS = [
  { id: 'general', name: 'General Fund' },
  { id: 'emergency', name: 'Emergency Relief' },
  { id: 'education', name: 'Education Initiative' },
  { id: 'community', name: 'Community Development' }
] as const;

export const EVENT_TYPES = ['All', 'Camp', 'Ceremony', 'Service', 'Training'] as const;

export const BADGE_CATEGORIES = [
  'All',
  'Health and Safety',
  'Nature',
  'Outdoor Skills',
  'Citizenship'
] as const;