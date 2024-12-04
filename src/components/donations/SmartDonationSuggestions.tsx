import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Award, Heart } from 'lucide-react';
import { DonorRecord } from '../../types/donor';
import { donorService } from '../../services/donorService';
import { formatCurrency } from '../../utils/format';
import { Card } from '../shared/Card';

interface DonationSuggestion {
  amount: number;
  impact: string;
  category: string;
  confidence: number;
}

interface SmartDonationSuggestionsProps {
  onSelectAmount: (amount: number) => void;
  currentDonor?: DonorRecord;
}

export function SmartDonationSuggestions({ onSelectAmount, currentDonor }: SmartDonationSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<DonationSuggestion[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSuggestions = async () => {
      try {
        setLoading(true);
        const donors = await donorService.getDonors();
        
        // Calculate average donation
        const avgDonation = donors.reduce((sum, d) => sum + d.donationAmount, 0) / donors.length;
        
        // Get donor's history if available
        const donorAvg = currentDonor?.donationAmount || avgDonation;
        
        // Generate personalized suggestions
        const suggestions: DonationSuggestion[] = [
          {
            amount: Math.round(donorAvg * 0.75),
            impact: "Provides essential supplies for one Scout",
            category: "Basic Support",
            confidence: 0.9
          },
          {
            amount: Math.round(donorAvg),
            impact: "Funds a Scout's monthly activities and badges",
            category: "Regular Support",
            confidence: 0.95
          },
          {
            amount: Math.round(donorAvg * 1.5),
            impact: "Sponsors a Scout's camping trip and equipment",
            category: "Enhanced Support",
            confidence: 0.85
          }
        ];

        setSuggestions(suggestions);
        setSelectedAmount(suggestions[1].amount); // Default to middle option
      } catch (error) {
        console.error('Error generating suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    generateSuggestions();
  }, [currentDonor]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    onSelectAmount(amount);
  };

  const getImpactDescription = (amount: number) => {
    if (amount >= 1000) {
      return "Could fund an entire troop's camping equipment";
    } else if (amount >= 500) {
      return "Could sponsor multiple Scouts' activities";
    } else if (amount >= 100) {
      return "Could provide essential supplies and badges";
    }
    return "Could support basic Scout activities";
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Personalized Donation Suggestions
        </h3>
        <p className="text-sm text-blue-700">
          Based on community needs and impact analysis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.amount} className="relative">
            <div 
              className={`absolute top-0 right-0 mt-2 mr-2 px-2 py-1 rounded-full text-xs font-medium
                ${suggestion.amount === selectedAmount 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'}`}
            >
              {Math.round(suggestion.confidence * 100)}% Match
            </div>
            
            <button
              onClick={() => handleAmountSelect(suggestion.amount)}
              className={`w-full h-full p-4 text-left transition-colors
                ${suggestion.amount === selectedAmount 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(suggestion.amount)}
                </span>
                <Award className="h-5 w-5 text-blue-500" />
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{suggestion.impact}</p>
              
              <div className="flex items-center mt-2">
                <Heart className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-xs text-gray-500">{suggestion.category}</span>
              </div>
            </button>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Amount
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={selectedAmount}
            onChange={(e) => handleAmountSelect(Math.max(0, parseInt(e.target.value) || 0))}
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {getImpactDescription(selectedAmount)}
        </p>
      </div>
    </div>
  );
}