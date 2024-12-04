import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import DonorList from './pages/donors/DonorList';
import DonorImport from './pages/donors/DonorImport';
import DonorDetails from './pages/donors/DonorDetails';
import Campaigns from './pages/campaigns/Campaigns';
import CampaignDetails from './pages/campaigns/CampaignDetails';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';
import DonationPage from './pages/user/DonationPage';
import Shop from './pages/Shop';
import Events from './pages/Events';
import MeritBadges from './pages/MeritBadges';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return '/login';
    return user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="donors" element={<DonorList />} />
          <Route path="donors/import" element={<DonorImport />} />
          <Route path="donors/:id" element={<DonorDetails />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/:id" element={<CampaignDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/:id" element={<CampaignDetails />} />
          <Route path="shop" element={<Shop />} />
          <Route path="events" element={<Events />} />
          <Route path="merit-badges" element={<MeritBadges />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/" element={<Navigate to={getDashboardRoute()} replace />} />
        <Route path="*" element={<Navigate to={getDashboardRoute()} replace />} />
      </Routes>
    </Router>
  );
}

export default App;