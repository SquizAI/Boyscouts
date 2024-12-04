import React from 'react';
import { PlusCircle } from 'lucide-react';

const campaigns = [
  {
    id: '1',
    name: 'Annual Fundraiser 2024',
    goal: 100000,
    raised: 75000,
    donors: 150,
    status: 'Active',
    endDate: '2024-12-31',
  },
  {
    id: '2',
    name: 'Emergency Relief Fund',
    goal: 50000,
    raised: 45000,
    donors: 89,
    status: 'Active',
    endDate: '2024-06-30',
  },
];

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Ends {new Date(campaign.endDate).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {Math.round((campaign.raised / campaign.goal) * 100)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                  <div
                    style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>{campaign.donors} donors</span>
              <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}