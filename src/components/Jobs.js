import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { apiRequest } from '../utils/api';
import { getDistricts, getCities } from '../utils/locationData';

const Jobs = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    district: '',
    city: '',
    taskType: ''
  });
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await apiRequest('/api/tasks/all');
      setJobs(data.filter(t => t.status === 'open'));
      setFilteredJobs(data.filter(t => t.status === 'open'));
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let filtered = [...jobs];
    
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    
    if (filters.district) {
      filtered = filtered.filter(job => job.district === filters.district);
    }
    
    if (filters.city) {
      filtered = filtered.filter(job => job.city === filters.city);
    }
    
    if (filters.taskType) {
      filtered = filtered.filter(job => job.taskType === filters.taskType);
    }
    
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'district') {
      setAvailableCities(getCities(language, value));
      setFilters({ ...filters, district: value, city: '' });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const clearFilters = () => {
    setFilters({ category: '', district: '', city: '', taskType: '' });
    setAvailableCities([]);
  };

  return (
    <div className="home-container">
      <Navbar />

      <div className="home-content">
        <div className="card">
          <h3 style={{ fontSize: '24px', color: '#1a202c', margin: '0 0 24px 0', textAlign: 'center' }}>{t('jobs.availableJobs')}</h3>

          <div style={{ marginBottom: '24px', padding: '16px', background: '#f7fafc', borderRadius: '8px' }}>
            <div className="form-row">
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '14px', marginBottom: '4px' }}>{t('task.category')}</label>
                <select name="category" value={filters.category} onChange={handleFilterChange} style={{ padding: '8px' }}>
                  <option value="">{t('jobs.allCategories')}</option>
                  <option value="cleaning">{t('categories.cleaning')}</option>
                  <option value="handyman">{t('categories.handyman')}</option>
                  <option value="delivery">{t('categories.delivery')}</option>
                  <option value="gardening">{t('categories.gardening')}</option>
                  <option value="moving">{t('categories.moving')}</option>
                  <option value="assembly">{t('categories.assembly')}</option>
                  <option value="photography">{t('categories.photography')}</option>
                  <option value="writing">{t('categories.writing')}</option>
                  <option value="design">{t('categories.design')}</option>
                  <option value="elderly-care">{t('categories.elderlyCare')}</option>
                  <option value="other">{t('categories.other')}</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '14px', marginBottom: '4px' }}>{t('task.taskType')}</label>
                <select name="taskType" value={filters.taskType} onChange={handleFilterChange} style={{ padding: '8px' }}>
                  <option value="">{t('jobs.allTypes')}</option>
                  <option value="in-person">{t('taskTypes.inPerson')}</option>
                  <option value="remote">{t('taskTypes.remote')}</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '14px', marginBottom: '4px' }}>{t('task.district')}</label>
                <select name="district" value={filters.district} onChange={handleFilterChange} style={{ padding: '8px' }}>
                  <option value="">{t('jobs.allDistricts')}</option>
                  {getDistricts(language).map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '14px', marginBottom: '4px' }}>{t('task.city')}</label>
                <select name="city" value={filters.city} onChange={handleFilterChange} disabled={!filters.district} style={{ padding: '8px' }}>
                  <option value="">All Cities</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            {(filters.category || filters.district || filters.city || filters.taskType) && (
              <button onClick={clearFilters} style={{ marginTop: '12px', padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                Clear Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
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
              {filteredJobs.map(job => (
                <div key={job.id} className="task-card">
                  <div className="task-header">
                    <div>
                      <h4 className="task-title">{job.title}</h4>
                      <div className="task-meta">
                        <span className="task-badge badge-category">{job.category}</span>
                        <span className="task-badge badge-location">📍 {job.district}, {job.city}</span>
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
