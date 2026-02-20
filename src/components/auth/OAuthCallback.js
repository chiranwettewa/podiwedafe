import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

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
        const payload = JSON.parse(atob(data.id_token.split('.')[1]));
        const username = payload['cognito:username'] || payload.email;
        
        const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
        cognitoUser.setSignInUserSession(
          cognitoUser.getCognitoUserSession(data.id_token, data.access_token, data.refresh_token)
        );

        let role = localStorage.getItem('userRole');
        if (!role) {
          role = 'client';
          localStorage.setItem('userRole', role);
        }
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
