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
      navigate('/home');
    }
  }, [navigate]);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('https://us-east-1lipvvw9hd.auth.us-east-1.amazoncognito.com/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: '2si8lnltd4fessjnv7pca233b8',
          code,
          redirect_uri: 'http://localhost:3000',
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('cognitoTokens', JSON.stringify(data));
        navigate('/home');
      } else {
        navigate('/login');
      }
    } catch (error) {
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
