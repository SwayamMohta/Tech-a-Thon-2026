"""TF-IDF + cosine similarity ranking. Ported term-for-term from
frontend/src/engine/matchingEngine.ts so a given (schemes, profile) pair
produces the same similarity scores and keyword chips server-side as it
does in the browser: same stopword list, same tokenizer, same raw-tf /
smoothed-idf / L2-norm weighting (which is exactly scikit-learn's
TfidfVectorizer defaults — smooth_idf=True, sublinear_tf=False, norm='l2' —
so we reuse it rather than hand-rolling the math), same top-8/top-4
keyword split.
"""
import re

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

from models import FarmerProfile, Scheme

# Exact copy of matchingEngine.ts's STOP_WORDS.
STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "cannot", "could",
    "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have",
    "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is",
    "it", "its", "itself", "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only",
    "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some",
    "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this",
    "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what", "when", "where",
    "which", "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves",
    "scheme", "schemes", "farmer", "farmers", "india", "government", "state", "central", "support", "provided",
}

_NON_ALNUM = re.compile(r"[^a-z0-9\s]")
_WHITESPACE = re.compile(r"\s+")


def tokenize(text: str) -> list[str]:
    text = _NON_ALNUM.sub(" ", text.lower())
    return [w for w in _WHITESPACE.split(text) if len(w) > 1 and w not in STOP_WORDS]


def profile_to_query(profile: FarmerProfile) -> str:
    parts = [profile.state, profile.crop, profile.category]
    return " ".join(p for p in parts if p).lower()


def _scheme_doc(scheme: Scheme) -> str:
    return f"{scheme.title} {scheme.description} {scheme.benefits} {scheme.category_tag}"


def _top_terms(row: np.ndarray, feature_names: np.ndarray, k: int) -> list[str]:
    order = np.argsort(row)[::-1]
    terms = []
    for idx in order:
        if row[idx] <= 0:
            break
        terms.append(feature_names[idx])
        if len(terms) == k:
            break
    return terms


def tfidf_rank(schemes: list[Scheme], profile: FarmerProfile):
    """Returns (similarities: list[float], matched: list[list[str]], missing: list[list[str]]),
    one entry per scheme in the input order."""
    query_str = profile_to_query(profile)
    docs = [_scheme_doc(s) for s in schemes] + [query_str]

    vectorizer = TfidfVectorizer(tokenizer=tokenize, preprocessor=lambda x: x, lowercase=False, token_pattern=None)
    matrix = vectorizer.fit_transform(docs)  # rows are L2-normalized by default
    feature_names = vectorizer.get_feature_names_out()

    query_vec = matrix[-1]
    scheme_matrix = matrix[:-1]
    sims = np.clip((scheme_matrix @ query_vec.T).toarray().ravel(), 0.0, 1.0)

    query_tokens = set(tokenize(query_str))
    dense = scheme_matrix.toarray()

    matched_all, missing_all = [], []
    for row in dense:
        top = _top_terms(row, feature_names, k=8)
        matched_all.append([t for t in top if t in query_tokens])
        missing_all.append([t for t in top if t not in query_tokens][:4])

    return sims.tolist(), matched_all, missing_all
