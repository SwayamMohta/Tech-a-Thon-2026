import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n/translations';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard events (Escape to close, Arrow keys to navigate)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className={`language-selector-wrapper ${className}`} ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className={`language-selector-trigger ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        title="Select Language"
      >
        <Globe size={15} className="lang-globe-icon" aria-hidden="true" />
        <span className="lang-label">{currentLangObj.nativeName}</span>
        <ChevronDown size={14} className={`lang-arrow-icon ${isOpen ? 'open' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="language-dropdown-menu"
          role="listbox"
          aria-label="Supported Languages"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                className={`language-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectLanguage(lang.code)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="lang-option-text">{lang.nativeName}</span>
                {lang.name !== lang.nativeName && (
                  <span className="lang-option-secondary">({lang.name})</span>
                )}
                {isSelected && (
                  <Check size={14} className="lang-check-icon" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
