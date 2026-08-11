import React, { useState, useMemo, useEffect } from 'react';
import type { MatchResult, FarmerProfile } from '../types/scheme';
import { SchemeCard } from './SchemeCard';
import {
  CheckCircle, XCircle, ChevronDown, Info,
  Coins, ShieldCheck, CreditCard, Tractor, Droplets,
  Sprout, Sun, Wrench, Sparkles, LayoutGrid, ArrowLeft, ArrowRight,
  User, Edit3, ChevronRight, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedStateName } from '../i18n/stateTranslations';
import { getLocalizedCategory } from '../i18n/categoryTranslations';

interface ResultsSectionProps {
  results: MatchResult[];
  profile: FarmerProfile;
  onViewDetails: (result: MatchResult) => void;
  onAdjustProfile?: () => void;
  onBrowseAll?: () => void;
}

interface CategoryMeta {
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const CATEGORY_DEFS: Record<string, CategoryMeta> = {
  'Direct Benefit': {
    icon: Coins,
    color: '#15803D',
    bgColor: '#F0FDF4',
    borderColor: '#DCFCE7',
    description: 'Direct cash transfers & income support deposited straight to farmer bank accounts.'
  },
  'Crop Insurance': {
    icon: ShieldCheck,
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    description: 'Financial protection against crop failure, drought, flood, pests & post-harvest loss.'
  },
  'Insurance': {
    icon: ShieldCheck,
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    description: 'Financial protection against crop failure, drought, flood, pests & post-harvest loss.'
  },
  'Credit & Loan': {
    icon: CreditCard,
    color: '#7E22CE',
    bgColor: '#FAF5FF',
    borderColor: '#F3E8FF',
    description: 'Kisan Credit Cards (KCC), low-interest loans, collateral-free credit & interest subvention.'
  },
  'Input Subsidy': {
    icon: Tractor,
    color: '#B45309',
    bgColor: '#FFFBEB',
    borderColor: '#FEF3C7',
    description: 'Subsidies for certified seeds, fertilizers, farm machinery & equipment purchasing.'
  },
  'Infrastructure': {
    icon: Droplets,
    color: '#0369A1',
    bgColor: '#F0F9FF',
    borderColor: '#E0F2FE',
    description: 'Grants for cold chains, warehouses, post-harvest processing & farm gate infrastructure.'
  },
  'Organic & Tech': {
    icon: Sprout,
    color: '#047857',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    description: 'Support for certified organic farming, bio-inputs, drones & precision agritech.'
  },
  'Irrigation': {
    icon: Sun,
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#FDE68A',
    description: 'Subsidies for drip/sprinkler micro-irrigation systems & PM-KUSUM solar water pumps.'
  },
  'Irrigation & Solar': {
    icon: Sun,
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#FDE68A',
    description: 'Subsidies for drip/sprinkler micro-irrigation systems & PM-KUSUM solar water pumps.'
  },
  'Equipment Subsidy': {
    icon: Wrench,
    color: '#475569',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    description: 'Financial aid for buying modern tractors, power tillers, rotavators & implements.'
  },
  'Climate Resilience': {
    icon: Sprout,
    color: '#15803D',
    bgColor: '#F0FDF4',
    borderColor: '#DCFCE7',
    description: 'Climate-resilient crop varieties, soil health conservation & watershed management.'
  }
};

function getCategoryMeta(tag: string): CategoryMeta {
  return CATEGORY_DEFS[tag] || {
    icon: Sparkles,
    color: '#334155',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    description: 'Government agricultural schemes and farmer welfare programs.'
  };
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  profile,
  onViewDetails,
  onAdjustProfile,
  onBrowseAll
}) => {
  const { language, t } = useLanguage();
  const resT = t.results || {};
  const [activeTab, setActiveTab] = useState<'matched' | 'excluded'>('matched');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const matchedList = useMemo(() => results.filter(r => r.passed_filter), [results]);
  const excludedList = useMemo(() => results.filter(r => !r.passed_filter), [results]);

  useEffect(() => {
    if (matchedList.length > 0) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }, [results, matchedList.length]);

  const localizedState = getLocalizedStateName(profile.state, language) || profile.state;

  // Group matched schemes by category
  const matchedByCategory = useMemo(() => {
    const map: Record<string, MatchResult[]> = {};
    matchedList.forEach(item => {
      const cat = item.scheme.category_tag || 'Other';
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return map;
  }, [matchedList]);

  // Group excluded schemes by category
  const excludedByCategory = useMemo(() => {
    const map: Record<string, MatchResult[]> = {};
    excludedList.forEach(item => {
      const cat = item.scheme.category_tag || 'Other';
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return map;
  }, [excludedList]);

  const currentCategoryMap = activeTab === 'matched' ? matchedByCategory : excludedByCategory;
  const availableCategories = useMemo(() => Object.keys(currentCategoryMap), [currentCategoryMap]);

  const [visibleCount, setVisibleCount] = useState(12);

  const currentTabList = activeTab === 'matched' ? matchedList : excludedList;

  const filteredList = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') return currentTabList;
    return currentTabList.filter(item => (item.scheme.category_tag || 'Other') === selectedCategory);
  }, [currentTabList, selectedCategory]);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeTab, selectedCategory]);

  const handleTabSwitch = (tab: 'matched' | 'excluded') => {
    setActiveTab(tab);
    setSelectedCategory(null);
  };

  return (
    <section className="results-section" id="results-section">
      {/* ── Results Header ────────────────────────────────────────── */}
      <div className="results-header" style={{ borderBottom: 'none', marginBottom: '16px', paddingBottom: 0 }}>
        <div className="results-title-group" style={{ width: '100%' }}>
          <div className="results-title-row">
            <h2>{resT.matchingSchemesTitle || 'Eligible Schemes & Subsidies Matched'}</h2>
            <button
              type="button"
              className="btn-profile-inline"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <User size={15} />
              <span>Farmer Profile</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── FARMER PROFILE VIEW/EDIT MODAL ───────────────────────── */}
      {isProfileModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsProfileModalOpen(false)}>
          <div className="modal-content profile-summary-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-with-icon" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={22} className="modal-title-icon" style={{ color: '#16A34A' }} />
                <div>
                  <h3 className="modal-title" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Farmer Profile Details</h3>
                  <p className="modal-subtitle" style={{ margin: 0, fontSize: '0.84rem', color: '#64748B' }}>Your active parameters for scheme matching</p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsProfileModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body profile-details-grid" style={{ marginTop: '16px' }}>
              <div className="profile-detail-card">
                <span className="detail-label">State</span>
                <strong className="detail-value">{localizedState || 'All India'}</strong>
              </div>
              <div className="profile-detail-card">
                <span className="detail-label">District</span>
                <strong className="detail-value">{profile.district || 'Not Specified'}</strong>
              </div>
              <div className="profile-detail-card">
                <span className="detail-label">Land Size</span>
                <strong className="detail-value">{profile.land_size_ha || 0} {profile.unit || 'ha'}</strong>
              </div>
              <div className="profile-detail-card">
                <span className="detail-label">Primary Crop</span>
                <strong className="detail-value">{(profile.crop || 'All Crops').toUpperCase()}</strong>
              </div>
              <div className="profile-detail-card">
                <span className="detail-label">Category</span>
                <strong className="detail-value">{profile.category || 'General'}</strong>
              </div>
              <div className="profile-detail-card">
                <span className="detail-label">Water Source</span>
                <strong className="detail-value">{profile.irrigation_type || 'Rainfed / Canal / Default'}</strong>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                className="btn-wizard-back"
                onClick={() => setIsProfileModalOpen(false)}
              >
                <span>Close</span>
              </button>
              {onAdjustProfile && (
                <button
                  type="button"
                  className="btn-wizard-next"
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    onAdjustProfile();
                  }}
                >
                  <Edit3 size={15} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── EXCLUDED TAB INTRO BANNER ────────────────────────────── */}
      {activeTab === 'excluded' && (
        <div className="excluded-intro-banner">
          <p>
            <Info size={16} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '6px', color: '#16a34a' }} />
            <strong>{resT.transparencyTitle || 'Transparency Guarantee:'}</strong> {resT.transparencyDesc || 'These schemes failed one or more hard eligibility rules.'}
          </p>
        </div>
      )}

      {/* ── STEP 1: CATEGORY HUB SELECTION VIEW (When selectedCategory === null) ── */}
      {selectedCategory === null ? (
        <div className="tab-content">
          {currentTabList.length === 0 ? (
            <div className="not-found-card animate-mascot" style={{ margin: '30px auto' }}>
              <div className="not-found-mascot">
                <span style={{ fontSize: '2.5rem' }}>🌱</span>
              </div>
              <span className="not-found-badge">0 Matches</span>
              <h3 className="not-found-title">{resT.noMatchesTitle || 'No Schemes Found'}</h3>
              <p className="not-found-desc">
                {resT.noMatchesDesc || 'Try adjusting your farmer profile to discover available schemes!'}
              </p>
              {onAdjustProfile && (
                <button type="button" className="not-found-btn" onClick={onAdjustProfile}>
                  {resT.adjustProfile || 'Adjust Farmer Profile'}
                </button>
              )}
            </div>
          ) : (
            <div className="results-category-hub-wrapper">
              <div className="results-category-hub-header">
                <h3>Select a Scheme Category to View {activeTab === 'matched' ? 'Eligible' : 'Excluded'} Schemes</h3>
                <div className="tab-switcher">
                  <button
                    className={`tab-btn ${activeTab === 'matched' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('matched')}
                  >
                    <CheckCircle size={16} />
                    <span>{resT.eligibleOnly || 'Eligible Schemes'} ({matchedList.length})</span>
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'excluded' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('excluded')}
                  >
                    <XCircle size={16} />
                    <span>{resT.exclusionReason || 'Why Excluded'} ({excludedList.length})</span>
                  </button>
                </div>
              </div>

              <div className="results-category-hub-grid">
                {/* "All Categories" Hub Card */}
                <button
                  type="button"
                  className="results-category-hub-card"
                  onClick={() => setSelectedCategory('All')}
                  style={{
                    '--hub-card-bg': '#F8FAFC',
                    '--hub-card-color': '#0F172A',
                    '--hub-card-border': '#E2E8F0'
                  } as React.CSSProperties}
                >
                  <div className="hub-card-top-row">
                    <div className="hub-card-icon-box">
                      <LayoutGrid size={22} />
                    </div>
                    <span className="hub-card-count-badge">
                      {currentTabList.length} Schemes
                    </span>
                  </div>

                  <h4 className="hub-card-title-text">All Categories</h4>
                  <p className="hub-card-desc-text">
                    Browse all {currentTabList.length} {activeTab === 'matched' ? 'eligible' : 'excluded'} schemes across all agricultural categories.
                  </p>

                  <div className="hub-card-action-btn">
                    <span>View All Schemes</span>
                    <ArrowRight size={16} />
                  </div>
                </button>

                {/* Per-Category Hub Cards */}
                {availableCategories.map(catTag => {
                  const meta = getCategoryMeta(catTag);
                  const IconComp = meta.icon;
                  const count = currentCategoryMap[catTag]?.length || 0;

                  return (
                    <button
                      key={catTag}
                      type="button"
                      className="results-category-hub-card"
                      onClick={() => setSelectedCategory(catTag)}
                      style={{
                        '--hub-card-bg': meta.bgColor,
                        '--hub-card-color': meta.color,
                        '--hub-card-border': meta.borderColor
                      } as React.CSSProperties}
                    >
                      <div className="hub-card-top-row">
                        <div className="hub-card-icon-box">
                          <IconComp size={22} />
                        </div>
                        <span className="hub-card-count-badge">
                          {count} {count === 1 ? 'Scheme' : 'Schemes'}
                        </span>
                      </div>

                      <h4 className="hub-card-title-text">
                        {getLocalizedCategory(catTag, language)}
                      </h4>
                      <p className="hub-card-desc-text">{meta.description}</p>

                      <div className="hub-card-action-btn">
                        <span>Explore {getLocalizedCategory(catTag, language)}</span>
                        <ArrowRight size={16} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── STEP 2: DETAILED SCHEMES VIEW FOR CHOSEN CATEGORY ── */
        <div className="tab-content">
          {/* Active Category Header Bar & Back to Categories Button */}
          <div className="active-category-header-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-back-to-hub"
                onClick={() => setSelectedCategory(null)}
              >
                <ArrowLeft size={16} />
                <span>Back to Categories</span>
              </button>

              <div className="category-header-title-wrap">
                <h3 className="category-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedCategory === 'All'
                    ? 'All Categories'
                    : getLocalizedCategory(selectedCategory, language)}
                </h3>
              </div>
            </div>

            <div className="tab-switcher">
              <button
                className={`tab-btn ${activeTab === 'matched' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('matched')}
              >
                <CheckCircle size={16} />
                <span>{resT.eligibleOnly || 'Eligible Schemes'} ({matchedList.length})</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'excluded' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('excluded')}
              >
                <XCircle size={16} />
                <span>{resT.exclusionReason || 'Why Excluded'} ({excludedList.length})</span>
              </button>
            </div>
          </div>

          {/* Schemes Grid */}
          {filteredList.length === 0 ? (
            <div className="not-found-card" style={{ margin: '30px auto' }}>
              <h3 className="not-found-title">No Schemes in this Category</h3>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="not-found-btn"
                  onClick={() => setSelectedCategory(null)}
                >
                  Choose Another Category
                </button>
                {onBrowseAll && (
                  <button
                    type="button"
                    className="not-found-btn"
                    style={{ background: 'var(--color-surface)', color: 'var(--color-primary-dark)', border: '1px solid var(--color-border-subtle)' }}
                    onClick={onBrowseAll}
                  >
                    Browse All Schemes
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="schemes-grid">
                {filteredList.slice(0, visibleCount).map((res, index) => (
                  <div
                    key={res.scheme.id}
                    className="staggered-card-entry"
                    style={{ '--card-index': index % 12 } as React.CSSProperties}
                  >
                    <SchemeCard
                      result={res}
                      onViewDetails={onViewDetails}
                    />
                  </div>
                ))}
              </div>

              {filteredList.length > visibleCount && (
                <div className="category-show-more-wrapper" style={{ marginTop: '32px' }}>
                  <button
                    type="button"
                    className="category-show-more-btn"
                    onClick={() => setVisibleCount(prev => prev + 12)}
                  >
                    <span>Show More Schemes (Showing {visibleCount} of {filteredList.length})</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

