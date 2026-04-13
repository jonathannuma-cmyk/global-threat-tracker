import * as THREE from "three";
import earcut from "earcut";
import { latLngToVector3 } from "./data";
import { createGlobeCore } from "./globeCore";
import {
  MIDDLE_EAST_BASES,
  type MiddleEastBase,
  type MissileSystem,
} from "./data/middleEastMissiles";
import { type IranStrike } from "./data/iranStrikes";

// ── Color palette ─────────────────────────────────────────────────────────────

const DOMESTIC_COLORS: Record<string, string> = {
  Iran: "#ef4444",
  Israel: "#22d3ee",
  "Saudi Arabia": "#f59e0b",
  "Yemen (Houthi)": "#f97316",
  Turkey: "#c084fc",
};

const ALLIED_COLORS: Record<string, string> = {
  Qatar: "#3b82f6",
  UAE: "#6366f1",
  Jordan: "#0ea5e9",
  Kuwait: "#2dd4bf",
  Turkey: "#818cf8",
  Bahrain: "#38bdf8",
  Oman: "#0284c7",
  "Saudi Arabia": "#1d4ed8",
  Iraq: "#4f46e5",
};

export function getBaseColor(base: MiddleEastBase): string {
  return base.type === "domestic"
    ? (DOMESTIC_COLORS[base.country] ?? "#ef4444")
    : (ALLIED_COLORS[base.country] ?? "#3b82f6");
}

export const ME_COUNTRY_COLORS: Record<string, string> = {
  Iran: "#ef4444",
  Israel: "#22d3ee",
  "Saudi Arabia": "#f59e0b",
  "Yemen (Houthi)": "#f97316",
  Turkey: "#c084fc",
  Qatar: "#3b82f6",
  UAE: "#6366f1",
  Jordan: "#0ea5e9",
  Kuwait: "#2dd4bf",
  Bahrain: "#38bdf8",
  Oman: "#0284c7",
  Iraq: "#4f46e5",
};

// ── ME GeoJSON country names (matched to NaturalEarth ADMIN field) ────────────

const ME_GEO_NAMES = new Set([
  "Iran",
  "Israel",
  "Saudi Arabia",
  "Yemen",
  "Turkey",
  "Jordan",
  "Qatar",
  "United Arab Emirates",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Iraq",
  "Syria",
  "Lebanon",
]);

// Map GeoJSON ADMIN names → COUNTRY_PROFILES keys
export const GEO_TO_PROFILE: Record<string, string> = {
  "United Arab Emirates": "UAE",
  Iran: "Iran",
  Israel: "Israel",
  "Saudi Arabia": "Saudi Arabia",
  Yemen: "Yemen",
  Turkey: "Turkey",
  Jordan: "Jordan",
  Qatar: "Qatar",
  Kuwait: "Kuwait",
  Bahrain: "Bahrain",
  Oman: "Oman",
  Iraq: "Iraq",
  Syria: "Syria",
  Lebanon: "Lebanon",
};

// Bright border colours per GeoJSON country name (for overlay pass)
const ME_BORDER_HEX: Record<string, number> = {
  Iran: 0xf87171,
  Israel: 0x67e8f9,
  "Saudi Arabia": 0xfcd34d,
  Yemen: 0xfb923c,
  Turkey: 0xd8b4fe,
  Jordan: 0x7dd3fc,
  Qatar: 0x93c5fd,
  "United Arab Emirates": 0xa5b4fc,
  Kuwait: 0x5eead4,
  Bahrain: 0x7dd3fc,
  Oman: 0x38bdf8,
  Iraq: 0xa5b4fc,
  Syria: 0x94a3b8,
  Lebanon: 0xb0bec5,
};

// ── Country label positions ────────────────────────────────────────────────────

