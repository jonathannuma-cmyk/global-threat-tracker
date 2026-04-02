import * as THREE from "three";
import { latLngToVector3 } from "./data";

export interface GlobeCoreConfig {
  initialCameraZ?: number;
  /** Initial latitude to center the globe on (degrees) */
  initialLat?: number;
  /** Initial longitude to center the globe on (degrees) */
  initialLon?: number;
  /** Countries to highlight brightly in the GeoJSON border overlay.
   *  Defaults to the 9 nuclear states used by the nuclear tracker. */
  highlightCountries?: string[];
  /**
   * Optional override for per-country border colour/opacity.
   * When provided, this is called for every GeoJSON feature instead of the
   * default nuclear-states highlight logic.  Return null to skip the feature.
   */
  getBorderStyle?: (adminName: string) => { color: number; opacity: number } | null;
  /** Return false to suppress auto-rotate resume after drag */
  shouldResumeAutoRotate?: () => boolean;
  /** Called on every mousemove with the already-updated raycaster */
  onCanvasHover?: (raycaster: THREE.Raycaster, event: MouseEvent) => void;
  /** Called on every click with the already-updated raycaster */
  onCanvasClick?: (raycaster: THREE.Raycaster, event: MouseEvent) => void;
}

export interface GlobeCoreApi {
  globe: THREE.Mesh;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  addCountryBorders: (geojson: any) => void;
  centerGlobeOn: (lat: number, lng: number) => void;
  setAutoRotate: (active: boolean) => void;
  cancelAutoRotateResume: () => void;
  scheduleAutoRotateResume: () => void;
  flyCameraToDefault: () => Promise<void>;
  addAnimationCallback: (id: string, fn: (time: number, nowMs: number) => void) => void;
  removeAnimationCallback: (id: string) => void;
  dispose: () => void;
}

