import React, { useState } from 'react';
import type { MatchResult, FarmerProfile } from '../types/scheme';
import { SchemeCard } from './SchemeCard';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultsSectionProps {
  results: MatchResult[];
  profile: FarmerProfile;
  onViewDetails: (result: MatchResult) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  profile,
  onViewDetails
}) => {
  const [activeTab, setActiveTab] = useState<'matched' | 'excluded'>('matched');
  const [showAllMatched, setShowAllMatched] = useState(false);

  const matchedList = results.filter(r => r.passed_filter);
  const excludedList = results.filter(r => !r.passed_filter);

  React.useEffect(() => {
    if (matchedList.length > 0) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }, [results, matchedList.length]);

  const displayedMatched = showAllMatched ? matchedList : matchedList.slice(0, 10);

  return (
    <section className="results-section" id="results-section">
      <div className="results-header">
        <div className="results-title-group">
          <h2>Scheme Matching Results</h2>
          <p className="results-meta">
            Ranked for profile: <strong>{profile.state}</strong> • <strong>{profile.land_size_ha} {profile.unit || 'ha'}</strong> • <strong>{profile.crop.toUpperCase()}</strong> • <strong>{profile.category}</strong>
          </p>
        </div>

        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === 'matched' ? 'active' : ''}`}
            onClick={() => setActiveTab('matched')}
          >
            <CheckCircle size={16} />
            <span>Eligible Schemes ({matchedList.length})</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'excluded' ? 'active' : ''}`}
            onClick={() => setActiveTab('excluded')}
          >
            <XCircle size={16} />
            <span>Excluded ({excludedList.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'matched' && (
        <div className="tab-content">
          {matchedList.length === 0 ? (
            <div className="not-found-card animate-mascot" style={{ margin: '30px auto' }}>
              <div className="not-found-mascot">
                <span style={{ fontSize: '2.5rem' }}>🌱</span>
              </div>
              <span className="not-found-badge">0 Direct Matches</span>
              <h3 className="not-found-title">No Exact Matches Found Yet</h3>
              <p className="not-found-desc">
                No schemes matched your exact criteria for <strong>{profile.state}</strong> with <strong>{profile.land_size_ha} {profile.unit || 'ha'}</strong>. Try switching state or setting land size to 2 ha to explore national schemes!
              </p>
              <button
                type="button"
                className="not-found-btn"
                onClick={() => {
                  const el = document.getElementById('eligibility-form-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Adjust Farmer Profile
              </button>
            </div>
          ) : (
            <>
              <div className="schemes-grid">
                {displayedMatched.map((res, index) => (
                  <div
                    key={res.scheme.id}
                    className="staggered-card-entry"
                    style={{ '--card-index': index } as React.CSSProperties}
                  >
                    <SchemeCard 
                      result={res} 
                      onViewDetails={onViewDetails} 
                    />
                  </div>
                ))}
              </div>

              {matchedList.length > 10 && (
                <div className="show-more-wrapper">
                  <button 
                    className="btn-show-more"
                    onClick={() => setShowAllMatched(!showAllMatched)}
                  >
                    {showAllMatched ? (
                      <>
                        <span>Show Top 10 Only</span>
                        <ChevronUp size={18} />
                      </>
                    ) : (
                      <>
                        <span>Show All ({matchedList.length}) Schemes</span>
                        <ChevronDown size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'excluded' && (
        <div className="tab-content">
          <div className="excluded-intro-banner">
            <p>
              <Info size={16} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '6px', color: '#16a34a' }} />
              <strong>Transparency Guarantee:</strong> These schemes failed one or more hard eligibility rules (state, crop, land size, or category). They are ranked by TF-IDF similarity so you can see schemes you almost qualify for.
            </p>
          </div>

          <div className="schemes-grid">
            {excludedList.map((res) => (
              <SchemeCard 
                key={res.scheme.id} 
                result={res} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
