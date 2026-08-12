import React from 'react';
import type { MatchResult } from '../types/scheme';
import { CheckCircle2, XCircle, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { getCategoryTint } from './BrowseSchemes';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedCategory } from '../i18n/categoryTranslations';
import { cleanBenefitsText } from '../utils/formatBenefits';

import { formatLocalizedExclusionReason } from '../i18n/docTranslations';

interface SchemeCardProps {
  result: MatchResult;
  onViewDetails: (result: MatchResult) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ result, onViewDetails }) => {
  const { language, t } = useLanguage();
  const resT = t.results || {};
  const { scheme, passed_filter, exclusion_reasons, tfidf_similarity, matched_keywords, missing_keywords } = result;
  const tint = getCategoryTint(scheme.category_tag);

  const matchPercent = passed_filter
    ? Math.round(75 + tfidf_similarity * 25)
    : Math.round(tfidf_similarity * 60);

  return (
    <div className={`scheme-card tactile-card ${passed_filter ? 'card-matched' : 'card-excluded'}`}>
      <div className="card-top-header">
        <div className="category-and-ministry">
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
          <span className="ministry-name">{scheme.ministry}</span>
        </div>

        <div className="score-badge-wrapper">
          {passed_filter ? (
            <div className="badge-match-success">
              <CheckCircle2 size={15} />
              <span>{matchPercent}% {resT.matchScore || 'Match'}</span>
            </div>
          ) : (
            <div className="badge-match-excluded">
              <XCircle size={15} />
              <span>{resT.exclusionReason || 'Excluded'}</span>
            </div>
          )}
        </div>
      </div>

      <h3 className="scheme-title">{scheme.title}</h3>

      <p className="scheme-desc">{scheme.description}</p>

      <div className="benefits-box">
        <span className="benefits-label">{t.browse?.keyBenefit || 'Key Benefit'}</span>
        <p className="benefits-text">{cleanBenefitsText(scheme.benefits)}</p>
      </div>

      {!passed_filter && exclusion_reasons.length > 0 && (
        <div className="exclusion-reasons-block">
          <div className="exclusion-header">
            <AlertTriangle size={14} />
            <span>{resT.whyExcluded || 'Why Excluded (Hard Rule Criteria Failed):'}</span>
          </div>
          <div className="reason-chips-list">
            {exclusion_reasons.map((reason, i) => (
              <span key={i} className="chip-reason">
                {formatLocalizedExclusionReason(reason, language)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="keywords-section">
        {matched_keywords.length > 0 && (
          <div className="keyword-group">
            <span className="keyword-label matched-label">{resT.profileKeywordsMatched || 'Profile Keywords Matched:'}</span>
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
            <span className="keyword-label missing-label">{resT.additionalKeywords || 'Additional Scheme Keywords:'}</span>
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
          <span className="score-label">{resT.relevance || 'Relevance:'}</span>
          <span className="score-val bold">{matchPercent}%</span>
        </div>

        <button 
          className="btn-view-scheme"
          onClick={() => onViewDetails(result)}
          aria-label={`View details and apply for ${scheme.title}`}
        >
          <span>{resT.viewDetailsApply || 'View Details & Apply'}</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};
