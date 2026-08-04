import React from 'react';
import { Cpu, ShieldCheck, Binary, Calculator, CheckCircle2 } from 'lucide-react';

export const EngineExplainer: React.FC = () => {
  return (
    <div className="explainer-container">
      <div className="explainer-header">
        <div className="explainer-badge">
          <Cpu size={16} />
          <span>Algorithmic Architecture</span>
        </div>
        <h2>TF-IDF + Hard-Filter Matching Engine</h2>
        <p>
          Designed specifically to deliver zero-hallucination, 100% deterministic ranking for Indian government schemes without heavy LLM latency or opaque embeddings.
        </p>
      </div>

      <div className="explainer-grid">
        <div className="explainer-card">
          <div className="step-num">01</div>
          <div className="card-icon-wrap">
            <Binary size={24} />
          </div>
          <h3>Profile Query Vectorization</h3>
          <p>
            The farmer profile is converted into a concatenated string slug of state, crop, and social category tokens:
          </p>
          <div className="code-snippet-box">
            <code>query = &quot;maharashtra wheat general&quot;</code>
          </div>
          <span className="explainer-note">
            Note: Land size is kept out of TF-IDF vocabulary to avoid fragmenting term weights across numeric ranges.
          </span>
        </div>

        <div className="explainer-card">
          <div className="step-num">02</div>
          <div className="card-icon-wrap">
            <ShieldCheck size={24} />
          </div>
          <h3>Hard-Filter Rule Layer</h3>
          <p>
            Runs 4 strict boolean checks before ranking:
          </p>
          <ul className="explainer-list">
            <li><CheckCircle2 size={14} /> State membership (National vs State-specific)</li>
            <li><CheckCircle2 size={14} /> Crop membership (Wheat, Paddy, Sugarcane)</li>
            <li><CheckCircle2 size={14} /> Land-size min/max bounds (&le; 2.0 ha)</li>
            <li><CheckCircle2 size={14} /> Category eligibility (SC/ST/OBC)</li>
          </ul>
        </div>

        <div className="explainer-card">
          <div className="step-num">03</div>
          <div className="card-icon-wrap">
            <Calculator size={24} />
          </div>
          <h3>TF-IDF Cosine Similarity</h3>
          <p>
            Computes L2-normalized Term Frequency & Inverse Document Frequency vectors over all scheme descriptions:
          </p>
          <div className="code-snippet-box">
            <code>sim = dot(V_scheme, V_query) ∈ [0, 1]</code>
          </div>
          <span className="explainer-note">
            Extracts top 5 TF-IDF terms per scheme to show matched vs missing feature chips in UI.
          </span>
        </div>
      </div>

      <div className="formula-banner">
        <h3>Additive Score Formula:</h3>
        <div className="formula-equation">
          <code>Final Score = (passed_filter ? 1.0 : 0.0) + TF-IDF_Similarity</code>
        </div>
        <p>
          Ensures any scheme passing hard eligibility rules always ranks above excluded schemes (score floor = 1.0), while excluded schemes remain visible with human-readable reason chips.
        </p>
      </div>
    </div>
  );
};
