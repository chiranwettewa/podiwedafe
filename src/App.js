import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthContainer from './components/auth/AuthContainer';
import Home from './components/Home';
import FreelancerHome from './components/FreelancerHome';
import ProtectedRoute from './components/ProtectedRoute';
import OAuthCallback from './components/auth/OAuthCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/callback" element={<OAuthCallback />} />
          <Route
            path="/home-client"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home-freelancer"
            element={
              <ProtectedRoute>
                <FreelancerHome />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
