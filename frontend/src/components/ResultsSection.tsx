import React, { useState, useMemo, useEffect } from 'react';
import type { MatchResult, FarmerProfile } from '../types/scheme';
import { SchemeCard } from './SchemeCard';
import {
  CheckCircle, XCircle, ChevronDown, Info,
  Coins, ShieldCheck, CreditCard, Tractor, Droplets,
  Sprout, Sun, Wrench, Sparkles, ArrowLeft, ArrowRight,
  User, Edit3, ChevronRight, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedStateName } from '../i18n/stateTranslations';
import { getLocalizedCategory, getLocalizedCategoryDesc } from '../i18n/categoryTranslations';

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
              <span>{resT.profileModalTitle || 'Farmer Profile'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── FARMER PROFILE VIEW/EDIT MODAL ───────────────────────── */}
      {isProfileModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsProfileModalOpen(false)}>
          <div className="profile-modal-panel" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="profile-modal-header">
              <div className="profile-modal-header-left">
                <div className="profile-modal-avatar">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="profile-modal-title">{resT.profileModalTitle || 'Farmer Profile'}</h3>
                  <p className="profile-modal-subtitle">{resT.profileModalSubtitle || 'Active parameters for scheme matching'}</p>
                </div>
              </div>
              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setIsProfileModalOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Fields grid */}
            <div className="profile-modal-fields">
              <div className="profile-field-row">
                <span className="profile-field-label">{resT.stateLabel || 'State'}</span>
                <span className="profile-field-value">{localizedState || (language === 'hi' ? 'समस्त भारत' : 'All India')}</span>
              </div>
              <div className="profile-field-row">
                <span className="profile-field-label">{resT.districtLabel || 'District'}</span>
                <span className="profile-field-value">{profile.district || (language === 'hi' ? 'निर्दिष्ट नहीं' : 'Not specified')}</span>
              </div>
              <div className="profile-field-row">
                <span className="profile-field-label">{resT.landSizeLabel || 'Land Size'}</span>
                <span className="profile-field-value profile-field-value--accent">
                  {profile.land_size_ha || 0}&thinsp;
                  {profile.unit === 'acre' ? (language === 'hi' ? 'एकड़' : 'acres') : profile.unit === 'bigha' ? (language === 'hi' ? 'बीघा' : 'bigha') : (language === 'hi' ? 'हेक्टेयर' : 'ha')}
                </span>
              </div>
              <div className="profile-field-row">
                <span className="profile-field-label">{resT.cropLabel || 'Primary Crop'}</span>
                <span className="profile-field-value">{(profile.crop || (language === 'hi' ? 'सभी फसलें' : 'All crops')).toUpperCase()}</span>
              </div>
              <div className="profile-field-row">
                <span className="profile-field-label">{resT.categoryLabel || 'Social Category'}</span>
                <span className="profile-field-value">{profile.category || 'General'}</span>
              </div>
              <div className="profile-field-row" style={{ borderBottom: 'none' }}>
                <span className="profile-field-label">{resT.waterSourceLabel || 'Water Source'}</span>
                <span className="profile-field-value">{profile.irrigation_type || 'Rainfed / Canal'}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="profile-modal-footer">
              <button
                type="button"
                className="profile-modal-btn-close"
                onClick={() => setIsProfileModalOpen(false)}
              >
                {resT.closeBtn || 'Close'}
              </button>
              {onAdjustProfile && (
                <button
                  type="button"
                  className="profile-modal-btn-edit"
                  onClick={() => { setIsProfileModalOpen(false); onAdjustProfile(); }}
                >
                  <Edit3 size={14} />
                  <span>{resT.editProfileBtn || 'Edit Profile'}</span>
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
                <Sprout size={40} style={{ color: 'var(--brand-green)' }} />
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
                <h3>{activeTab === 'matched' ? (resT.selectCategoryToViewMatched || 'Select a Scheme Category to View Eligible Schemes') : (resT.selectCategoryToViewExcluded || 'Select a Scheme Category to View Excluded Schemes')}</h3>
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
                  <div className="hub-card-title-count-row">
                    <h4 className="hub-card-title-text">{resT.allCategories || 'All Categories'}</h4>
                    <span className="hub-card-count-badge">
                      {currentTabList.length} {language === 'hi' ? 'योजनाएं' : 'Schemes'}
                    </span>
                  </div>
                  <p className="hub-card-desc-text">
                    {language === 'hi' 
                      ? `सभी कृषि श्रेणियों में उपलब्ध कुल ${currentTabList.length} ${activeTab === 'matched' ? 'पात्र' : 'अपात्र'} योजनाएं देखें।`
                      : `Browse all ${currentTabList.length} ${activeTab === 'matched' ? 'eligible' : 'excluded'} schemes across all agricultural categories.`}
                  </p>

                  <div className="hub-card-action-btn">
                    <span>{resT.viewAllSchemesBtn || 'View All Schemes'}</span>
                    <ArrowRight size={16} />
                  </div>
                </button>

                {/* Per-Category Hub Cards */}
                {availableCategories.map(catTag => {
                  const meta = getCategoryMeta(catTag);
                  const count = currentCategoryMap[catTag]?.length || 0;
                  const localizedDesc = getLocalizedCategoryDesc(catTag, language) || meta.description;

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
                      <div className="hub-card-title-count-row">
                        <h4 className="hub-card-title-text">
                          {getLocalizedCategory(catTag, language)}
                        </h4>
                        <span className="hub-card-count-badge">
                          {count} {language === 'hi' ? 'योजनाएं' : (count === 1 ? 'Scheme' : 'Schemes')}
                        </span>
                      </div>
                      <p className="hub-card-desc-text">{localizedDesc}</p>

                      <div className="hub-card-action-btn">
                        <span>{resT.exploreCategoryPrefix || 'Explore'} {getLocalizedCategory(catTag, language)}</span>
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
                <span>{resT.backToCategoriesBtn || 'Back to Categories'}</span>
              </button>

              <div className="category-header-title-wrap">
                <h3 className="category-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedCategory === 'All'
                    ? (resT.allCategories || 'All Categories')
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

