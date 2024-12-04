import React, { useState } from 'react';
import { Save, Bell, Shield, User, Mail } from 'lucide-react';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    organization: '',
    notifyDonations: true,
    notifyUpdates: true,
    notifyEvents: true,
    darkMode: true,
    language: 'en'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would update the user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Settings update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <User className="h-5 w-5 text-primary-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-100">Profile Settings</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                    text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                    text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                    text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Organization
                </label>
                <input
                  type="text"
                  value={profile.organization}
                  onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                    text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Bell className="h-5 w-5 text-primary-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-100">Notification Settings</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={profile.notifyDonations}
                  onChange={(e) => setProfile({ ...profile, notifyDonations: e.target.checked })}
                  className="rounded bg-dark-700 border-dark-600 text-primary-600 
                    focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Donation Confirmations
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={profile.notifyUpdates}
                  onChange={(e) => setProfile({ ...profile, notifyUpdates: e.target.checked })}
                  className="rounded bg-dark-700 border-dark-600 text-primary-600 
                    focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Platform Updates
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={profile.notifyEvents}
                  onChange={(e) => setProfile({ ...profile, notifyEvents: e.target.checked })}
                  className="rounded bg-dark-700 border-dark-600 text-primary-600 
                    focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Event Notifications
                </span>
              </label>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 text-primary-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-100">Preferences</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Language
                </label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 
                    text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={profile.darkMode}
                    onChange={(e) => setProfile({ ...profile, darkMode: e.target.checked })}
                    className="rounded bg-dark-700 border-dark-600 text-primary-600 
                      focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Dark Mode
                  </span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}