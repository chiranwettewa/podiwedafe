import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import Footer from './Footer';
import LanguageToggle from './LanguageToggle';

const About = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
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
          <button className="nav-btn" onClick={() => navigate('/home')}>{t('nav.home')}</button>
          <button className="nav-btn" onClick={() => navigate('/mytasks')}>{t('nav.myTasks')}</button>
          <button className="nav-btn" onClick={() => navigate('/jobs')}>{t('nav.findJobs')}</button>
          <button className="nav-btn active">{t('nav.about')}</button>
        </div>
        <div className="nav-right">
          <LanguageToggle />
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
                  {t('nav.profile')}
                </button>
                <button className="profile-dropdown-item" onClick={handleSignOut}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  {t('nav.signOut')}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="home-content">
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t('about.title')} <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Podiweda.com</span></h2>
          
          <div style={{ lineHeight: '1.8', color: '#2d3748' }}>
            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.whoWeAre')}</h3>
            <p>{t('about.whoWeAreText')}</p>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.ourMission')}</h3>
            <p>{t('about.ourMissionText')}</p>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.whyChoose')}</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {t('about.whyChooseItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 style={{ color: '#667eea', marginTop: '32px' }}>{t('about.ourValues')}</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {t('about.ourValuesItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
