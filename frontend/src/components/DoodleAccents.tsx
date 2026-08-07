import React from 'react';

interface DoodleProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ScribbleUnderline: React.FC<{ color?: string; style?: React.CSSProperties }> = ({ color = '#16A34A', style }) => (
  <svg
    className="animated-word-underline"
    style={style}
    viewBox="0 0 160 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8C35 3.5 90 2 157 9"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

export const SproutSparkle: React.FC<DoodleProps> = ({ className = '', style }) => (
  <svg
    className={`doodle-sparkle ${className}`}
    style={style}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
      fill="#D97706"
      opacity="0.85"
    />
    <path
      d="M19 16L19.9 19.1L23 20L19.9 20.9L19 24L18.1 20.9L15 20L18.1 19.1L19 16Z"
      fill="#16A34A"
      opacity="0.75"
    />
  </svg>
);

export const WheatDoodle: React.FC<DoodleProps> = ({ className = '', style }) => (
  <svg
    className={`doodle-wheat ${className}`}
    style={style}
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16A34A"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 22 12 12" />
    <path d="M12 12 16 8" />
    <path d="M12 12 8 16" />
    <path d="M16 8 20 4" />
    <path d="M16 8 12 4" />
    <path d="M8 16 4 20" />
    <path d="M8 16 4 12" />
    <path d="M14 6c0-2.2 1.8-4 4-4 0 2.2-1.8 4-4 4Z" />
    <path d="M10 10c0-2.2 1.8-4 4-4 0 2.2-1.8 4-4 4Z" />
    <path d="M6 14c0-2.2 1.8-4 4-4 0 2.2-1.8 4-4 4Z" />
  </svg>
);

export const SunBurst: React.FC<DoodleProps> = ({ className = '', style }) => (
  <svg
    className={`doodle-sun ${className}`}
    style={style}
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#D97706"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);
