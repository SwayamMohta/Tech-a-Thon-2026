import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { INDIA_STATES } from '../data/schemes';
import { IndiaMap } from './IndiaMap';

interface HeroSectionProps {
  onSearch: (quickSearchState: string) => void;
  onOpenFullForm: () => void;
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
    <section className="hero-section">
      {/* Aesthetic Background Layer */}
      <div className="bg-glow-yellow" />
      <div className="bg-glow-green" />
      <div className="bg-glow-emerald-center" />
      <div className="bg-sunbeam" />

      {/* Topographic Terrain Pattern Overlay */}
      <div className="bg-topographic-grid" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topoGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0 60 Q 30 10, 60 60 T 120 60" fill="none" stroke="rgba(34, 197, 94, 0.05)" strokeWidth="1.5" />
              <path d="M 0 30 Q 45 90, 90 30 T 180 30" fill="none" stroke="rgba(245, 158, 11, 0.04)" strokeWidth="1.2" strokeDasharray="4 4" />
              <path d="M 0 100 Q 60 40, 120 100" fill="none" stroke="rgba(34, 197, 94, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topoGrid)" />
        </svg>
      </div>


      <div className="hero-container">
        {/* Left Hero Column */}
        <div className="hero-content">
          <h1 className="hero-title">
            We Are Krishi Match <br />
            <span className="hero-title-highlight">Agriculture</span>
          </h1>

          <p className="hero-subtitle">
          </p>

          {/* Curved Search Bar with Custom Floating State Picker */}
          <form className="hero-search-bar" onSubmit={handleQuickSubmit}>
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
                <span className="selected-state-text">{searchState || 'Select your state...'}</span>
                <ChevronDown size={18} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
              </div>
            </div>

            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>

          {/* Floating State Picker — portal rendered, fixed centered */}
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
                {/* Left column: search + list */}
                <div className="state-picker-left">
                  <div className="state-picker-header">
                    <span className="state-picker-title">Select State</span>
                    <button className="state-picker-close" onClick={() => setIsOpen(false)} aria-label="Close">
                      <X size={18} />
                    </button>
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

                {/* Right column: India map */}
                <div className="state-picker-right">
                  <IndiaMap
                    selectedState={searchState}
                    hoveredState={hoveredState}
                    onSelectState={handleSelectState}
                  />
                </div>
              </div>
            </div>,
            document.body
          )}


          {/* Social Proof matching reference image lower left */}
          <div className="hero-social-proof">
            <div className="avatar-stack">
              <img src="/assets/avatar1.png" alt="Farmer Avatar" className="avatar-img" loading="lazy" decoding="async" />
              <img src="/assets/avatar2.png" alt="Farmer Avatar" className="avatar-img" loading="lazy" decoding="async" />
              <img src="/assets/avatar3.png" alt="Farmer Avatar" className="avatar-img" loading="lazy" decoding="async" />
            </div>

            {/* Vibrant Green 4-pointed star icon */}
            <div className="green-star-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#22C55E">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <div className="social-proof-text">
              <span className="proof-title">Join our community</span>
              <span className="proof-sub">We're waiting for you</span>
            </div>
          </div>
        </div>

        {/* Right Hero Column - Arch Container matching reference image */}
        <div className="hero-media">
          <div className="arch-image-wrapper">
            <img
              src="/assets/hero_green_crops.png"
              alt="Fresh Agriculture Green Crops"
              className="arch-image"
              decoding="async"
            />

            {/* Floating Warm Golden Star top-left of arch */}
            <div className="golden-star-floating">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#F59E0B">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            {/* Floating Stamp Seal Badge bottom-left overlay on arch */}
            <div className="stamp-seal-badge">
              <div className="seal-center-text">1#</div>
              <svg viewBox="0 0 100 100" className="seal-text-path">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="seal-curved-text">
                  <textPath href="#circlePath" startOffset="0%">
                    - BEST MODERN FARM - 1# SCHEME MATCHER
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
