import React, { useState } from 'react';
import type { Scheme } from '../types/scheme';
import type { User } from '../utils/auth';
import { INDIA_STATES, INDIA_CROPS } from '../data/schemes';
import { PlusCircle, Database, CheckCircle, ShieldCheck, Key } from 'lucide-react';

interface AdminPanelProps {
  onAddScheme: (newScheme: Scheme) => void;
  existingCount: number;
  currentUser?: User | null;
  authToken?: string | null;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddScheme, existingCount, currentUser, authToken }) => {
  const [rawText, setRawText] = useState('');
  const [title, setTitle] = useState('');
  const [shortName, setShortName] = useState('');
  const [ministry, setMinistry] = useState('');
  const [benefits, setBenefits] = useState('');
  const [appUrl, setAppUrl] = useState('https://myscheme.gov.in');
  const [categoryTag] = useState<Scheme['category_tag']>('Direct Benefit');
  
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [landMin, setLandMin] = useState<string>('');
  const [landMax, setLandMax] = useState<string>('');
  const [selectedCategories] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleStateToggle = (st: string) => {
    setSelectedStates(prev => 
      prev.includes(st) ? prev.filter(item => item !== st) : [...prev, st]
    );
  };

  const handleCropToggle = (cropSlug: string) => {
    setSelectedCrops(prev => 
      prev.includes(cropSlug) ? prev.filter(item => item !== cropSlug) : [...prev, cropSlug]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rawText) return;

    const newScheme: Scheme = {
      id: `custom-scheme-${Date.now()}`,
      title,
      short_name: shortName || title.slice(0, 20),
      ministry: ministry || 'Central & State Agriculture Dept',
      description: rawText,
      benefits: benefits || 'Financial subsidy and welfare support.',
      application_url: appUrl,
      documents_required: ['Aadhaar Card', 'Land Ownership Record / Passbook', 'Bank Passbook'],
      category_tag: categoryTag,
      filter_rule: {
        states: selectedStates.length > 0 ? selectedStates : undefined,
        crops: selectedCrops.length > 0 ? selectedCrops : undefined,
        land_min_ha: landMin ? parseFloat(landMin) : undefined,
        land_max_ha: landMax ? parseFloat(landMax) : undefined,
        eligible_categories: selectedCategories.length > 0 ? selectedCategories : undefined
      }
    };

    onAddScheme(newScheme);
    setSuccessMsg(`Scheme "${title}" successfully ingested into Corpus! Real-time TF-IDF vectors updated.`);
    
    setTitle('');
    setShortName('');
    setRawText('');
    setBenefits('');
    setSelectedStates([]);
    setSelectedCrops([]);
    setLandMin('');
    setLandMax('');

    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="admin-panel-container">
      {currentUser && (
        <div className="jwt-session-banner">
          <div className="session-left">
            <ShieldCheck size={18} className="jwt-icon" />
            <div>
              <span className="jwt-session-title">Verified JWT Admin Session</span>
              <span className="jwt-session-sub">Signed in as <strong>{currentUser.name}</strong> ({currentUser.email})</span>
            </div>
          </div>
          <div className="session-right">
            <span className="jwt-token-badge">
              <Key size={12} />
              Bearer Token: {authToken ? `${authToken.slice(0, 18)}...` : 'Active (HS256)'}
            </span>
          </div>
        </div>
      )}

      <div className="admin-header">
        <div className="admin-badge">
          <Database size={15} />
          <span>Admin Data Operator Console</span>
        </div>
        <h2>Paste Plain Text Scheme Ingestion</h2>
        <p>
          Paste official government scheme description text below. The system automatically creates TF-IDF unigram indices and links structured hard-filter criteria into the scheme corpus ({existingCount} schemes active).
        </p>
      </div>

      {successMsg && (
        <div className="admin-alert-success">
          <CheckCircle size={20} />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row grid-2">
          <div className="form-group">
            <label className="form-label">Scheme Full Title *</label>
            <input
              type="text"
              placeholder="e.g. Chief Minister Krishi Solar Pump Subsidy Scheme"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ministry / Department</label>
            <input
              type="text"
              placeholder="e.g. Ministry of Agriculture & Farmers Welfare"
              value={ministry}
              onChange={e => setMinistry(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Raw Scheme Description Text (TF-IDF Vector Corpus) *</label>
          <textarea
            rows={5}
            placeholder="Paste plain text scheme description from rules.myscheme.gov.in or official notification. No structured parsing required on input..."
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            className="form-control textarea-code"
            required
          />
        </div>

        <div className="admin-form-row grid-2">
          <div className="form-group">
            <label className="form-label">Key Benefit Summary</label>
            <input
              type="text"
              placeholder="e.g. ₹50,000 subsidy per hectare over 3 years"
              value={benefits}
              onChange={e => setBenefits(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Application Portal URL</label>
            <input
              type="url"
              placeholder="https://myscheme.gov.in"
              value={appUrl}
              onChange={e => setAppUrl(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="admin-rules-box">
          <h3>Structured Hard-Rule Eligibility Constraints</h3>

          <div className="rules-section">
            <label className="rules-label">Applicable States (Leave empty for All India / National):</label>
            <div className="pills-selectable-grid">
              {INDIA_STATES.slice(0, 15).map(st => (
                <button
                  type="button"
                  key={st}
                  className={`pill-toggle ${selectedStates.includes(st) ? 'selected' : ''}`}
                  onClick={() => handleStateToggle(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="rules-section">
            <label className="rules-label">Target Crops (Leave empty for All Crops):</label>
            <div className="pills-selectable-grid">
              {INDIA_CROPS.map(c => (
                <button
                  type="button"
                  key={c.slug}
                  className={`pill-toggle ${selectedCrops.includes(c.slug) ? 'selected' : ''}`}
                  onClick={() => handleCropToggle(c.slug)}
                >
                  {c.slug}
                </button>
              ))}
            </div>
          </div>

          <div className="rules-section grid-2">
            <div className="form-group">
              <label className="rules-label">Min Land Size (ha):</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 0.5 (Leave blank if no min)"
                value={landMin}
                onChange={e => setLandMin(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="rules-label">Max Land Size (ha):</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 2.0 (Leave blank if no max)"
                value={landMax}
                onChange={e => setLandMax(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-admin-submit">
          <PlusCircle size={18} />
          <span>Persist Scheme & Re-Index TF-IDF Corpus</span>
        </button>
      </form>
    </div>
  );
};
