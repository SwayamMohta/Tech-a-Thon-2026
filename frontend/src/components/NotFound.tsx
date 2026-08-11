import React from 'react';
import { Home, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundProps {
  onGoHome: () => void;
  onGoMatcher: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome, onGoMatcher }) => {
  const { t } = useLanguage();
  const nfT = t.notFound || {};

  return (
    <div className="not-found-container">
      <div className="not-found-card animate-mascot">
        <div className="not-found-mascot">
          <span style={{ fontSize: '3rem' }}>🚜</span>
        </div>

        <span className="not-found-badge">{nfT.badge || 'Error 404 — Page Not Found'}</span>

        <h1 className="not-found-title">{nfT.title || 'Wandered Off the Farm Road?'}</h1>

        <p className="not-found-desc">
          {nfT.desc || "The page or section you are looking for doesn't exist or has moved into another field. Let's get you back on track to finding your eligible government schemes!"}
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="button" className="not-found-btn" onClick={onGoHome}>
            <Home size={16} />
            <span>{nfT.returnHome || 'Return Home'}</span>
          </button>

          <button
            type="button"
            className="not-found-btn"
            style={{ background: 'var(--brand-gold)', color: '#FFFFFF' }}
            onClick={onGoMatcher}
          >
            <Compass size={16} />
            <span>{nfT.checkEligible || 'Check Eligible Schemes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
