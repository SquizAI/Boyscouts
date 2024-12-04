import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DonorImport as DonorImportComponent } from '../../components/donors/DonorImport';
import { Card } from '../../components/shared/Card';

export default function DonorImport() {
  const navigate = useNavigate();

  const handleImportComplete = () => {
    navigate('/admin/donors');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Import Donors</h2>
      </div>

      <Card>
        <DonorImportComponent onImportComplete={handleImportComplete} />
      </Card>
    </div>
  );
}