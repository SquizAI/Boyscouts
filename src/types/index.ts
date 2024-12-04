export * from './donor';
export * from './event';
export * from './shop';
export * from './badge';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading?: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}