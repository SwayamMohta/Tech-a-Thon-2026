import React from 'react';
import { Cpu, ShieldCheck, Binary, Calculator, CheckCircle2 } from 'lucide-react';
import { SunBurst, SproutSparkle } from './DoodleAccents';

export const EngineExplainer: React.FC = () => {
  return (
    <div className="explainer-container" style={{ position: 'relative' }}>
      <SunBurst className="animate-float" style={{ position: 'absolute', top: '0', right: '10px' }} />
      <SproutSparkle className="animate-pop" style={{ position: 'absolute', top: '50px', left: '0' }} />

      <div className="explainer-header">
        <div className="explainer-badge animate-pop">
          <Cpu size={16} />
          <span>Algorithmic Transparency</span>
        </div>
        <h2>How Krishi Match Finds Your Schemes</h2>
        <p>
          We use a zero-hallucination, 100% deterministic matching engine so you get verified government aid recommendations without fake promises.
        </p>
      </div>

      <div className="explainer-grid">
        <div className="explainer-card tactile-card staggered-card-entry" style={{ '--card-index': 1 } as React.CSSProperties}>
          <div className="step-num">01</div>
          <div className="card-icon-wrap">
            <Binary size={24} />
          </div>
          <h3>Profile Vectorization</h3>
          <p>
            Your state, crop, and social category are converted into structured search terms for instant matching:
          </p>
          <div className="code-snippet-box">
            <code>query = &quot;maharashtra wheat general&quot;</code>
          </div>
          <span className="explainer-note">
            Land size is validated through hard boolean bounds to ensure high accuracy.
          </span>
        </div>

        <div className="explainer-card tactile-card staggered-card-entry" style={{ '--card-index': 2 } as React.CSSProperties}>
          <div className="step-num">02</div>
          <div className="card-icon-wrap">
            <ShieldCheck size={24} />
          </div>
          <h3>Hard-Filter Rule Layer</h3>
          <p>
            Runs 4 strict eligibility checks before ranking:
          </p>
          <ul className="explainer-list">
            <li><CheckCircle2 size={14} /> State membership (National vs State-specific)</li>
            <li><CheckCircle2 size={14} /> Crop membership (Wheat, Paddy, Sugarcane)</li>
            <li><CheckCircle2 size={14} /> Land-size min/max bounds (&le; 2.0 ha)</li>
            <li><CheckCircle2 size={14} /> Category eligibility (SC/ST/OBC)</li>
          </ul>
        </div>

        <div className="explainer-card tactile-card staggered-card-entry" style={{ '--card-index': 3 } as React.CSSProperties}>
          <div className="step-num">03</div>
          <div className="card-icon-wrap">
            <Calculator size={24} />
          </div>
          <h3>TF-IDF Cosine Similarity</h3>
          <p>
            Ranks scheme relevance using term-frequency matching against official ministry guidelines:
          </p>
          <div className="code-snippet-box">
            <code>sim = dot(V_scheme, V_query) ∈ [0, 1]</code>
          </div>
          <span className="explainer-note">
            Extracts top 5 keywords per scheme to show matched vs missing benefits in UI chips.
          </span>
        </div>
      </div>

      <div className="formula-banner tactile-card">
        <h3>Additive Score Formula:</h3>
        <div className="formula-equation">
          <code>Final Score = (passed_filter ? 1.0 : 0.0) + TF-IDF_Similarity</code>
        </div>
        <p>
          Ensures any scheme passing hard eligibility rules always ranks above excluded schemes, while almost-eligible schemes remain visible with transparent explanation chips.
        </p>
      </div>
    </div>
  );
};