const ME_LABELS: Array<{ geo: string; lat: number; lon: number; text: string }> =
  [
    { geo: "Iran", lat: 32.4, lon: 54.0, text: "IRAN" },
    { geo: "Israel", lat: 31.5, lon: 35.0, text: "ISRAEL" },
    { geo: "Saudi Arabia", lat: 24.2, lon: 45.1, text: "SAUDI ARABIA" },
    { geo: "Yemen", lat: 15.5, lon: 48.5, text: "YEMEN" },
    { geo: "Turkey", lat: 39.0, lon: 35.2, text: "TURKEY" },
    { geo: "Jordan", lat: 31.2, lon: 36.5, text: "JORDAN" },
    { geo: "Qatar", lat: 25.3, lon: 51.2, text: "QATAR" },
    { geo: "United Arab Emirates", lat: 23.9, lon: 54.1, text: "UAE" },
    { geo: "Kuwait", lat: 29.4, lon: 47.7, text: "KUWAIT" },
    { geo: "Bahrain", lat: 26.1, lon: 50.5, text: "BAHRAIN" },
    { geo: "Oman", lat: 21.5, lon: 57.5, text: "OMAN" },
    { geo: "Iraq", lat: 33.2, lon: 44.0, text: "IRAQ" },
    { geo: "Syria", lat: 34.8, lon: 38.5, text: "SYRIA" },
    { geo: "Lebanon", lat: 33.9, lon: 35.9, text: "LBNON" },
  ];

// ── Marker sizing ─────────────────────────────────────────────────────────────
// Small thin dots — clustered bases (e.g. Israel ×4 within ~30 km) must not overlap
const RING_INNER = 0.0018;
const RING_OUTER = 0.0030;
const DOT_R      = 0.0018;
const PULSE_INNER = 0.0020;
const PULSE_OUTER = 0.0032;

// ── Types ─────────────────────────────────────────────────────────────────────

export type MEFilter = "all" | "domestic" | "us_allied";

export interface MESceneCallbacks {
  onSelectBase: (base: MiddleEastBase) => void;
  onHoverBase: (
    base: MiddleEastBase | null,
    pos: { x: number; y: number } | null
  ) => void;
  onSelectCountry: (profileKey: string) => void;
  onClickEmpty: () => void;
}

