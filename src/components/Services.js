import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import Footer from './Footer';
import LanguageToggle from './LanguageToggle';

const Services = () => {
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

  const services = [
    { icon: '🧹', title: 'Cleaning Services', desc: 'Professional home and office cleaning' },
    { icon: '🔧', title: 'Handyman Services', desc: 'Repairs, installations, and maintenance' },
    { icon: '🚚', title: 'Delivery Services', desc: 'Fast and reliable delivery solutions' },
    { icon: '🌿', title: 'Gardening', desc: 'Landscaping and garden maintenance' },
    { icon: '📦', title: 'Moving Services', desc: 'Packing, moving, and relocation help' },
    { icon: '🔨', title: 'Assembly', desc: 'Furniture and equipment assembly' },
    { icon: '📸', title: 'Photography', desc: 'Professional photo and video services' },
    { icon: '✍️', title: 'Writing', desc: 'Content writing and copywriting' },
    { icon: '🎨', title: 'Design', desc: 'Graphic design and creative services' },
    { icon: '👴', title: 'Elderly Care', desc: 'Compassionate care for seniors' },
  ];

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
          <button className="nav-btn" onClick={() => navigate('/about')}>{t('nav.about')}</button>
          <button className="nav-btn active">{t('nav.services')}</button>
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
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Our <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Services</span></h2>
          <p style={{ textAlign: 'center', color: '#718096', marginBottom: '40px' }}>Find the perfect freelancer for any task</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {services.map((service, index) => (
              <div key={index} style={{ padding: '24px', background: '#f7fafc', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{service.icon}</div>
                <h3 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '18px' }}>{service.title}</h3>
                <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>{service.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '32px', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0 }}>How It Works</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>1️⃣</div>
                <h4 style={{ margin: '8px 0' }}>Post Your Task</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>Describe what you need done</p>
              </div>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>2️⃣</div>
                <h4 style={{ margin: '8px 0' }}>Get Applications</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>Freelancers apply to your job</p>
              </div>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>3️⃣</div>
                <h4 style={{ margin: '8px 0' }}>Choose & Complete</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>Select the best fit and get it done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
