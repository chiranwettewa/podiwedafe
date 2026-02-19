import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Auth.css';

const ForgotPassword = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { forgotPassword, confirmPassword: confirmPasswordReset } = useAuth();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to send reset code' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!code) newErrors.code = 'Verification code is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    else if (newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await confirmPasswordReset(email, code, newPassword);
      setStep(3);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="auth-form-container fade-in">
        <div className="success-icon">✓</div>
        <h2 className="auth-title">Password Reset Successful</h2>
        <p className="auth-subtitle">Your password has been reset successfully</p>
        <button onClick={onSwitchToLogin} className="auth-button">
          Sign In
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="auth-form-container fade-in">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter the code sent to {email}</p>

        <form onSubmit={handleResetPassword} className="auth-form">
          <div className="form-group">
            <label htmlFor="code">Verification Code</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={errors.code ? 'error' : ''}
              placeholder="123456"
            />
            {errors.code && <span className="error-message">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={errors.newPassword ? 'error' : ''}
              placeholder="••••••••"
            />
            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <div className="error-banner">{errors.submit}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Reset Password'}
          </button>
        </form>

        <p className="auth-footer">
          <button onClick={onSwitchToLogin} className="link-button">
            Back to Sign In
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-form-container fade-in">
      <h2 className="auth-title">Forgot Password?</h2>
      <p className="auth-subtitle">Enter your email to receive a reset code</p>

      <form onSubmit={handleRequestReset} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error' : ''}
            placeholder="you@example.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {errors.submit && <div className="error-banner">{errors.submit}</div>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Send Reset Code'}
        </button>
      </form>

      <p className="auth-footer">
        <button onClick={onSwitchToLogin} className="link-button">
          Back to Sign In
        </button>
      </p>
    </div>
  );
};

export default ForgotPassword;
