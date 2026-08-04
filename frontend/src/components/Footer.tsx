import React from 'react';
import { Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
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
          Farmer-to-Scheme Eligibility Matcher • Built for Tech-a-Thon 2026. Empowering small & marginal Indian farmers with transparent scheme matching.
        </p>

        <div className="footer-meta">
          <span>TF-IDF + Hard-Filter Pure Python/TS Engine</span>
        </div>
      </div>
    </footer>
  );
};
