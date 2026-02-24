import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';
import logo from '../../assets/logo.png';
import Footer from '../Footer';

const Login = ({ onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { t } = useLanguage();
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
      navigate('/home');
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
      <h2 className="auth-title">{t('home.welcome')}</h2>
      <p className="auth-subtitle">{t('auth.signIn')} to your account</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">{t('auth.email')}</label>
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
          <label htmlFor="password">{t('auth.password')}</label>
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
          {t('auth.forgotPassword')}
        </button>

        {errors.submit && <div className="error-banner">{errors.submit}</div>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : t('auth.signIn')}
        </button>
      </form>

      <p className="auth-footer">
        {t('auth.dontHaveAccount')}{' '}
        <button onClick={onSwitchToSignup} className="link-button">
          {t('auth.signUp')}
        </button>
      </p>
    </div>
    <Footer />
    </>
  );
};

export default Login;
