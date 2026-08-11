import React, { useState, useEffect } from 'react';
import type { User } from '../utils/auth';
import { loginUser, registerUser } from '../utils/auth';
import { X, Sprout, User as UserIcon, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User, token: string) => void;
  initialMessage?: string;
  defaultRole?: 'admin' | 'user';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMessage,
  defaultRole = 'user'
}) => {
  const { t } = useLanguage();
  const authT = t.auth || {};
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (tab === 'login') {
      const res = loginUser(username, password);
      if (res.success && res.user && res.token) {
        onSuccess(res.user, res.token);
        onClose();
      } else {
        setErrorMsg(res.error || 'Invalid username or password.');
      }
    } else {
      const res = registerUser(username, name, password, role);
      if (res.success && res.user && res.token) {
        onSuccess(res.user, res.token);
        onClose();
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="google-auth-card-unscrollable" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Google Level Authentication"
      >
        {/* Close Button */}
        <button className="google-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Centered Brand Header */}
        <div className="google-auth-header">
          <div className="google-brand-icon">
            <Sprout size={22} />
          </div>
          <h2 className="google-auth-title">
            {tab === 'login' ? (authT.titleSignIn || 'Sign in') : (authT.titleRegister || 'Create account')}
          </h2>
          <p className="google-auth-sub">
            {authT.subtitle || 'to continue to Krishi Match Platform'}
          </p>
        </div>

        {initialMessage && (
          <div className="google-notice-banner">
            <AlertCircle size={14} />
            <span>{initialMessage}</span>
          </div>
        )}

        {errorMsg && (
          <div className="google-error-alert">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="google-auth-form">
          {tab === 'register' ? (
            <div className="google-form-grid-2">
              <div className="google-form-group">
                <label htmlFor="auth-full-name" className="google-input-label">{authT.fullName || 'Full name'}</label>
                <input
                  id="auth-full-name"
                  type="text"
                  placeholder={authT.fullNamePlaceholder || 'Rajesh Kumar'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="google-input-field"
                  required
                />
              </div>

              <div className="google-form-group">
                <label htmlFor="auth-username" className="google-input-label">{authT.username || 'Username'}</label>
                <input
                  id="auth-username"
                  type="text"
                  placeholder={authT.usernamePlaceholder || 'Username'}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="google-input-field"
                  required
                />
              </div>

              <div className="google-form-group">
                <label htmlFor="auth-password" className="google-input-label">{authT.password || 'Password'}</label>
                <div className="google-input-wrapper">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={authT.passwordPlaceholder || 'Password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="google-input-field with-eye-sm"
                    required
                  />
                  <button 
                    type="button" 
                    className="google-btn-eye-sm" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? (authT.hidePassword || "Hide password") : (authT.showPassword || "Show password")}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="google-form-group">
                <label htmlFor="auth-role" className="google-input-label">{authT.accountRole || 'Account role'}</label>
                <select
                  id="auth-role"
                  value={role}
                  onChange={e => setRole(e.target.value as any)}
                  className="google-input-field select-field"
                >
                  <option value="user">{authT.farmerUser || 'Farmer User'}</option>
                  <option value="admin">{authT.administrator || 'Administrator'}</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="google-form-single">
              <div className="google-form-group">
                <label htmlFor="auth-username" className="google-input-label">{authT.username || 'Username'}</label>
                <div className="google-input-wrapper">
                  <UserIcon size={16} className="google-field-icon" />
                  <input
                    id="auth-username"
                    type="text"
                    placeholder={authT.usernamePlaceholder || 'e.g. admin or farmer'}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="google-input-field with-icon"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="google-form-group">
                <label htmlFor="auth-password" className="google-input-label">{authT.password || 'Password'}</label>
                <div className="google-input-wrapper">
                  <KeyRound size={16} className="google-field-icon" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={authT.passwordPlaceholder || 'Enter your password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="google-input-field with-icon with-eye"
                    required
                  />
                  <button 
                    type="button" 
                    className="google-btn-eye" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? (authT.hidePassword || "Hide password") : (authT.showPassword || "Show password")}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="google-primary-btn">
            {tab === 'login' ? (authT.btnSignIn || 'Sign in') : (authT.btnRegister || 'Create account')}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="google-auth-footer">
          {tab === 'login' ? (
            <p>
              {authT.dontHaveAccount || "Don't have an account?"}{' '}
              <button 
                type="button" 
                className="google-link-btn"
                onClick={() => { setTab('register'); setErrorMsg(''); }}
              >
                {authT.createAccountLink || 'Create account'}
              </button>
            </p>
          ) : (
            <p>
              {authT.alreadyHaveAccount || 'Already have an account?'}{' '}
              <button 
                type="button" 
                className="google-link-btn"
                onClick={() => { setTab('login'); setErrorMsg(''); }}
              >
                {authT.signInLink || 'Sign in'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
