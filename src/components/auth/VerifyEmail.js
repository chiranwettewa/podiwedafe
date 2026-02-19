import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Auth.css';

const VerifyEmail = ({ email, onVerified, onSwitchToLogin }) => {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { confirmSignUp, resendConfirmationCode } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setErrors({ code: 'Verification code is required' });
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await confirmSignUp(email, code);
      onVerified();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to verify email' });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendSuccess(false);
    try {
      await resendConfirmationCode(email);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to resend code' });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-form-container fade-in">
      <h2 className="auth-title">Verify Your Email</h2>
      <p className="auth-subtitle">
        We sent a verification code to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="code">Verification Code</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={errors.code ? 'error' : ''}
            placeholder="123456"
            maxLength="6"
          />
          {errors.code && <span className="error-message">{errors.code}</span>}
        </div>

        {errors.submit && <div className="error-banner">{errors.submit}</div>}
        {resendSuccess && <div className="success-banner">Code resent successfully!</div>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Verify Email'}
        </button>
      </form>

      <div className="resend-section">
        <p>Didn't receive the code?</p>
        <button onClick={handleResend} className="link-button" disabled={resending}>
          {resending ? 'Resending...' : 'Resend Code'}
        </button>
      </div>

      <p className="auth-footer">
        <button onClick={onSwitchToLogin} className="link-button">
          Back to Sign In
        </button>
      </p>
    </div>
  );
};

export default VerifyEmail;
