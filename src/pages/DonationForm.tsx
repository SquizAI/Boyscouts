import React, { useState, useEffect } from 'react';
import { CreditCard, Heart, DollarSign, Calendar } from 'lucide-react';
import { SmartDonationSuggestions } from '../components/donations/SmartDonationSuggestions';
import { DonationImpact } from '../components/donations/DonationImpact';
import { PaymentMethodSelector } from '../components/donations/PaymentMethodSelector';
import { donationService } from '../services/donationService';
import { campaignService } from '../services/campaignService';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { toast } from 'react-toastify';
import { Campaign } from '../types/campaign';

export default function DonationForm() {
  const [amount, setAmount] = useState<number>(0);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [campaign, setCampaign] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'paypal'>('card');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await campaignService.getCampaigns();
        setCampaigns(data.filter(c => c.status === 'active'));
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        toast.error('Failed to load campaigns');
      }
    };

    fetchCampaigns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await donationService.processDonation({
        amount,
        frequency,
        campaignId: campaign,
        paymentMethod,
        metadata: {
          source: 'web',
          timestamp: new Date().toISOString()
        }
      });

      toast.success('Thank you for your donation!');
      setAmount(0);
      setFrequency('one-time');
      setCampaign('');
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="mx-auto h-12 w-12 text-primary-400" />
          <h2 className="mt-4 text-3xl font-bold text-gray-100">Support Our Scouts</h2>
          <p className="mt-2 text-lg text-gray-400">
            Your generosity helps create opportunities for young Scouts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <SmartDonationSuggestions onSelectAmount={setAmount} />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Donation Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'one-time', label: 'One-time', icon: DollarSign },
                      { id: 'monthly', label: 'Monthly', icon: Calendar },
                      { id: 'yearly', label: 'Yearly', icon: Calendar }
                    ].map((freq) => (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => setFrequency(freq.id as typeof frequency)}
                        className={`py-3 px-4 rounded-lg text-sm font-medium border 
                          ${frequency === freq.id 
                            ? 'bg-primary-600 border-primary-500 text-white' 
                            : 'border-dark-600 text-gray-300 hover:border-primary-500'}`}
                      >
                        <freq.icon className="h-4 w-4 mx-auto mb-1" />
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Campaign
                  </label>
                  <select
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="block w-full rounded-lg bg-dark-800 border-dark-600 text-gray-300 
                      focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">General Fund</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <PaymentMethodSelector
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                />

                <Button
                  type="submit"
                  variant="primary"
                  icon={CreditCard}
                  disabled={loading || amount <= 0}
                  className="w-full py-3"
                >
                  {loading ? 'Processing...' : `Donate ${amount ? `$${amount}` : ''}`}
                </Button>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <DonationImpact amount={amount} frequency={frequency} />
          </div>
        </div>
      </div>
    </div>
  );
}