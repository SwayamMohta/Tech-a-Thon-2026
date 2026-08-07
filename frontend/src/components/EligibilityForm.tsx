import React, { useState } from 'react';
import type { FarmerProfile } from '../types/scheme';
import { INDIA_STATES, INDIA_CROPS, SOCIAL_CATEGORIES } from '../data/schemes';
import { MapPin, Sprout, Users, Ruler, Sparkles, RefreshCw } from 'lucide-react';
import { SunBurst, WheatDoodle } from './DoodleAccents';

interface EligibilityFormProps {
  initialProfile: FarmerProfile;
  onSubmit: (profile: FarmerProfile) => void;
  isCalculating: boolean;
}

export const EligibilityForm: React.FC<EligibilityFormProps> = ({
  initialProfile,
  onSubmit,
  isCalculating
}) => {
  const [profile, setProfile] = useState<FarmerProfile>(initialProfile);

  const handleChange = (field: keyof FarmerProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const handleReset = () => {
    const defaultProf: FarmerProfile = {
      state: 'Maharashtra',
      land_size_ha: 1.5,
      crop: 'wheat',
      category: 'General',
      unit: 'ha'
    };
    setProfile(defaultProf);
    onSubmit(defaultProf);
  };

  return (
    <div className="eligibility-form-wrapper tactile-card" id="eligibility-form-section" style={{ position: 'relative' }}>
      <SunBurst className="animate-float" style={{ position: 'absolute', top: '-15px', right: '15px' }} />
      <WheatDoodle className="animate-float-reverse" style={{ position: 'absolute', bottom: '15px', left: '15px', opacity: 0.3 }} />

      <div className="form-header">
        <div className="form-badge animate-pop">
          <Sparkles size={14} />
          <span>Quick Scheme Matcher</span>
        </div>
        <h2 className="form-title">Tell Us About Your Farm</h2>
        <p className="form-subtitle">
          Enter your location, land size, and crops below. We'll search 45+ central and state agricultural subsidies to find exactly what you qualify for.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="eligibility-form-grid">
        {/* Field 1: State Dropdown */}
        <div className="form-group staggered-card-entry" style={{ '--card-index': 1 } as React.CSSProperties}>
          <label htmlFor="state-select" className="form-label">
            <MapPin size={16} className="input-icon" />
            Where is your farm located?
          </label>
          <select
            id="state-select"
            value={profile.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="form-control"
            aria-describedby="state-hint"
            required
          >
            {INDIA_STATES.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
          <span id="state-hint" className="field-hint">Matches state-level welfare programs</span>
        </div>

        {/* Field 2: Land Holding Size */}
        <div className="form-group staggered-card-entry" style={{ '--card-index': 2 } as React.CSSProperties}>
          <div className="label-with-toggle">
            <label htmlFor="land-size-input" className="form-label">
              <Ruler size={16} className="input-icon" />
              Total Land Holding Size
            </label>
            <div className="unit-toggle">
              <button
                type="button"
                className={`unit-btn ${profile.unit === 'ha' ? 'active' : ''}`}
                onClick={() => handleChange('unit', 'ha')}
                aria-label="Set unit to Hectares"
              >
                Hectares (ha)
              </button>
              <button
                type="button"
                className={`unit-btn ${profile.unit === 'acre' ? 'active' : ''}`}
                onClick={() => handleChange('unit', 'acre')}
                aria-label="Set unit to Acres"
              >
                Acres
              </button>
            </div>
          </div>
          <div className="input-with-suffix">
            <input
              id="land-size-input"
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              value={profile.land_size_ha}
              onChange={(e) => handleChange('land_size_ha', parseFloat(e.target.value) || 0)}
              className="form-control"
              aria-describedby="land-hint"
              required
            />
            <span className="input-suffix-badge">
              {profile.unit === 'acre' ? 'Acres' : 'ha'}
            </span>
          </div>
          <span id="land-hint" className="field-hint">
            {profile.unit === 'acre' 
              ? `≈ ${(profile.land_size_ha * 0.404686).toFixed(2)} Hectares (Small farmer <= 2 ha)`
              : profile.land_size_ha <= 2.0 ? 'Small & Marginal Farmer category' : 'Medium & Large Farmer category'
            }
          </span>
        </div>

        {/* Field 3: Crop Dropdown */}
        <div className="form-group staggered-card-entry" style={{ '--card-index': 3 } as React.CSSProperties}>
          <label htmlFor="crop-select" className="form-label">
            <Sprout size={16} className="input-icon" />
            What is your main crop?
          </label>
          <select
            id="crop-select"
            value={profile.crop}
            onChange={(e) => handleChange('crop', e.target.value)}
            className="form-control"
            aria-describedby="crop-hint"
            required
          >
            {INDIA_CROPS.map(c => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
          <span id="crop-hint" className="field-hint">Used for crop insurance & seed subsidies</span>
        </div>

        {/* Field 4: Social Category */}
        <div className="form-group staggered-card-entry" style={{ '--card-index': 4 } as React.CSSProperties}>
          <label htmlFor="category-select" className="form-label">
            <Users size={16} className="input-icon" />
            Social Category
          </label>
          <select
            id="category-select"
            value={profile.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="form-control"
            aria-describedby="category-hint"
            required
          >
            {SOCIAL_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <span id="category-hint" className="field-hint">Ensures specialized category reservation benefits</span>
        </div>

        {/* Action Buttons */}
        <div className="form-actions-full">
          <button type="submit" className="btn-primary-calculate tactile-card" disabled={isCalculating}>
            {isCalculating ? (
              <span className="loading-spinner-span">Searching 45+ Govt Schemes...</span>
            ) : (
              <>
                <Sparkles size={18} />
                Match Eligible Schemes
              </>
            )}
          </button>

          <button type="button" className="btn-secondary-reset" onClick={handleReset}>
            <RefreshCw size={16} />
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};
