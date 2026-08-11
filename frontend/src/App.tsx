import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrowseSchemes } from './components/BrowseSchemes';
import { EligibilityForm } from './components/EligibilityForm';
import { ResultsSection } from './components/ResultsSection';
import { SchemeModal } from './components/SchemeModal';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { NotFound } from './components/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import type { FarmerProfile, Scheme, MatchResult } from './types/scheme';
import type { User } from './utils/auth';
import { getCurrentUser, getStoredToken, logoutUser } from './utils/auth';
import { CURATED_SCHEMES } from './data/schemes';
import { runMatchingEngine } from './engine/matchingEngine';
import './index.css';

type AppSection = 'hero' | 'browse' | 'eligibility' | 'results' | 'admin';

export function App() {
  const [schemes, setSchemes] = useState<Scheme[]>(CURATED_SCHEMES);
  const [profile, setProfile] = useState<FarmerProfile>({
    state: '',
    district: '',
    taluka: '',
    pincode: '',
    khasra_no: '',
    land_size_ha: 0,
    crop: '',
    category: '',
    unit: 'ha'
  });
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const getSectionFromPath = (): AppSection => {
    const path = window.location.pathname.replace(/\/$/, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

    if (path === '/browse' || hash === 'browse') return 'browse';
    if (path === '/eligibility' || hash === 'eligibility') return 'eligibility';
    if (path === '/results' || hash === 'results') return 'results';
    if (path === '/admin' || hash === 'admin') return 'admin';
    return 'hero';
  };

  const [activeSection, setActiveSection] = useState<AppSection>(getSectionFromPath);
  const [browseStateFilter, setBrowseStateFilter] = useState('');

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

  useEffect(() => {
    const handlePopState = () => {
      const sec = getSectionFromPath();
      setActiveSection(sec);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToSection = (section: AppSection, pushHistory = true) => {
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

    if (pushHistory) {
      const targetPath = section === 'hero' ? '/' : `/${section}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ section }, '', targetPath);
      }
    }
  };

  const handleAuthSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    setAuthToken(token);
    if (user.role === 'admin') {
      navigateToSection('admin');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthToken(null);
    if (activeSection === 'admin') {
      navigateToSection('hero');
    }
  };

  const handleProfileSubmit = (newProfile: FarmerProfile) => {
    setIsCalculating(true);
    setProfile(newProfile);
    setBrowseStateFilter(newProfile.state);

    setTimeout(() => {
      const updatedResults = runMatchingEngine(schemes, newProfile);
      setResults(updatedResults);
      setIsCalculating(false);
      navigateToSection('results');
    }, 400);
  };

  const handleQuickHeroSearch = (searchState: string) => {
    setBrowseStateFilter(searchState);
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
    <LanguageProvider>
      <div className="app-main-wrapper">
        <Navbar
          onBrowseSchemesClick={() => navigateToSection('browse')}
          onCheckEligibilityClick={() => navigateToSection('eligibility')}
          onAdminClick={() => navigateToSection('admin')}
          activeSection={activeSection}
          setActiveSection={(sec) => navigateToSection(sec as AppSection)}
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

          {/* Page 2: Browse Schemes Directory */}
          {activeSection === 'browse' && (
            <BrowseSchemes
              schemes={schemes}
              farmerProfile={profile}
              initialStateFilter={browseStateFilter}
              onViewDetails={(scheme) => {
                const match = results.find(r => r.scheme.id === scheme.id) || {
                  scheme,
                  passed_filter: true,
                  exclusion_reasons: [],
                  tfidf_similarity: 0.8,
                  final_score: 80,
                  matched_keywords: ['government', 'subsidy'],
                  missing_keywords: []
                };
                setSelectedResult(match);
              }}
              onCheckEligibility={() => navigateToSection('eligibility')}
            />
          )}

          {/* Page 3: Check Eligibility Form Page */}
          {activeSection === 'eligibility' && (
            <div className="page-section-container eligibility-page-only">
              <EligibilityForm
                initialProfile={profile}
                onSubmit={handleProfileSubmit}
                isCalculating={isCalculating}
              />
            </div>
          )}

          {/* Page 4: Personalized Eligibility Results Page */}
          {activeSection === 'results' && (
            <div className="page-section-container results-page-only">
              <ResultsSection
                results={results}
                profile={profile}
                onViewDetails={(res) => setSelectedResult(res)}
                onAdjustProfile={() => navigateToSection('eligibility')}
                onBrowseAll={() => navigateToSection('browse')}
              />
            </div>
          )}

          {/* Page 5: Admin Portal Page (Protected) */}
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

          {/* Fallback 404 Edge State */}
          {!['hero', 'browse', 'eligibility', 'results', 'admin'].includes(activeSection) && (
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
    </LanguageProvider>
  );
}

export default App;

