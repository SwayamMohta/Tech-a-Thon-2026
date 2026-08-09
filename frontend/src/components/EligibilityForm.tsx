import React, { useState } from 'react';
import type { FarmerProfile } from '../types/scheme';
import { INDIA_STATES, INDIA_CROPS, SOCIAL_CATEGORIES } from '../data/schemes';
import { 
  MapPin, Sprout, Users, Ruler, Sparkles, RefreshCw, ArrowRight, ArrowLeft, 
  Check, ShieldCheck, FileText, Phone, UserCheck, DollarSign, CloudSun, 
  Tractor, Droplets, Sun, Calendar, Tag, Shield
} from 'lucide-react';
import { SunBurst, WheatDoodle } from './DoodleAccents';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const formT = t.form || {};

  const STEPS = [
    { id: 1, label: formT.steps?.step1 || 'Location & Records', icon: MapPin },
    { id: 2, label: formT.steps?.step2 || 'Land & Water', icon: Ruler },
    { id: 3, label: formT.steps?.step3 || 'Crops & Farming', icon: Sprout },
    { id: 4, label: formT.steps?.step4 || 'Farmer Profile', icon: Users },
  ];

  const [profile, setProfile] = useState<FarmerProfile>({
    state: initialProfile.state || '',
    district: initialProfile.district || '',
    taluka: initialProfile.taluka || '',
    pincode: initialProfile.pincode || '',
    khasra_no: initialProfile.khasra_no || '',

    land_size_ha: initialProfile.land_size_ha || 0,
    unit: initialProfile.unit || 'ha',
    ownership_status: initialProfile.ownership_status || 'Owner Farmer',
    irrigation_type: initialProfile.irrigation_type || 'Canal / Borewell Irrigated',

    crop: initialProfile.crop || '',
    farming_season: initialProfile.farming_season || 'Kharif (Monsoon)',
    annual_income: initialProfile.annual_income || 'Below ₹1 Lakh',
    farming_type: initialProfile.farming_type || 'Conventional Farming',

    farmer_name: initialProfile.farmer_name || '',
    mobile_number: initialProfile.mobile_number || '',
    aadhaar_last4: initialProfile.aadhaar_last4 || '',
    gender: initialProfile.gender || 'Male',
    category: initialProfile.category || '',
    special_category: initialProfile.special_category || 'Small & Marginal Farmer'
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [shakingField, setShakingField] = useState<string | null>(null);

  // Dynamic Land Calculation (Acres / Bigha / Ha)
  const getCalculatedHectares = (): number => {
    const rawVal = profile.land_size_ha || 0;
    if (profile.unit === 'acre') {
      return parseFloat((rawVal * 0.404686).toFixed(2));
    }
    if (profile.unit === 'bigha') {
      return parseFloat((rawVal * 0.2529).toFixed(2));
    }
    return rawVal;
  };

  const calculatedHectares = getCalculatedHectares();

  const handleChange = (field: keyof FarmerProfile, value: any) => {
    setFieldErrors(prev => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const validateStepFields = (step: number): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!profile.state?.trim()) errors.state = formT.labels?.selectStatePlaceholder || 'Please select state';
      if (!profile.district?.trim()) errors.district = formT.labels?.districtPlaceholder || 'District is required';
      if (!profile.pincode?.trim() || profile.pincode.trim().length < 6) errors.pincode = formT.labels?.pincodePlaceholder || '6-digit PIN code required';
      if (!profile.khasra_no?.trim()) errors.khasra_no = formT.labels?.khasraPlaceholder || 'Land survey / Khasra number required';
    }
    if (step === 2) {
      if (!profile.land_size_ha || profile.land_size_ha <= 0) errors.land_size_ha = 'Land size must be > 0';
    }
    if (step === 3) {
      if (!profile.crop?.trim()) errors.crop = formT.labels?.selectCropPlaceholder || 'Please select crop';
    }
    if (step === 4) {
      if (!profile.category?.trim()) errors.category = formT.labels?.selectCategoryPlaceholder || 'Please select category';
    }
    return errors;
  };

  const triggerFieldShake = (errors: Record<string, string>) => {
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      setShakingField(firstKey);
      setTimeout(() => setShakingField(null), 500);
      const el = document.getElementById(`${firstKey}-select`) || document.getElementById(`${firstKey}-input`);
      if (el) el.focus();
    }
  };

  const handleNext = () => {
    const errors = validateStepFields(currentStep);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      triggerFieldShake(errors);
      return;
    }
    setFieldErrors({});
    if (currentStep < 4) {
      setSlideDirection('next');
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setFieldErrors({});
    if (currentStep > 1) {
      setSlideDirection('prev');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId === currentStep) return;
    if (stepId > currentStep) {
      for (let s = 1; s < stepId; s++) {
        const errors = validateStepFields(s);
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          triggerFieldShake(errors);
          setSlideDirection('next');
          setCurrentStep(s);
          return;
        }
      }
    }
    setFieldErrors({});
    setSlideDirection(stepId > currentStep ? 'next' : 'prev');
    setCurrentStep(stepId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (let s = 1; s <= 4; s++) {
      const errors = validateStepFields(s);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        triggerFieldShake(errors);
        setCurrentStep(s);
        return;
      }
    }
    setFieldErrors({});
    onSubmit(profile);
  };

  const handleReset = () => {
    const defaultProf: FarmerProfile = {
      state: '',
      district: '',
      taluka: '',
      pincode: '',
      khasra_no: '',
      land_size_ha: 0,
      unit: 'ha',
      ownership_status: 'Owner Farmer',
      irrigation_type: 'Canal / Borewell Irrigated',
      crop: '',
      farming_season: 'Kharif (Monsoon)',
      annual_income: 'Below ₹1 Lakh',
      farming_type: 'Conventional Farming',
      farmer_name: '',
      mobile_number: '',
      aadhaar_last4: '',
      gender: 'Male',
      category: '',
      special_category: 'Small & Marginal Farmer'
    };
    setFieldErrors({});
    setProfile(defaultProf);
    setSlideDirection('prev');
    setCurrentStep(1);
  };

  return (
    <div className="eligibility-wizard-wrapper tactile-card" id="eligibility-form-section" style={{ position: 'relative' }}>
      <SunBurst className="animate-float" style={{ position: 'absolute', top: '-15px', right: '15px', pointerEvents: 'none' }} />
      <WheatDoodle className="animate-float-reverse" style={{ position: 'absolute', bottom: '15px', left: '15px', opacity: 0.3, pointerEvents: 'none' }} />

      {/* Connected Line Stepper Bar */}
      <div className="stepper-line-container">
        <div className="stepper-track-bg" />
        <div
          className="stepper-track-fill"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        <div className="stepper-nodes-row" role="tablist" aria-label="Form progress">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <button
                key={step.id}
                type="button"
                className={`stepper-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleStepClick(step.id)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Step ${step.id}: ${step.label}`}
              >
                <div className="node-circle">
                  {isCompleted ? <Check size={16} strokeWidth={2.5} /> : <Icon size={16} />}
                </div>
                <div className="node-text">
                  <span className="node-label">{step.label}</span>
                  <span className="node-step">Step {step.id} {formT.steps?.stepOf || 'of 4'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Step Form Slider Container */}
      <form onSubmit={handleSubmit} className="wizard-form-container">
        <div key={currentStep} className={`wizard-step-slide slide-${slideDirection}`}>
          
          {/* STEP 1: Location & Records */}
          {currentStep === 1 && (
            <div className="wizard-step-content">
              <div className="form-grid-2col">
                {/* State */}
                <div className={`form-group ${fieldErrors.state ? 'input-error' : ''} ${shakingField === 'state' ? 'shake-field' : ''}`}>
                  <label htmlFor="state-select" className="form-label">
                    <MapPin size={16} className="input-icon" />
                    {formT.labels?.state || 'State / Union Territory *'}
                  </label>
                  <select
                    id="state-select"
                    value={profile.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>{formT.labels?.selectStatePlaceholder || 'Select State...'}</option>
                    {INDIA_STATES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {fieldErrors.state && <span className="inline-field-error">{fieldErrors.state}</span>}
                </div>

                {/* District */}
                <div className={`form-group ${fieldErrors.district ? 'input-error' : ''} ${shakingField === 'district' ? 'shake-field' : ''}`}>
                  <label htmlFor="district-input" className="form-label">
                    <MapPin size={16} className="input-icon" />
                    {formT.labels?.district || 'District *'}
                  </label>
                  <input
                    id="district-input"
                    type="text"
                    placeholder={formT.labels?.districtPlaceholder || 'e.g. Nashik, Ludhiana, Pune, Guntur'}
                    value={profile.district || ''}
                    onChange={(e) => handleChange('district', e.target.value)}
                    className="form-control"
                    required
                  />
                  {fieldErrors.district && <span className="inline-field-error">{fieldErrors.district}</span>}
                </div>

                {/* Taluka / Tehsil / Block */}
                <div className="form-group">
                  <label htmlFor="taluka-input" className="form-label">
                    {formT.labels?.taluka || 'Tehsil / Taluka / Block (Optional)'}
                  </label>
                  <input
                    id="taluka-input"
                    type="text"
                    placeholder={formT.labels?.talukaPlaceholder || 'e.g. Niphad, Jagraon, Haveli'}
                    value={profile.taluka || ''}
                    onChange={(e) => handleChange('taluka', e.target.value)}
                    className="form-control"
                  />
                </div>

                {/* PIN Code */}
                <div className={`form-group ${fieldErrors.pincode ? 'input-error' : ''} ${shakingField === 'pincode' ? 'shake-field' : ''}`}>
                  <label htmlFor="pincode-input" className="form-label">
                    {formT.labels?.pincode || 'PIN Code (6 Digits) *'}
                  </label>
                  <input
                    id="pincode-input"
                    type="text"
                    maxLength={6}
                    placeholder={formT.labels?.pincodePlaceholder || 'e.g. 422303'}
                    value={profile.pincode || ''}
                    onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                    className="form-control"
                    required
                  />
                  {fieldErrors.pincode && <span className="inline-field-error">{fieldErrors.pincode}</span>}
                </div>

                {/* Khasra / Survey Number */}
                <div className={`form-group full-width-col ${fieldErrors.khasra_no ? 'input-error' : ''} ${shakingField === 'khasra_no' ? 'shake-field' : ''}`}>
                  <label htmlFor="khasra-input" className="form-label">
                    <FileText size={16} className="input-icon" />
                    {formT.labels?.khasra || 'Khasra / 7-12 / Survey / Dag Number *'}
                  </label>
                  <input
                    id="khasra-input"
                    type="text"
                    placeholder={formT.labels?.khasraPlaceholder || 'e.g. Survey 108/A, Khasra 402, 7/12 Khatauni'}
                    value={profile.khasra_no || ''}
                    onChange={(e) => handleChange('khasra_no', e.target.value)}
                    className="form-control"
                    required
                  />
                  {fieldErrors.khasra_no && (
                    <span className="inline-field-error">{fieldErrors.khasra_no}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Land & Water */}
          {currentStep === 2 && (
            <div className="wizard-step-content">
              {/* Land Size Input with Live Conversion */}
              <div className={`form-group ${fieldErrors.land_size_ha ? 'input-error' : ''} ${shakingField === 'land_size_ha' ? 'shake-field' : ''}`}>
                <div className="label-with-toggle">
                  <label htmlFor="land-size-input" className="form-label">
                    <Ruler size={16} className="input-icon" />
                    {formT.labels?.landArea || 'Total Cultivated Land Area *'}
                  </label>

                  {/* Unit Selector Pills */}
                  <div className="unit-toggle" role="group" aria-label="Select land measurement unit">
                    <button
                      type="button"
                      className={`unit-btn ${profile.unit === 'ha' ? 'active' : ''}`}
                      onClick={() => handleChange('unit', 'ha')}
                    >
                      {formT.labels?.ha || 'Hectares (ha)'}
                    </button>
                    <button
                      type="button"
                      className={`unit-btn ${profile.unit === 'acre' ? 'active' : ''}`}
                      onClick={() => handleChange('unit', 'acre')}
                    >
                      {formT.labels?.acres || 'Acres'}
                    </button>
                    <button
                      type="button"
                      className={`unit-btn ${profile.unit === 'bigha' ? 'active' : ''}`}
                      onClick={() => handleChange('unit', 'bigha')}
                    >
                      {formT.labels?.bigha || 'Bigha'}
                    </button>
                  </div>
                </div>

                <div className="input-with-suffix">
                  <input
                    id="land-size-input"
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="200"
                    placeholder={profile.unit === 'bigha' ? 'e.g. 5' : profile.unit === 'acre' ? 'e.g. 3.5' : 'e.g. 1.5'}
                    value={profile.land_size_ha ? profile.land_size_ha : ''}
                    onChange={(e) => handleChange('land_size_ha', parseFloat(e.target.value) || 0)}
                    className="form-control form-control-lg"
                    required
                  />
                  <span className="input-suffix-badge">
                    {profile.unit || 'ha'}
                  </span>
                </div>

                {fieldErrors.land_size_ha ? (
                  <span className="inline-field-error">{fieldErrors.land_size_ha}</span>
                ) : (
                  <div className="unit-converter-callout">
                    {profile.land_size_ha > 0 ? (
                      <div className={`subsidy-status-badge ${calculatedHectares <= 2.0 ? 'marginal-eligible' : 'large-eligible'}`}>
                        {calculatedHectares <= 2.0 ? (
                          <>
                            <Check size={14} />
                            <span>🌾 {calculatedHectares} Ha • {formT.labels?.smallMarginalEligible || 'Qualifies for Small & Marginal Subsidy (Up to 2.0 Ha)'}</span>
                          </>
                        ) : (
                          <>
                            <Tractor size={14} />
                            <span>🌾 {calculatedHectares} Ha • {formT.labels?.largeEligible || 'Qualifies for Infrastructure Grant (> 2.0 Ha)'}</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="field-hint">
                        {formT.labels?.landHint || 'Small & Marginal farmers (under 2.0 Ha / ~4.9 Acres) get highest subsidy priority.'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Land Ownership Visual Cards (Compact Single-line) */}
              <div className="form-group">
                <label className="form-label">
                  <ShieldCheck size={16} className="input-icon" />
                  {formT.labels?.ownershipType || 'Land Ownership Type'}
                </label>
                <div className="farmer-card-grid">
                  {[
                    { id: 'Owner Farmer', title: formT.labels?.ownerFarmer || 'Owner / Self-Titled (7/12)', icon: Tractor },
                    { id: 'Tenant / Sharecropper', title: formT.labels?.tenantFarmer || 'Bataidar / Sharecropper', icon: Sprout },
                    { id: 'Leased Land', title: formT.labels?.leasedLand || 'Leased Farmland', icon: FileText },
                    { id: 'Forest / Community Land', title: formT.labels?.forestLand || 'Forest Rights (FRA) Patta', icon: MapPin }
                  ].map((item) => {
                    const CardIcon = item.icon;
                    const isSelected = profile.ownership_status === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`farmer-option-card-compact ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChange('ownership_status', item.id)}
                      >
                        <div className="compact-card-inner">
                          <CardIcon size={16} className="compact-card-icon" />
                          <span className="compact-card-title">{item.title}</span>
                          <div className="compact-radio-dot">
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Irrigation Source Visual Cards (Compact Single-line) */}
              <div className="form-group">
                <label className="form-label">
                  <CloudSun size={16} className="input-icon" />
                  {formT.labels?.waterSource || 'Primary Irrigation Source'}
                </label>
                <div className="farmer-card-grid">
                  {[
                    { id: 'Rainfed / Un-irrigated', title: formT.labels?.rainfed || 'Rainfed (Monsoon)', icon: CloudSun },
                    { id: 'Canal / Borewell Irrigated', title: formT.labels?.canal || 'Canal / Borewell', icon: Droplets },
                    { id: 'Drip / Micro-Irrigated', title: formT.labels?.drip || 'Drip / Micro-Irrigation', icon: Sprout },
                    { id: 'Solar Pumped', title: formT.labels?.solar || 'Solar Pump (KUSUM)', icon: Sun }
                  ].map((item) => {
                    const CardIcon = item.icon;
                    const isSelected = profile.irrigation_type === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`farmer-option-card-compact ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChange('irrigation_type', item.id)}
                      >
                        <div className="compact-card-inner">
                          <CardIcon size={16} className="compact-card-icon" />
                          <span className="compact-card-title">{item.title}</span>
                          <div className="compact-radio-dot">
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Crops & Farming */}
          {currentStep === 3 && (
            <div className="wizard-step-content">
              <div className="form-grid-2col">
                {/* Main Crop */}
                <div className={`form-group ${fieldErrors.crop ? 'input-error' : ''} ${shakingField === 'crop' ? 'shake-field' : ''}`}>
                  <label htmlFor="crop-select" className="form-label">
                    <Sprout size={16} className="input-icon" />
                    {formT.labels?.primaryCrop || 'Primary Cultivation Crop *'}
                  </label>
                  <select
                    id="crop-select"
                    value={profile.crop}
                    onChange={(e) => handleChange('crop', e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>{formT.labels?.selectCropPlaceholder || 'Select Crop...'}</option>
                    {INDIA_CROPS.map(c => (
                      <option key={c.slug} value={c.slug}>{c.label}</option>
                    ))}
                  </select>
                  {fieldErrors.crop && <span className="inline-field-error">{fieldErrors.crop}</span>}
                </div>

                {/* Annual Income */}
                <div className="form-group">
                  <label htmlFor="income-select" className="form-label">
                    <DollarSign size={16} className="input-icon" />
                    {formT.labels?.annualIncome || 'Annual Family Income'}
                  </label>
                  <select
                    id="income-select"
                    value={profile.annual_income || 'Below ₹1 Lakh'}
                    onChange={(e) => handleChange('annual_income', e.target.value)}
                    className="form-control"
                  >
                    <option value="Below ₹1 Lakh">{formT.labels?.incomeBelow1L || 'Below ₹1 Lakh (Highest Priority)'}</option>
                    <option value="₹1 Lakh - ₹2.5 Lakhs">{formT.labels?.income1to25L || '₹1 Lakh - ₹2.5 Lakhs'}</option>
                    <option value="₹2.5 Lakhs - ₹5 Lakhs">{formT.labels?.income25to5L || '₹2.5 Lakhs - ₹5 Lakhs'}</option>
                    <option value="Above ₹5 Lakhs">{formT.labels?.incomeAbove5L || 'Above ₹5 Lakhs'}</option>
                  </select>
                </div>
              </div>

              {/* Farming Season Visual Cards (Compact Single-line) */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} className="input-icon" />
                  {formT.labels?.farmingSeason || 'Primary Season'}
                </label>
                <div className="farmer-card-grid">
                  {[
                    { id: 'Kharif (Monsoon)', title: formT.labels?.kharif || 'Kharif (Monsoon: Jun–Oct)', icon: CloudSun },
                    { id: 'Rabi (Winter)', title: formT.labels?.rabi || 'Rabi (Winter: Nov–Apr)', icon: Sprout },
                    { id: 'Zaid (Summer)', title: formT.labels?.zaid || 'Zaid (Summer: Apr–Jun)', icon: Sun },
                    { id: 'Whole Year', title: formT.labels?.wholeYear || 'Year-Round / Perennial', icon: Calendar }
                  ].map((item) => {
                    const CardIcon = item.icon;
                    const isSelected = profile.farming_season === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`farmer-option-card-compact ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChange('farming_season', item.id)}
                      >
                        <div className="compact-card-inner">
                          <CardIcon size={16} className="compact-card-icon" />
                          <span className="compact-card-title">{item.title}</span>
                          <div className="compact-radio-dot">
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Farming Practice Visual Cards (Compact Single-line) */}
              <div className="form-group">
                <label className="form-label">
                  <Tractor size={16} className="input-icon" />
                  {formT.labels?.farmingMethod || 'Farming Practice'}
                </label>
                <div className="farmer-card-grid">
                  {[
                    { id: 'Conventional Farming', title: formT.labels?.conventional || 'Conventional Farming', icon: Tractor },
                    { id: 'Certified Organic Farming', title: formT.labels?.organic || 'Certified Organic (PKVY)', icon: Sprout },
                    { id: 'Natural Farming (ZBNF)', title: formT.labels?.natural || 'Natural Farming (ZBNF)', icon: Sun },
                    { id: 'Polyhouse / Protected', title: formT.labels?.polyhouse || 'Protected / Polyhouse', icon: Shield }
                  ].map((item) => {
                    const CardIcon = item.icon;
                    const isSelected = profile.farming_type === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`farmer-option-card-compact ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChange('farming_type', item.id)}
                      >
                        <div className="compact-card-inner">
                          <CardIcon size={16} className="compact-card-icon" />
                          <span className="compact-card-title">{item.title}</span>
                          <div className="compact-radio-dot">
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Farmer Profile & Identity */}
          {currentStep === 4 && (
            <div className="wizard-step-content">
              <div className="form-grid-2col">
                {/* Farmer Name */}
                <div className="form-group">
                  <label htmlFor="farmer-name-input" className="form-label">
                    <UserCheck size={16} className="input-icon" />
                    {formT.labels?.farmerName || 'Farmer Full Name (as per Land Record)'}
                  </label>
                  <input
                    id="farmer-name-input"
                    type="text"
                    placeholder={formT.labels?.farmerNamePlaceholder || 'e.g. Ramesh Kumar Patil'}
                    value={profile.farmer_name || ''}
                    onChange={(e) => handleChange('farmer_name', e.target.value)}
                    className="form-control"
                  />
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobile-input" className="form-label">
                    <Phone size={16} className="input-icon" />
                    {formT.labels?.mobile || 'Mobile Number (for SMS updates)'}
                  </label>
                  <input
                    id="mobile-input"
                    type="tel"
                    maxLength={10}
                    placeholder={formT.labels?.mobilePlaceholder || 'e.g. 9876543210'}
                    value={profile.mobile_number || ''}
                    onChange={(e) => handleChange('mobile_number', e.target.value.replace(/\D/g, ''))}
                    className="form-control"
                  />
                </div>

                {/* Aadhaar Last 4 */}
                <div className="form-group">
                  <label htmlFor="aadhaar-input" className="form-label">
                    {formT.labels?.aadhaar || 'Aadhaar (Last 4 Digits - Optional)'}
                  </label>
                  <input
                    id="aadhaar-input"
                    type="text"
                    maxLength={4}
                    placeholder={formT.labels?.aadhaarPlaceholder || 'e.g. 8492'}
                    value={profile.aadhaar_last4 || ''}
                    onChange={(e) => handleChange('aadhaar_last4', e.target.value.replace(/\D/g, ''))}
                    className="form-control"
                  />
                </div>

                {/* Social Category */}
                <div className={`form-group ${fieldErrors.category ? 'input-error' : ''} ${shakingField === 'category' ? 'shake-field' : ''}`}>
                  <label htmlFor="category-select" className="form-label">
                    <Users size={16} className="input-icon" />
                    {formT.labels?.socialCategory || 'Social Category *'}
                  </label>
                  <select
                    id="category-select"
                    value={profile.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>{formT.labels?.selectCategoryPlaceholder || 'Select Category...'}</option>
                    {SOCIAL_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {fieldErrors.category ? (
                    <span className="inline-field-error">{fieldErrors.category}</span>
                  ) : (
                    <span className="field-hint">{formT.labels?.categoryHint || 'Used for reserved subsidy quotas.'}</span>
                  )}
                </div>
              </div>

              {/* Special Beneficiary Classification Cards (Compact Single-line) */}
              <div className="form-group">
                <label className="form-label">
                  <Tag size={16} className="input-icon" />
                  {formT.labels?.specialCategory || 'Special Beneficiary Quota'}
                </label>
                <div className="farmer-card-grid">
                  {[
                    { id: 'Small & Marginal Farmer', title: formT.labels?.smallMarginal || 'Small & Marginal Farmer (Up to 2 Ha)', icon: Sprout },
                    { id: 'Women Farmer', title: formT.labels?.womenFarmer || 'Women Farmer', icon: UserCheck },
                    { id: 'Differently Abled (Divyang)', title: formT.labels?.divyang || 'Differently Abled (Divyang)', icon: Shield },
                    { id: 'Ex-Serviceman', title: formT.labels?.exServiceman || 'Ex-Serviceman / Defense', icon: ShieldCheck }
                  ].map((item) => {
                    const CardIcon = item.icon;
                    const isSelected = (profile.special_category || 'Small & Marginal Farmer') === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`farmer-option-card-compact ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChange('special_category', item.id)}
                      >
                        <div className="compact-card-inner">
                          <CardIcon size={16} className="compact-card-icon" />
                          <span className="compact-card-title">{item.title}</span>
                          <div className="compact-radio-dot">
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="wizard-footer-actions">
          <div className="left-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn-wizard-back"
                onClick={handlePrev}
              >
                <ArrowLeft size={16} />
                <span>{formT.buttons?.prevStep || 'Back'}</span>
              </button>
            )}
            <button
              type="button"
              className="btn-secondary-reset"
              onClick={handleReset}
              title="Reset all fields"
            >
              <RefreshCw size={14} />
              <span>{formT.buttons?.resetForm || 'Reset Form'}</span>
            </button>
          </div>

          <div className="right-actions">
            {currentStep < 4 ? (
              <button
                type="button"
                className="btn-wizard-next tactile-card"
                onClick={handleNext}
              >
                <span>{formT.buttons?.nextStep || 'Next Step'}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary-calculate tactile-card"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <span className="loading-spinner-span">{formT.buttons?.searching || 'Searching 45+ Govt Schemes...'}</span>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>{formT.buttons?.findSchemes || 'Find Eligible Subsidies & Schemes'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
