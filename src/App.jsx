import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Import your pages
import Home from './pages/Homepage';
import AdminPanel from './pages/AdminPanel';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import Marketplace from './pages/Marketplace';
import AuthInterface from './pages/AuthInterface';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductUpload from './pages/ProductUpload';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/sign-in" element={<AuthInterface />} />
          <Route path="/entrepreneur" element={<EntrepreneurDashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/product-upload" element={<ProductUpload />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
