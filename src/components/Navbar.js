import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="home-nav">
        <button className="hamburger-menu" onClick={() => setShowMobileMenu(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="nav-logo" onClick={() => navigate('/home')}>
          <span style={{ fontSize: '24px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Podiweda.com</span>
        </div>
        <div className="nav-mobile-right">
          <div className="profile-menu-container" ref={profileMenuRef}>
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
        <div className="nav-center">
          <button className={`nav-btn ${isActive('/home') ? 'active' : ''}`} onClick={() => navigate('/home')}>{t('nav.home')}</button>
          <button className={`nav-btn ${isActive('/mytasks') ? 'active' : ''}`} onClick={() => navigate('/mytasks')}>{t('nav.myTasks')}</button>
          <button className={`nav-btn ${isActive('/jobs') ? 'active' : ''}`} onClick={() => navigate('/jobs')}>{t('nav.findJobs')}</button>
          <button className={`nav-btn ${isActive('/about') ? 'active' : ''}`} onClick={() => navigate('/about')}>{t('nav.about')}</button>
        </div>
        <div className="nav-right">
          <LanguageToggle />
          <div className="profile-menu-container" ref={profileMenuRef}>
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

      {showMobileMenu && (
        <div className="mobile-menu open" onClick={() => setShowMobileMenu(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span style={{ fontSize: '20px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Podiweda.com</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <LanguageToggle />
                <button className="mobile-menu-close" onClick={() => setShowMobileMenu(false)}>×</button>
              </div>
            </div>
            <div className="mobile-menu-items">
              <button className={`mobile-menu-item ${isActive('/home') ? 'active' : ''}`} onClick={() => { setShowMobileMenu(false); navigate('/home'); }}>{t('nav.home')}</button>
              <button className={`mobile-menu-item ${isActive('/mytasks') ? 'active' : ''}`} onClick={() => { setShowMobileMenu(false); navigate('/mytasks'); }}>{t('nav.myTasks')}</button>
              <button className={`mobile-menu-item ${isActive('/jobs') ? 'active' : ''}`} onClick={() => { setShowMobileMenu(false); navigate('/jobs'); }}>{t('nav.findJobs')}</button>
              <button className={`mobile-menu-item ${isActive('/about') ? 'active' : ''}`} onClick={() => { setShowMobileMenu(false); navigate('/about'); }}>{t('nav.about')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
