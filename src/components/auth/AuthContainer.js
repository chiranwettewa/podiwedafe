import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import VerifyEmail from './VerifyEmail';
import ForgotPassword from './ForgotPassword';
import LanguageToggle from '../LanguageToggle';
import '../../styles/Auth.css';

const AuthContainer = () => {
  const [view, setView] = useState('login');
  const [emailToVerify, setEmailToVerify] = useState('');

  const handleVerificationNeeded = (email) => {
    setEmailToVerify(email);
    setView('verify');
  };

  const handleVerified = () => {
    setView('login');
  };

  return (
    <div className="auth-container">
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
        <LanguageToggle />
      </div>
      <div className="auth-card">
        {view === 'login' && (
          <Login
            onSwitchToSignup={() => setView('signup')}
            onSwitchToForgotPassword={() => setView('forgot')}
          />
        )}
        {view === 'signup' && (
          <Signup
            onSwitchToLogin={() => setView('login')}
            onVerificationNeeded={handleVerificationNeeded}
          />
        )}
        {view === 'verify' && (
          <VerifyEmail
            email={emailToVerify}
            onVerified={handleVerified}
            onSwitchToLogin={() => setView('login')}
          />
        )}
        {view === 'forgot' && (
          <ForgotPassword onSwitchToLogin={() => setView('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
