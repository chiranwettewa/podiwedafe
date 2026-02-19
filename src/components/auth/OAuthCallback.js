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

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('idToken', data.id_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Token exchange failed:', error);
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner"></div>
    </div>
  );
};

export default OAuthCallback;
