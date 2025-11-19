import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdvancedConceptsPage from './pages/AdvancedConceptsPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import OfflineBanner from './components/OfflineBanner';
import useOnlineStatus from './hooks/useOnlineStatus';
import './App.css';

const AppContent = () => {
  const { theme } = useTheme();
  const isOnline = useOnlineStatus();

  return (
    <div className={`app-shell theme-${theme}`}>
      <OfflineBanner isOnline={isOnline} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdvancedConceptsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
