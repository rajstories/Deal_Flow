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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/relationships" element={<Relationships />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