export function createGlobeCore(
  container: HTMLDivElement,
  config?: GlobeCoreConfig
): GlobeCoreApi {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const defaultCameraZ = 3.2;
  camera.position.z = config?.initialCameraZ ?? defaultCameraZ;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0a0c10, 1);
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const raycaster = new THREE.Raycaster();
  raycaster.params.Points = { threshold: 0.06 };
  const mouse = new THREE.Vector2();

  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let rotationVelocity = { x: 0, y: 0 };
  // Derive initial rotation from lat/lon if provided, else tilt slightly north
  let targetRotation = {
    x: config?.initialLat != null ? config.initialLat * (Math.PI / 180) : 0.3,
    y: config?.initialLon != null ? -(config.initialLon + 90) * (Math.PI / 180) : 0,
  };
  let autoRotate = false;
  let autoRotateResumeTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let cameraFlight: {
    fromZ: number;
    toZ: number;
    startMs: number;
    durationMs: number;
    resolve: () => void;
  } | null = null;

  let globe: THREE.Mesh;
  let bordersGroup: THREE.Group | null = null;

  const animationCallbacks = new Map<
    string,
    (time: number, nowMs: number) => void
  >();

  // ── Scene helpers ────────────────────────────────────────────────────────────

  function createStarfield() {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x334155,
      size: 0.08,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(geo, mat));
  }

  function createGlobe() {
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    const texture = new THREE.TextureLoader().load("/earth-night.jpg");
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    const sphereMat = new THREE.MeshPhongMaterial({
      map: texture,
      emissiveMap: texture,
      color: 0xffffff,
      emissive: 0x111111,
      emissiveIntensity: 0.8,
      specular: 0x1e3a5f,
      shininess: 18,
    });
    globe = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globe);

    const wireGeo = new THREE.SphereGeometry(1.002, 36, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a5f,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    globe.add(new THREE.Mesh(wireGeo, wireMat));

    const ringGeo = new THREE.RingGeometry(1.003, 1.007, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const equatorRing = new THREE.Mesh(ringGeo, ringMat);
    equatorRing.rotation.x = Math.PI / 2;
    globe.add(equatorRing);
  }

  function createAtmosphere() {
    const atmosGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.22, 0.74, 0.97, 0.15) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));
  }

  function setupLights() {
    scene.add(new THREE.AmbientLight(0x334155, 1.2));
    const dirLight = new THREE.DirectionalLight(0x94a3b8, 1.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.3);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);
  }

  // ── Country borders ──────────────────────────────────────────────────────────

  function clearCountryBorders() {
    if (bordersGroup && globe) {
      globe.remove(bordersGroup);
      bordersGroup.children.forEach((child) => {
        const line = child as THREE.Line;
        line.geometry.dispose();
        (line.material as THREE.LineBasicMaterial).dispose();
      });
      bordersGroup = null;
    }
  }

  function addCountryBorders(geojson: any) {
    if (!globe) return;
    clearCountryBorders();
    bordersGroup = new THREE.Group();
    globe.add(bordersGroup);

    const highlightSet = new Set(
      config?.highlightCountries ?? [
        "United States",
        "Russia",
        "China",
        "France",
        "United Kingdom",
        "India",
        "Pakistan",
        "Israel",
        "North Korea",
      ]
    );
    // Alias so the inner function name matches the old usage
    const nuclearStates = highlightSet;

    const features: any[] = geojson.features || [];
    features.forEach((feature) => {
      const geom = feature.geometry;
      if (!geom) return;
      const adminName: string =
        feature.properties?.ADMIN ||
        feature.properties?.SOVEREIGNT ||
        feature.properties?.NAME ||
        "";
      let borderColor = 0x1e3a5f;
      let opacity: number;

      if (config?.getBorderStyle) {
        const style = config.getBorderStyle(adminName);
        if (!style) return; // caller wants to skip this feature
        borderColor = style.color;
        opacity = style.opacity;
      } else {
        opacity = nuclearStates.has(adminName) ? 0.7 : 0.3;
      }

      const processPolygon = (coords: number[][][]) => {
        coords.forEach((ring) => {
          const pts: THREE.Vector3[] = [];
          ring.forEach(([lng, lat]) => {
            const p = latLngToVector3(lat, lng, 1.003);
            pts.push(new THREE.Vector3(p.x, p.y, p.z));
          });
          if (pts.length < 2) return;
          if (!pts[0].equals(pts[pts.length - 1])) pts.push(pts[0].clone());
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          const mat = new THREE.LineBasicMaterial({
            color: borderColor,
            transparent: true,
            opacity,
          });
          bordersGroup?.add(new THREE.Line(geo, mat));
        });
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

  // ── Camera controls ──────────────────────────────────────────────────────────

  function centerGlobeOn(lat: number, lng: number) {
    targetRotation.x = lat * (Math.PI / 180);
    targetRotation.y = -(lng + 90) * (Math.PI / 180);
    autoRotate = false;
  }

  function cancelAutoRotateResume() {
    if (autoRotateResumeTimeoutId) {
      clearTimeout(autoRotateResumeTimeoutId);
      autoRotateResumeTimeoutId = null;
    }
  }

  function scheduleAutoRotateResume() {
    if (config?.shouldResumeAutoRotate && !config.shouldResumeAutoRotate()) {
      return;
    }
    cancelAutoRotateResume();
    autoRotateResumeTimeoutId = setTimeout(() => {
      autoRotateResumeTimeoutId = null;
    }, 3000);
  }

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function flyCameraToZImpl(targetZ: number, durationMs: number) {
    const fromZ = camera.position.z;
    const startMs = Date.now();
    if (cameraFlight) {
      cameraFlight.resolve();
      cameraFlight = null;
    }
    autoRotate = false;
    return new Promise<void>((resolve) => {
      cameraFlight = { fromZ, toZ: targetZ, startMs, durationMs, resolve };
    });
  }

  function setupEvents() {
    const canvas = renderer.domElement;

    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      autoRotate = false;
      prevMouse = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rotationVelocity = { x: dy * 0.003, y: dx * 0.003 };
        targetRotation.x += rotationVelocity.x;
        targetRotation.y += rotationVelocity.y;
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      config?.onCanvasHover?.(raycaster, e);
    });

    canvas.addEventListener("mouseup", () => {
      isDragging = false;
      scheduleAutoRotateResume();
    });

    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        camera.position.z = Math.max(
          1.8,
          Math.min(6, camera.position.z + e.deltaY * 0.002)
        );
      },
      { passive: false }
    );

    canvas.addEventListener("click", (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      config?.onCanvasClick?.(raycaster, e);
    });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ── Animation loop ───────────────────────────────────────────────────────────

  function animate() {
    requestAnimationFrame(animate);

    rotationVelocity.x *= 0.92;
    rotationVelocity.y *= 0.92;

    globe.rotation.x += (targetRotation.x - globe.rotation.x) * 0.05;
    globe.rotation.y += (targetRotation.y - globe.rotation.y) * 0.05;

    if (cameraFlight) {
      const nowMs = Date.now();
      const t = (nowMs - cameraFlight.startMs) / cameraFlight.durationMs;
      const clamped = Math.min(1, Math.max(0, t));
      const eased = easeOutCubic(clamped);
      camera.position.z =
        cameraFlight.fromZ + (cameraFlight.toZ - cameraFlight.fromZ) * eased;
      if (clamped >= 1) {
        const resolve = cameraFlight.resolve;
        cameraFlight = null;
        resolve();
      }
    }

    const nowMs = Date.now();
    const time = nowMs * 0.001;
    animationCallbacks.forEach((fn) => fn(time, nowMs));

    renderer.render(scene, camera);
  }

  // ── Init ─────────────────────────────────────────────────────────────────────

  createStarfield();
  createGlobe();
  createAtmosphere();
  setupLights();
  setupEvents();
  animate();

  return {
    get globe() {
      return globe;
    },
    scene,
    camera,
    renderer,
    addCountryBorders,
    centerGlobeOn,
    setAutoRotate(active: boolean) {
      autoRotate = active;
    },
    cancelAutoRotateResume,
    scheduleAutoRotateResume,
    flyCameraToDefault() {
      return flyCameraToZImpl(defaultCameraZ, 2000);
    },
    addAnimationCallback(id, fn) {
      animationCallbacks.set(id, fn);
    },
    removeAnimationCallback(id) {
      animationCallbacks.delete(id);
    },
    dispose() {
      cancelAutoRotateResume();
      clearCountryBorders();
      renderer.dispose();
      container.innerHTML = "";
    },
  };
}
