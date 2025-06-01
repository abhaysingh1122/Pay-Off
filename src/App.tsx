import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { BluetoothProvider } from './contexts/BluetoothContext';

// Pages
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import SendPage from './pages/SendPage';
import QrCodePage from './pages/QrCodePage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <BluetoothProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/send" element={<SendPage />} />
              <Route path="/qr-code" element={<QrCodePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </BluetoothProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;