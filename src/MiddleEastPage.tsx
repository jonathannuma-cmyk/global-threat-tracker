import { useEffect, useRef, useState, useCallback } from "react";
import { NavBar } from "./NavBar";
import {
  createMEScene,
  getBaseColor,
  ME_COUNTRY_COLORS,
  type MEFilter,
  type MESceneApi,
} from "./middleEastScene";
import {
  MIDDLE_EAST_BASES,
  MIDDLE_EAST_COUNTRIES,
  type MiddleEastBase,
  type SystemType,
} from "./data/middleEastMissiles";
import { IRAN_STRIKES, type IranStrike } from "./data/iranStrikes";
import { COUNTRY_PROFILES } from "./data/countryProfiles";

// ── Helpers ──────────────────────────────────────────────────────────────────

const SYSTEM_TYPE_LABELS: Record<SystemType, string> = {
  ballistic: "Ballistic",
  cruise: "Cruise",
  sam: "SAM",
  thaad: "THAAD/BMD",
  mixed: "Mixed",
};

const SYSTEM_TYPE_COLORS: Record<SystemType, string> = {
  ballistic: "#ef4444",
  cruise: "#f97316",
  sam: "#22d3ee",
  thaad: "#3b82f6",
  mixed: "#a78bfa",
};

const MAX_SYSTEM_RANGE = 7000; // km, for bar scaling

/** Get bases for a country profile key (handles "Yemen" → "Yemen (Houthi)"). */
function getBasesForProfile(profileKey: string): MiddleEastBase[] {
  if (profileKey === "Yemen") {
    return MIDDLE_EAST_BASES.filter(
      (b) => b.country === "Yemen" || b.country === "Yemen (Houthi)"
    );
  }
  return MIDDLE_EAST_BASES.filter((b) => b.country === profileKey);
}

/** Derive a CSS class from an air-defense status string. */
function adStatusClass(status: string): string {
  const s = status.toLowerCase();
  if (
    s.includes("operational") ||
    s.includes("active") ||
    s.includes("deployed")
  )
    return "ad-status-green";
  if (
    s.includes("degraded") ||
    s.includes("limited") ||
    s.includes("partial") ||
    s.includes("development") ||
    s.includes("ordered") ||
    s.includes("integrating") ||
    s.includes("ioc") ||
    s.includes("unknown")
  )
    return "ad-status-amber";
  if (
    s.includes("non-operational") ||
    s.includes("destroyed") ||
    s.includes("withdrawn") ||
    s.includes("failed") ||
    s.includes("n/a")
  )
    return "ad-status-red";
  return "ad-status-dim";
}

function baseCounts() {
  const domestic = MIDDLE_EAST_BASES.filter((b) => b.type === "domestic").length;
  const allied = MIDDLE_EAST_BASES.filter((b) => b.type === "us_allied").length;
  const systems = MIDDLE_EAST_BASES.reduce(
    (acc, b) => acc + b.systems.length,
    0
  );
  return { domestic, allied, systems };
}

function countryBaseCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  MIDDLE_EAST_BASES.forEach((b) => {
    counts[b.country] = (counts[b.country] ?? 0) + 1;
  });
  return counts;
}

// ── Component ────────────────────────────────────────────────────────────────

