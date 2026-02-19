import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiRequest('http://localhost:8080/api/profile');
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginTop: 0, color: '#1a202c' }}>Dashboard</h1>
        
        {loading && <p>Loading profile...</p>}
        {error && <p style={{ color: '#e53e3e' }}>Error: {error}</p>}
        
        {profile && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Profile Information</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>User ID:</strong> {profile.sub}</p>
            <p><strong>Groups:</strong> {profile.groups ? profile.groups.join(', ') : 'None'}</p>
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Local User Info</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Email Verified:</strong> {user?.email_verified === 'true' ? 'Yes' : 'No'}</p>
        </div>

        <button
          onClick={handleSignOut}
          style={{
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px',
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
