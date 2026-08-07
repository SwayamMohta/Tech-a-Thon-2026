import React from 'react';
import type { MatchResult } from '../types/scheme';
import { CheckCircle2, XCircle, ArrowUpRight, Award, AlertTriangle } from 'lucide-react';

interface SchemeCardProps {
  result: MatchResult;
  onViewDetails: (result: MatchResult) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ result, onViewDetails }) => {
  const { scheme, passed_filter, exclusion_reasons, tfidf_similarity, final_score, matched_keywords, missing_keywords } = result;

  const matchPercent = passed_filter
    ? Math.round(75 + tfidf_similarity * 25)
    : Math.round(tfidf_similarity * 60);

  return (
    <div className={`scheme-card tactile-card ${passed_filter ? 'card-matched' : 'card-excluded'}`}>
      <div className="card-top-header">
        <div className="category-and-ministry">
          <span className="category-badge">{scheme.category_tag}</span>
          <span className="ministry-name">{scheme.ministry}</span>
        </div>

        <div className="score-badge-wrapper">
          {passed_filter ? (
            <div className="badge-match-success">
              <CheckCircle2 size={15} />
              <span>{matchPercent}% Match</span>
            </div>
          ) : (
            <div className="badge-match-excluded">
              <XCircle size={15} />
              <span>Excluded</span>
            </div>
          )}
        </div>
      </div>

      <h3 className="scheme-title">{scheme.title}</h3>

      <p className="scheme-desc">{scheme.description}</p>

      <div className="benefits-box">
        <Award size={16} className="benefits-icon" />
        <span className="benefits-text"><strong>Key Benefit:</strong> {scheme.benefits}</span>
      </div>

      {!passed_filter && exclusion_reasons.length > 0 && (
        <div className="exclusion-reasons-block">
          <div className="exclusion-header">
            <AlertTriangle size={14} />
            <span>Why Excluded (Hard Rule Criteria Failed):</span>
          </div>
          <div className="reason-chips-list">
            {exclusion_reasons.map((reason, i) => (
              <span key={i} className="chip-reason">
                {reason}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="keywords-section">
        {matched_keywords.length > 0 && (
          <div className="keyword-group">
            <span className="keyword-label matched-label">Profile Keywords Matched:</span>
            <div className="chips-container">
              {matched_keywords.map(kw => (
                <span key={kw} className="chip-matched">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {passed_filter && missing_keywords.length > 0 && (
          <div className="keyword-group">
            <span className="keyword-label missing-label">Additional Scheme Keywords:</span>
            <div className="chips-container">
              {missing_keywords.map(kw => (
                <span key={kw} className="chip-missing">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="score-detail">
          <span className="score-label">TF-IDF Sim:</span>
          <span className="score-val">{(tfidf_similarity * 100).toFixed(1)}%</span>
          <span className="score-divider">|</span>
          <span className="score-label">Final Score:</span>
          <span className="score-val bold">{final_score.toFixed(2)}</span>
        </div>

        <button 
          className="btn-view-scheme"
          onClick={() => onViewDetails(result)}
          aria-label={`View details and apply for ${scheme.title}`}
        >
          <span>View Details & Apply</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};
