import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { INDIA_STATES } from '../data/schemes';

interface HeroSectionProps {
  onSearch: (quickSearchState: string) => void;
  onOpenFullForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchState, setSearchState] = useState('Maharashtra');
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Soft Glow Blobs */}
      <div className="bg-glow-yellow" />
      <div className="bg-glow-green" />

      <div className="hero-container">
        {/* Left Hero Column */}
        <div className="hero-content">
          <h1 className="hero-title">
            We Are Krishi Match <br />
            <span className="hero-title-highlight">Agriculture</span>
          </h1>

          <p className="hero-subtitle">
            we believe Future of Food & Welfare is here
          </p>

          {/* Curved Search Bar with Custom Downward Dropdown */}
          <form className="hero-search-bar" onSubmit={handleQuickSubmit}>
            <div className="search-input-wrapper" ref={dropdownRef}>
              <Search className="search-icon" size={20} />
              
              <div 
                className="custom-dropdown-trigger" 
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Select state"
              >
                <span className="selected-state-text">{searchState || 'Select your state...'}</span>
                <ChevronDown size={18} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
              </div>

              {isOpen && (
                <div className="custom-dropdown-menu">
                  <div className="dropdown-search-header">
                    <input
                      type="text"
                      placeholder="Type state name..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="dropdown-search-input"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="dropdown-options-list" role="listbox">
                    {filteredStates.length > 0 ? (
                      filteredStates.map(st => (
                        <div
                          key={st}
                          className={`dropdown-option-item ${st === searchState ? 'selected' : ''}`}
                          onClick={() => handleSelectState(st)}
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
              )}
            </div>
            
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>

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
