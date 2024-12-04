import React, { createContext, useContext, useState, useEffect } from 'react';
import { donorService } from '../services/donorService';
import { DonorRecord } from '../types/donor';

interface DonorContextType {
  donors: DonorRecord[];
  loading: boolean;
  error: string | null;
  refreshDonors: () => Promise<void>;
  searchDonors: (query: string) => Promise<void>;
}

const DonorContext = createContext<DonorContextType | null>(null);

export function DonorProvider({ children }: { children: React.ReactNode }) {
  const [donors, setDonors] = useState<DonorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDonors = async () => {
    try {
      setLoading(true);
      const data = await donorService.getDonors();
      setDonors(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  const searchDonors = async (query: string) => {
    try {
      setLoading(true);
      const data = await donorService.searchDonors(query);
      setDonors(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search donors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDonors();
  }, []);

  return (
    <DonorContext.Provider value={{ donors, loading, error, refreshDonors, searchDonors }}>
      {children}
    </DonorContext.Provider>
  );
}

export function useDonors() {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error('useDonors must be used within a DonorProvider');
  }
  return context;
}