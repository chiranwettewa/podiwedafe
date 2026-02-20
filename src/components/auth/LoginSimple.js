import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';
import logo from '../../assets/logo.png';
import Footer from '../Footer';

const LoginSimple = ({ onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await signIn(email, password);
      let role = localStorage.getItem('userRole');
      if (!role) {
        role = 'client';
        localStorage.setItem('userRole', role);
      }
      navigate(role === 'freelancer' ? '/home-freelancer' : '/home-client');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to sign in' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-form-container fade-in">
        <img src={logo} alt="Podiweda" className="auth-logo" />
        <h2 className="auth-title">Welcome to <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Podiweda.com</span></h2>
        <p className="auth-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
              placeholder="••••••••"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button
            type="button"
            className="forgot-password-link"
            onClick={onSwitchToForgotPassword}
          >
            Forgot password?
          </button>

          {errors.submit && <div className="error-banner">{errors.submit}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="link-button">
            Sign up
          </button>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default LoginSimple;