import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  icon,
  className = '',
  ariaLabel,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        if (currentIndex < options.length - 1) {
          onChange(options[currentIndex + 1].value);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        if (currentIndex > 0) {
          onChange(options[currentIndex - 1].value);
        }
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`custom-select-container ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        id={id}
        type="button"
        className="custom-select-trigger"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
      >
        <div className="custom-select-trigger-left">
          {icon && <span className="custom-select-leading-icon">{icon}</span>}
          <span className="custom-select-label">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown size={14} className={`custom-select-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="custom-select-menu" role="listbox" tabIndex={-1}>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value || opt.label}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <div className="custom-select-option-content">
                  {opt.icon && <span className="custom-select-option-icon">{opt.icon}</span>}
                  <span className="custom-select-option-label">{opt.label}</span>
                </div>

                <div className="custom-select-option-right">
                  {opt.badge !== undefined && <span className="custom-select-option-badge">{opt.badge}</span>}
                  {isSelected && <Check size={14} className="custom-select-check" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
