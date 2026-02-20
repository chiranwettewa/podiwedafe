import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import Footer from './Footer';

const FreelancerHome = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-logo">
          <img src={logo} alt="Podiweda" />
        </div>
        <div className="nav-right">
          <span className="nav-user">{user?.name?.split(' ')[0]}</span>
          <button onClick={handleSignOut} className="btn-signout" title="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className="home-content">
        <div className="card">
          <h2>Welcome to <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Podiweda.com</span></h2>
          <p className="card-subtitle">
            Find projects and start earning
          </p>

          <div className="stats-grid">
            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <h3>Profile</h3>
              <p>{user?.email}</p>
            </div>

            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <h3>Active Bids</h3>
              <p>0</p>
            </div>

            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <h3>Completed Jobs</h3>
              <p>0</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '24px', color: '#1a202c', marginTop: 0 }}>Quick Actions</h3>
          <div className="actions-grid">
            <button className="btn-action">Browse Projects</button>
            <button className="btn-action">My Proposals</button>
            <button className="btn-action">Earnings</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FreelancerHome;
