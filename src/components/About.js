import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import Footer from './Footer';

const About = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-logo">
          <img src={logo} alt="Podiweda" />
        </div>
        <div className="nav-center">
          <button className="nav-btn" onClick={() => navigate('/home')}>Home</button>
          <button className="nav-btn" onClick={() => navigate('/mytasks')}>My Tasks</button>
          <button className="nav-btn" onClick={() => navigate('/jobs')}>Find Jobs</button>
          <button className="nav-btn active">About</button>
          <button className="nav-btn" onClick={() => navigate('/services')}>Services</button>
        </div>
        <div className="nav-right">
          <div className="profile-menu-container">
            <button className="profile-avatar" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              {getInitials(user?.name)}
            </button>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-avatar-large">{getInitials(user?.name)}</div>
                  <div>
                    <div className="profile-name">{user?.name}</div>
                    <div className="profile-email">{user?.email}</div>
                  </div>
                </div>
                <div className="profile-dropdown-divider"></div>
                <button className="profile-dropdown-item" onClick={() => { setShowProfileMenu(false); navigate('/profile'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Edit Profile
                </button>
                <button className="profile-dropdown-item" onClick={handleSignOut}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="home-content">
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>About <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Podiweda.com</span></h2>
          
          <div style={{ lineHeight: '1.8', color: '#2d3748' }}>
            <h3 style={{ color: '#667eea', marginTop: '32px' }}>Who We Are</h3>
            <p>Podiweda.com is Sri Lanka's premier freelance marketplace connecting talented professionals with clients who need their services. We bridge the gap between skilled freelancers and businesses looking for quality work.</p>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>Our Mission</h3>
            <p>To empower Sri Lankan freelancers and businesses by providing a trusted, efficient platform where quality work meets opportunity. We believe in creating economic opportunities for everyone, from students to professionals.</p>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>Why Choose Podiweda?</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Local Focus: Built specifically for the Sri Lankan market</li>
              <li>Secure Platform: Safe payments and verified users</li>
              <li>Wide Range of Services: From cleaning to design, we cover it all</li>
              <li>Easy to Use: Simple interface for posting jobs and finding work</li>
              <li>Community Driven: Supporting local talent and businesses</li>
            </ul>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>Our Values</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Trust:</strong> Building a reliable platform for all users</li>
              <li><strong>Quality:</strong> Ensuring high standards in every transaction</li>
              <li><strong>Innovation:</strong> Continuously improving our services</li>
              <li><strong>Community:</strong> Supporting Sri Lankan talent and businesses</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
