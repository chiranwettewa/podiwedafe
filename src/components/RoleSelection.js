import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleRoleSelect = (role) => {
    setUserRole(role);
    navigate(role === 'client' ? '/client-home' : '/freelancer-home');
  };

  return (
    <div className="role-container">
      <div className="role-content">
        <h1>Welcome to Podiweda.com</h1>
        <p className="role-subtitle">Choose how you want to get started</p>

        <div className="role-cards">
          <div className="role-card" onClick={() => handleRoleSelect('client')}>
            <div className="role-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h2>I'm a Client</h2>
            <p>I want to get my work done</p>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect('freelancer')}>
            <div className="role-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2>I'm a Freelancer</h2>
            <p>I'm looking to work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
