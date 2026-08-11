import React from 'react';
import { Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-icon-wrapper">
            <Sprout size={20} />
          </div>
          <span className="brand-name">KRISHI MATCH</span>
        </div>

        <p className="footer-copy">
          {t.footer.tagline}
        </p>

        <div className="footer-meta">
          <span>{t.footer.meta}</span>
        </div>
      </div>
    </footer>
  );
};

