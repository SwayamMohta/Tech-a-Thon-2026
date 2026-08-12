import React from 'react';
import { SproutSparkle } from './DoodleAccents';
import { Sprout, Zap } from 'lucide-react';

export const AgriculturalLineArt: React.FC = () => {
  return (
    <div className="line-art-hero-wrapper tactile-card" style={{
      position: 'relative',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      padding: '24px',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
      borderRadius: '24px',
      border: '2px solid var(--border-light)',
      boxShadow: 'var(--nm-raised-lg)',
      overflow: 'hidden'
    }}>
      {/* Decorative background grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(#16A34A 0.75px, transparent 0.75px)',
        backgroundSize: '16px 16px',
        opacity: 0.1,
        pointerEvents: 'none'
      }} />

      {/* Floating Sparkle top right */}
      <SproutSparkle className="animate-float" style={{ position: 'absolute', top: '16px', right: '16px' }} />

      {/* Vector Line Art SVG Artwork */}
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Sun & Rays */}
        <g stroke="#D97706" strokeWidth="2" strokeLinecap="round">
          <circle cx="200" cy="65" r="28" strokeDasharray="4 2" />
          <line x1="200" y1="22" x2="200" y2="30" />
          <line x1="200" y1="100" x2="200" y2="108" />
          <line x1="157" y1="65" x2="165" y2="65" />
          <line x1="235" y1="65" x2="243" y2="65" />
          <line x1="170" y1="35" x2="176" y2="41" />
          <line x1="224" y1="89" x2="230" y2="95" />
          <line x1="224" y1="35" x2="218" y2="41" />
          <line x1="170" y1="89" x2="176" y2="83" />
        </g>

        {/* Mountain Outline */}
        <path
          d="M20 180 L90 120 L160 180 L230 110 L310 180 L380 140"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 3"
        />

        {/* Terraced Crop Field Curves */}
        <path
          d="M0 220 C100 200, 200 240, 400 210"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0 250 C120 230, 250 270, 400 240"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 280 C150 260, 280 295, 400 275"
          stroke="#15803D"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Wheat Stalk Group 1 (Left) */}
        <g stroke="#16A34A" strokeWidth="2" strokeLinecap="round">
          <path d="M50 220 Q55 170 50 140" />
          <path d="M50 170 C42 165 38 150 48 145" />
          <path d="M50 170 C58 165 62 150 52 145" />
          <path d="M50 155 C44 150 40 135 49 130" />
          <path d="M50 155 C56 150 60 135 51 130" />
          <circle cx="50" cy="135" r="3" fill="#D97706" />
        </g>

        {/* Wheat Stalk Group 2 (Center-Right) */}
        <g stroke="#16A34A" strokeWidth="2" strokeLinecap="round">
          <path d="M350 220 Q345 170 350 135" />
          <path d="M350 170 C342 165 338 150 348 145" />
          <path d="M350 170 C358 165 362 150 352 145" />
          <path d="M350 155 C344 150 340 135 349 130" />
          <path d="M350 155 C356 150 360 135 351 130" />
          <circle cx="350" cy="130" r="3" fill="#D97706" />
        </g>

        {/* Line Art Tractor (Center) */}
        <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Big Rear Wheel */}
          <circle cx="170" cy="205" r="22" stroke="#16A34A" fill="#FFFFFF" />
          <circle cx="170" cy="205" r="10" stroke="#16A34A" />
          <line x1="170" y1="183" x2="170" y2="227" stroke="#16A34A" />
          <line x1="148" y1="205" x2="192" y2="205" stroke="#16A34A" />

          {/* Small Front Wheel */}
          <circle cx="240" cy="214" r="13" stroke="#16A34A" fill="#FFFFFF" />
          <circle cx="240" cy="214" r="5" stroke="#16A34A" />

          {/* Body Chassis */}
          <path d="M170 190 L210 190 L250 205 L250 220 L170 220 Z" fill="#FFFFFF" />
          <path d="M190 190 L190 160 L220 160 L230 190" fill="#FFFFFF" />
          <line x1="225" y1="160" x2="225" y2="148" />

          {/* Steering & Seat */}
          <path d="M198 175 L208 175" />
          <path d="M182 178 L188 178" />
        </g>

        {/* Sprouting Seedlings on terraces */}
        <g stroke="#16A34A" strokeWidth="2" strokeLinecap="round">
          <path d="M100 240 C95 230 90 225 85 228" />
          <path d="M100 240 C105 230 110 225 115 228" />

          <path d="M280 235 C275 225 270 220 265 223" />
          <path d="M280 235 C285 225 290 220 295 223" />
        </g>
      </svg>

      {/* Floating Feature Badges around line art */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: '8px' }}>
        <div className="animate-pop" style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          padding: '8px 14px',
          borderRadius: '12px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: 'var(--nm-raised-sm)'
        }}>
          <Sprout size={16} style={{ color: '#16A34A' }} /> 45+ Govt Schemes
        </div>

        <div className="animate-pop" style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          padding: '8px 14px',
          borderRadius: '12px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: 'var(--nm-raised-sm)',
          animationDelay: '0.15s'
        }}>
          <Zap size={16} style={{ color: '#D97706' }} /> Direct Bank Credit
        </div>
      </div>
    </div>
  );
};
