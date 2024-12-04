import { Donor, DonationRecord } from '../types/donor';

const API_DELAY = 1000; // Simulate API delay

// Mock data
const mockDonors: Donor[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-0123',
    totalDonated: 5000,
    lastDonation: '2024-03-01',
    frequency: 'monthly',
    preferredCause: 'education'
  },
  // Add more mock donors...
];

export async function getDonors(): Promise<Donor[]> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  return mockDonors;
}

export async function createDonation(donation: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...donation,
    status: 'completed'
  };
}