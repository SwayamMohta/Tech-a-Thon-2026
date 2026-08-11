import React from 'react';
import type { User } from '../utils/auth';
import { LogOut, UserCheck, ShieldCheck, LogIn } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onCheckEligibilityClick: () => void;
  onBrowseSchemesClick?: () => void;
  onAdminClick: () => void;
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
  activeSection,
  setActiveSection,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  const { t } = useLanguage();

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

        {/* Right Side: All Nav Links + Language Selector + Sign In Black Pill CTA Button */}
        <div className="navbar-right-group">
          <nav className="navbar-links" aria-label="Main Navigation">
            <button
              className={`nav-link ${activeSection === 'eligibility' ? 'active' : ''}`}
              onClick={onCheckEligibilityClick}
            >
              {t.nav.checkEligibility || 'Check Eligibility'}
            </button>
            <button
              className={`nav-link ${activeSection === 'browse' ? 'active' : ''}`}
              onClick={handleBrowseClick}
            >
              {t.nav.browseSchemes || 'Browse Schemes'}
            </button>
          </nav>

          <LanguageSelector />

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
                  <span>{t.nav.admin}</span>
                </button>
              )}

              <button
                type="button"
                className="btn-nav-logout"
                onClick={onLogout}
                title={t.nav.signOut}
                aria-label={t.nav.signOut}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-nav-pill-black"
              onClick={onOpenAuthModal}
            >
              <LogIn size={14} />
              <span>{t.nav.signIn}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};


