import { useState, useEffect } from 'react';
import { ApiResponse } from '../types';

export function useApi<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): ApiResponse<T | null> {
  const [state, setState] = useState<ApiResponse<T | null>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const data = await fetchFn();
        setState({ data, loading: false });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    fetchData();
  }, dependencies);

  return state;
}