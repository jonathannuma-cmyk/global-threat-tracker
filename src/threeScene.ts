import * as THREE from "three";
import {
  Facility,
  FacilityType,
  facilities,
  COUNTRY_COLORS,
  COUNTRY_CENTERS,
  latLngToVector3,
  vector3ToLatLng,
  SUBMARINE_PATROLS,
  type SubmarinePatrol,
  type MajorCity,
} from "./data";
import { createGlobeCore } from "./globeCore";

export type FilterType = FacilityType | "all";

export interface ThreatTarget {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export interface SceneCallbacks {
  onSelectFacility: (facility: Facility) => void;
  onHoverFacility: (
    facility: Facility | null,
    pos: { x: number; y: number } | null
  ) => void;
  onCityClick?: (city: MajorCity) => void;
}

export interface SceneApi {
  setFilter: (filter: FilterType) => void;
  setCountry: (country: string | null) => void;
  setWarheadsByYear: (byCountry: Record<string, number>) => void;
  addCountryBorders: (geojson: any) => void;
  showRangeForFacility: (facility: Facility | null) => void;
  showTargetsForFacility: (facility: Facility | null) => void;
  setThreatMode: (active: boolean) => void;
  setThreatTarget: (target: ThreatTarget | null) => void;
  setThreatArcs: (facilityList: Facility[]) => void;
  setThreatRangeDomes: (facilityList: Facility[]) => void;
  setCities: (cities: MajorCity[]) => void;
  setHistoricMode: (active: boolean) => void;
  setHistoricWarheads: (byCountry: Record<string, number>) => void;
  flashAt: (lat: number, lng: number) => void;
  centerGlobeOn: (lat: number, lng: number) => void;
  scheduleAutoRotateResume: () => void;
  flyCameraToDefault: () => Promise<void>;
  dispose: () => void;
}

export function createThreeScene(
  container: HTMLDivElement,
  callbacks: SceneCallbacks,
  options?: { initialCameraZ?: number }
): SceneApi {
  // ── Nuclear-specific state ───────────────────────────────────────────────────

  let activeFilter: FilterType = "all";
  let activeCountry: string | null = null;
  let selectedFacility: Facility | null = null;
  let threatMode = false;
  let threatTarget: ThreatTarget | null = null;
  let historicMode = false;

  const points: {
    ring: THREE.Mesh;
    dot: THREE.Mesh;
    pulse: THREE.Mesh;
    facility: Facility;
    yearScale: number;
  }[] = [];

  let rangeDomesGroup: THREE.Group | null = null;
  let targetArcsGroup: THREE.Group | null = null;
  let threatMarkerGroup: THREE.Group | null = null;
  let threatArcsGroup: THREE.Group | null = null;
  let patrolGroup: THREE.Group | null = null;
  let cityMarkers: { mesh: THREE.Mesh; city: MajorCity }[] = [];
  let cityMarkersGroup: THREE.Group | null = null;
  let countryMarkersGroup: THREE.Group | null = null;
  const countryMarkerItems: {
    ring: THREE.Mesh;
    pulse: THREE.Mesh;
    outerRing: THREE.Mesh;
    country: string;
  }[] = [];
  let flashGroup: THREE.Group | null = null;
  const flashItems: { mesh: THREE.Mesh; startTime: number }[] = [];
  const patrolItems: {
    patrol: SubmarinePatrol;
    pathLine: THREE.Line;
    subMesh: THREE.Mesh;
    pathVecs: THREE.Vector3[];
    currentLat: number;
    currentLng: number;
  }[] = [];

  // ── Core globe ───────────────────────────────────────────────────────────────

  const core = createGlobeCore(container, {
    initialCameraZ: options?.initialCameraZ,
    shouldResumeAutoRotate: () => !threatMode,
    onCanvasHover: (raycaster, event) => checkHover(raycaster, event),
    onCanvasClick: (raycaster, event) => checkClick(raycaster, event),
  });

  const { globe, renderer } = core;

  // ── Facility markers ─────────────────────────────────────────────────────────

  function createFacilityPoints() {
    facilities.forEach((f, i) => {
      const pos = latLngToVector3(f.lat, f.lng, 1.01);
      const position = new THREE.Vector3(pos.x, pos.y, pos.z);
      const color = new THREE.Color(COUNTRY_COLORS[f.country] || "#ffffff");

      // Storage/test sites render at 50% of primary marker size
      const s = f.type === "storage" || f.type === "test" ? 0.5 : 1.0;

      const ringGeo = new THREE.RingGeometry(0.015 * s, 0.025 * s, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(position);
      ring.lookAt(position.clone().multiplyScalar(2));
      ring.userData = { facilityIndex: i };
      globe.add(ring);

      const dotGeo = new THREE.CircleGeometry(0.015 * s, 12);
      const dotMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(position);
      dot.lookAt(position.clone().multiplyScalar(2));
      dot.userData = { facilityIndex: i };
      globe.add(dot);

      const pulseGeo = new THREE.RingGeometry(0.014 * s, 0.018 * s, 16);
      const pulseMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(position);
      pulse.lookAt(position.clone().multiplyScalar(2));
      pulse.userData = { facilityIndex: i, isPulse: true };
      globe.add(pulse);

      points.push({ ring, dot, pulse, facility: f, yearScale: 1 });
    });
  }

  function setWarheadsByYear(byCountry: Record<string, number>) {
    points.forEach((p) => {
      const count = byCountry[p.facility.country] ?? 0;
      // Binary scale: hide markers for countries with no weapons yet
      const scale = count === 0 ? 0 : 1;
      p.yearScale = scale;
      p.ring.scale.set(scale, scale, 1);
      p.dot.scale.set(scale, scale, 1);
    });
  }

  // ── Patrol visuals ───────────────────────────────────────────────────────────

  function patrolToFacility(
    patrol: SubmarinePatrol,
    lat: number,
    lng: number
  ): Facility {
    return {
      name: patrol.name,
      country: patrol.country,
      lat,
      lng,
      type: "submarine",
      missiles: patrol.missiles,
      warheads: patrol.warheads,
      range: patrol.range,
      status: "Patrol",
      baseName: patrol.baseName,
    };
  }

  function createPatrolVisuals() {
    if (!globe) return;
    const group = new THREE.Group();
    patrolGroup = group;
    globe.add(group);
    const radius = 1.005;

    SUBMARINE_PATROLS.forEach((patrol) => {
      if (patrol.waypoints.length < 2) return;
      const color = new THREE.Color(COUNTRY_COLORS[patrol.country] || "#ffffff");
      const pathPoints = patrol.waypoints.map((w) => {
        const p = latLngToVector3(w.lat, w.lng, radius);
        return new THREE.Vector3(p.x, p.y, p.z);
      });
      pathPoints.push(pathPoints[0].clone());
      const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
      const pathMat = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity: 0.15,
        dashSize: 0.015,
        gapSize: 0.01,
      });
      const pathLine = new THREE.Line(pathGeo, pathMat);
      pathLine.computeLineDistances();
      group.add(pathLine);

      const subGeo = new THREE.ConeGeometry(0.012, 0.028, 4);
      const subMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const subMesh = new THREE.Mesh(subGeo, subMat);
      subMesh.userData = { patrolIndex: patrolItems.length, isPatrolSub: true };
      const first = pathPoints[0];
      subMesh.position.copy(first);
      subMesh.lookAt(first.clone().multiplyScalar(2));
      group.add(subMesh);

      const pathVecs = patrol.waypoints.map((w) => {
        const p = latLngToVector3(w.lat, w.lng, radius);
        return new THREE.Vector3(p.x, p.y, p.z);
      });
      const w0 = patrol.waypoints[0];
      patrolItems.push({
        patrol,
        pathLine,
        subMesh,
        pathVecs,
        currentLat: w0.lat,
        currentLng: w0.lng,
      });
    });
  }

