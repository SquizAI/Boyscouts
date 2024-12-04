import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';

interface SharingModalProps {
  badgeName: string;
  earnedDate: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BadgeSharingModal({ badgeName, earnedDate, isOpen, onClose }: SharingModalProps) {
  if (!isOpen) return null;

  const shareUrl = `https://scouts.org/badge/${badgeName}`;
  const shareText = `I just earned the ${badgeName} badge! 🎉`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Share Your Achievement</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
              <Facebook className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500">
              <Twitter className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800">
              <Linkedin className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 p-2 border rounded-lg text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 text-blue-600 hover:text-blue-700"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}