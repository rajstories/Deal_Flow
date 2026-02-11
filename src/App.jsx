import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/Pipeline';
import Analysis from './pages/Analysis';
import Relationships from './pages/Relationships';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';

import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route - No Layout */}
        <Route path="/" element={<LandingPage />} />

        {/* Application Routes - With Dashboard Layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/pipeline" element={<Layout><Pipeline /></Layout>} />
        <Route path="/analysis" element={<Layout><Analysis /></Layout>} />
        <Route path="/relationships" element={<Layout><Relationships /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
