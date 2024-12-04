import React from 'react';
import { SmartDonationSuggestions } from '../../components/donations/SmartDonationSuggestions';
import { DonationImpact } from '../../components/donations/DonationImpact';
import { PaymentMethodSelector } from '../../components/donations/PaymentMethodSelector';
import { donationService } from '../../services/donationService';
import { Card } from '../../components/shared/Card';
import { Button } from '../../components/shared/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function DonationPage() {
  const [amount, setAmount] = React.useState<number>(0);
  const [frequency, setFrequency] = React.useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'bank' | 'paypal'>('card');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error('Please select a donation amount');
      return;
    }

    setLoading(true);
    try {
      await donationService.processDonation({
        amount,
        frequency,
        paymentMethod,
        metadata: {
          source: 'web',
          timestamp: new Date().toISOString()
        }
      });

      toast.success('Thank you for your donation!');
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Support Our Scouts</h1>
        <p className="mt-2 text-lg text-gray-400">
          Your generosity helps create opportunities for young Scouts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <SmartDonationSuggestions onSelectAmount={setAmount} />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'one-time', label: 'One-time' },
                    { id: 'monthly', label: 'Monthly' },
                    { id: 'yearly', label: 'Yearly' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => setFrequency(freq.id as typeof frequency)}
                      className={`py-3 px-4 rounded-lg text-sm font-medium border 
                        ${frequency === freq.id 
                          ? 'bg-primary-600/10 border-primary-500 text-primary-400' 
                          : 'border-dark-600 text-gray-400 hover:border-primary-500'}`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              <PaymentMethodSelector
                selected={paymentMethod}
                onSelect={setPaymentMethod}
              />

              <Button
                type="submit"
                variant="primary"
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
  );
}