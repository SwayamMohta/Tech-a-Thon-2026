import type { Scheme, FarmerProfile, HardFilterResult, MatchResult } from '../types/scheme';

const ACRE_TO_HECTARE = 0.404686;
const BIGHA_TO_HECTARE = 0.25;

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "cannot", "could",
  "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have",
  "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is",
  "it", "its", "itself", "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only",
  "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some",
  "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this",
  "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what", "when", "where",
  "which", "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves",
  "scheme", "schemes", "farmer", "farmers", "india", "government", "state", "central", "support", "provided"
]);

export function getLandSizeHa(profile: FarmerProfile): number {
  const size = profile.land_size_ha || 0;
  if (profile.unit === 'acre') return size * ACRE_TO_HECTARE;
  if (profile.unit === 'bigha') return size * BIGHA_TO_HECTARE;
  return size;
}

export function checkHardFilter(scheme: Scheme, profile: FarmerProfile): HardFilterResult {
  const rule = scheme.filter_rule || {};
  const reasons: string[] = [];

  // 1. State check
  if (rule.states && rule.states.length > 0) {
    const matchedState = rule.states.some(s => s.toLowerCase() === (profile.state || '').toLowerCase());
    if (!matchedState) {
      reasons.push(`Wrong state — you selected ${profile.state}, but this scheme applies to ${rule.states.join(', ')} only.`);
    }
  }

  // 2. Crop check
  if (rule.crops && rule.crops.length > 0) {
    const profileCrop = (profile.crop || '').toLowerCase().trim();
    const matchedCrop = rule.crops.some(c => c.toLowerCase().trim() === profileCrop);
    if (!matchedCrop) {
      reasons.push(`Crop mismatch — you listed ${profile.crop}, but scheme is targeted for ${rule.crops.join(', ')}.`);
    }
  }

  // 3. Land size bounds check
  const landHa = getLandSizeHa(profile);
  if (rule.land_min_ha !== undefined && landHa < rule.land_min_ha) {
    reasons.push(`Land size below minimum limit of ${rule.land_min_ha} ha (you have ${landHa.toFixed(2)} ha).`);
  }
  if (rule.land_max_ha !== undefined && landHa > rule.land_max_ha) {
    const acreVal = (landHa / ACRE_TO_HECTARE).toFixed(2);
    reasons.push(`Land size exceeds maximum limit of ${rule.land_max_ha} ha (you have ${landHa.toFixed(2)} ha / ${acreVal} acres).`);
  }

  // 4. Category check
  if (rule.eligible_categories && rule.eligible_categories.length > 0) {
    const matchedCat = rule.eligible_categories.some(c => c.toLowerCase() === (profile.category || '').toLowerCase());
    if (!matchedCat) {
      reasons.push(`Category mismatch — your category is ${profile.category}, but scheme eligible categories are ${rule.eligible_categories.join(', ')}.`);
    }
  }

  return { passed: reasons.length === 0, reasons };
}

function tokenize(text: string): string[] {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  return cleaned.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

export function matchAllClient(schemes: Scheme[], profile: FarmerProfile): MatchResult[] {
  const profileTokens = new Set(tokenize([
    profile.state,
    profile.district,
    profile.crop,
    profile.category,
    profile.irrigation_type,
    profile.farming_type,
    profile.ownership_status,
    profile.special_category
  ].filter(Boolean).join(' ')));

  return schemes.map(scheme => {
    const hardRes = checkHardFilter(scheme, profile);
    const docTokens = tokenize(`${scheme.title} ${scheme.description} ${scheme.benefits} ${scheme.category_tag}`);
    
    // Term Frequency Map
    const tfMap = new Map<string, number>();
    docTokens.forEach(t => tfMap.set(t, (tfMap.get(t) || 0) + 1));

    const sortedTerms = Array.from(tfMap.entries()).sort((a, b) => b[1] - a[1]).map(e => e[0]);
    const matched = sortedTerms.filter(t => profileTokens.has(t));
    const missing = sortedTerms.filter(t => !profileTokens.has(t)).slice(0, 4);

    let tfidfSim = 0.05;
    if (profileTokens.size > 0) {
      const overlapCount = matched.length;
      tfidfSim = Math.min(1.0, 0.05 + (overlapCount * 0.15) + (matched.length / Math.max(1, profileTokens.size)) * 0.35);
    }

    const finalScore = hardRes.passed ? 1.0 + tfidfSim : tfidfSim;

    return {
      scheme,
      passed_filter: hardRes.passed,
      exclusion_reasons: hardRes.reasons,
      tfidf_similarity: tfidfSim,
      final_score: finalScore,
      matched_keywords: matched.slice(0, 6),
      missing_keywords: missing
    };
  }).sort((a, b) => b.final_score - a.final_score);
}
