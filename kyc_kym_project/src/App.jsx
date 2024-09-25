import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Make sure to import useLocation here
import './App.css';
import KYCRegistration from './Components/KYCRegistration';
import SectionWithBackground from './Components/SectionWithBackground';
import UserProfile from './Components/UserProfile';
import HomePage from './Components/HomePage';
import AdminPage from './pages/AdminPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import WhatsAppButton from './Components/WhatsAppButton ';

function AppContent() {
  const location = useLocation(); // Get current location

  return (
    <div>
      {/* Conditionally render the Header */}
      {location.pathname !== '/adminprofile' && <Header />} 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="kyc" element={<KYCRegistration />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="adminprofile" element={<AdminPage />} />
        <Route path="/kycregistration" element={<KYCRegistration />} />
      </Routes>

      <WhatsAppButton />
        {/* Conditionally render the Footer */}
      {location.pathname !== '/adminprofile' && <Footer />} 
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
