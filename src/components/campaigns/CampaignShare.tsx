import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Link2, CheckCircle } from 'lucide-react';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import { toast } from 'react-toastify';

interface CampaignShareProps {
  campaignId: string;
  campaignName: string;
  goal: number;
  raised: number;
  shareUrl: string;
  onShare?: (platform: string) => void;
}

export function CampaignShare({ 
  campaignId, 
  campaignName, 
  goal, 
  raised, 
  shareUrl,
  onShare 
}: CampaignShareProps) {
  const [copied, setCopied] = useState(false);
  const [shares, setShares] = useState<Record<string, number>>({
    facebook: 0,
    twitter: 0,
    linkedin: 0
  });

  const shareText = `Support our "${campaignName}" campaign! We've raised $${raised.toLocaleString()} of our $${goal.toLocaleString()} goal. Every contribution helps! 🎯`;

  const handleShare = async (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      setShares(prev => ({
        ...prev,
        [platform]: (prev[platform] || 0) + 1
      }));
      onShare?.(platform);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Share2 className="h-5 w-5 text-primary-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-100">Share Campaign</h3>
          </div>
          <div className="text-sm text-gray-400">
            {Object.values(shares).reduce((a, b) => a + b, 0)} shares
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center"
            >
              <Facebook className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Facebook</span>
              {shares.facebook > 0 && (
                <span className="ml-2 text-xs bg-primary-500/20 px-2 py-1 rounded-full">
                  {shares.facebook}
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => handleShare('twitter')}
              className="flex items-center justify-center"
            >
              <Twitter className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Twitter</span>
              {shares.twitter > 0 && (
                <span className="ml-2 text-xs bg-primary-500/20 px-2 py-1 rounded-full">
                  {shares.twitter}
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full pr-24 rounded-lg bg-dark-700 border-dark-600 text-gray-300"
              />
              <button
                onClick={copyLink}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center px-3 py-1 rounded-md bg-primary-500/10 text-primary-400 hover:bg-primary-500/20"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary-500/5 border border-primary-500/10">
            <p className="text-sm text-primary-300">
              Share this campaign with your network to help us reach our goal faster! 
              Every share brings us closer to success.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}