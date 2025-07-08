// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import RetrievePage from './components/RetrievePage.jsx';
import QRCodePage from './components/QRCodePage.jsx';
import './i18n';
import Admin from './components/admin.jsx';
import AdminDashboard from './components/adminDashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CIP/BasvuruAnaQRKODValidation/Validate" element={<RetrievePage />} />
        <Route path="/generate/:name" element={<QRCodePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