export interface MESceneApi {
  addCountryBorders: (geojson: any) => void;
  setFilter: (filter: MEFilter) => void;
  setActiveCountry: (country: string | null) => void;
  centerGlobeOn: (lat: number, lng: number) => void;
  scheduleAutoRotateResume: () => void;
  flyCameraToDefault: () => Promise<void>;
  showSystemRange: (base: MiddleEastBase, systemIndex: number) => void;
  hideSystemRange: (systemIndex: number) => void;
  clearAllRanges: () => void;
  showStrikeArcs: (strike: IranStrike) => void;
  clearStrikeArcs: () => void;
  setSelectedCountry: (profileKey: string | null) => void;
  dispose: () => void;
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createMEScene(
  container: HTMLDivElement,
  callbacks: MESceneCallbacks
): MESceneApi {
  let activeFilter: MEFilter = "all";
  let activeCountry: string | null = null;

  // Country fill materials for visual highlight (opacity change on selection)
  const countryFillMaterials: Map<string, THREE.MeshBasicMaterial[]> = new Map();
  let selectedCountryGeo: string | null = null;

  // Polygon ring data for lat/lng point-in-polygon country click detection
  const meCountryPolygons: Array<{
    profileKey: string;
    rings: number[][][]; // each ring is array of [lng, lat] pairs
  }> = [];

  // ── Lat/lng helpers ──────────────────────────────────────────────────────────

  /** Invert of latLngToVector3: globe-local unit vector → {lat, lng} */
  function globeLocalToLatLng(v: THREE.Vector3): { lat: number; lng: number } {
    const r = v.length();
    const lat = 90 - (Math.acos(Math.max(-1, Math.min(1, v.y / r))) * 180) / Math.PI;
    let lng = (Math.atan2(v.z, -v.x) * 180) / Math.PI - 180;
    if (lng < -180) lng += 360;
    return { lat, lng };
  }

  /** Ray-casting point-in-polygon test (2D, lng/lat). */
  function pipTest(px: number, py: number, ring: number[][]): boolean {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  }

  /**
   * Intersect the raycaster ray with the unit sphere at world origin (the globe).
   * Returns the hit point in GLOBE LOCAL space, or null if no hit.
   */
  function rayHitGlobeLocal(raycaster: THREE.Raycaster): THREE.Vector3 | null {
    const ro = raycaster.ray.origin;
    const rd = raycaster.ray.direction;
    // Solve |ro + t*rd|^2 = 1 for smallest positive t
    const b = 2 * ro.dot(rd);
    const c = ro.lengthSq() - 1;
    const disc = b * b - 4 * c;
    if (disc < 0) return null;
    const t = (-b - Math.sqrt(disc)) / 2;
    if (t <= 0) return null;
    const hitWorld = ro.clone().addScaledVector(rd, t);
    // Convert world-space hit to globe-local space (un-applies globe rotation)
    return globe.worldToLocal(hitWorld);
  }

  /**
   * Given a raycaster, return the ME country profile key that the ray hits,
   * or null if no ME country polygon contains the hit point.
   * Uses globe-sphere intersection + lat/lng PIP — works for all countries.
   */
  function hitCountry(raycaster: THREE.Raycaster): string | null {
    if (meCountryPolygons.length === 0) return null;
    const localPt = rayHitGlobeLocal(raycaster);
    if (!localPt) return null;
    const { lat, lng } = globeLocalToLatLng(localPt);
    for (const country of meCountryPolygons) {
      for (const ring of country.rings) {
        if (pipTest(lng, lat, ring)) return country.profileKey;
      }
    }
    return null;
  }

  // Core globe — centered on the Middle East, closer initial zoom,
  // with all world borders rendered very dim (ME overlay adds bright ones)
  const core = createGlobeCore(container, {
    initialCameraZ: 2.2,
    initialLat: 30,
    initialLon: 45,
    highlightCountries: [...ME_GEO_NAMES],
    getBorderStyle: (_name: string) => ({ color: 0x1e3a5f, opacity: 0.07 }),
    shouldResumeAutoRotate: () => true,
    onCanvasHover: (raycaster, event) => checkHover(raycaster, event),
    onCanvasClick: (raycaster, _event) => checkClick(raycaster),
  });

  const { globe, camera: coreCamera, renderer } = core;

  // ── Markers ────────────────────────────────────────────────────────────────

  type MarkerItem = {
    ring: THREE.Mesh;
    dot: THREE.Mesh;
    pulse: THREE.Mesh;
    base: MiddleEastBase;
    index: number;
  };

  const markers: MarkerItem[] = [];

  // systemIndex → THREE.Group containing that system's ring + fill + label
  const systemRings = new Map<number, THREE.Group>();

  // Strike arc animation state
  let strikeArcsGroup: THREE.Group | null = null;
  const strikeTravelDots: Array<{
    curve: THREE.QuadraticBezierCurve3;
    dot: THREE.Mesh;
    offset: number;
  }> = [];
  const strikeTargetRings: THREE.Mesh[] = [];

  function createMarkers() {
    MIDDLE_EAST_BASES.forEach((base, i) => {
      const pos = latLngToVector3(base.lat, base.lon, 1.013);
      const position = new THREE.Vector3(pos.x, pos.y, pos.z);
      const color = new THREE.Color(getBaseColor(base));

      // Domestic → smooth circle (16 segs); US/allied → diamond (4 segs, rotated 45°)
      const isDomestic = base.type === "domestic";
      const segs = isDomestic ? 16 : 4;
      const rotZ = isDomestic ? 0 : Math.PI / 4;

      function placed(mesh: THREE.Mesh) {
        mesh.position.copy(position);
        mesh.lookAt(position.clone().multiplyScalar(2));
        if (rotZ !== 0) mesh.rotateZ(rotZ);
        globe.add(mesh);
        return mesh;
      }

      const ring = placed(
        new THREE.Mesh(
          new THREE.RingGeometry(RING_INNER, RING_OUTER, segs),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide,
          })
        )
      );
      ring.userData = { markerIndex: i };

      const dot = placed(
        new THREE.Mesh(
          new THREE.CircleGeometry(DOT_R, segs),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.92,
            side: THREE.DoubleSide,
          })
        )
      );
      dot.userData = { markerIndex: i };