  function updatePatrolVisibility() {
    if (!patrolGroup) return;
    const show =
      (activeFilter === "all" || activeFilter === "submarine") &&
      (!activeCountry ||
        SUBMARINE_PATROLS.some((p) => p.country === activeCountry));
    patrolGroup.visible = show;
    if (!show) return;
    patrolItems.forEach((item) => {
      const countryMatch = !activeCountry || item.patrol.country === activeCountry;
      item.pathLine.visible = countryMatch;
      item.subMesh.visible = countryMatch;
    });
  }

  // ── City markers ─────────────────────────────────────────────────────────────

  function clearCityMarkers() {
    if (cityMarkersGroup && globe) {
      globe.remove(cityMarkersGroup);
      cityMarkersGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      cityMarkersGroup = null;
    }
    cityMarkers = [];
  }

  function createCityMarkers(cities: MajorCity[]) {
    if (!globe) return;
    clearCityMarkers();
    const group = new THREE.Group();
    group.visible = false;
    cityMarkersGroup = group;
    globe.add(group);
    const radius = 1.013;
    cities.forEach((city, i) => {
      const pos = latLngToVector3(city.lat, city.lng, radius);
      const posVec = new THREE.Vector3(pos.x, pos.y, pos.z);
      const geo = new THREE.CircleGeometry(0.013, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(posVec);
      mesh.lookAt(posVec.clone().multiplyScalar(2));
      mesh.rotateZ(Math.PI / 4);
      mesh.userData = { cityIndex: i };
      group.add(mesh);
      cityMarkers.push({ mesh, city });
    });
  }

  // ── Country markers (historic mode) ─────────────────────────────────────────

  function clearCountryMarkers() {
    if (countryMarkersGroup && globe) {
      globe.remove(countryMarkersGroup);
      countryMarkersGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      countryMarkersGroup = null;
    }
    countryMarkerItems.length = 0;
  }

  function createCountryMarkersGroup() {
    if (!globe) return;
    clearCountryMarkers();
    const group = new THREE.Group();
    group.visible = false;
    countryMarkersGroup = group;
    globe.add(group);
    const radius = 1.015;

    Object.entries(COUNTRY_CENTERS).forEach(([country, center]) => {
      const pos = latLngToVector3(center.lat, center.lng, radius);
      const posVec = new THREE.Vector3(pos.x, pos.y, pos.z);
      const color = new THREE.Color(COUNTRY_COLORS[country] || "#ffffff");

      const outerRingGeo = new THREE.RingGeometry(0.04, 0.055, 32);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.position.copy(posVec);
      outerRing.lookAt(posVec.clone().multiplyScalar(2));
      group.add(outerRing);

      const ringGeo = new THREE.RingGeometry(0.018, 0.032, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(posVec);
      ring.lookAt(posVec.clone().multiplyScalar(2));
      group.add(ring);

      const pulseGeo = new THREE.RingGeometry(0.016, 0.022, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(posVec);
      pulse.lookAt(posVec.clone().multiplyScalar(2));
      group.add(pulse);

      countryMarkerItems.push({ ring, pulse, outerRing, country });
    });
  }

  function updateCountryMarkerScales(byCountry: Record<string, number>) {
    const counts = countryMarkerItems.map((m) => byCountry[m.country] ?? 0);
    const max = Math.max(...counts, 1);
    countryMarkerItems.forEach((item, i) => {
      const count = counts[i];
      if (count === 0) {
        item.ring.visible = false;
        item.pulse.visible = false;
        item.outerRing.visible = false;
        return;
      }
      item.ring.visible = true;
      item.pulse.visible = true;
      item.outerRing.visible = true;
      const logScale = Math.log(count + 1) / Math.log(max + 1);
      const s = 0.35 + logScale * 0.65;
      item.ring.scale.set(s, s, 1);
      item.outerRing.scale.set(s, s, 1);
    });
  }

  // ── Flash effect ─────────────────────────────────────────────────────────────

  function flashAtImpl(lat: number, lng: number) {
    if (!globe) return;
    if (!flashGroup) {
      flashGroup = new THREE.Group();
      globe.add(flashGroup);
    }
    const pos = latLngToVector3(lat, lng, 1.015);
    const posVec = new THREE.Vector3(pos.x, pos.y, pos.z);
    const geo = new THREE.RingGeometry(0.0, 0.025, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.position.copy(posVec);
    ring.lookAt(posVec.clone().multiplyScalar(2));
    flashGroup.add(ring);
    flashItems.push({ mesh: ring, startTime: Date.now() });
  }

  function updateFlashItems() {
    const now = Date.now();
    for (let i = flashItems.length - 1; i >= 0; i--) {
      const item = flashItems[i];
      const elapsed = (now - item.startTime) / 1800;
      if (elapsed >= 1) {
        flashGroup?.remove(item.mesh);
        item.mesh.geometry.dispose();
        (item.mesh.material as THREE.Material).dispose();
        flashItems.splice(i, 1);
      } else {
        const s = 1 + elapsed * 4;
        item.mesh.scale.set(s, s, 1);
        const mat = item.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.9 * (1 - elapsed);
      }
    }
  }

  // ── Visibility ───────────────────────────────────────────────────────────────

  function isVisible(f: Facility) {
    if (activeFilter !== "all" && f.type !== activeFilter) return false;
    if (activeCountry && f.country !== activeCountry) return false;
    return true;
  }

  function updatePointVisibility() {
    points.forEach((p) => {
      const vis = !historicMode && isVisible(p.facility) && p.yearScale > 0;
      p.ring.visible = vis;
      p.dot.visible = vis;
      p.pulse.visible = vis;
    });
    if (patrolGroup) patrolGroup.visible = !historicMode;
    if (!historicMode) updatePatrolVisibility();
  }

  // ── Range domes ──────────────────────────────────────────────────────────────

  function clearRangeDomes() {
    if (rangeDomesGroup && globe) {
      globe.remove(rangeDomesGroup);
      rangeDomesGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      });
      rangeDomesGroup = null;
    }
  }

  function addRangeDome(f: Facility) {
    if (!f.range) return;
    const radius = 1.02;
    const angularRadius = f.range / 6371;
    const d = latLngToVector3(f.lat, f.lng, 1);
    const centerDir = new THREE.Vector3(d.x, d.y, d.z).normalize();
    const domeGeo = new THREE.SphereGeometry(radius, 64, 64);
    const uniforms = {
      uCenterDir: { value: centerDir },
      uCosRadius: { value: Math.cos(angularRadius) },
    };
    const domeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying float vDot;
        uniform vec3 uCenterDir;
        void main() {
          vec3 n = normalize(position);
          vDot = dot(n, normalize(uCenterDir));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vDot;
        uniform float uCosRadius;
        void main() {
          float edgeDist = vDot - uCosRadius;
          if (edgeDist < 0.0) discard;
          float edgeWidth = 0.015;
          float alpha;
          if (edgeDist < edgeWidth) {
            alpha = 0.7;
          } else {
            alpha = 0.08;
          }
          gl_FragColor = vec4(0.93, 0.27, 0.27, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    rangeDomesGroup?.add(dome);
  }

  function showRangeForFacilityImpl(f: Facility | null) {
    clearRangeDomes();
    if (!f || !f.range) return;
    rangeDomesGroup = new THREE.Group();
    globe.add(rangeDomesGroup);
    addRangeDome(f);
  }

  // ── Target arcs ──────────────────────────────────────────────────────────────

  function clearTargetArcs() {
    if (targetArcsGroup && globe) {
      globe.remove(targetArcsGroup);
      targetArcsGroup.children.forEach((child) => {
        if (child instanceof THREE.Line || child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      targetArcsGroup = null;
    }
  }

  function showTargetsForFacilityImpl(f: Facility | null) {
    clearTargetArcs();
    if (!f || !f.likelyTargets?.length) return;

    const radius = 1.01;
    const midRadius = 1.01 + 0.3;
    const startPos = latLngToVector3(f.lat, f.lng, radius);
    const startVec = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    const countryColor = new THREE.Color(COUNTRY_COLORS[f.country] || "#ffffff");

    targetArcsGroup = new THREE.Group();
    globe.add(targetArcsGroup);

    f.likelyTargets.forEach((target) => {
      const endPos = latLngToVector3(target.lat, target.lng, radius);
      const endVec = new THREE.Vector3(endPos.x, endPos.y, endPos.z);
      const midDir = new THREE.Vector3().addVectors(startVec, endVec).normalize();
      const midVec = midDir.multiplyScalar(midRadius);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: countryColor,
        transparent: true,
        opacity: 0.6,
      });
      targetArcsGroup!.add(new THREE.Line(geo, mat));

      const diamondGeo = new THREE.OctahedronGeometry(0.018, 0);
      const diamondMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.95,
      });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.copy(endVec);
      diamond.lookAt(endVec.clone().multiplyScalar(2));
      diamond.userData = { isTargetDiamond: true };
      targetArcsGroup!.add(diamond);
    });
  }

  // ── Threat marker ────────────────────────────────────────────────────────────

  function clearThreatMarker() {
    if (threatMarkerGroup && globe) {
      globe.remove(threatMarkerGroup);
      threatMarkerGroup.children.forEach((child) => {
        if (child instanceof THREE.Line || child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      threatMarkerGroup = null;
    }
  }

  function setThreatTargetImpl(target: ThreatTarget | null) {
    clearThreatMarker();
    threatTarget = target;
    if (!target) return;
    const radius = 1.01;
    const pos = latLngToVector3(target.lat, target.lng, radius);
    const posVec = new THREE.Vector3(pos.x, pos.y, pos.z);
    threatMarkerGroup = new THREE.Group();
    threatMarkerGroup.position.copy(posVec);
    threatMarkerGroup.lookAt(posVec.clone().multiplyScalar(2));
    const size = 0.035;
    const crossGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-size, 0, 0),
      new THREE.Vector3(size, 0, 0),
      new THREE.Vector3(0, -size, 0),
      new THREE.Vector3(0, size, 0),
    ]);
    const crossMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.9,
      linewidth: 1,
    });
    const crossLine = new THREE.LineSegments(crossGeo, crossMat);
    crossLine.userData = { isThreatMarker: true };
    threatMarkerGroup.add(crossLine);
    const ringGeo = new THREE.RingGeometry(0.012, 0.02, 16);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.userData = { isThreatMarker: true };
    threatMarkerGroup.add(ring);
    globe.add(threatMarkerGroup);
  }

  // ── Threat arcs ──────────────────────────────────────────────────────────────

  function clearThreatArcs() {
    if (threatArcsGroup && globe) {
      globe.remove(threatArcsGroup);
      threatArcsGroup.children.forEach((child) => {
        if (child instanceof THREE.Line || child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      threatArcsGroup = null;
    }
  }

  function setThreatArcsImpl(facilityList: Facility[]) {
    clearThreatArcs();
    if (!threatTarget || !facilityList.length) return;
    const radius = 1.01;
    const midRadius = 1.01 + 0.3;
    const endPos = latLngToVector3(threatTarget.lat, threatTarget.lng, radius);
    const endVec = new THREE.Vector3(endPos.x, endPos.y, endPos.z);
    threatArcsGroup = new THREE.Group();
    globe.add(threatArcsGroup);
    const redColor = new THREE.Color(0xef4444);
    facilityList.forEach((f) => {
      const startPos = latLngToVector3(f.lat, f.lng, radius);
      const startVec = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
      const midDir = new THREE.Vector3().addVectors(startVec, endVec).normalize();
      const midVec = midDir.clone().multiplyScalar(midRadius);
      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      const pts = curve.getPoints(48);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: redColor,
        transparent: true,
        opacity: 0.7,
        linewidth: 1,
      });
      threatArcsGroup!.add(new THREE.Line(geo, mat));

      const dotGeo = new THREE.CircleGeometry(0.006, 12);
      const dotMat = new THREE.MeshBasicMaterial({
        color: redColor,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(startVec);
      dot.lookAt(startVec.clone().multiplyScalar(2));
      threatArcsGroup!.add(dot);
    });
  }

  function setThreatRangeDomesImpl(facilityList: Facility[]) {
    clearRangeDomes();
    if (!facilityList.length) return;
    rangeDomesGroup = new THREE.Group();
    globe.add(rangeDomesGroup);
    facilityList.forEach((f) => {
      if (f.range > 0) addRangeDome(f);
    });
  }

  // ── Hover / Click raycasting ─────────────────────────────────────────────────

  function checkHover(raycaster: THREE.Raycaster, e: MouseEvent) {
    const meshes = points.flatMap((p) => [p.ring, p.dot]);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const idx = (intersects[0].object.userData as any)
        .facilityIndex as number | undefined;
      if (idx !== undefined) {
        const f = facilities[idx];
        if (isVisible(f)) {
          callbacks.onHoverFacility(f, { x: e.clientX + 14, y: e.clientY - 10 });
          renderer.domElement.style.cursor = "pointer";
          return;
        }
      }
    }
    if (patrolGroup?.visible) {
      const subMeshes = patrolItems
        .filter((i) => i.subMesh.visible)
        .map((i) => i.subMesh);
      const patrolHits = raycaster.intersectObjects(subMeshes);
      if (patrolHits.length > 0) {
        const patrolIdx = (patrolHits[0].object.userData as any)
          .patrolIndex as number | undefined;
        if (patrolIdx !== undefined && patrolItems[patrolIdx]) {
          const item = patrolItems[patrolIdx];
          const fac = patrolToFacility(item.patrol, item.currentLat, item.currentLng);
          callbacks.onHoverFacility(fac, { x: e.clientX + 14, y: e.clientY - 10 });
          renderer.domElement.style.cursor = "pointer";
          return;
        }
      }
    }
    if (threatMode && cityMarkersGroup?.visible) {
      const cityMeshes = cityMarkers.map((c) => c.mesh);
      const cityHits = raycaster.intersectObjects(cityMeshes);
      if (cityHits.length > 0) {
        callbacks.onHoverFacility(null, null);
        renderer.domElement.style.cursor = "pointer";
        return;
      }
    }
    callbacks.onHoverFacility(null, null);
    renderer.domElement.style.cursor = "grab";
  }

  function checkClick(raycaster: THREE.Raycaster, _e: MouseEvent) {
    if (threatMode && callbacks.onCityClick && cityMarkersGroup?.visible) {
      const cityMeshes = cityMarkers.map((c) => c.mesh);
      const cityHits = raycaster.intersectObjects(cityMeshes);
      if (cityHits.length > 0) {
        const cityIdx = (cityHits[0].object.userData as any)
          .cityIndex as number | undefined;
        if (cityIdx !== undefined && cityMarkers[cityIdx]) {
          callbacks.onCityClick(cityMarkers[cityIdx].city);
          return;
        }
      }
    }

    let meshes = points.flatMap((p) => [p.ring, p.dot]);
    let intersects = raycaster.intersectObjects(meshes);
    if (intersects.length > 0) {
      const idx = (intersects[0].object.userData as any)
        .facilityIndex as number | undefined;
      if (idx !== undefined) {
        const f = facilities[idx];
        if (isVisible(f)) {
          showTargetsForFacilityImpl(null);
          selectedFacility = f;
          callbacks.onSelectFacility(f);
          core.cancelAutoRotateResume();
          core.setAutoRotate(false);
          core.centerGlobeOn(f.lat, f.lng);
          clearRangeDomes();
        }
      }
      return;
    }

    if (patrolGroup?.visible) {
      const subMeshes = patrolItems
        .filter((i) => i.subMesh.visible)
        .map((i) => i.subMesh);
      intersects = raycaster.intersectObjects(subMeshes);
      if (intersects.length > 0) {
        const patrolIdx = (intersects[0].object.userData as any)
          .patrolIndex as number | undefined;
        if (patrolIdx !== undefined && patrolItems[patrolIdx]) {
          const item = patrolItems[patrolIdx];
          const fac = patrolToFacility(
            item.patrol,
            item.currentLat,
            item.currentLng
          );
          showTargetsForFacilityImpl(null);
          selectedFacility = fac;
          callbacks.onSelectFacility(fac);
          core.cancelAutoRotateResume();
          core.setAutoRotate(false);
          core.centerGlobeOn(item.currentLat, item.currentLng);
          clearRangeDomes();
        }
      }
    }
  }

  // ── Animation callback (nuclear-specific) ────────────────────────────────────

  core.addAnimationCallback("nuclear", (time, nowMs) => {
    // Facility pulse animation
    points.forEach((p, i) => {
      if (p.pulse.visible && p.yearScale > 0) {
        const scale = p.yearScale * (1 + Math.sin(time * 2 + i * 0.5) * 0.8);
        p.pulse.scale.set(scale, scale, 1);
        const mat = p.pulse.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.4 * (1 - (scale / p.yearScale - 1) / 0.8);
      }
    });

    // Historic mode country marker pulse
    if (historicMode) {
      countryMarkerItems.forEach((item, i) => {
        if (!item.pulse.visible) return;
        const baseScale = item.ring.scale.x;
        const pulseScale =
          baseScale * (1 + Math.sin(time * 1.5 + i * 0.8) * 0.6);
        item.pulse.scale.set(pulseScale, pulseScale, 1);
        const mat = item.pulse.material as THREE.MeshBasicMaterial;
        mat.opacity =
          0.45 * (1 - Math.abs(Math.sin(time * 1.5 + i * 0.8)) * 0.5);
        const outerScale = baseScale * (1 + Math.sin(time * 0.8 + i * 0.6) * 0.15);
        item.outerRing.scale.set(outerScale, outerScale, 1);
      });
    }

    // Flash items
    updateFlashItems();

    // Target arc diamond pulse
    if (targetArcsGroup) {
      targetArcsGroup.children.forEach((child) => {
        if (
          child instanceof THREE.Mesh &&
          (child.userData as { isTargetDiamond?: boolean }).isTargetDiamond
        ) {
          const s = 0.85 + Math.sin(time * 2.5) * 0.2;
          child.scale.set(s, s, s);
        }
      });
    }

    // Threat marker pulse
    if (threatMarkerGroup) {
      const s = 0.92 + Math.sin(time * 2.2) * 0.1;
      threatMarkerGroup.scale.set(s, s, 1);
    }

    // Patrol submarine animation
    const patrolT = (nowMs / 60000) % 1;
    patrolItems.forEach((item, i) => {
      const n = item.pathVecs.length;
      const seg = (patrolT * n) % n;
      const idx = Math.floor(seg) % n;
      const u = seg - Math.floor(seg);
      const a = item.pathVecs[idx];
      const b = item.pathVecs[(idx + 1) % n];
      const pos = new THREE.Vector3().lerpVectors(a, b, u);
      item.subMesh.position.copy(pos);
      const tangent = new THREE.Vector3().subVectors(b, a).normalize();
      item.subMesh.lookAt(pos.clone().add(tangent));
      const { lat, lng } = vector3ToLatLng(pos.x, pos.y, pos.z);
      item.currentLat = lat;
      item.currentLng = lng;
      const pulseScale = 0.95 + Math.sin(time * 2.5 + i * 0.7) * 0.1;
      item.subMesh.scale.set(pulseScale, pulseScale, pulseScale);
    });
  });

  // ── Initialize nuclear visuals ───────────────────────────────────────────────

  createFacilityPoints();
  createPatrolVisuals();
  createCountryMarkersGroup();
  updatePointVisibility();

  // ── SceneApi ─────────────────────────────────────────────────────────────────

  return {
    setFilter(filter: FilterType) {
      activeFilter = filter;
      updatePointVisibility();
    },
    setCountry(country: string | null) {
      activeCountry = country;
      updatePointVisibility();
    },
    setWarheadsByYear(byCountry: Record<string, number>) {
      setWarheadsByYear(byCountry);
      updatePointVisibility();
    },
    setCities(cities: MajorCity[]) {
      createCityMarkers(cities);
    },
    setHistoricMode(active: boolean) {
      historicMode = active;
      if (active) {
        clearRangeDomes();
        clearTargetArcs();
        clearThreatMarker();
        clearThreatArcs();
        if (cityMarkersGroup) cityMarkersGroup.visible = false;
        if (countryMarkersGroup) countryMarkersGroup.visible = true;
        core.cancelAutoRotateResume();
      } else {
        if (countryMarkersGroup) countryMarkersGroup.visible = false;
      }
      updatePointVisibility();
    },
    setHistoricWarheads(byCountry: Record<string, number>) {
      updateCountryMarkerScales(byCountry);
    },
    flashAt(lat: number, lng: number) {
      flashAtImpl(lat, lng);
    },
    addCountryBorders: core.addCountryBorders,
    showRangeForFacility(facility: Facility | null) {
      showRangeForFacilityImpl(facility);
    },
    showTargetsForFacility(facility: Facility | null) {
      showTargetsForFacilityImpl(facility);
    },
    setThreatMode(active: boolean) {
      threatMode = active;
      if (active) {
        clearRangeDomes();
        if (cityMarkersGroup) cityMarkersGroup.visible = true;
        core.cancelAutoRotateResume();
        core.setAutoRotate(false);
      } else {
        setThreatTargetImpl(null);
        clearThreatArcs();
        clearRangeDomes();
        if (cityMarkersGroup) cityMarkersGroup.visible = false;
      }
      renderer.domElement.style.cursor = "grab";
    },
    setThreatTarget(target: ThreatTarget | null) {
      setThreatTargetImpl(target);
      if (target) core.centerGlobeOn(target.lat, target.lng);
    },
    setThreatArcs(facilityList: Facility[]) {
      setThreatArcsImpl(facilityList);
    },
    setThreatRangeDomes(facilityList: Facility[]) {
      setThreatRangeDomesImpl(facilityList);
    },
    centerGlobeOn: core.centerGlobeOn,
    scheduleAutoRotateResume: core.scheduleAutoRotateResume,
    flyCameraToDefault: core.flyCameraToDefault,
    dispose() {
      core.removeAnimationCallback("nuclear");
      clearRangeDomes();
      clearTargetArcs();
      clearThreatMarker();
      clearThreatArcs();
      clearCountryMarkers();
      if (patrolGroup && globe) {
        patrolItems.forEach((item) => {
          item.pathLine.geometry.dispose();
          (item.pathLine.material as THREE.Material).dispose();
          item.subMesh.geometry.dispose();
          (item.subMesh.material as THREE.Material).dispose();
        });
        patrolItems.length = 0;
        globe.remove(patrolGroup);
        patrolGroup = null;
      }
      core.dispose();
    },
  };
}
