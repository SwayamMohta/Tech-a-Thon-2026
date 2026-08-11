import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { INDIA_STATES } from '../data/schemes';
import { IndiaMap } from './IndiaMap';
import { ScribbleUnderline, SproutSparkle, SunBurst, LeafAccentDoodle } from './DoodleAccents';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedStateName } from '../i18n/stateTranslations';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';

interface HeroSectionProps {
  onSearch: (quickSearchState: string) => void;
  onOpenFullForm?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const { language, t } = useLanguage();
  const [searchState, setSearchState] = useState('Maharashtra');
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filteredStates = INDIA_STATES.filter(st => {
    const locName = getLocalizedStateName(st, language);
    const q = filterText.toLowerCase();
    return st.toLowerCase().includes(q) || locName.toLowerCase().includes(q);
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchState);
  };

  const handleSelectState = (st: string) => {
    setSearchState(st);
    setIsOpen(false);
    setFilterText('');
    onSearch(st);
  };

  const handleOpen = () => {
    setFilterText('');
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '102px 20px 50px' }}>
      {/* Background Gradients */}
      <div className="bg-glow-yellow" />
      <div className="bg-glow-green" />
      <div className="bg-glow-emerald-center" />

      {/* Faded Agricultural Micro-Motifs & Contour Background Layer */}
      <div className="agri-bg-motifs-pattern" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="agriMicroMotifs" width="110" height="110" patternUnits="userSpaceOnUse">
              {/* Micro Vector Sprout */}
              <g transform="translate(16, 16) scale(0.68)" stroke="rgba(22, 163, 74, 0.22)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10" />
                <path d="M12 14C12 10 7 8 4 9C4 13 8 15 12 14Z" />
                <path d="M12 11C12 7 17 5 20 6C20 10 16 12 12 11Z" />
              </g>

              {/* Micro Vector Sun */}
              <g transform="translate(74, 20) scale(0.62)" stroke="rgba(217, 119, 6, 0.20)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
              </g>

              {/* Micro Vector Wheat Stalk */}
              <g transform="translate(24, 72) scale(0.62)" stroke="rgba(217, 119, 6, 0.21)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                <path d="M12 22V6" />
                <path d="M12 12C9 10 7 11 7 13C9 14 12 13 12 13" />
                <path d="M12 12C15 10 17 11 17 13C15 14 12 13 12 13" />
                <path d="M12 8C9 6 7 7 7 9C9 10 12 9 12 9" />
                <path d="M12 8C15 6 17 7 17 9C15 10 12 9 12 9" />
              </g>

              {/* Micro Vector Leaf Accent */}
              <g transform="translate(78, 74) scale(0.68)" stroke="rgba(16, 185, 129, 0.21)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7 0 6-4.5 11-10 11Z" />
              </g>
            </pattern>

            <pattern id="agriRowGrid" width="90" height="90" patternUnits="userSpaceOnUse">
              <path d="M 0 45 Q 22.5 15, 45 45 T 90 45" fill="none" stroke="rgba(34, 197, 94, 0.10)" strokeWidth="1.3" />
              <path d="M 0 15 Q 45 75, 90 15" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="1.1" strokeDasharray="4 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agriMicroMotifs)" />
          <rect width="100%" height="100%" fill="url(#agriRowGrid)" />
        </svg>
      </div>

      {/* Left Side: Image 1 (Farmer Man) */}
      <div className="hero-left-art animate-float" style={{
        position: 'absolute',
        left: '10px',
        top: '35%',
        transform: 'translateY(-50%)',
        width: '440px',
        maxWidth: '28vw',
        pointerEvents: 'none',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={img1}
          alt="Agricultural Illustration 1"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '420px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 14px 32px rgba(15, 23, 42, 0.09))'
          }}
        />
      </div>

      {/* Right Side: Image 2 */}
      <div className="hero-right-art animate-pop" style={{
        position: 'absolute',
        right: '10px',
        top: '40%',
        transform: 'translateY(-50%)',
        width: '440px',
        maxWidth: '28vw',
        pointerEvents: 'none',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={img2}
          alt="Agricultural Illustration 2"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '520px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 14px 32px rgba(15, 23, 42, 0.09))'
          }}
        />
      </div>

      {/* Centered Hero Content Block */}
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Contextual Floating Agricultural Doodles (Sprout, Sun, Leaf) */}
        <SproutSparkle className="hero-doodle-sparkle-tl" />
        <SunBurst className="hero-doodle-sun-tr" />
        <LeafAccentDoodle className="hero-doodle-leaf-mr" />

        {/* Centered Headline (Empathetic & Farmer-Centric) */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
          fontWeight: 800,
          color: '#0F172A',
          lineHeight: 1.18,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          textWrap: 'balance'
        }}>
          {t.hero.headingPart1} <br />
          <span className="animated-word-container">
            {t.hero.headingHighlight}
            <ScribbleUnderline color="#16A34A" />
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1rem',
          color: '#475569',
          maxWidth: '550px',
          margin: '0 auto 28px',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          {t.hero.description}
        </p>

        {/* Centered Search Bar */}
        <form className="hero-search-bar" onSubmit={handleQuickSubmit} style={{ margin: '0 auto 16px' }}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <div
              className="custom-dropdown-trigger"
              onClick={handleOpen}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-label={t.hero.selectState}
            >
              <span className="selected-state-text">{getLocalizedStateName(searchState, language) || t.hero.selectState}</span>
              <ChevronDown size={18} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
            </div>
          </div>

          <button type="submit" className="hero-search-btn" style={{ background: '#0F172A' }}>
            {t.hero.searchSchemes}
          </button>
        </form>

        {/* State Picker Portal Modal */}
        {isOpen && createPortal(
          <div className="state-picker-backdrop" onClick={() => setIsOpen(false)}>
            <div
              className="state-picker-panel"
              ref={panelRef}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={t.hero.modalTitle}
            >
              <button
                type="button"
                className="state-picker-close-circle"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="state-picker-left">
                <div className="state-picker-header">
                  <span className="state-picker-title">{t.hero.modalTitle}</span>
                </div>
                <div className="state-picker-search-wrap">
                  <input
                    type="text"
                    placeholder={t.hero.searchStatePlaceholder}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="state-picker-search-input"
                    autoFocus
                  />
                </div>
                <div className="state-picker-list" role="listbox">
                  {filteredStates.length > 0 ? (
                    filteredStates.map(st => (
                      <div
                        key={st}
                        className={`state-picker-option ${st === searchState ? 'selected' : ''}`}
                        onClick={() => handleSelectState(st)}
                        onMouseEnter={() => setHoveredState(st)}
                        onMouseLeave={() => setHoveredState(null)}
                        role="option"
                        aria-selected={st === searchState}
                      >
                        <span>{getLocalizedStateName(st, language)}</span>
                        {st === searchState && <Check size={16} className="check-icon" />}
                      </div>
                    ))
                  ) : (
                    <div className="no-options-found">{t.hero.noStateFound} "{filterText}"</div>
                  )}
                </div>
              </div>

              <div className="state-picker-right">
                <IndiaMap
                  selectedState={searchState}
                  hoveredState={hoveredState}
                  onSelectState={handleSelectState}
                  onHoverState={setHoveredState}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};



