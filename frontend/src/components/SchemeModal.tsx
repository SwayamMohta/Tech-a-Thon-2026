import React, { useEffect } from 'react';
import type { MatchResult } from '../types/scheme';
import { X, ExternalLink, FileText, CheckCircle2, XCircle, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedCategory } from '../i18n/categoryTranslations';
import { getLocalizedDocument, formatLocalizedExclusionReason } from '../i18n/docTranslations';

interface SchemeModalProps {
  result: MatchResult | null;
  onClose: () => void;
}

export const SchemeModal: React.FC<SchemeModalProps> = ({ result, onClose }) => {
  const { language, t } = useLanguage();
  const modalT = t.modal || {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (result) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [result, onClose]);

  if (!result) return null;

  const { scheme, passed_filter, exclusion_reasons, tfidf_similarity, matched_keywords, missing_keywords } = result;
  const matchPct = passed_filter ? Math.round(75 + tfidf_similarity * 25) : Math.round(tfidf_similarity * 60);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={scheme.title}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-header-meta">
              <span className="modal-category">{getLocalizedCategory(scheme.category_tag, language)}</span>
              <span className={`modal-eligibility-pill ${passed_filter ? 'pill-eligible' : 'pill-excluded'}`}>
                {passed_filter
                  ? <><CheckCircle2 size={13} /> {matchPct}% {(modalT as Record<string, string>).matchScore || 'match'}</>
                  : <><XCircle size={13} /> {modalT.profileExcluded || 'Not eligible'}</>}
              </span>
            </div>
            <h2>{scheme.title}</h2>
            <div className="ministry-sub">
              <Building2 size={14} />
              <span>{scheme.ministry}</span>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">

          {/* Exclusion reasons — only when failed */}
          {!passed_filter && exclusion_reasons.length > 0 && (
            <div className="modal-exclusion-box">
              <p className="exclusion-box-label">{modalT.reasonForExclusion || 'Why excluded'}</p>
              <ul className="exclusion-list">
                {exclusion_reasons.map((reason, idx) => (
                  <li key={idx}>{formatLocalizedExclusionReason(reason, language)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="modal-section">
            <h3>{modalT.descriptionAndGuidelines || 'About this scheme'}</h3>
            <p className="modal-desc-text">{scheme.description}</p>
          </div>

          {/* Benefits */}
          <div className="modal-section">
            <h3>{modalT.financialBenefit || 'What you get'}</h3>
            <p className="modal-benefits-text">{scheme.benefits}</p>
          </div>

          {/* Documents */}
          {scheme.documents_required.length > 0 && (
            <div className="modal-section">
              <h3>{modalT.documentChecklist || 'Documents needed'}</h3>
              <ul className="modal-doc-list">
                {scheme.documents_required.map((doc, idx) => (
                  <li key={idx} className="modal-doc-item">
                    <FileText size={14} className="doc-icon" />
                    <span>{getLocalizedDocument(doc, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords */}
          {(matched_keywords.length > 0 || missing_keywords.length > 0) && (
            <div className="modal-section">
              <h3>{modalT.keywordAnalysis || 'Relevance signals'}</h3>
              <div className="modal-kw-section">
                {matched_keywords.length > 0 && (
                  <div className="modal-kw-group">
                    <span className="kw-group-label kw-label-matched">{modalT.matchedKeywords || 'Matched'}</span>
                    <div className="kw-chips">
                      {matched_keywords.map(kw => (
                        <span key={kw} className="chip chip-matched-lg">#{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
                {missing_keywords.length > 0 && (
                  <div className="modal-kw-group">
                    <span className="kw-group-label kw-label-scheme">{modalT.schemeKeywords || 'Scheme features'}</span>
                    <div className="kw-chips">
                      {missing_keywords.map(kw => (
                        <span key={kw} className="chip chip-missing-lg">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="modal-footer">
          <button className="btn-modal-secondary" onClick={onClose}>
            {modalT.close || 'Close'}
          </button>
          <a
            href={scheme.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-primary-apply"
          >
            <span>{modalT.applyOfficial || 'Apply on official portal'}</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