export function MiddleEastPage() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneApiRef = useRef<MESceneApi | null>(null);

  const [selectedBase, setSelectedBase] = useState<MiddleEastBase | null>(null);
  const [hoveredBase, setHoveredBase] = useState<MiddleEastBase | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [activeFilter, setActiveFilter] = useState<MEFilter>("all");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  // Set of system indices (within selectedBase.systems) that have a range ring shown
  const [activeRings, setActiveRings] = useState<Set<number>>(new Set());
  const [strikeHistoryOpen, setStrikeHistoryOpen] = useState(true);
  const [selectedStrike, setSelectedStrike] = useState<IranStrike | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Create scene on mount
  useEffect(() => {
    if (!canvasContainerRef.current || sceneApiRef.current) return;
    sceneApiRef.current = createMEScene(canvasContainerRef.current, {
      onSelectBase: (base) => {
        setSelectedBase(base);
        setActiveRings(new Set());
        setSelectedStrike(null);
        setSelectedCountry(null);
        sceneApiRef.current?.clearStrikeArcs();
        sceneApiRef.current?.setSelectedCountry(null);
      },
      onHoverBase: (base, pos) => {
        setHoveredBase(base);
        setTooltipPos(pos);
      },
      onSelectCountry: (profileKey) => {
        if (COUNTRY_PROFILES[profileKey]) {
          setSelectedCountry(profileKey);
          setCollapsedSections(new Set());
          setSelectedBase(null);
          setActiveRings(new Set());
          setSelectedStrike(null);
          sceneApiRef.current?.clearAllRanges();
          sceneApiRef.current?.clearStrikeArcs();
          sceneApiRef.current?.setSelectedCountry(profileKey);
        }
      },
      onClickEmpty: () => {
        setSelectedBase(null);
        setSelectedStrike(null);
        setSelectedCountry(null);
        setActiveRings(new Set());
        sceneApiRef.current?.clearAllRanges();
        sceneApiRef.current?.clearStrikeArcs();
        sceneApiRef.current?.setSelectedCountry(null);
      },
    });

    // Load country borders
    fetch("/ne_110m_admin_0_countries.geojson")
      .then((r) => r.json())
      .then((data) => sceneApiRef.current?.addCountryBorders(data))
      .catch(() => {});

    return () => {
      sceneApiRef.current?.dispose();
      sceneApiRef.current = null;
    };
  }, []);

  // Sync filter
  useEffect(() => {
    sceneApiRef.current?.setFilter(activeFilter);
  }, [activeFilter]);

  // Sync country
  useEffect(() => {
    sceneApiRef.current?.setActiveCountry(activeCountry);
  }, [activeCountry]);

  // Center globe when a country is selected
  useEffect(() => {
    if (!activeCountry) return;
    const base = MIDDLE_EAST_BASES.find((b) => b.country === activeCountry);
    if (base) sceneApiRef.current?.centerGlobeOn(base.lat, base.lon);
  }, [activeCountry]);

  const handleCloseDetail = useCallback(() => {
    setSelectedBase(null);
    setSelectedCountry(null);
    setActiveRings(new Set());
    sceneApiRef.current?.clearAllRanges();
    sceneApiRef.current?.setSelectedCountry(null);
    sceneApiRef.current?.scheduleAutoRotateResume();
  }, []);

  const handleToggleRing = useCallback(
    (sysIdx: number) => {
      if (!selectedBase) return;
      setActiveRings((prev) => {
        const next = new Set(prev);
        if (next.has(sysIdx)) {
          sceneApiRef.current?.hideSystemRange(sysIdx);
          next.delete(sysIdx);
        } else {
          sceneApiRef.current?.showSystemRange(selectedBase, sysIdx);
          next.add(sysIdx);
        }
        return next;
      });
    },
    [selectedBase]
  );

  const handleClearRanges = useCallback(() => {
    setActiveRings(new Set());
    sceneApiRef.current?.clearAllRanges();
  }, []);

  const handleSelectStrike = useCallback((strike: IranStrike) => {
    setSelectedStrike(strike);
    setSelectedBase(null);
    setSelectedCountry(null);
    setActiveRings(new Set());
    sceneApiRef.current?.clearAllRanges();
    sceneApiRef.current?.setSelectedCountry(null);
    sceneApiRef.current?.showStrikeArcs(strike);
    // Center globe on geographic midpoint of all strike points
    const all = [...strike.launchOrigins, ...strike.targets];
    const lat = all.reduce((s, p) => s + p.lat, 0) / all.length;
    const lng = all.reduce((s, p) => s + p.lng, 0) / all.length;
    sceneApiRef.current?.centerGlobeOn(lat, lng);
  }, []);

  const handleClearStrikes = useCallback(() => {
    setSelectedStrike(null);
    sceneApiRef.current?.clearStrikeArcs();
  }, []);

  const handleCloseCountry = useCallback(() => {
    setSelectedCountry(null);
    sceneApiRef.current?.setSelectedCountry(null);
  }, []);

  const handleSelectBaseFromProfile = useCallback(
    (base: MiddleEastBase) => {
      setSelectedBase(base);
      setSelectedCountry(null);
      setActiveRings(new Set());
      sceneApiRef.current?.setSelectedCountry(null);
      sceneApiRef.current?.clearAllRanges();
      sceneApiRef.current?.centerGlobeOn(base.lat, base.lon);
    },
    []
  );

  const toggleSection = useCallback((key: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const { domestic, allied, systems } = baseCounts();
  const countryCounts = countryBaseCounts();

  // Countries sorted: domestic first, then allied hosts
  const domesticCountries = Object.keys(ME_COUNTRY_COLORS).filter((c) =>
    MIDDLE_EAST_BASES.some((b) => b.country === c && b.type === "domestic")
  );
  const alliedOnlyCountries = MIDDLE_EAST_COUNTRIES.filter(
    (c) =>
      !domesticCountries.includes(c) &&
      MIDDLE_EAST_BASES.some((b) => b.country === c && b.type === "us_allied")
  );

  const filteredCountries =
    activeFilter === "domestic"
      ? domesticCountries
      : activeFilter === "us_allied"
      ? alliedOnlyCountries
      : [...domesticCountries, ...alliedOnlyCountries];

  return (
    <>
      <div id="canvas-container" ref={canvasContainerRef} />

      <NavBar />

      <div className="me-ui-layer">
        {/* ── Header ── */}
        <header className="header">
          <div className="header-left">
            <div className="me-logo-icon" />
            <h1>
              Middle East <span className="me-accent">Missile</span> Tracker
            </h1>
          </div>
          <div className="header-right">
            <div>
              <span className="live-dot" style={{ background: "#f97316" }} />
              OPEN SOURCE INTELLIGENCE
            </div>
            <div style={{ marginTop: 2, opacity: 0.6 }}>
              DATA: FAS / CSIS MISSILE THREAT / NTI / IISS — EST. 2025
            </div>
          </div>
        </header>

        {/* ── Side Panel ── */}
        <div className="side-panel">
          {/* Strike History — primary feature, shown first and expanded by default */}
          <div className="panel-card">
            <div className="me-strike-history-header">
              <h3 style={{ margin: 0 }}>Strike History</h3>
              <button
                type="button"
                className={`filter-btn ${strikeHistoryOpen ? "active" : ""}`}
                style={{ fontSize: 9, padding: "3px 8px" }}
                onClick={() => {
                  setStrikeHistoryOpen((v) => !v);
                  if (strikeHistoryOpen) handleClearStrikes();
                }}
              >
                {strikeHistoryOpen ? "HIDE" : "SHOW"}
              </button>
            </div>
            {strikeHistoryOpen && (
              <div className="me-strike-timeline">
                {IRAN_STRIKES.map((strike) => (
                  <div
                    key={strike.id}
                    className={`me-strike-item ${selectedStrike?.id === strike.id ? "active" : ""}`}
                    onClick={() => handleSelectStrike(strike)}
                  >
                    <div className="me-strike-date">{strike.date}</div>
                    <div className="me-strike-codename">{strike.codename}</div>
                    <div className="me-strike-oneliner">{strike.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Overview stats */}
          <div className="panel-card">
            <h3>Regional Overview</h3>
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-value">{domestic}</div>
                <div className="stat-label">Missile Sites</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{allied}</div>
                <div className="stat-label">US/Allied Bases</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{systems}</div>
                <div className="stat-label">Systems Tracked</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{MIDDLE_EAST_COUNTRIES.length}</div>
                <div className="stat-label">Countries</div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="panel-card">
            <h3>Filter</h3>
            <div className="filter-row">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "domestic", label: "Missile Sites" },
                  { id: "us_allied", label: "US-Allied" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`filter-btn ${activeFilter === f.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Country list */}
          <div className="panel-card">
            <h3>Countries</h3>
            <div className="country-list">
              {filteredCountries.map((country) => {
                const color = ME_COUNTRY_COLORS[country] ?? "#64748b";
                const count = countryCounts[country] ?? 0;
                const isActive = activeCountry === country;
                return (
                  <div
                    key={country}
                    className={`country-item ${isActive ? "active" : ""}`}
                    style={isActive ? { borderColor: color } : undefined}
                    onClick={() =>
                      setActiveCountry(isActive ? null : country)
                    }
                  >
                    <div className="country-left">
                      <div
                        className="country-dot"
                        style={{ background: color }}
                      />
                      <div className="country-name">{country}</div>
                    </div>
                    <div className="country-count">
                      {count} {count === 1 ? "base" : "bases"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="panel-card">
            <h3>Legend</h3>
            <div className="me-legend">
              <div className="me-legend-section">
                <div className="me-legend-heading">Domestic Missile Programs</div>
                {domesticCountries.map((c) => (
                  <div key={c} className="me-legend-row">
                    <div
                      className="me-legend-dot me-legend-dot--pulse"
                      style={{ background: ME_COUNTRY_COLORS[c] ?? "#ef4444" }}
                    />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
              <div className="me-legend-divider" />
              <div className="me-legend-section">
                <div className="me-legend-heading">US / Allied Bases</div>
                {alliedOnlyCountries.map((c) => (
                  <div key={c} className="me-legend-row">
                    <div
                      className="me-legend-dot"
                      style={{ background: ME_COUNTRY_COLORS[c] ?? "#3b82f6" }}
                    />
                    <span>{c}</span>
                  </div>
                ))}
                {/* Saudi Arabia also has allied presence */}
                <div className="me-legend-row">
                  <div
                    className="me-legend-dot"
                    style={{ background: "#1d4ed8" }}
                  />
                  <span>Saudi Arabia (US base)</span>
                </div>
                <div className="me-legend-row">
                  <div
                    className="me-legend-dot"
                    style={{ background: "#818cf8" }}
                  />
                  <span>Turkey (NATO base)</span>
                </div>
              </div>
              <div className="me-legend-divider" />
              <div className="me-legend-section">
                <div className="me-legend-heading">System Types</div>
                {(
                  Object.entries(SYSTEM_TYPE_LABELS) as [SystemType, string][]
                ).map(([type, label]) => (
                  <div key={type} className="me-legend-row">
                    <div
                      className="me-badge"
                      style={{
                        background: SYSTEM_TYPE_COLORS[type] + "22",
                        border: `1px solid ${SYSTEM_TYPE_COLORS[type]}55`,
                        color: SYSTEM_TYPE_COLORS[type],
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Detail Panel ── */}
        <div className={`me-detail-panel ${(selectedBase || selectedStrike || selectedCountry) ? "open" : ""}`}>
          {selectedBase && (
            <div className="panel-card me-detail-card">
              <div className="detail-header">
                <div>
                  <div className="detail-title">{selectedBase.name}</div>
                  <div className="me-detail-meta">
                    <span
                      className="me-type-badge"
                      style={{
                        background:
                          selectedBase.type === "domestic"
                            ? "rgba(239,68,68,0.15)"
                            : "rgba(59,130,246,0.15)",
                        borderColor:
                          selectedBase.type === "domestic"
                            ? "rgba(239,68,68,0.4)"
                            : "rgba(59,130,246,0.4)",
                        color:
                          selectedBase.type === "domestic"
                            ? "#f87171"
                            : "#60a5fa",
                      }}
                    >
                      {selectedBase.type === "domestic"
                        ? "MISSILE PROGRAM"
                        : "US / ALLIED"}
                    </span>
                    <span
                      className="me-country-label"
                      style={{ color: getBaseColor(selectedBase) }}
                    >
                      {selectedBase.country}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="detail-close"
                  onClick={handleCloseDetail}
                >
                  ✕
                </button>
              </div>

              {/* Systems */}
              <div className="me-systems-label-row">
                <span className="me-systems-label">Tracked Systems</span>
                {activeRings.size > 0 && (
                  <button
                    type="button"
                    className="me-clear-ranges-btn"
                    onClick={handleClearRanges}
                  >
                    Clear Ranges
                  </button>
                )}
              </div>
              <div className="me-systems-list">
                {selectedBase.systems.map((sys, i) => {
                  const rangePct = Math.min(
                    (sys.range_km / MAX_SYSTEM_RANGE) * 100,
                    100
                  );
                  const ringActive = activeRings.has(i);
                  return (
                    <div key={i} className="me-system-item">
                      <div className="me-system-header">
                        <span className="me-system-name">{sys.name}</span>
                        <div className="me-system-header-right">
                          <div
                            className="me-badge"
                            style={{
                              background:
                                SYSTEM_TYPE_COLORS[sys.type] + "22",
                              border: `1px solid ${SYSTEM_TYPE_COLORS[sys.type]}55`,
                              color: SYSTEM_TYPE_COLORS[sys.type],
                            }}
                          >
                            {SYSTEM_TYPE_LABELS[sys.type]}
                          </div>
                          {sys.range_km > 0 && (
                            <button
                              type="button"
                              className={`me-range-btn ${ringActive ? "active" : ""}`}
                              style={ringActive ? {
                                borderColor: getBaseColor(selectedBase),
                                color: getBaseColor(selectedBase),
                                background: getBaseColor(selectedBase) + "18",
                              } : undefined}
                              onClick={() => handleToggleRing(i)}
                            >
                              {ringActive ? "HIDE" : "SHOW"}
                            </button>
                          )}
                        </div>
                      </div>
                      {sys.range_km > 0 && (
                        <div className="me-system-range">
                          <div className="range-bar-bg">
                            <div
                              className="range-bar-fill"
                              style={{
                                width: `${rangePct}%`,
                                background:
                                  SYSTEM_TYPE_COLORS[sys.type],
                              }}
                            />
                          </div>
                          <div className="me-system-range-km">
                            {sys.range_km.toLocaleString()} km
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <div className="me-description">{selectedBase.description}</div>
            </div>
          )}

          {/* Strike detail card */}
          {selectedStrike && (
            <div className="panel-card me-detail-card">
              <div className="detail-header">
                <div>
                  <div className="detail-title me-strike-title">
                    {selectedStrike.codename}
                  </div>
                  <div className="me-detail-meta">
                    <span className="me-type-badge" style={{
                      background: "rgba(249,115,22,0.15)",
                      borderColor: "rgba(249,115,22,0.4)",
                      color: "#fb923c",
                    }}>
                      {selectedStrike.date}
                    </span>
                  </div>
                </div>
                <button type="button" className="detail-close" onClick={handleClearStrikes}>✕</button>
              </div>

              <div className="me-strike-section-label">LAUNCH ORIGINS</div>
              <div className="me-strike-point-list">
                {selectedStrike.launchOrigins.map((o, i) => (
                  <div key={i} className="me-strike-point me-strike-point--origin">
                    ↑ {o.label}
                  </div>
                ))}
              </div>

              <div className="me-strike-section-label">TARGETS</div>
              <div className="me-strike-point-list">
                {selectedStrike.targets.map((t, i) => (
                  <div key={i} className="me-strike-point me-strike-point--target">
                    ✕ {t.label}
                  </div>
                ))}
              </div>

              <div className="me-strike-section-label">MUNITIONS</div>
              <div className="me-strike-detail-text">{selectedStrike.munitions}</div>

              <div className="me-strike-section-label">OUTCOME</div>
              <div className="me-strike-detail-text">{selectedStrike.outcome}</div>

              <div className="me-description">{selectedStrike.description}</div>
            </div>
          )}

          {/* Country Profile Card */}
          {selectedCountry && !selectedBase && !selectedStrike && (() => {
            const profile = COUNTRY_PROFILES[selectedCountry];
            if (!profile) return null;
            const countryBases = getBasesForProfile(selectedCountry);
            const uniqueSystems = new Set(
              countryBases.flatMap((b) => b.systems.map((s) => s.name))
            ).size;
            return (
              <div className="panel-card me-detail-card me-country-profile">
                <div className="detail-header">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="me-country-profile-flag">{profile.flag}</div>
                    <div className="detail-title">{profile.name}</div>
                  </div>
                  <button type="button" className="detail-close" onClick={handleCloseCountry}>✕</button>
                </div>

                <div className="me-description" style={{ marginBottom: 12 }}>{profile.overview}</div>

                {/* Missile Bases */}
                {countryBases.length > 0 && (
                  <div className="me-profile-section">
                    <button
                      type="button"
                      className="me-profile-section-header"
                      onClick={() => toggleSection("bases")}
                    >
                      <span>MISSILE &amp; MILITARY BASES</span>
                      <span className="me-profile-section-meta">
                        {countryBases.length} {countryBases.length === 1 ? "base" : "bases"} · {uniqueSystems} systems
                      </span>
                      <span className="me-profile-chevron">{collapsedSections.has("bases") ? "▶" : "▼"}</span>
                    </button>
                    {!collapsedSections.has("bases") && (
                      <div className="me-profile-section-body">
                        {countryBases.map((base, i) => (
                          <button
                            key={i}
                            type="button"
                            className="me-profile-base-item"
                            onClick={() => handleSelectBaseFromProfile(base)}
                          >
                            <div className="me-profile-base-top">
                              <span className="me-profile-base-name">{base.name}</span>
                              <span
                                className="me-type-badge"
                                style={{
                                  background: base.type === "domestic" ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.12)",
                                  borderColor: base.type === "domestic" ? "rgba(239,68,68,0.35)" : "rgba(59,130,246,0.35)",
                                  color: base.type === "domestic" ? "#f87171" : "#60a5fa",
                                  fontSize: 8,
                                }}
                              >
                                {base.type === "domestic" ? "MISSILE SITE" : "US / ALLIED"}
                              </span>
                            </div>
                            <div className="me-profile-base-systems">
                              {base.systems.slice(0, 4).map((s, j) => (
                                <span key={j} className="me-profile-system-chip"
                                  style={{ color: SYSTEM_TYPE_COLORS[s.type] }}
                                >{s.name}</span>
                              ))}
                              {base.systems.length > 4 && (
                                <span className="me-profile-system-chip" style={{ color: "#64748b" }}>
                                  +{base.systems.length - 4} more
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Air Defense */}
                {profile.airDefense && (
                  <div className="me-profile-section">
                    <button
                      type="button"
                      className="me-profile-section-header"
                      onClick={() => toggleSection("airdefense")}
                    >
                      <span>AIR DEFENSE SYSTEMS</span>
                      <span className="me-profile-section-meta">{profile.airDefense.systems.length} systems</span>
                      <span className="me-profile-chevron">{collapsedSections.has("airdefense") ? "▶" : "▼"}</span>
                    </button>
                    {!collapsedSections.has("airdefense") && (
                      <div className="me-profile-section-body">
                        {profile.airDefense.systems.map((sys, i) => (
                          <div key={i} className="me-profile-ad-row">
                            <div className="me-profile-ad-top">
                              <span className="me-profile-ad-name">{sys.name}</span>
                              <span className={`me-profile-ad-status ${adStatusClass(sys.status)}`}>{sys.status}</span>
                            </div>
                            <div className="me-profile-ad-meta">
                              <span className="me-profile-ad-type">{sys.type}</span>
                              {sys.range_km > 0 && (
                                <span className="me-profile-ad-range">{sys.range_km.toLocaleString()} km</span>
                              )}
                            </div>
                            {sys.notes && <div className="me-profile-notes">{sys.notes}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Air Force */}
                {profile.airForce && (
                  <div className="me-profile-section">
                    <button
                      type="button"
                      className="me-profile-section-header"
                      onClick={() => toggleSection("airforce")}
                    >
                      <span>AIR FORCE</span>
                      <span className="me-profile-section-meta">{profile.airForce.aircraft.length} types</span>
                      <span className="me-profile-chevron">{collapsedSections.has("airforce") ? "▶" : "▼"}</span>
                    </button>
                    {!collapsedSections.has("airforce") && (
                      <div className="me-profile-section-body">
                        {profile.airForce.aircraft.map((ac, i) => (
                          <div key={i} className="me-profile-ac-row">
                            <div className="me-profile-ad-top">
                              <span className="me-profile-ad-name">{ac.name}</span>
                              <span className="me-profile-ac-qty">{ac.quantity}</span>
                            </div>
                            <div className="me-profile-ad-meta">
                              <span className="me-profile-ad-type">{ac.role}</span>
                            </div>
                            {ac.notes && <div className="me-profile-notes">{ac.notes}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Alliances */}
                {profile.alliances && profile.alliances.length > 0 && (
                  <div className="me-profile-section">
                    <button
                      type="button"
                      className="me-profile-section-header"
                      onClick={() => toggleSection("alliances")}
                    >
                      <span>ALLIANCES &amp; PARTNERSHIPS</span>
                      <span className="me-profile-chevron">{collapsedSections.has("alliances") ? "▶" : "▼"}</span>
                    </button>
                    {!collapsedSections.has("alliances") && (
                      <div className="me-profile-section-body">
                        {profile.alliances.map((a, i) => (
                          <div key={i} className="me-profile-alliance-item">· {a}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* ── Tooltip ── */}
        {hoveredBase && tooltipPos && (
          <div
            className="tooltip visible"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            <div className="tooltip-name">{hoveredBase.name}</div>
            <div
              className="tooltip-type"
              style={{ color: getBaseColor(hoveredBase) }}
            >
              {hoveredBase.country} ·{" "}
              {hoveredBase.type === "domestic"
                ? "Missile Program"
                : "US/Allied Base"}
            </div>
          </div>
        )}

        {/* ── Controls hint ── */}
        <div className="controls-hint">
          Drag to rotate · Scroll to zoom · Click markers for details
        </div>
      </div>
    </>
  );
}
