import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import PostTask from './PostTask';
import Footer from './Footer';
import LanguageToggle from './LanguageToggle';
import { apiRequest } from '../utils/api';

const Home = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPostTask, setShowPostTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const services = [
    { icon: '🧹', title: t('services.cleaningTitle'), desc: t('services.cleaningDesc') },
    { icon: '🔧', title: t('services.handymanTitle'), desc: t('services.handymanDesc') },
    { icon: '🚚', title: t('services.deliveryTitle'), desc: t('services.deliveryDesc') },
    { icon: '🌿', title: t('services.gardeningTitle'), desc: t('services.gardeningDesc') },
    { icon: '📦', title: t('services.movingTitle'), desc: t('services.movingDesc') },
    { icon: '🔨', title: t('services.assemblyTitle'), desc: t('services.assemblyDesc') },
    { icon: '📸', title: t('services.photographyTitle'), desc: t('services.photographyDesc') },
    { icon: '✍️', title: t('services.writingTitle'), desc: t('services.writingDesc') },
    { icon: '🎨', title: t('services.designTitle'), desc: t('services.designDesc') },
    { icon: '👴', title: t('services.elderlyCareTitle'), desc: t('services.elderlyCareDesc') },
    { icon: '🏥', title: t('services.hospitalTitle'), desc: t('services.hospitalDesc') },
    { icon: '➕', title: t('services.manyMoreTitle'), desc: t('services.manyMoreDesc'), isMore: false },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await apiRequest('/api/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
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

  const handlePostTask = async (taskData) => {
    try {
      if (editingTask) {
        const updated = await apiRequest(`/api/tasks/${taskData.id}`, {
          method: 'PUT',
          body: JSON.stringify(taskData)
        });
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
        setEditingTask(null);
        showNotification('Task updated successfully!');
      } else {
        const created = await apiRequest('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(taskData)
        });
        setTasks([...tasks, created]);
        showNotification('Task posted successfully!');
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      showNotification('Failed to save task. Please try again.', 'error');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowPostTask(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiRequest(`/api/tasks/${taskId}`, { method: 'DELETE' });
        setTasks(tasks.filter(t => t.id !== taskId));
        showNotification('Task deleted successfully!');
      } catch (error) {
        console.error('Failed to delete task:', error);
        showNotification('Failed to delete task. Please try again.', 'error');
      }
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowPostTask(false);
    setEditingTask(null);
  };

  return (
    <div className="home-container">
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'error' ? '#f56565' : '#48bb78',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out'
        }}>
          {notification.message}
        </div>
      )}
      
      <nav className="home-nav">
        <div className="nav-logo">
          <img src={logo} alt="Podiweda" />
        </div>
        <div className="nav-center">
          <button className="nav-btn active">{t('nav.home')}</button>
          <button className="nav-btn" onClick={() => navigate('/mytasks')}>{t('nav.myTasks')}</button>
          <button className="nav-btn" onClick={() => navigate('/jobs')}>{t('nav.findJobs')}</button>
          <button className="nav-btn" onClick={() => navigate('/about')}>{t('nav.about')}</button>
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
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '8px' }}>{t('home.welcome')}</h2>
            <h2 style={{ margin: 0 }}><span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Podiweda.com</span></h2>
          </div>
          <p className="card-subtitle">
            {t('home.subtitle')}
          </p>

          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '32px', borderRadius: '12px', color: 'white', marginTop: '24px' }}>
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>{t('home.howItWorks')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>1️⃣</div>
                <h4 style={{ margin: '8px 0' }}>{t('home.step1Title')}</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>{t('home.step1Desc')}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>2️⃣</div>
                <h4 style={{ margin: '8px 0' }}>{t('home.step2Title')}</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>{t('home.step2Desc')}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>3️⃣</div>
                <h4 style={{ margin: '8px 0' }}>{t('home.step3Title')}</h4>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>{t('home.step3Desc')}</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '24px', color: '#1a202c', marginBottom: '24px' }}>{t('home.ourServices')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {services.map((service, index) => (
                <div 
                  key={index} 
                  style={{ 
                    padding: '20px', 
                    background: '#f7fafc', 
                    borderRadius: '12px', 
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>{service.icon}</div>
                  <h4 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '16px' }}>{service.title}</h4>
                  <p style={{ color: '#718096', fontSize: '13px', margin: 0 }}>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button className="btn-action" style={{ marginTop: '24px', width: '100%' }} onClick={() => setShowPostTask(true)}>+ {t('task.postTask')}</button>
          
          <div style={{ marginTop: '32px', padding: '24px', background: '#f7fafc', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{t('home.lookingForWork')}</h3>
            <p style={{ color: '#718096', marginBottom: '16px' }}>{t('home.findJobsDesc')}</p>
            <button className="btn-action" style={{ width: '100%' }} onClick={() => navigate('/jobs')}>{t('home.findJobs')}</button>
          </div>
        </div>
      </div>

      {showPostTask && (
        <PostTask
          onClose={handleCloseModal}
          onSubmit={handlePostTask}
          editTask={editingTask}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
