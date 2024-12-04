import React from 'react';
import { CreditCard, Building, Wallet } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selected: 'card' | 'bank' | 'paypal';
  onSelect: (method: 'card' | 'bank' | 'paypal') => void;
}

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  const methods = [
    { id: 'card', label: 'Credit Card', icon: CreditCard },
    { id: 'bank', label: 'Bank Transfer', icon: Building },
    { id: 'paypal', label: 'PayPal', icon: Wallet }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Payment Method
      </label>
      <div className="grid grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id as typeof selected)}
            className={`p-4 rounded-lg border text-sm font-medium transition-colors
              ${selected === method.id
                ? 'bg-primary-600/10 border-primary-500 text-primary-400'
                : 'border-dark-600 text-gray-400 hover:border-primary-500'}`}
          >
            <method.icon className="h-5 w-5 mx-auto mb-2" />
            {method.label}
          </button>
        ))}
      </div>
    </div>
  );
}