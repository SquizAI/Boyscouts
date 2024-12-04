import React from 'react';
import { Shield, Check, Clock, Upload } from 'lucide-react';
import { Card } from '../shared/Card';

interface VerificationProps {
  badgeId: string;
  requirements: {
    id: string;
    title: string;
    status: 'pending' | 'approved' | 'rejected';
    evidence?: string;
  }[];
}

export function BadgeVerification({ badgeId, requirements }: VerificationProps) {
  const handleFileUpload = (reqId: string) => {
    // Implement file upload logic
  };

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Requirement Verification</h3>
      </div>

      <div className="space-y-4">
        {requirements.map((req) => (
          <div key={req.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {req.status === 'approved' ? (
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                )}
                <span className="text-sm font-medium text-gray-900">{req.title}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                req.status === 'approved' ? 'bg-green-100 text-green-800' :
                req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>
            </div>

            {req.status !== 'approved' && (
              <div className="mt-4">
                <button
                  onClick={() => handleFileUpload(req.id)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Evidence
                </button>
              </div>
            )}

            {req.evidence && (
              <div className="mt-2 text-sm text-gray-500">
                Evidence submitted: {req.evidence}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}