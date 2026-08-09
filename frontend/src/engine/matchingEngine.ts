import type { Scheme, FarmerProfile, HardFilterResult, MatchResult } from '../types/scheme';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could',
  'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is',
  'it', 'its', 'itself', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only',
  'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some',
  'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves',
  'scheme', 'schemes', 'farmer', 'farmers', 'india', 'government', 'state', 'central', 'support', 'provided'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

export function profileToQuery(profile: FarmerProfile): string {
  const parts = [
    profile.state,
    profile.district,
    profile.crop,
    profile.category,
    profile.irrigation_type,
    profile.farming_type,
    profile.ownership_status,
    profile.special_category
  ];
  return parts.filter(Boolean).join(' ').toLowerCase();
}

export function checkHardFilter(scheme: Scheme, profile: FarmerProfile): HardFilterResult {
  const reasons: string[] = [];
  const rule = scheme.filter_rule;

  // 1. State check
  if (rule.states && rule.states.length > 0) {
    const matchedState = rule.states.some(s => s.toLowerCase() === profile.state.toLowerCase());
    if (!matchedState) {
      reasons.push(`Wrong state — you selected ${profile.state}, but this scheme applies to ${rule.states.join(', ')} only.`);
    }
  }

  // 2. Crop check
  if (rule.crops && rule.crops.length > 0) {
    const profileCrop = profile.crop.toLowerCase().trim();
    const matchedCrop = rule.crops.some(c => c.toLowerCase().trim() === profileCrop);
    if (!matchedCrop) {
      reasons.push(`Crop mismatch — you listed ${profile.crop}, but scheme is targeted for ${rule.crops.join(', ')}.`);
    }
  }

  // 3. Land size check
  const landHa = profile.unit === 'acre' ? profile.land_size_ha * 0.404686 : profile.land_size_ha;
  if (landHa !== undefined && landHa !== null) {
    if (rule.land_min_ha !== undefined && landHa < rule.land_min_ha) {
      reasons.push(`Land size below minimum limit of ${rule.land_min_ha} ha (you have ${landHa.toFixed(2)} ha).`);
    }
    if (rule.land_max_ha !== undefined && landHa > rule.land_max_ha) {
      reasons.push(`Land size exceeds maximum limit of ${rule.land_max_ha} ha (you have ${landHa.toFixed(2)} ha / ${(landHa / 0.404686).toFixed(2)} acres).`);
    }
  } else {
    reasons.push(`Land size not provided.`);
  }

  // 4. Category check
  if (rule.eligible_categories && rule.eligible_categories.length > 0) {
    const matchedCat = rule.eligible_categories.some(c => c.toLowerCase() === profile.category.toLowerCase());
    if (!matchedCat) {
      reasons.push(`Category mismatch — your category is ${profile.category}, but scheme eligible categories are ${rule.eligible_categories.join(', ')}.`);
    }
  }

  return {
    passed: reasons.length === 0,
    reasons
  };
}

export function runMatchingEngine(schemes: Scheme[], profile: FarmerProfile): MatchResult[] {
  const queryStr = profileToQuery(profile);
  const queryTokens = tokenize(queryStr);

  // Build document corpus (all scheme descriptions + query string)
  const docsTokens = schemes.map(s => tokenize(`${s.title} ${s.description} ${s.benefits} ${s.category_tag}`));
  docsTokens.push(queryTokens);

  // Build vocabulary
  const vocabMap = new Map<string, number>();
  docsTokens.forEach(tokens => {
    tokens.forEach(token => {
      if (!vocabMap.has(token)) {
        vocabMap.set(token, vocabMap.size);
      }
    });
  });

  const vocabSize = vocabMap.size;
  const numDocs = docsTokens.length;

  // Calculate Document Frequency (DF)
  const df = new Array(vocabSize).fill(0);
  docsTokens.forEach(tokens => {
    const uniqueInDoc = new Set(tokens);
    uniqueInDoc.forEach(token => {
      const idx = vocabMap.get(token)!;
      df[idx]++;
    });
  });

  // Calculate IDF
  const idf = df.map(count => Math.log((numDocs + 1) / (count + 1)) + 1);

  // Calculate TF-IDF vectors and L2 normalize
  const tfidfVectors = docsTokens.map(tokens => {
    const tf = new Array(vocabSize).fill(0);
    tokens.forEach(t => {
      const idx = vocabMap.get(t)!;
      tf[idx]++;
    });

    let normSq = 0;
    const tfidf = tf.map((count, idx) => {
      const val = count * idf[idx];
      normSq += val * val;
      return val;
    });

    const norm = Math.sqrt(normSq) || 1;
    return tfidf.map(val => val / norm);
  });

  const queryVec = tfidfVectors[numDocs - 1];

  // Match each scheme
  const results: MatchResult[] = schemes.map((scheme, index) => {
    const schemeVec = tfidfVectors[index];
    
    // Cosine similarity
    let cosineSim = 0;
    for (let i = 0; i < vocabSize; i++) {
      cosineSim += schemeVec[i] * queryVec[i];
    }
    
    // Clamp [0, 1]
    const similarity = Math.max(0.0, Math.min(1.0, cosineSim));

    // Hard Filter check
    const filterResult = checkHardFilter(scheme, profile);

    // Final score
    const finalScore = (filterResult.passed ? 1.0 : 0.0) + similarity;

    // Keyword extraction
    const termWeights: { term: string; weight: number }[] = [];
    vocabMap.forEach((idx, term) => {
      if (schemeVec[idx] > 0) {
        termWeights.push({ term, weight: schemeVec[idx] });
      }
    });

    termWeights.sort((a, b) => b.weight - a.weight);

    const queryTokenSet = new Set(queryTokens);
    const topTerms = termWeights.slice(0, 8).map(tw => tw.term);

    const matched_keywords = topTerms.filter(t => queryTokenSet.has(t));
    const missing_keywords = topTerms.filter(t => !queryTokenSet.has(t)).slice(0, 4);

    return {
      scheme,
      passed_filter: filterResult.passed,
      exclusion_reasons: filterResult.reasons,
      tfidf_similarity: similarity,
      final_score: finalScore,
      matched_keywords,
      missing_keywords
    };
  });

  // Sort by final_score descending
  results.sort((a, b) => b.final_score - a.final_score);

  return results;
}
