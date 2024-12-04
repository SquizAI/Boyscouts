import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { DonorProvider } from './context/DonorContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <DonorProvider>
        <App />
      </DonorProvider>
    </AuthProvider>
  </StrictMode>
);