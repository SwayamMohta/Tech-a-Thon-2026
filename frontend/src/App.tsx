import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EligibilityForm } from './components/EligibilityForm';
import { ResultsSection } from './components/ResultsSection';
import { SchemeModal } from './components/SchemeModal';
import { AdminPanel } from './components/AdminPanel';
import { EngineExplainer } from './components/EngineExplainer';
import { AuthModal } from './components/AuthModal';
import { NotFound } from './components/NotFound';
import type { FarmerProfile, Scheme, MatchResult } from './types/scheme';
import type { User } from './utils/auth';
import { getCurrentUser, getStoredToken, logoutUser } from './utils/auth';
import { CURATED_SCHEMES } from './data/schemes';
import { runMatchingEngine } from './engine/matchingEngine';
import './index.css';

export function App() {
  const [schemes, setSchemes] = useState<Scheme[]>(CURATED_SCHEMES);
  const [profile, setProfile] = useState<FarmerProfile>({
    state: 'Maharashtra',
    land_size_ha: 1.5,
    crop: 'wheat',
    category: 'General',
    unit: 'ha'
  });
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'eligibility' | 'admin' | 'explainer'>('hero');

  // JWT Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [authToken, setAuthToken] = useState<string | null>(getStoredToken());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);
  const [authDefaultRole, setAuthDefaultRole] = useState<'admin' | 'user'>('user');

  useEffect(() => {
    const initialRes = runMatchingEngine(schemes, profile);
    setResults(initialRes);
  }, [schemes, profile]);

  const navigateToSection = (section: 'hero' | 'eligibility' | 'admin' | 'explainer') => {
    if (section === 'admin') {
      if (!currentUser) {
        setAuthNotice('Administrator authentication required to access Admin Portal.');
        setAuthDefaultRole('admin');
        setIsAuthModalOpen(true);
        return;
      }
      if (currentUser.role !== 'admin') {
        setAuthNotice('Access Denied: Your current account does not have Admin privileges. Please sign in with an Admin account.');
        setAuthDefaultRole('admin');
        setIsAuthModalOpen(true);
        return;
      }
    }

    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    setAuthToken(token);
    if (user.role === 'admin') {
      setActiveSection('admin');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthToken(null);
    if (activeSection === 'admin') {
      setActiveSection('hero');
    }
  };

  const handleProfileSubmit = (newProfile: FarmerProfile) => {
    setIsCalculating(true);
    setProfile(newProfile);

    setTimeout(() => {
      const updatedResults = runMatchingEngine(schemes, newProfile);
      setResults(updatedResults);
      setIsCalculating(false);

      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const handleQuickHeroSearch = (searchState: string) => {
    const updatedProf = { ...profile, state: searchState };
    setProfile(updatedProf);
    const updatedResults = runMatchingEngine(schemes, updatedProf);
    setResults(updatedResults);
    navigateToSection('eligibility');
  };

  const handleAddCustomScheme = (newScheme: Scheme) => {
    const updatedSchemes = [newScheme, ...schemes];
    setSchemes(updatedSchemes);
    const updatedResults = runMatchingEngine(updatedSchemes, profile);
    setResults(updatedResults);
  };

  return (
    <div className="app-main-wrapper">
      <Navbar
        onCheckEligibilityClick={() => navigateToSection('eligibility')}
        onAdminClick={() => navigateToSection('admin')}
        onExplainerClick={() => navigateToSection('explainer')}
        activeSection={activeSection}
        setActiveSection={(sec) => navigateToSection(sec as any)}
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthNotice(undefined);
          setAuthDefaultRole('user');
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {/* Page 1: Home Page */}
        {activeSection === 'hero' && (
          <HeroSection
            onSearch={handleQuickHeroSearch}
            onOpenFullForm={() => navigateToSection('eligibility')}
          />
        )}

        {/* Page 2: Match Schemes Page */}
        {activeSection === 'eligibility' && (
          <div className="page-section-container">
            <EligibilityForm
              initialProfile={profile}
              onSubmit={handleProfileSubmit}
              isCalculating={isCalculating}
            />

            <ResultsSection
              results={results}
              profile={profile}
              onViewDetails={(res) => setSelectedResult(res)}
            />
          </div>
        )}

        {/* Page 3: Admin Portal Page (Protected) */}
        {activeSection === 'admin' && currentUser?.role === 'admin' && (
          <div className="page-section-container">
            <AdminPanel
              onAddScheme={handleAddCustomScheme}
              existingCount={schemes.length}
              currentUser={currentUser}
              authToken={authToken}
            />
          </div>
        )}

        {/* Page 4: Matching Engine Explainer Page */}
        {activeSection === 'explainer' && (
          <div className="page-section-container">
            <EngineExplainer />
          </div>
        )}

        {/* Fallback 404 Edge State (Design.md Section 4) */}
        {!['hero', 'eligibility', 'admin', 'explainer'].includes(activeSection) && (
          <NotFound
            onGoHome={() => navigateToSection('hero')}
            onGoMatcher={() => navigateToSection('eligibility')}
          />
        )}
      </main>

      <SchemeModal
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMessage={authNotice}
        defaultRole={authDefaultRole}
      />
    </div>
  );
}

export default App;
