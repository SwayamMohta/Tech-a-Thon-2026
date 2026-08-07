import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { INDIA_STATES } from '../data/schemes';
import { IndiaMap } from './IndiaMap';
import { ScribbleUnderline } from './DoodleAccents';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';

interface HeroSectionProps {
  onSearch: (quickSearchState: string) => void;
  onOpenFullForm?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchState, setSearchState] = useState('Maharashtra');
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filteredStates = INDIA_STATES.filter(st =>
    st.toLowerCase().includes(filterText.toLowerCase())
  );

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

      {/* Topographic Terrain Overlay */}
      <div className="bg-topographic-grid" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topoGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0 60 Q 30 10, 60 60 T 120 60" fill="none" stroke="rgba(34, 197, 94, 0.05)" strokeWidth="1.5" />
              <path d="M 0 30 Q 45 90, 90 30 T 180 30" fill="none" stroke="rgba(245, 158, 11, 0.04)" strokeWidth="1.2" strokeDasharray="4 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topoGrid)" />
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
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Centered Headline (Matching Image 2 Typography & Layout) */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
          fontWeight: 800,
          color: '#0F172A',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '20px'
        }}>
          Match schemes. <br />
          <span className="animated-word-container">
            Get funded.
            <ScribbleUnderline color="#16A34A" />
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.15rem',
          color: '#475569',
          maxWidth: '560px',
          margin: '0 auto 28px',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          Never miss eligible agricultural subsidies, tractor grants, or crop insurance tailored for your farm.
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
              aria-label="Select state"
            >
              <span className="selected-state-text">{searchState || 'Select state...'}</span>
              <ChevronDown size={18} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
            </div>
          </div>

          <button type="submit" className="hero-search-btn" style={{ background: '#0F172A' }}>
            Search Schemes
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
              aria-label="Select your state"
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
                  <span className="state-picker-title">Select State</span>
                </div>
                <div className="state-picker-search-wrap">
                  <input
                    type="text"
                    placeholder="Search state..."
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
                        <span>{st}</span>
                        {st === searchState && <Check size={16} className="check-icon" />}
                      </div>
                    ))
                  ) : (
                    <div className="no-options-found">No state matching "{filterText}"</div>
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