      const pulse = placed(
        new THREE.Mesh(
          new THREE.RingGeometry(PULSE_INNER, PULSE_OUTER, segs),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
          })
        )
      );
      pulse.userData = { markerIndex: i };

      markers.push({ ring, dot, pulse, base, index: i });
    });
  }

  // ── Country labels (Sprites) ───────────────────────────────────────────────

  const labelSprites: THREE.Sprite[] = [];

  function createCountryLabels() {
    ME_LABELS.forEach(({ lat, lon, text }) => {
      const canvas = document.createElement("canvas");
      // Width sized for longest label ("SAUDI ARABIA"); height for one line
      canvas.width = 256;
      canvas.height = 40;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 256, 40);
      // JetBrains Mono loaded via CSS; fallback to system monospace
      ctx.font = '500 11px "JetBrains Mono", "Courier New", monospace';
      ctx.fillStyle = "rgba(203, 213, 225, 0.88)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 128, 20);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,          // animated — starts invisible
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      // Aspect ratio matches canvas: 256:40 = 6.4:1
      sprite.scale.set(0.2, 0.031, 1);
      sprite.renderOrder = 2;

      const p = latLngToVector3(lat, lon, 1.038);
      sprite.position.set(p.x, p.y, p.z);
      globe.add(sprite);
      labelSprites.push(sprite);
    });
  }

  // ── ME border + fill overlay ───────────────────────────────────────────────

  let meOverlayGroup: THREE.Group | null = null;

  function addMEBorderOverlay(geojson: any) {
    // Clean up previous overlay if called again
    if (meOverlayGroup) {
      globe.remove(meOverlayGroup);
      meOverlayGroup.traverse((child) => {
        if ("geometry" in child) (child as THREE.Mesh).geometry?.dispose();
        if ("material" in child) {
          const m = (child as THREE.Mesh).material;
          if (m && !Array.isArray(m)) (m as THREE.Material).dispose();
        }
      });
    }
    meCountryPolygons.length = 0;
    countryFillMaterials.clear();
    selectedCountryGeo = null;

    meOverlayGroup = new THREE.Group();
    globe.add(meOverlayGroup);

    const features: any[] = geojson.features || [];
    features.forEach((feature) => {
      const geom = feature.geometry;
      if (!geom) return;
      const adminName: string =
        feature.properties?.ADMIN ||
        feature.properties?.SOVEREIGNT ||
        feature.properties?.NAME ||
        "";
      if (!ME_GEO_NAMES.has(adminName)) return;

      // ── Collect outer rings for lat/lng PIP click detection ──
      {
        const pipKey = GEO_TO_PROFILE[adminName] ?? adminName;
        const pipRings: number[][][] = [];
        if (geom.type === "Polygon") {
          pipRings.push(geom.coordinates[0] as number[][]);
        } else if (geom.type === "MultiPolygon") {
          (geom.coordinates as number[][][][]).forEach((poly) =>
            pipRings.push(poly[0])
          );
        }
        if (pipRings.length > 0) {
          meCountryPolygons.push({ profileKey: pipKey, rings: pipRings });
        }
      }

      const borderHex = ME_BORDER_HEX[adminName] ?? 0x7dd3fc;
      const borderColor = new THREE.Color(borderHex);

      // Densify a ring by inserting intermediate points along edges longer than maxDeg degrees.
      // Returns an open ring (no closing duplicate).
      function densifyRing(ring: number[][], maxDeg: number): number[][] {
        const out: number[][] = [];
        const n = ring.length - 1; // exclude closing duplicate
        for (let i = 0; i < n; i++) {
          const [x0, y0] = ring[i];
          const [x1, y1] = ring[(i + 1) % n];
          const dx = x1 - x0, dy = y1 - y0;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const steps = Math.max(1, Math.ceil(dist / maxDeg));
          out.push(ring[i]);
          for (let s = 1; s < steps; s++) {
            const t = s / steps;
            out.push([x0 + dx * t, y0 + dy * t]);
          }
        }
        return out;
      }

      const processPolygon = (coords: number[][][]) => {
        // ── Border lines and glow for every ring ──
        coords.forEach((ring) => {
          const n = ring.length - 1; // exclude closing duplicate
          if (n < 2) return;

          const linePts: THREE.Vector3[] = [];
          for (let k = 0; k <= n; k++) {
            const [lng, lat] = ring[k % n];
            const p = latLngToVector3(lat, lng, 1.0035);
            linePts.push(new THREE.Vector3(p.x, p.y, p.z));
          }
          meOverlayGroup!.add(
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(linePts),
              new THREE.LineBasicMaterial({
                color: borderColor,
                transparent: true,
                opacity: 0.88,
                depthWrite: false,
              })
            )
          );

          const glowPts: THREE.Vector3[] = [];
          for (let k = 0; k <= n; k++) {
            const [lng, lat] = ring[k % n];
            const p = latLngToVector3(lat, lng, 1.005);
            glowPts.push(new THREE.Vector3(p.x, p.y, p.z));
          }
          meOverlayGroup!.add(
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(glowPts),
              new THREE.LineBasicMaterial({
                color: borderColor,
                transparent: true,
                opacity: 0.22,
                depthWrite: false,
              })
            )
          );
        });

        // ── Earcut fill mesh for the whole polygon (outer ring + holes) ──
        if ((coords[0]?.length ?? 0) - 1 < 3) return;

        const MAX_DEG = 1.0; // insert extra points on edges longer than 1°
        const outerPts = densifyRing(coords[0], MAX_DEG);
        const holePts = coords.slice(1).map((h) => densifyRing(h, MAX_DEG));

        const flatCoords: number[] = [];
        const holeIndices: number[] = [];

        for (const [lng, lat] of outerPts) flatCoords.push(lng, lat);
        for (const hole of holePts) {
          holeIndices.push(flatCoords.length / 2);
          for (const [lng, lat] of hole) flatCoords.push(lng, lat);
        }

        const triIdx = earcut(flatCoords, holeIndices.length > 0 ? holeIndices : undefined, 2);
        if (triIdx.length === 0) return;

        const totalPts = flatCoords.length / 2;
        const verts: number[] = [];
        for (let i = 0; i < totalPts; i++) {
          const lng = flatCoords[i * 2];
          const lat = flatCoords[i * 2 + 1];
          const p = latLngToVector3(lat, lng, 1.001);
          verts.push(p.x, p.y, p.z);
        }

        const fillGeo = new THREE.BufferGeometry();
        fillGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        fillGeo.setIndex(triIdx);

        const fillMat = new THREE.MeshBasicMaterial({
          color: borderColor,
          transparent: true,
          opacity: 0.06,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const fillMesh = new THREE.Mesh(fillGeo, fillMat);
        meOverlayGroup!.add(fillMesh);
        if (!countryFillMaterials.has(adminName)) countryFillMaterials.set(adminName, []);
        countryFillMaterials.get(adminName)!.push(fillMat);
      };

      if (geom.type === "Polygon") {
        processPolygon(geom.coordinates as number[][][]);
      } else if (geom.type === "MultiPolygon") {
        (geom.coordinates as number[][][][]).forEach((poly) =>
          processPolygon(poly)
        );
      }
    });
  }

  // ── Visibility ─────────────────────────────────────────────────────────────

  function isVisible(base: MiddleEastBase): boolean {
    if (activeFilter !== "all" && base.type !== activeFilter) return false;
    if (activeCountry && base.country !== activeCountry) return false;
    return true;
  }

  function updateVisibility() {
    markers.forEach((m) => {
      const vis = isVisible(m.base);
      m.ring.visible = vis;
      m.dot.visible = vis;
      m.pulse.visible = vis;
    });
  }

  // ── Per-system range visualization ─────────────────────────────────────────

  const EARTH_R_KM = 6371;

  /** Geodesic great-circle points at `rangeKm` from `(centerLat, centerLon)`. */
  function buildRingPoints(
    centerLat: number,
    centerLon: number,
    rangeKm: number,
    radius = 1.004,
    segments = 128
  ): THREE.Vector3[] {
    const lat0 = (centerLat * Math.PI) / 180;
    const lon0 = (centerLon * Math.PI) / 180;
    const angR = rangeKm / EARTH_R_KM;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const bearing = (i / segments) * 2 * Math.PI;
      const lat = Math.asin(
        Math.sin(lat0) * Math.cos(angR) +
          Math.cos(lat0) * Math.sin(angR) * Math.cos(bearing)
      );
      const lon =
        lon0 +
        Math.atan2(
          Math.sin(bearing) * Math.sin(angR) * Math.cos(lat0),
          Math.cos(angR) - Math.sin(lat0) * Math.sin(lat)
        );
      const p = latLngToVector3(
        (lat * 180) / Math.PI,
        (lon * 180) / Math.PI,
        radius
      );
      pts.push(new THREE.Vector3(p.x, p.y, p.z));
    }
    return pts;
  }

  function disposeGroup(group: THREE.Group) {
    globe.remove(group);
    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      } else if ((child as THREE.Line).isLine) {
        const l = child as THREE.Line;
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      } else if ((child as THREE.Sprite).isSprite) {
        const s = child as THREE.Sprite;
        const mat = s.material as THREE.SpriteMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
    });
  }

  function buildRingLabel(
    base: MiddleEastBase,
    sys: MissileSystem
  ): THREE.Sprite {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 28;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 240, 28);
    ctx.font = '500 10px "JetBrains Mono", "Courier New", monospace';
    ctx.fillStyle = getBaseColor(base);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`${sys.name}  ${sys.range_km.toLocaleString()} km`, 6, 14);
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(0.21, 0.025, 1);
    sprite.renderOrder = 3;
    return sprite;
  }

  function showSystemRangeImpl(base: MiddleEastBase, sysIdx: number) {
    // Clear any existing ring at this slot first
    const existing = systemRings.get(sysIdx);
    if (existing) disposeGroup(existing);

    const sys = base.systems[sysIdx];
    if (!sys || sys.range_km <= 0) return;

    const group = new THREE.Group();
    const color = new THREE.Color(getBaseColor(base));

    // ── Crisp outline ──
    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          buildRingPoints(base.lat, base.lon, sys.range_km, 1.004)
        ),
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
        })
      )
    );

    // ── Subtle fill via sphere-cap shader (single dome, very low alpha) ──
    const angularRadius = sys.range_km / EARTH_R_KM;
    const d = latLngToVector3(base.lat, base.lon, 1);
    const centerDir = new THREE.Vector3(d.x, d.y, d.z).normalize();
    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.002, 64, 32),
        new THREE.ShaderMaterial({
          uniforms: {
            uCenterDir: { value: centerDir },
            uCosRadius: { value: Math.cos(angularRadius) },
            uColor: { value: color },
          },
          vertexShader: `
            varying float vDot;
            uniform vec3 uCenterDir;
            void main() {
              vDot = dot(normalize(position), normalize(uCenterDir));
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying float vDot;
            uniform float uCosRadius;
            uniform vec3 uColor;
            void main() {
              if (vDot < uCosRadius) discard;
              gl_FragColor = vec4(uColor, 0.055);
            }
          `,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      )
    );

    // ── Label at east bearing of the ring ──
    const labelPts = buildRingPoints(base.lat, base.lon, sys.range_km, 1.048, 4);
    const sprite = buildRingLabel(base, sys);
    sprite.position.copy(labelPts[1]); // index 1 = bearing π/2 = east
    group.add(sprite);

    globe.add(group);
    systemRings.set(sysIdx, group);
  }

  function hideSystemRangeImpl(sysIdx: number) {
    const group = systemRings.get(sysIdx);
    if (!group) return;
    disposeGroup(group);
    systemRings.delete(sysIdx);
  }

  function clearAllRangesImpl() {
    [...systemRings.keys()].forEach(hideSystemRangeImpl);
  }

  function setSelectedCountryImpl(profileKey: string | null) {
    // Reset all fills to base opacity
    countryFillMaterials.forEach((mats) => {
      mats.forEach((m) => { m.opacity = 0.06; });
    });
    selectedCountryGeo = null;
    if (profileKey === null) return;

    // Find the GeoJSON name that maps to this profile key
    const geoName =
      Object.entries(GEO_TO_PROFILE).find(([, pk]) => pk === profileKey)?.[0] ??
      profileKey;
    selectedCountryGeo = geoName;

    const mats = countryFillMaterials.get(geoName);
    if (mats) mats.forEach((m) => { m.opacity = 0.22; });
  }

  // ── Strike arcs ────────────────────────────────────────────────────────────

  function clearStrikeArcsImpl() {
    if (strikeArcsGroup) {
      globe.remove(strikeArcsGroup);
      strikeArcsGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        } else if ((child as THREE.Line).isLine) {
          const l = child as THREE.Line;
          l.geometry.dispose();
          (l.material as THREE.Material).dispose();
        }
      });
      strikeArcsGroup = null;
    }
    strikeTravelDots.length = 0;
    strikeTargetRings.length = 0;
  }

  function showStrikeArcsImpl(strike: IranStrike) {
    clearStrikeArcsImpl();

    const arcColor = new THREE.Color(0xf97316);   // orange-500
    const dotColor = new THREE.Color(0xfbbf24);   // amber-400
    const targetColor = new THREE.Color(0xef4444); // red-500
    const surfaceR = 1.01;

    strikeArcsGroup = new THREE.Group();
    globe.add(strikeArcsGroup);

    let arcIndex = 0;
    strike.launchOrigins.forEach((origin) => {
      const startPos = latLngToVector3(origin.lat, origin.lng, surfaceR);
      const startVec = new THREE.Vector3(startPos.x, startPos.y, startPos.z);

      strike.targets.forEach((target) => {
        const endPos = latLngToVector3(target.lat, target.lng, surfaceR);
        const endVec = new THREE.Vector3(endPos.x, endPos.y, endPos.z);

        // Scale arc height with angular distance for long-range strikes
        const angDist = startVec.angleTo(endVec);
        const arcHeight = Math.min(0.55, 0.28 + angDist * 0.22);
        const midDir = new THREE.Vector3()
          .addVectors(startVec, endVec)
          .normalize();
        const midVec = midDir.multiplyScalar(surfaceR + arcHeight);

        const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
        const pts = curve.getPoints(80);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);

        // Main arc line
        strikeArcsGroup!.add(
          new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({
              color: arcColor,
              transparent: true,
              opacity: 0.55,
              depthWrite: false,
            })
          )
        );

        // Traveling dot — stored for animation
        const dotMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.008, 8, 8),
          new THREE.MeshBasicMaterial({
            color: dotColor,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          })
        );
        strikeArcsGroup!.add(dotMesh);
        strikeTravelDots.push({ curve, dot: dotMesh, offset: arcIndex * 0.43 });
        arcIndex++;
      });
    });

    // Origin dots
    strike.launchOrigins.forEach((origin) => {
      const pos = latLngToVector3(origin.lat, origin.lng, surfaceR);
      const mesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.007, 12),
        new THREE.MeshBasicMaterial({
          color: arcColor,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.lookAt(mesh.position.clone().multiplyScalar(2));
      strikeArcsGroup!.add(mesh);
    });

    // Target impact markers + pulsing rings
    strike.targets.forEach((target) => {
      const pos = latLngToVector3(target.lat, target.lng, surfaceR);
      const posVec = new THREE.Vector3(pos.x, pos.y, pos.z);

      // Inner dot
      const dot = new THREE.Mesh(
        new THREE.CircleGeometry(0.006, 12),
        new THREE.MeshBasicMaterial({
          color: targetColor,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      dot.position.copy(posVec);
      dot.lookAt(posVec.clone().multiplyScalar(2));
      strikeArcsGroup!.add(dot);

      // Pulsing outer ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.010, 0.016, 24),
        new THREE.MeshBasicMaterial({
          color: targetColor,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      ring.position.copy(posVec);
      ring.lookAt(posVec.clone().multiplyScalar(2));
      strikeArcsGroup!.add(ring);
      strikeTargetRings.push(ring);
    });
  }

  // ── Raycasting ─────────────────────────────────────────────────────────────

  function visibleMeshes(): THREE.Mesh[] {
    return markers
      .filter((m) => m.dot.visible)
      .flatMap((m) => [m.ring, m.dot]);
  }

  function checkHover(raycaster: THREE.Raycaster, event: MouseEvent) {
    // Markers take priority
    const markerHits = raycaster.intersectObjects(visibleMeshes());
    if (markerHits.length > 0) {
      const idx = (markerHits[0].object.userData as any).markerIndex as number | undefined;
      if (idx !== undefined && markers[idx]) {
        callbacks.onHoverBase(markers[idx].base, {
          x: event.clientX + 14,
          y: event.clientY - 10,
        });
        renderer.domElement.style.cursor = "pointer";
        return;
      }
    }
    callbacks.onHoverBase(null, null);

    // Globe surface → PIP: show pointer cursor over any ME country
    if (hitCountry(raycaster)) {
      renderer.domElement.style.cursor = "pointer";
      return;
    }

    renderer.domElement.style.cursor = "grab";
  }

  function checkClick(raycaster: THREE.Raycaster) {
    // 1. Markers have highest priority
    const markerHits = raycaster.intersectObjects(visibleMeshes());
    if (markerHits.length > 0) {
      const idx = (markerHits[0].object.userData as any).markerIndex as number | undefined;
      if (idx !== undefined && markers[idx]) {
        const { base } = markers[idx];
        clearAllRangesImpl();
        callbacks.onSelectBase(base);
        core.cancelAutoRotateResume();
        core.setAutoRotate(false);
        core.centerGlobeOn(base.lat, base.lon);
        return;
      }
    }

    // 2. Globe surface → lat/lng PIP → ME country (works for all countries including Iran & Saudi Arabia)
    const countryKey = hitCountry(raycaster);
    if (countryKey) {
      callbacks.onSelectCountry(countryKey);
      return;
    }

    // 3. Empty space — close all panels
    callbacks.onClickEmpty();
  }

  // ── Animation: zoom-scaling + pulse + label fade ───────────────────────────

  core.addAnimationCallback("me-markers", (time) => {
    const camZ = coreCamera.position.z;

    // Zoom-dependent scale: bigger when close, smaller when far.
    // [1.8 → 1.3×] … [3.0 → 1.0×] … [6.0 → 0.45×]
    const t = Math.max(0, Math.min(1, (camZ - 1.8) / (6.0 - 1.8)));
    const zoomScale = 1.05 - t * 0.45;

    markers.forEach((m, i) => {
      if (!m.dot.visible) return;

      m.ring.scale.set(zoomScale, zoomScale, 1);
      m.dot.scale.set(zoomScale, zoomScale, 1);

      // Pulse: domestic sites pulse faster and more visibly
      const speed = m.base.type === "domestic" ? 2.2 : 1.5;
      const sinVal = Math.sin(time * speed + i * 0.6);
      const pScale = zoomScale * (1 + sinVal * 0.9);
      m.pulse.scale.set(pScale, pScale, 1);
      const pMat = m.pulse.material as THREE.MeshBasicMaterial;
      pMat.opacity = 0.45 * Math.max(0, 1 - Math.abs(sinVal) * 0.8);
    });

    // Labels: fully visible below camZ 2.8, fully gone above camZ 4.2
    const labelAlpha = 1 - Math.max(0, Math.min(1, (camZ - 2.8) / (4.2 - 2.8)));
    labelSprites.forEach((sprite) => {
      (sprite.material as THREE.SpriteMaterial).opacity = labelAlpha;
    });

    // Strike arc animations
    if (strikeArcsGroup) {
      const PERIOD = 3.5;
      const EDGE = 0.10;
      strikeTravelDots.forEach((item) => {
        const raw = ((time + item.offset) % PERIOD) / PERIOD;
        const pos = item.curve.getPoint(raw);
        item.dot.position.copy(pos);
        const mat = item.dot.material as THREE.MeshBasicMaterial;
        mat.opacity =
          raw < EDGE ? raw / EDGE : raw > 1 - EDGE ? (1 - raw) / EDGE : 0.95;
      });
      strikeTargetRings.forEach((ring, i) => {
        const s = 1 + 0.55 * Math.sin(time * 2.4 + i * 1.4);
        ring.scale.setScalar(s);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.25 + 0.35 * Math.max(0, Math.sin(time * 2.4 + i * 1.4));
      });
    }
  });

  // ── Initialise ────────────────────────────────────────────────────────────

  createMarkers();
  createCountryLabels();
  updateVisibility();

  // ── Public API ────────────────────────────────────────────────────────────

  return {
    addCountryBorders(geojson: any) {
      core.addCountryBorders(geojson); // dim world backdrop via getBorderStyle
      addMEBorderOverlay(geojson);     // bright ME borders + fills
    },
    setFilter(filter) {
      activeFilter = filter;
      updateVisibility();
    },
    setActiveCountry(country) {
      activeCountry = country;
      updateVisibility();
    },
    centerGlobeOn: core.centerGlobeOn,
    scheduleAutoRotateResume: core.scheduleAutoRotateResume,
    flyCameraToDefault: core.flyCameraToDefault,
    showSystemRange: showSystemRangeImpl,
    hideSystemRange: hideSystemRangeImpl,
    clearAllRanges: clearAllRangesImpl,
    showStrikeArcs: showStrikeArcsImpl,
    clearStrikeArcs: clearStrikeArcsImpl,
    setSelectedCountry: setSelectedCountryImpl,
    dispose() {
      clearAllRangesImpl();
      clearStrikeArcsImpl();
      core.removeAnimationCallback("me-markers");
      if (meOverlayGroup) {
        globe.remove(meOverlayGroup);
        meOverlayGroup = null;
      }
      labelSprites.forEach((s) => {
        const mat = s.material as THREE.SpriteMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      labelSprites.length = 0;
      core.dispose();
    },
  };
}
