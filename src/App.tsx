import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { NavBar } from "./NavBar";
import { SidePanel } from "./SidePanel";
import { DetailPanel } from "./DetailPanel";
import { ThreatPanel } from "./ThreatPanel";
import { CountryBorders } from "./CountryBorders";
import { TimelineSlider } from "./TimelineSlider";
import { LandingScreen } from "./LandingScreen";
import { DataSourcesModal } from "./DataSourcesModal";
import { HistoricEventCard } from "./HistoricEventCard";
import {
  Facility,
  TYPE_LABELS,
  getWarheadsForYear,
  haversineDistanceKm,
  getThreateningCountries,
  facilities,
  MAJOR_CITIES,
  HISTORIC_EVENTS,
  type MajorCity,
  type HistoricEvent,
} from "./data";
import { createThreeScene, FilterType } from "./threeScene";

const TIMELINE_MIN_NORMAL = 1945;
const TIMELINE_MIN_HISTORIC = 1939;
const TIMELINE_MAX = 2025;
const PLAY_INTERVAL_MS = 200;

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [uiVisible, setUiVisible] = useState(false);
  const [entering, setEntering] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [hoveredFacility, setHoveredFacility] = useState<Facility | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [year, setYear] = useState(TIMELINE_MAX);
  const [isPlaying, setIsPlaying] = useState(false);
  const [threatMode, setThreatMode] = useState(false);
  const [threatTarget, setThreatTarget] = useState<MajorCity | null>(null);
  const [rangeDomeVisible, setRangeDomeVisible] = useState(false);
  const [historicMode, setHistoricMode] = useState(false);
  const [closedEventId, setClosedEventId] = useState<string | null>(null);
  const prevYearRef = useRef<number>(TIMELINE_MAX);
  const lastFlashedYearRef = useRef<number | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneApiRef =
    useRef<ReturnType<typeof createThreeScene> | null>(null);

  const warheadStats = useMemo(() => getWarheadsForYear(year), [year]);

  // Derived: which historic event falls on the current year (if any)
  const currentHistoricEvent = useMemo<HistoricEvent | null>(() => {
    if (!historicMode) return null;
    return HISTORIC_EVENTS.find((e) => e.year === year) ?? null;
  }, [historicMode, year]);

  const threateningFacilities = useMemo(() => {
    if (!threatTarget) return [];
    const allowedCountries = new Set(getThreateningCountries(threatTarget.country));
    const list: { facility: Facility; distanceKm: number }[] = [];
    for (const f of facilities) {
      if (!allowedCountries.has(f.country)) continue;
      const d = haversineDistanceKm(f.lat, f.lng, threatTarget.lat, threatTarget.lng);
      if (f.range > 0 && f.range >= d) {
        list.push({ facility: f, distanceKm: d });
      }
    }
    return list;
  }, [threatTarget]);

  useEffect(() => {
    if (!canvasContainerRef.current || sceneApiRef.current) return;
    sceneApiRef.current = createThreeScene(canvasContainerRef.current, {
      onSelectFacility: (facility) => {
        setSelectedFacility(facility);
      },
      onHoverFacility: (facility, pos) => {
        setHoveredFacility(facility);
        setTooltipPos(pos);
      },
      onCityClick: (city) => {
        setThreatTarget(city);
      },
    }, { initialCameraZ: 8 });
    sceneApiRef.current.setCities(MAJOR_CITIES);
    return () => {
      sceneApiRef.current?.dispose();
      sceneApiRef.current = null;
    };
  }, []);

  const handleEnter = async () => {
    if (entering) return;
    setEntering(true);
    setShowLanding(false);
    try {
      await sceneApiRef.current?.flyCameraToDefault();
    } finally {
      setUiVisible(true);
    }
  };

  useEffect(() => {
    sceneApiRef.current?.setFilter(activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    sceneApiRef.current?.setCountry(activeCountry);
  }, [activeCountry]);

  useEffect(() => {
    sceneApiRef.current?.setWarheadsByYear(warheadStats.byCountry);
  }, [warheadStats.byCountry]);

  useEffect(() => {
    sceneApiRef.current?.setThreatMode(threatMode);
  }, [threatMode]);

  useEffect(() => {
    if (!threatTarget) {
      sceneApiRef.current?.setThreatTarget(null);
      sceneApiRef.current?.setThreatArcs([]);
      return;
    }
    sceneApiRef.current?.setThreatTarget({
      lat: threatTarget.lat,
      lng: threatTarget.lng,
      name: threatTarget.name,
      country: threatTarget.country,
    });
    const facilityList = threateningFacilities.map((t) => t.facility);
    sceneApiRef.current?.setThreatArcs(facilityList);
    sceneApiRef.current?.centerGlobeOn(threatTarget.lat, threatTarget.lng);
  }, [threatTarget, threateningFacilities]);

  useEffect(() => {
    if (!isPlaying) return;
    const minYear = historicMode ? TIMELINE_MIN_HISTORIC : TIMELINE_MIN_NORMAL;
    const id = setInterval(() => {
      setYear((y) => {
        if (y >= TIMELINE_MAX) {
          setIsPlaying(false);
          return TIMELINE_MAX;
        }
        if (y < minYear) return minYear;
        return y + 1;
      });
    }, PLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPlaying, historicMode]);

  useEffect(() => {
    setRangeDomeVisible(false);
  }, [selectedFacility]);

  useEffect(() => {
    sceneApiRef.current?.setHistoricMode(historicMode);
    if (historicMode) {
      setThreatMode(false);
      setThreatTarget(null);
      setSelectedFacility(null);
    } else {
      // Reset event tracking when exiting so events re-trigger on re-entry
      lastFlashedYearRef.current = null;
      setClosedEventId(null);
    }
  }, [historicMode]);

  useEffect(() => {
    if (historicMode) {
      sceneApiRef.current?.setHistoricWarheads(warheadStats.byCountry);
    }
  }, [historicMode, warheadStats.byCountry]);

  const handleHistoricModeChange = useCallback((active: boolean) => {
    setHistoricMode(active);
    if (active) {
      setYear(TIMELINE_MIN_HISTORIC);
      setIsPlaying(false);
    } else {
      setYear(TIMELINE_MAX);
    }
  }, []);

  // Reset closed-event tracking and trigger flash + globe centering when year changes to an event year
  useEffect(() => {
    if (year !== prevYearRef.current) {
      prevYearRef.current = year;
      setClosedEventId(null);
    }
  }, [year]);

  useEffect(() => {
    if (!historicMode || !currentHistoricEvent) return;
    // Only trigger globe effects once per year visit (not on every re-render)
    if (lastFlashedYearRef.current === year) return;
    lastFlashedYearRef.current = year;
    const { lat, lng } = currentHistoricEvent;
    if (lat !== undefined && lng !== undefined) {
      sceneApiRef.current?.flashAt(lat, lng);
      sceneApiRef.current?.centerGlobeOn(lat, lng);
    }
  }, [year, historicMode, currentHistoricEvent]);

  const handleCloseDetail = () => {
    sceneApiRef.current?.showRangeForFacility(null);
    sceneApiRef.current?.showTargetsForFacility(null);
    setRangeDomeVisible(false);
    setSelectedFacility(null);
    sceneApiRef.current?.scheduleAutoRotateResume();
  };

  const handleShowRange = (facility: Facility) => {
    sceneApiRef.current?.showRangeForFacility(facility);
    setRangeDomeVisible(true);
  };

  const handleHideRange = () => {
    sceneApiRef.current?.showRangeForFacility(null);
    setRangeDomeVisible(false);
  };

  const handleShowTargets = (facility: Facility) => {
    sceneApiRef.current?.showTargetsForFacility(facility);
  };

  return (
    <>
      <div id="canvas-container" ref={canvasContainerRef} />

      <NavBar />

      <LandingScreen
        showLanding={showLanding}
        blockSceneInteraction={showLanding}
        onEnter={handleEnter}
      />

      <div className={`ui-layer ${uiVisible ? "ui-layer--visible" : ""}`}>
        <header className="header">
          <div className="header-left">
            <div className="logo-icon" />
            <h1>
              Global <span>Nuclear</span> Arsenal Tracker
            </h1>
          </div>
          <div className="header-right">
            <div>
              <span className="live-dot" />
              OPEN SOURCE INTELLIGENCE
            </div>
            <div style={{ marginTop: 2, opacity: 0.6 }}>
              DATA: FAS / SIPRI / NTI — EST. 2025
            </div>
            <button
              type="button"
              className="sources-button"
              onClick={() => setShowSources(true)}
              aria-label="Open data sources and methodology"
            >
              <span>ℹ</span>
              SOURCES
            </button>
          </div>
        </header>

        <SidePanel
          activeFilter={activeFilter}
          activeCountry={activeCountry}
          onChangeFilter={(f) => setActiveFilter(f as FilterType)}
          onChangeCountry={setActiveCountry}
          totalWarheads={warheadStats.total}
          warheadsByCountry={warheadStats.byCountry}
          nuclearStatesCount={warheadStats.nuclearStatesCount}
          threatMode={threatMode}
          onThreatModeChange={(active) => {
            setThreatMode(active);
            if (!active) setThreatTarget(null);
          }}
          selectedCity={threatTarget}
          onSelectCity={(city) => setThreatTarget(city)}
          timelineYear={year}
          historicMode={historicMode}
        />

        <CountryBorders getSceneApi={() => sceneApiRef.current} />

        {!historicMode && threatMode && threatTarget ? (
          <ThreatPanel
            targetCity={threatTarget}
            threateningFacilities={threateningFacilities}
            onClose={() => {
              setThreatMode(false);
              setThreatTarget(null);
            }}
          />
        ) : !historicMode ? (
          <DetailPanel
            facility={selectedFacility}
            onClose={handleCloseDetail}
            rangeDomeVisible={rangeDomeVisible}
            onShowRange={handleShowRange}
            onHideRange={handleHideRange}
            onShowTargets={handleShowTargets}
          />
        ) : null}

        {hoveredFacility && tooltipPos && (
          <div
            className={`tooltip ${hoveredFacility ? "visible" : ""}`}
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            <div className="tooltip-name">{hoveredFacility.name}</div>
            <div className="tooltip-type">
              {hoveredFacility.country} · {TYPE_LABELS[hoveredFacility.type]}
            </div>
          </div>
        )}

        <div className="controls-hint">
          {historicMode
            ? "Drag to rotate · Scroll to zoom · Use Play to animate history"
            : threatMode
            ? "Drag to rotate · Scroll to zoom · Click a city marker for threat assessment"
            : "Drag to rotate · Scroll to zoom · Click markers for details"}
        </div>

        {currentHistoricEvent && currentHistoricEvent.id !== closedEventId && (
          <HistoricEventCard
            event={currentHistoricEvent}
            onClose={() => setClosedEventId(currentHistoricEvent.id)}
          />
        )}

        <TimelineSlider
          year={year}
          onChangeYear={setYear}
          totalWarheads={warheadStats.total}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying((p) => !p)}
          historicMode={historicMode}
          onHistoricModeChange={handleHistoricModeChange}
        />

        <DataSourcesModal
          open={showSources}
          onClose={() => setShowSources(false)}
        />
      </div>
    </>
  );
}

export default App;

