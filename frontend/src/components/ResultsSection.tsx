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
            <div className="empty-state">
              <XCircle size={48} className="empty-icon" />
              <h3>No Eligible Schemes Found for Exact Filter Rules</h3>
              <p>Try adjusting your land holding size or state in the profile calculator above.</p>
            </div>
          ) : (
            <>
              <div className="schemes-grid">
                {displayedMatched.map((res) => (
                  <SchemeCard 
                    key={res.scheme.id} 
                    result={res} 
                    onViewDetails={onViewDetails} 
                  />
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
