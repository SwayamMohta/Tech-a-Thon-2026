import React from 'react';

export const LeftAgriFarmLineArt: React.FC = () => (
  <div className="hero-left-art animate-float" style={{
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '280px',
    height: '340px',
    pointerEvents: 'none',
    zIndex: 1
  }}>
    <svg viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Agricultural Line Art (Tractor, Sun & Crop Terrace) */}
      <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Rising Sun Line Art */}
        <circle cx="120" cy="70" r="35" strokeDasharray="5 3" />
        <line x1="120" y1="20" x2="120" y2="30" />
        <line x1="70" y1="70" x2="80" y2="70" />
        <line x1="160" y1="70" x2="170" y2="70" />
        <line x1="85" y1="35" x2="92" y2="42" />
        <line x1="155" y1="35" x2="148" y2="42" />

        {/* Curved Farm Soil Terraces */}
        <path d="M10 160 C70 145, 170 145, 230 160" />
        <path d="M10 190 C80 175, 160 175, 230 190" strokeWidth="2" />
        <path d="M10 220 C90 205, 150 205, 230 220" strokeWidth="1.8" strokeDasharray="4 4" />

        {/* Tractor Line Art Outline */}
        <g stroke="#0F172A" strokeWidth="2.5">
          {/* Big Wheel */}
          <circle cx="85" cy="180" r="20" fill="#FFFFFF" />
          <circle cx="85" cy="180" r="8" fill="#DCFCE7" />
          {/* Small Wheel */}
          <circle cx="145" cy="188" r="12" fill="#FFFFFF" />

          {/* Body */}
          <path d="M85 165 L120 165 L155 180 L155 195 L85 195 Z" fill="#FFFFFF" />
          <path d="M100 165 L100 140 L128 140 L135 165" />
          <line x1="130" y1="140" x2="130" y2="128" />
        </g>

        {/* Wheat Stalk Sprout Accent */}
        <path d="M185 170 C180 140, 195 120, 190 100" stroke="#16A34A" strokeWidth="2.5" />
        <path d="M188 135 C178 130, 175 118, 185 115" stroke="#16A34A" strokeWidth="2" />
        <path d="M188 135 C198 130, 201 118, 191 115" stroke="#16A34A" strokeWidth="2" />
        <path d="M189 120 C181 115, 179 105, 188 102" stroke="#16A34A" strokeWidth="2" />

        {/* Green Highlighted Direct Transfer Accent Box (Matching Image 2 Green Box Style) */}
        <rect x="50" y="240" width="140" height="42" rx="8" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
        <text x="120" y="266" textAnchor="middle" fill="#14532D" fontSize="14" fontWeight="800" fontFamily="sans-serif">
          ₹6,000 / yr DBT
        </text>
      </g>
    </svg>
  </div>
);

export const RightSchemePassbookLineArt: React.FC = () => (
  <div className="hero-right-art animate-pop" style={{
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%) rotate(6deg)',
    width: '270px',
    height: '330px',
    pointerEvents: 'none',
    zIndex: 1
  }}>
    <svg viewBox="0 0 240 290" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Scheme Passbook & Approval Document (Matching Image 2 Tilted Card) */}
      <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Document Board */}
        <rect x="20" y="20" width="200" height="250" rx="12" fill="#FFFFFF" />

        {/* Document Header */}
        <line x1="20" y1="65" x2="220" y2="65" />
        <text x="120" y="48" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800" fontFamily="sans-serif">
          SCHEME APPROVAL
        </text>

        {/* Checklist Rows */}
        {/* Row 1: State Filter Passed */}
        <path d="M40 95 L48 105 L65 87" stroke="#16A34A" strokeWidth="3" />
        <line x1="80" y1="95" x2="190" y2="95" strokeWidth="2" strokeDasharray="3 3" />

        {/* Row 2: Land Size Checked */}
        <path d="M40 135 L48 145 L65 127" stroke="#16A34A" strokeWidth="3" />
        <line x1="80" y1="135" x2="190" y2="135" strokeWidth="2" strokeDasharray="3 3" />

        {/* Row 3: Crop Subsidy Approved */}
        <path d="M40 175 L48 185 L65 167" stroke="#16A34A" strokeWidth="3" />
        <line x1="80" y1="175" x2="190" y2="175" strokeWidth="2" strokeDasharray="3 3" />

        {/* Green Highlighted Approved Box (Matching Image 2 Green Box Style) */}
        <rect x="35" y="205" width="170" height="50" rx="8" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
        <text x="120" y="235" textAnchor="middle" fill="#14532D" fontSize="14" fontWeight="800" fontFamily="sans-serif">
          ✓ 100% ELIGIBLE
        </text>
      </g>
    </svg>
  </div>
);

