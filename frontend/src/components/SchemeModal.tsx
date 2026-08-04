import React, { useEffect } from 'react';
import type { MatchResult } from '../types/scheme';
import { X, ExternalLink, FileText, CheckCircle2, AlertCircle, Building2, Tag } from 'lucide-react';

interface SchemeModalProps {
  result: MatchResult | null;
  onClose: () => void;
}

export const SchemeModal: React.FC<SchemeModalProps> = ({
  result,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (result) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [result, onClose]);

  if (!result) return null;

  const { scheme, passed_filter, exclusion_reasons, tfidf_similarity, final_score, matched_keywords, missing_keywords } = result;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-card" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={scheme.title}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">{scheme.category_tag}</span>
            <h2>{scheme.title}</h2>
            <div className="ministry-sub">
              <Building2 size={15} />
              <span>{scheme.ministry}</span>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className={`modal-status-banner ${passed_filter ? 'banner-passed' : 'banner-failed'}`}>
            <div className="banner-left">
              {passed_filter ? (
                <>
                  <CheckCircle2 size={24} className="banner-icon-success" />
                  <div>
                    <h4>Profile Eligible for Scheme</h4>
                    <p>Hard-rule filters passed. TF-IDF Cosine Similarity: {(tfidf_similarity * 100).toFixed(1)}%</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle size={24} className="banner-icon-fail" />
                  <div>
                    <h4>Profile Excluded from Scheme</h4>
                    <p>Failed {exclusion_reasons.length} hard filter rule(s).</p>
                  </div>
                </>
              )}
            </div>
            <div className="banner-score">
              <span className="score-num">{final_score.toFixed(2)}</span>
              <span className="score-tag">Final Score</span>
            </div>
          </div>

          {!passed_filter && exclusion_reasons.length > 0 && (
            <div className="modal-exclusion-box">
              <h4>Reason for Exclusion:</h4>
              <ul>
                {exclusion_reasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-section">
            <h3>Scheme Description & Guidelines</h3>
            <p className="modal-desc-text">{scheme.description}</p>
          </div>

          <div className="modal-section benefits-highlight-card">
            <h3>Financial Benefit & Subsidy Package</h3>
            <p>{scheme.benefits}</p>
          </div>

          <div className="modal-section">
            <h3>Required Document Checklist</h3>
            <div className="doc-checklist-grid">
              {scheme.documents_required.map((doc, idx) => (
                <div key={idx} className="doc-item">
                  <FileText size={16} className="doc-icon" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Relevance Keyword Analysis</h3>
            <div className="kw-analysis-grid">
              <div className="kw-col kw-matched">
                <h4>
                  <CheckCircle2 size={14} />
                  Matched Profile Keywords
                </h4>
                <div className="kw-chips">
                  {matched_keywords.length > 0 ? (
                    matched_keywords.map(kw => (
                      <span key={kw} className="chip chip-matched-lg">#{kw}</span>
                    ))
                  ) : (
                    <span className="no-kw">No direct keyword overlap</span>
                  )}
                </div>
              </div>

              <div className="kw-col kw-missing">
                <h4>
                  <Tag size={14} />
                  Top Scheme Feature Keywords
                </h4>
                <div className="kw-chips">
                  {missing_keywords.map(kw => (
                    <span key={kw} className="chip chip-missing-lg">{kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-secondary" onClick={onClose}>
            Close
          </button>
          <a
            href={scheme.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-primary-apply"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};
