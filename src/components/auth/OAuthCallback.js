import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeCodeForToken(code);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const exchangeCodeForToken = async (code) => {
    const tokenEndpoint = `https://${process.env.REACT_APP_OAUTH_DOMAIN}/oauth2/token`;
    const redirectUri = window.location.origin + '/callback';

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.REACT_APP_CLIENT_ID,
          code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.access_token && data.id_token) {
        sessionStorage.setItem('accessToken', data.access_token);
        sessionStorage.setItem('idToken', data.id_token);
        if (data.refresh_token) {
          sessionStorage.setItem('refreshToken', data.refresh_token);
        }
        const role = localStorage.getItem('userRole');
        window.location.href = role === 'freelancer' ? '/home-freelancer' : '/home-client';
      } else {
        throw new Error('Invalid token response');
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      navigate('/login?error=oauth_failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner"></div>
    </div>
  );
};

export default OAuthCallback;
