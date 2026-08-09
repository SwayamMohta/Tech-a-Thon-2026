import React from "react";
import india from "@svg-maps/india";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedStateName } from "../i18n/stateTranslations";

interface IndiaMapProps {
  selectedState: string;
  hoveredState?: string | null;
  onSelectState?: (state: string) => void;
  onHoverState?: (state: string | null) => void;
}

// Map our display names -> svg-maps/india location IDs
const DISPLAY_TO_ID: Record<string, string> = {
  "Andhra Pradesh": "ap",
  "Arunachal Pradesh": "ar",
  "Assam": "as",
  "Bihar": "br",
  "Chhattisgarh": "ct",
  "Goa": "ga",
  "Gujarat": "gj",
  "Haryana": "hr",
  "Himachal Pradesh": "hp",
  "Jharkhand": "jh",
  "Karnataka": "ka",
  "Kerala": "kl",
  "Madhya Pradesh": "mp",
  "Maharashtra": "mh",
  "Manipur": "mn",
  "Meghalaya": "ml",
  "Mizoram": "mz",
  "Nagaland": "nl",
  "Odisha": "or",
  "Punjab": "pb",
  "Rajasthan": "rj",
  "Sikkim": "sk",
  "Tamil Nadu": "tn",
  "Telangana": "tg",
  "Tripura": "tr",
  "Uttar Pradesh": "up",
  "Uttarakhand": "ut",
  "West Bengal": "wb",
  "Delhi": "dl",
  "Jammu & Kashmir": "jk",
  // Ladakh is not in the library — treat as part of jk visually
  "Ladakh": "jk",
};

// Reverse: id -> display name  (first match wins)
const ID_TO_DISPLAY: Record<string, string> = {};
Object.entries(DISPLAY_TO_ID).forEach(([display, id]) => {
  if (!ID_TO_DISPLAY[id]) ID_TO_DISPLAY[id] = display;
});

export const IndiaMap: React.FC<IndiaMapProps> = ({ selectedState, hoveredState, onSelectState, onHoverState }) => {
  const { language, t } = useLanguage();
  const selectedId = selectedState ? DISPLAY_TO_ID[selectedState] : null;
  const hoveredId  = hoveredState  ? DISPLAY_TO_ID[hoveredState]  : null;

  // Hover always wins — only one state lit at a time
  // If hovering: only the hovered state is highlighted, selected goes neutral
  // If not hovering: only the selected state is highlighted
  const activeId = hoveredId ?? selectedId;

  // What to show in the label
  const labelState = hoveredState || selectedState || null;

  return (
    <div className="india-map-container">
      <svg
        viewBox={india.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="india-map-svg"
        aria-label="Map of India — click a state to select"
      >
        {india.locations.map((loc: any) => {
          const isActive = loc.id === activeId;
          const canonicalName = ID_TO_DISPLAY[loc.id] || loc.name;
          const localizedName = getLocalizedStateName(canonicalName, language);
          const cls = `india-state-path${isActive ? " highlighted" : ""}`;
          return (
            <path
              key={loc.id}
              id={`state-${loc.id}`}
              d={loc.path}
              className={cls}
              onClick={() => {
                if (canonicalName && onSelectState) {
                  onSelectState(canonicalName);
                }
              }}
              onMouseEnter={() => {
                if (canonicalName && onHoverState) {
                  onHoverState(canonicalName);
                }
              }}
              onMouseLeave={() => {
                if (onHoverState) {
                  onHoverState(null);
                }
              }}
              aria-label={localizedName}
              role="button"
              tabIndex={0}
            >
              <title>{localizedName}</title>
            </path>
          );
        })}
      </svg>
      <div className="india-map-label">
        {labelState ? (
          <>
            <span className="india-map-label-dot" />
            {getLocalizedStateName(labelState, language)} {t.hero.clickMapToSelect}
          </>
        ) : (
          <span className="india-map-label-hint">{t.hero.clickAnyStateHint}</span>
        )}
      </div>
    </div>
  );
};

