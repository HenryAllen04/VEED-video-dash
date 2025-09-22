// Purpose: Main application component with routing for the VEED Video Library Dashboard
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoListPage from './pages/VideoListPage';
import VideoCreatePage from './pages/VideoCreatePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/library" element={<VideoListPage />} />
          <Route path="/create" element={<VideoCreatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple 404 page
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="btn-primary">
          Back to Video Library
        </a>
      </div>
    </div>
  );
};

export default App;