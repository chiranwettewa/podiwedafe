import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Auth.css';
import logo from '../../assets/logo.png';

const Signup = ({ onSwitchToLogin, onVerificationNeeded }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'client' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      await signUp(formData.email, formData.password, formData.name);
      localStorage.setItem('userRole', formData.role);
      onVerificationNeeded(formData.email);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to sign up' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-form-container fade-in">
      <img src={logo} alt="Podiweda" className="auth-logo" />
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Sign up to get started</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="you@example.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role">I'm joining as</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="auth-select"
          >
            <option value="client">Client - I want to hire</option>
            <option value="freelancer">Freelancer - I want to work</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="••••••••"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        {errors.submit && <div className="error-banner">{errors.submit}</div>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Sign Up'}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="link-button">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Signup;
