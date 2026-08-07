import React from 'react';
import type { User } from '../utils/auth';
import { LogOut, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

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

        {/* Left Side: Brand Name Only */}
        <button
          type="button"
          className="navbar-brand"
          onClick={() => setActiveSection('hero')}
          aria-label="Krishi Match Home"
        >
          <span className="brand-name">Krishi Match</span>
        </button>

        {/* Right Side: All Nav Links + Sign In + Black Pill CTA Button */}
        <div className="navbar-right-group">
          <nav className="navbar-links" aria-label="Main Navigation">
            <button
              className={`nav-link ${activeSection === 'eligibility' ? 'active' : ''}`}
              onClick={handleBrowseClick}
            >
              Browse Schemes
            </button>
            <button
              className={`nav-link ${activeSection === 'explainer' ? 'active' : ''}`}
              onClick={onExplainerClick}
            >
              Matching Engine
            </button>
          </nav>

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
              className="nav-link-text-only"
              onClick={onOpenAuthModal}
            >
              Sign In
            </button>
          )}

          {/* Primary Black Pill CTA Button */}
          <button
            type="button"
            className="btn-nav-pill-black"
            onClick={onCheckEligibilityClick}
          >
            <Sparkles size={14} />
            <span>Check Eligibility</span>
          </button>
        </div>

      </div>
    </header>
  );
};

