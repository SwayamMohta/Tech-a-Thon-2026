import React from 'react';
import type { User } from '../utils/auth';
import { Sprout, LogIn, LogOut, UserCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onCheckEligibilityClick: () => void;
  onAdminClick: () => void;
  onExplainerClick: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCheckEligibilityClick,
  onAdminClick,
  onExplainerClick,
  activeSection,
  setActiveSection,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo & Title on Left */}
        <button 
          type="button"
          className="navbar-brand" 
          onClick={() => setActiveSection('hero')}
          aria-label="Krishi Match Home"
        >
          <div className="brand-logo-badge">
            <Sprout size={18} />
          </div>
          <span className="brand-name">KRISHI MATCH</span>
        </button>

        {/* Public Farmer Navigation Links */}
        <div className="navbar-right-group">
          <nav className="navbar-links" aria-label="Main Navigation">
            <button 
              className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => setActiveSection('hero')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeSection === 'eligibility' ? 'active' : ''}`}
              onClick={onCheckEligibilityClick}
            >
              Match Schemes
            </button>
            <button 
              className={`nav-link ${activeSection === 'explainer' ? 'active' : ''}`}
              onClick={onExplainerClick}
            >
              Matching Engine
            </button>
          </nav>

          {/* User Auth Badge & Admin Entry */}
          <div className="nav-auth-box">
            {currentUser ? (
              <div className="user-profile-badge">
                <div className={`role-avatar-dot ${currentUser.role === 'admin' ? 'dot-admin' : 'dot-user'}`}>
                  <UserCheck size={14} />
                </div>
                <div className="user-text-info">
                  <span className="user-display-name">{currentUser.name.split(' ')[0]}</span>
                  <span className="user-role-tag">{currentUser.role}</span>
                </div>

                {currentUser.role === 'admin' && (
                  <button 
                    type="button" 
                    className={`btn-nav-admin-access ${activeSection === 'admin' ? 'active' : ''}`}
                    onClick={onAdminClick}
                    title="Open Admin Console"
                  >
                    <ShieldCheck size={13} />
                    <span>Admin</span>
                  </button>
                )}

                <button 
                  type="button" 
                  className="btn-nav-logout"
                  onClick={onLogout}
                  title="Sign out of JWT session"
                  aria-label="Sign out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                className="btn-nav-signin"
                onClick={onOpenAuthModal}
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
