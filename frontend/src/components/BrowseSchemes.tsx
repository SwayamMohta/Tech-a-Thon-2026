import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Scheme, MatchResult, FarmerProfile } from '../types/scheme';
import { INDIA_STATES } from '../data/schemes';
import {
  Search, Filter, Sparkles, Award, ArrowRight, ArrowUpRight,
  RotateCcw, Banknote, ShieldCheck, CreditCard, Leaf, Package, Building2, LayoutGrid
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BrowseSchemesProps {
  schemes: Scheme[];
  results: MatchResult[];
  farmerProfile?: FarmerProfile;
  initialStateFilter?: string;
  onViewDetails: (result: MatchResult) => void;
  onCheckEligibility: () => void;
}

const CATEGORY_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'All': { icon: <LayoutGrid size={13} />, color: '#0F172A', bg: '#F1F5F9' },
  'Direct Benefit': { icon: <Banknote size={13} />, color: '#15803D', bg: '#DCFCE7' },
  'Crop Insurance': { icon: <ShieldCheck size={13} />, color: '#1D4ED8', bg: '#DBEAFE' },
  'Credit & Loan': { icon: <CreditCard size={13} />, color: '#7C3AED', bg: '#EDE9FE' },
  'Organic & Tech': { icon: <Leaf size={13} />, color: '#047857', bg: '#D1FAE5' },
  'Input Subsidy': { icon: <Package size={13} />, color: '#B45309', bg: '#FEF3C7' },
  'Infrastructure': { icon: <Building2 size={13} />, color: '#0369A1', bg: '#E0F2FE' },
};

const CATEGORY_RAIL: Record<string, string> = {
  'Direct Benefit': '#16A34A',
  'Crop Insurance': '#3B82F6',
  'Credit & Loan': '#8B5CF6',
  'Organic & Tech': '#10B981',
  'Input Subsidy': '#F59E0B',
  'Infrastructure': '#0EA5E9',
};

function getCategoryMeta(cat: string) {
  return CATEGORY_META[cat] ?? { icon: <LayoutGrid size={13} />, color: '#334155', bg: '#F1F5F9' };
}
function getCategoryRail(cat: string) {
  return CATEGORY_RAIL[cat] ?? '#94A3B8';
}

