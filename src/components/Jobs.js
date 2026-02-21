import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import Footer from './Footer';
import { apiRequest } from '../utils/api';

const Jobs = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await apiRequest('/api/tasks');
      setJobs(data.filter(t => t.status === 'open'));
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <button className="nav-btn active">Find Jobs</button>
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
          <h3 style={{ fontSize: '24px', color: '#1a202c', margin: '0 0 24px 0', textAlign: 'center' }}>Available Jobs</h3>

          {loading ? (
            <div className="empty-state">
              <p>Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              <p>No jobs available at the moment. Check back later!</p>
            </div>
          ) : (
            <div>
              {jobs.map(job => (
                <div key={job.id} className="task-card">
                  <div className="task-header">
                    <div>
                      <h4 className="task-title">{job.title}</h4>
                      <div className="task-meta">
                        <span className="task-badge badge-category">{job.category}</span>
                        <span className="task-badge badge-location">📍 {job.location}</span>
                        <span className="task-badge badge-budget">${job.budget} {job.budgetType === 'hourly' ? '/hr' : ''}</span>
                        <span className="task-badge badge-status">{job.taskType}</span>
                      </div>
                    </div>
                  </div>
                  <p className="task-description">{job.description}</p>
                  <div style={{ fontSize: '13px', color: '#718096', marginBottom: '12px' }}>
                    Due: {new Date(job.dueDate).toLocaleDateString()}
                  </div>
                  <button className="btn-action">Apply Now</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
