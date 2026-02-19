import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#667eea', fontWeight: '700' }}>Podiweda</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: '#2d3748', fontWeight: '500' }}>Welcome, {user?.name}</span>
          <button
            onClick={handleSignOut}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          marginBottom: '32px'
        }}>
          <h2 style={{ fontSize: '32px', color: '#1a202c', marginTop: 0 }}>Welcome to Your Dashboard</h2>
          <p style={{ fontSize: '16px', color: '#718096', marginBottom: '32px' }}>
            You're successfully authenticated with AWS Cognito
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Profile</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>{user?.email}</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Status</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>Active User</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Verified</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>{user?.email_verified === 'true' ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <h3 style={{ fontSize: '24px', color: '#1a202c', marginTop: 0 }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button style={{
              background: 'white',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              View Profile
            </button>
            <button style={{
              background: 'white',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Settings
            </button>
            <button style={{
              background: 'white',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
