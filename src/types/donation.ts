export interface DonationRequest {
  amount: number;
  frequency: 'one-time' | 'monthly' | 'yearly';
  campaignId?: string;
  paymentMethod: 'card' | 'bank' | 'paypal';
  metadata?: Record<string, any>;
}

export interface DonationResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  createdAt: string;
  transactionId?: string;
}