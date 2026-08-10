import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Scheme, MatchResult, FarmerProfile } from '../types/scheme';
import { INDIA_STATES } from '../data/schemes';
import {
  Search, Filter, Sparkles, ArrowRight, ArrowUpRight, ArrowLeft,
  RotateCcw, LayoutGrid, ChevronDown, Coins, ShieldCheck,
  CreditCard, Tractor, Droplets, Sprout
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedStateName } from '../i18n/stateTranslations';
import { getLocalizedCategory } from '../i18n/categoryTranslations';
import { cleanBenefitsText } from '../utils/formatBenefits';

interface BrowseSchemesProps {
  schemes: Scheme[];
  results: MatchResult[];
  farmerProfile?: FarmerProfile;
  initialStateFilter?: string;
  onViewDetails: (result: MatchResult) => void;
  onCheckEligibility: () => void;
}

const CATEGORY_TINTS: Record<string, { bg: string; text: string; border: string }> = {
  'Direct Benefit': { bg: '#F0FDF4', text: '#15803D', border: '#DCFCE7' },
  'Crop Insurance': { bg: '#EFF6FF', text: '#1D4ED8', border: '#DBEAFE' },
  'Credit & Loan': { bg: '#FAF5FF', text: '#7E22CE', border: '#F3E8FF' },
  'Organic & Tech': { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
  'Input Subsidy': { bg: '#FFFBEB', text: '#B45309', border: '#FEF3C7' },
  'Infrastructure': { bg: '#F0F9FF', text: '#0369A1', border: '#E0F2FE' },
};

export function getCategoryTint(cat: string) {
  return CATEGORY_TINTS[cat] ?? { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' };
}

interface CategoryHubCardDef {
  id: string;
  tag: string;
  tagKey: string;
  titleKey: string;
  descKey: string;
  imageUrl: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const CATEGORY_HUB_DEFS: CategoryHubCardDef[] = [
  {
    id: 'dbt',
    tag: 'Direct Benefit',
    tagKey: 'dbtTag',
    titleKey: 'dbtTitle',
    descKey: 'dbtDesc',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    icon: Coins,
    color: '#15803D',
    bgColor: '#F0FDF4',
    borderColor: '#DCFCE7',
  },
  {
    id: 'insurance',
    tag: 'Crop Insurance',
    tagKey: 'insuranceTag',
    titleKey: 'insuranceTitle',
    descKey: 'insuranceDesc',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  {
    id: 'loans',
    tag: 'Credit & Loan',
    tagKey: 'loansTag',
    titleKey: 'loansTitle',
    descKey: 'loansDesc',
    imageUrl: 'https://images.unsplash.com/photo-1595009503377-e3be116106b6?auto=format&fit=crop&w=800&q=80',
    icon: CreditCard,
    color: '#7E22CE',
    bgColor: '#FAF5FF',
    borderColor: '#F3E8FF',
  },
  {
    id: 'inputs',
    tag: 'Input Subsidy',
    tagKey: 'inputsTag',
    titleKey: 'inputsTitle',
    descKey: 'inputsDesc',
    imageUrl: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&q=80',
    icon: Tractor,
    color: '#B45309',
    bgColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  {
    id: 'infrastructure',
    tag: 'Infrastructure',
    tagKey: 'infrastructureTag',
    titleKey: 'infrastructureTitle',
    descKey: 'infrastructureDesc',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    icon: Droplets,
    color: '#0369A1',
    bgColor: '#F0F9FF',
    borderColor: '#E0F2FE',
  },
  {
    id: 'organic',
    tag: 'Organic & Tech',
    tagKey: 'organicTag',
    titleKey: 'organicTitle',
    descKey: 'organicDesc',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    icon: Sprout,
    color: '#047857',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  {
    id: 'all',
    tag: 'All',
    tagKey: 'allTag',
    titleKey: 'allTitle',
    descKey: 'allDesc',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    icon: LayoutGrid,
    color: '#334155',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
];

const INITIAL_VISIBLE_COUNT = 12;

export const BrowseSchemes: React.FC<BrowseSchemesProps> = ({
  schemes,
  results,
  farmerProfile,
  initialStateFilter = '',
  onViewDetails,
  onCheckEligibility
}) => {
  const { language, t } = useLanguage();
  const browseT = t.browse || {};
  const catT = browseT.categories || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState(initialStateFilter);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search shortcut (/ or Cmd+K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Reset progressive count on filter change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [searchTerm, selectedState, selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    schemes.forEach(s => { if (s.category_tag) set.add(s.category_tag); });
    return ['All', ...Array.from(set)];
  }, [schemes]);

  const resultMap = useMemo(() => {
    const map = new Map<string, MatchResult>();
    results.forEach(r => map.set(r.scheme.id, r));
    return map;
  }, [results]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      // Category Filter
      if (selectedCategory && selectedCategory !== 'All' && scheme.category_tag !== selectedCategory) return false;

      // State Filter
      if (selectedState && selectedState !== 'All') {
        const stateLower = selectedState.toLowerCase();
        const titleLower = scheme.title.toLowerCase();
        const descLower = scheme.description.toLowerCase();
        if (scheme.filter_rule?.states && scheme.filter_rule.states.length > 0) {
          if (!scheme.filter_rule.states.some(st => st.toLowerCase().includes(stateLower))) return false;
        } else {
          const isNational = titleLower.includes('pm-') || titleLower.includes('pradhan mantri') ||
            titleLower.includes('kisan credit card') || descLower.includes('central sector') || descLower.includes('across india');
          if (!isNational && !titleLower.includes(stateLower) && !descLower.includes(stateLower)) return false;
        }
      }

      // Search Filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (!scheme.title.toLowerCase().includes(q) &&
          !scheme.short_name?.toLowerCase().includes(q) &&
          !scheme.ministry.toLowerCase().includes(q) &&
          !scheme.category_tag.toLowerCase().includes(q) &&
          !scheme.description.toLowerCase().includes(q) &&
          !scheme.benefits.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [schemes, selectedCategory, selectedState, searchTerm]);

  // Progressive slice
  const visibleSchemes = useMemo(() => {
    return filteredSchemes.slice(0, visibleCount);
  }, [filteredSchemes, visibleCount]);

  const hasMore = visibleCount < filteredSchemes.length;

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCategory(null);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const getResultForScheme = (scheme: Scheme): MatchResult => {
    const match = resultMap.get(scheme.id);
    if (match) return match;
    return {
      scheme,
      passed_filter: true,
      exclusion_reasons: [],
      tfidf_similarity: 0.8,
      final_score: 80,
      matched_keywords: ['government', 'subsidy'],
      missing_keywords: []
    };
  };

  const isCategorySelected = selectedCategory !== null || searchTerm.trim() !== '';

  return (
    <div className="page-section-container browse-schemes-page">

      {/* ── Compact Hero Banner Card ─────────────────────────────── */}
      <div className="browse-hero-header-compact">
        <svg className="browse-hero-deco-compact" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
          <line x1="100" y1="180" x2="100" y2="20" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
          {[40, 60, 80, 100, 120, 140].map((y, i) => (
            <g key={i}>
              <ellipse cx={i % 2 === 0 ? 88 : 112} cy={y} rx="11" ry="6" fill="#16A34A" opacity="0.18" transform={`rotate(${i % 2 === 0 ? -25 : 25} ${i % 2 === 0 ? 88 : 112} ${y})`} />
            </g>
          ))}
          <circle cx="168" cy="48" r="22" fill="#F59E0B" opacity="0.12" />
          <text x="168" y="55" textAnchor="middle" fontSize="18" fill="#D97706" opacity="0.4" fontWeight="700">₹</text>
        </svg>

        <div className="browse-hero-content-compact">
          <div className="hero-text-side">
            <h1 className="browse-title-compact">{browseT.browseTitle || 'Browse Government Schemes & Subsidies'}</h1>
            {farmerProfile?.state && (
              <p className="browse-subtitle-compact" style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
                {getLocalizedStateName(farmerProfile.state, language)} • {farmerProfile.land_size_ha} {farmerProfile.unit || 'ha'} • {farmerProfile.crop ? farmerProfile.crop.toUpperCase() : ''}
              </p>
            )}
          </div>

          <button
            type="button"
            className="browse-hero-cta"
            onClick={onCheckEligibility}
          >
            <span>{t.nav?.checkEligibility || 'Check Eligibility'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── STEP 1: CATEGORY SELECTION HUB (Shown when no category is picked yet) ── */}
      {!isCategorySelected ? (
        <div className="category-hub-section">
          <div className="category-hub-header">
            <h2>{browseT.selectCategoryBegin || 'Select a Scheme Category to Begin'}</h2>
          </div>

          <div className="category-grid-hub">
            {CATEGORY_HUB_DEFS.map(card => {
              const count = card.tag === 'All'
                ? schemes.length
                : schemes.filter(s => s.category_tag === card.tag).length;

              const title = (catT as any)[card.titleKey] || card.id;
              const desc = (catT as any)[card.descKey] || '';

              return (
                <button
                  key={card.id}
                  type="button"
                  className="category-hub-card-media"
                  onClick={() => setSelectedCategory(card.tag)}
                >
                  {/* Top Image Section */}
                  <div className="hub-card-image-wrap">
                    <img
                      src={card.imageUrl}
                      alt={title}
                      className="hub-card-img"
                      loading="lazy"
                    />
                    <div className="hub-card-image-overlay" />
                  </div>

                  {/* Bottom Content & Description */}
                  <div className="hub-card-body">
                    <div className="hub-card-title-row">
                      <span className="hub-card-title">{title}</span>
                      <span className="hub-count-chip">{count} {catT.schemesCount || 'Schemes'}</span>
                    </div>

                    <p className="hub-card-desc">{desc}</p>

                    <div
                      className="hub-card-footer"
                      style={{ color: card.color }}
                    >
                      <span>{catT.viewSchemes || 'View Schemes'}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── STEP 2: SCHEME RESULTS VIEW (Shown after selecting a category or searching) ── */
        <>
          {/* Active Category Header Banner & Back Button */}
          <div className="active-category-banner">
            <button
              type="button"
              className="btn-back-to-categories"
              onClick={() => { setSelectedCategory(null); setSearchTerm(''); }}
            >
              <ArrowLeft size={16} />
              <span>{browseT.backToCategories || 'Back to Categories'}</span>
            </button>

            <div className="active-category-title-wrap">
              <span className="active-category-heading">
                {selectedCategory === 'All' || !selectedCategory
                  ? (searchTerm ? `Search: "${searchTerm}"` : (browseT.allSchemes || 'All Schemes'))
                  : getLocalizedCategory(selectedCategory, language)}
              </span>
              <span className="active-category-count-chip">
                {filteredSchemes.length} {browseT.schemesAvailable || 'Schemes Available'}
              </span>
            </div>
          </div>

          {/* Single-Line Centered Search & Filter Toolbar */}
          <div className="browse-single-line-toolbar">
            {/* Left Section: Category & State Dropdowns */}
            <div className="toolbar-left-filters">
              <div className="dropdown-pill-sub">
                <LayoutGrid size={15} className="sub-icon" />
                <select
                  id="browse-category-select"
                  className="sub-select"
                  value={selectedCategory || 'All'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {getLocalizedCategory(cat, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dropdown-pill-sub">
                <Filter size={15} className="sub-icon" />
                <select
                  id="browse-state-select"
                  className="sub-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">{browseT.allStates || 'All States'}</option>
                  {INDIA_STATES.map(st => (
                    <option key={st} value={st}>{getLocalizedStateName(st, language)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Center Section: Primary Centered Search Bar */}
            <div className="toolbar-center-search">
              <Search size={18} className="search-focus-icon" />
              <input
                id="scheme-search-input"
                ref={searchRef}
                type="text"
                className="search-spotlight-input"
                placeholder={browseT.searchPlaceholder || 'Search schemes by keyword, crop, or ministry…'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm ? (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                  aria-label="Clear search"
                >×</button>
              ) : (
                <span className="search-kbd-badge" title="Press / to focus">/</span>
              )}
            </div>

            {/* Right Section: Metadata Counter & Reset Link */}
            <div className="toolbar-right-meta">
              <span className="subbar-counter">
                {browseT.showingSchemes || 'Showing'} <strong>{visibleSchemes.length}</strong> {browseT.of || 'of'} <strong>{filteredSchemes.length}</strong> {browseT.categories?.schemesCount?.toLowerCase() || 'schemes'}
              </span>

              {(searchTerm || selectedState || (selectedCategory && selectedCategory !== 'All')) && (
                <button
                  type="button"
                  className="subbar-reset-link"
                  onClick={handleResetFilters}
                  title="Reset filters"
                >
                  <RotateCcw size={14} />
                  <span>{browseT.resetFilters || 'Reset filters'}</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Schemes Grid ─────────────────────────────────────────── */}
          {filteredSchemes.length > 0 ? (
            <div className="schemes-progressive-container">
              <div className="schemes-grid">
                {visibleSchemes.map((scheme, index) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    result={getResultForScheme(scheme)}
                    index={index}
                    selectedCategory={selectedCategory}
                    onViewDetails={onViewDetails}
                    onCheckEligibility={onCheckEligibility}
                  />
                ))}
              </div>

              {/* Friendly Progressive Load More Button */}
              {hasMore && (
                <div className="load-more-container">
                  <button
                    type="button"
                    className="btn-load-more-schemes"
                    onClick={() => setVisibleCount(c => c + 12)}
                  >
                    <ChevronDown size={18} />
                    <span>{browseT.show12More || 'Show 12 More Schemes'}</span>
                    <span className="load-more-badge">{filteredSchemes.length - visibleCount} {browseT.remaining || 'remaining'}</span>
                  </button>

                  <p className="load-more-progress-text">
                    {browseT.displayedSchemes || 'Displayed'} {visibleCount} {browseT.of || 'of'} {filteredSchemes.length}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="browse-empty-state">
              <div className="browse-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 80 80" width="72" height="72">
                  <circle cx="34" cy="34" r="24" fill="none" stroke="#CBD5E1" strokeWidth="3" />
                  <line x1="52" y1="52" x2="68" y2="68" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="browse-empty-title">{browseT.noMatchingTitle || 'No Matching Schemes Found'}</h3>
              <p className="browse-empty-desc">
                {browseT.noMatchingDesc || 'No schemes match your current filters. Try broadening the state, crop, or category search.'}
              </p>
              <button
                type="button"
                className="not-found-btn"
                onClick={handleResetFilters}
              >
                <RotateCcw size={15} />
                <span>{browseT.resetAndShowAll || 'Reset Filters & Show All'}</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* ── Scheme Card sub-component ───────────────────────────────────── */
interface CardProps {
  scheme: Scheme;
  result: MatchResult;
  index: number;
  selectedCategory?: string | null;
  onViewDetails: (r: MatchResult) => void;
  onCheckEligibility: () => void;
}

const SchemeCard: React.FC<CardProps> = ({ scheme, result, index, selectedCategory, onViewDetails, onCheckEligibility }) => {
  const { language, t } = useLanguage();
  const browseT = t.browse || {};
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const tint = getCategoryTint(scheme.category_tag);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = (index % 6) * 55;
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`browse-scheme-card ${visible ? 'card-visible' : ''}`}
    >
      <div className="card-inner">
        {/* Top row */}
        <div className="card-top-header">
          <div className="category-and-ministry">
            {(!selectedCategory || selectedCategory === 'All') && (
              <span
                className="category-badge"
                style={{
                  backgroundColor: tint.bg,
                  color: tint.text,
                  borderColor: tint.border
                }}
              >
                {getLocalizedCategory(scheme.category_tag, language)}
              </span>
            )}
            <span className="ministry-name">{scheme.ministry}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="scheme-title">{scheme.title}</h3>

        {/* Description */}
        <p className="scheme-desc">{scheme.description}</p>

        {/* Key benefit */}
        <div className="benefits-box">
          <span className="benefits-label">{browseT.keyBenefit || 'Key Benefit'}</span>
          <p className="benefits-text">{cleanBenefitsText(scheme.benefits)}</p>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <button
            type="button"
            className="btn-quick-check-eligibility"
            onClick={onCheckEligibility}
            title="Check if your farm profile matches this scheme"
          >
            <Sparkles size={13} />
            <span>{browseT.checkEligibility || 'Check Eligibility'}</span>
          </button>

          <button
            type="button"
            className="btn-view-scheme"
            onClick={() => onViewDetails(result)}
            aria-label={`View details and apply for ${scheme.title}`}
          >
            <span>{browseT.viewDetails || 'View Details'}</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