export const BrowseSchemes: React.FC<BrowseSchemesProps> = ({
  schemes,
  results,
  farmerProfile,
  initialStateFilter = '',
  onViewDetails,
  onCheckEligibility
}) => {
  const { t } = useLanguage();
  const browseT = t.browse || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState(initialStateFilter);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search on / or Cmd+K
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
      if (selectedCategory !== 'All' && scheme.category_tag !== selectedCategory) return false;

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

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCategory('All');
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

  const hasActiveFilters = searchTerm || selectedState || selectedCategory !== 'All';

  return (
    <div className="page-section-container browse-schemes-page">

      {/* ── Compact Hero Banner Card ─────────────────────────────── */}
      <div className="browse-hero-header-compact">
        {/* Decorative Wheat & Rupee SVG */}
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
          </div>

          <button
            type="button"
            className="browse-hero-cta"
            onClick={onCheckEligibility}
          >
            <span>{farmerProfile ? (t.nav?.checkEligibility || 'Check Eligibility') : (t.nav?.checkEligibility || 'Check Eligibility')}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Sleek Integrated Command Search Dock ─────────────────── */}
      <div className="browse-search-dock">
        {/* Primary Search & State Bar */}
        <div className="search-dock-main">
          <Search size={18} className="dock-search-icon" />
          <input
            id="scheme-search-input"
            ref={searchRef}
            type="text"
            className="dock-search-input"
            placeholder={browseT.searchPlaceholder || 'Search schemes by name, keyword, crop, or ministry…'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm ? (
            <button
              type="button"
              className="dock-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
              aria-label="Clear search"
            >×</button>
          ) : (
            <span className="dock-kbd-badge" title="Press / to focus">/</span>
          )}

          <div className="dock-divider" aria-hidden="true" />

          {/* Inline State Picker */}
          <div className="dock-state-picker">
            <Filter size={14} className="dock-state-icon" />
            <select
              id="browse-state-select"
              className="dock-state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">{browseT.allStates || 'All States & National'}</option>
              {INDIA_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Bar & Live Results Count */}
        <div className="search-dock-sub">
          <div className="category-chips-scroll">
            {categories.map(cat => {
              const meta = getCategoryMeta(cat);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${isActive ? 'active' : ''}`}
                  style={isActive ? {
                    background: meta.bg,
                    color: meta.color,
                    borderColor: meta.color,
                  } : {}}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span className="chip-icon">{meta.icon}</span>
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="dock-stats">
            <span className="dock-count-text">
              Showing <strong>{filteredSchemes.length}</strong> of <strong>{schemes.length}</strong>
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                className="btn-reset-filters"
                onClick={handleResetFilters}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Schemes Grid ─────────────────────────────────────────── */}
      {filteredSchemes.length > 0 ? (
        <div className="schemes-grid">
          {filteredSchemes.map((scheme, index) => {
            const res = getResultForScheme(scheme);
            const railColor = getCategoryRail(scheme.category_tag);
            return (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                result={res}
                railColor={railColor}
                index={index}
                onViewDetails={onViewDetails}
                onCheckEligibility={onCheckEligibility}
              />
            );
          })}
        </div>
      ) : (
        <div className="browse-empty-state">
          <div className="browse-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 80 80" width="72" height="72">
              <circle cx="34" cy="34" r="24" fill="none" stroke="#CBD5E1" strokeWidth="3" />
              <line x1="52" y1="52" x2="68" y2="68" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="browse-empty-title">No Matching Schemes Found</h3>
          <p className="browse-empty-desc">
            {searchTerm
              ? <>No schemes match <strong>"{searchTerm}"</strong>. Try a different keyword or clear the search.</>
              : <>No schemes match your current filters. Try broadening the state or category.</>}
          </p>
          <button
            type="button"
            className="not-found-btn"
            onClick={handleResetFilters}
          >
            <RotateCcw size={15} />
            <span>Reset Filters &amp; Show All</span>
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Scheme Card sub-component ───────────────────────────────────── */
interface CardProps {
  scheme: Scheme;
  result: MatchResult;
  railColor: string;
  index: number;
  onViewDetails: (r: MatchResult) => void;
  onCheckEligibility: () => void;
}

const SchemeCard: React.FC<CardProps> = ({ scheme, result, railColor, index, onViewDetails, onCheckEligibility }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger only among the 6 that enter the viewport together
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
      style={{ '--rail-color': railColor } as React.CSSProperties}
    >
      {/* Left category rail */}
      <div className="card-rail" aria-hidden="true" />

      <div className="card-inner">
        {/* Top row */}
        <div className="card-top-header">
          <div className="category-and-ministry">
            <span className="category-badge" style={{ color: railColor }}>
              {scheme.category_tag}
            </span>
            <span className="ministry-name">{scheme.ministry}</span>
          </div>
          <span className="scheme-short-badge">{scheme.short_name || 'Govt Scheme'}</span>
        </div>

        {/* Title */}
        <h3 className="scheme-title">{scheme.title}</h3>

        {/* Description */}
        <p className="scheme-desc">{scheme.description}</p>

        {/* Key benefit */}
        <div className="benefits-box">
          <Award size={15} className="benefits-icon" />
          <span className="benefits-text">
            <strong>Key Benefit:</strong> {scheme.benefits}
          </span>
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
            <span>Check Eligibility</span>
          </button>

          <button
            type="button"
            className="btn-view-scheme"
            onClick={() => onViewDetails(result)}
            aria-label={`View details and apply for ${scheme.title}`}
          >
            <span>View Details</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
