import React from 'react';
import type { User } from '../utils/auth';
import { LogIn, LogOut, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onCheckEligibilityClick: () => void;
  onBrowseSchemesClick?: () => void;
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
  onBrowseSchemesClick,
  onAdminClick,
  onExplainerClick,
  activeSection,
  setActiveSection,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  const handleBrowseClick = () => {
    if (onBrowseSchemesClick) {
      onBrowseSchemesClick();
    } else {
      onCheckEligibilityClick();
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">

        {/* 1. Brand Logo: Return to Top / Home */}
        <button
          type="button"
          className="navbar-brand"
          onClick={() => setActiveSection('hero')}
          aria-label="Krishi Match Home"
        >
          <span className="brand-name">Krishi Match</span>
        </button>

        {/* Right group: Nav links + CTA + Divider + Auth */}
        <div className="navbar-right-group">

          <nav className="navbar-links" aria-label="Main Navigation">
            {/* Browse Schemes Nav Link: View full scheme directory */}
            <button
              className={`nav-link ${activeSection === 'eligibility' ? 'active' : ''}`}
              onClick={handleBrowseClick}
            >
              Browse Schemes
            </button>
          </nav>

          {/* 5. Check Eligibility: Primary Green CTA Button */}
          <button
            type="button"
            className="btn-nav-cta"
            onClick={onCheckEligibilityClick}
          >
            <Sparkles size={14} />
            <span>Check Eligibility</span>
          </button>

          <div className="nav-divider" aria-hidden="true" />

          {/* 6. Sign In / Profile: Secondary Button / Badge */}
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
                title="Sign out"
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
    </header>
  );
};

