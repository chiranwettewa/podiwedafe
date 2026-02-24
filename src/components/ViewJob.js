import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Home.css';
import Footer from './Footer';
import Navbar from './Navbar';

const ViewJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const job = location.state?.job;

  if (!job) {
    navigate('/jobs');
    return null;
  }

  return (
    <div className="home-container">
      <Navbar />

      <div className="home-content">
        <div className="card">
          <button 
            onClick={() => navigate('/jobs')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#667eea', 
              fontSize: '14px', 
              cursor: 'pointer', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← Back to Jobs
          </button>

          <h2 style={{ marginBottom: '24px' }}>{job.title}</h2>

          <div className="task-meta" style={{ marginBottom: '24px' }}>
            <span className="task-badge badge-category">{job.category}</span>
            <span className="task-badge badge-location">📍 {job.district}, {job.city}</span>
            <span className="task-badge badge-budget">${job.budget} {job.budgetType === 'hourly' ? '/hr' : ''}</span>
            <span className="task-badge badge-status">{job.taskType}</span>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', color: '#1a202c', marginBottom: '12px' }}>Description</h3>
            <p style={{ color: '#4a5568', lineHeight: '1.8' }}>{job.description}</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', color: '#1a202c', marginBottom: '12px' }}>Location Details</h3>
            <p style={{ color: '#4a5568', lineHeight: '1.8' }}>
              <strong>District:</strong> {job.district}<br />
              <strong>City:</strong> {job.city}<br />
              <strong>Address:</strong> {job.address}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', color: '#1a202c', marginBottom: '12px' }}>Due Date</h3>
            <p style={{ color: '#4a5568' }}>{new Date(job.dueDate).toLocaleDateString()}</p>
          </div>

          <div style={{ 
            background: '#f7fafc', 
            padding: '20px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '18px', color: '#1a202c', margin: '0 0 8px 0' }}>Contact</h3>
              <p style={{ color: '#4a5568', margin: 0 }}>{job.phoneNumber}</p>
            </div>
            <a 
              href={`tel:${job.phoneNumber}`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewJob;
