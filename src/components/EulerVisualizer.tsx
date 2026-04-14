import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';
import AircraftModel from './AircraftModel';
import AxesHelper from './AxesHelper';
import { EulerControlState } from '../hooks/useEulerControls';

interface Props {
  controls: EulerControlState;
}

// ── Isometric camera defaults ─────────────────────────────────────────────────
// Aircraft geometric center is now at (0,0,0) — no camera offset needed.
// Target (0,0,0) = pivot = geometric center = axes origin: all three coincide.
const ISO_POS    = new Vector3(3.5, 2.2, 3.5);
const ISO_TARGET = new Vector3(0, 0, 0);

// ── Inner R3F component — handles OrbitControls + smooth camera reset ─────────
function CameraResetter({ resetSignal }: { resetSignal: number }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const animating = useRef(false);

  // Set the correct initial target on first mount so the default view is
  // already well-framed (aircraft centered relative to the floor reference).
  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.copy(ISO_TARGET);
    controlsRef.current.update();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger animation when the reset button is clicked
  useEffect(() => {
    if (resetSignal > 0) animating.current = true;
  }, [resetSignal]);

  useFrame(() => {
    if (!animating.current || !controlsRef.current) return;

    camera.position.lerp(ISO_POS, 0.09);
    controlsRef.current.target.lerp(ISO_TARGET, 0.09);
    controlsRef.current.update();

    const posClose = camera.position.distanceTo(ISO_POS) < 0.015;
    const tgtClose = controlsRef.current.target.distanceTo(ISO_TARGET) < 0.015;

    if (posClose && tgtClose) {
      camera.position.copy(ISO_POS);
      controlsRef.current.target.copy(ISO_TARGET);
      controlsRef.current.update();
      animating.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.1}
      maxDistance={8}
      minDistance={2}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI - Math.PI / 8}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
const EulerVisualizer = ({ controls }: Props) => {
  const { radians } = controls;
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div className="relative h-full min-h-[380px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(94,234,212,0.08),transparent_45%)] shadow-glass">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#0b1220']} />
        <fog attach="fog" args={['#0b1220', 10, 28]} />

        <PerspectiveCamera makeDefault position={[3.5, 2.2, 3.5]} fov={48} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 3]} intensity={1.0} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-3, 2, -2]} intensity={0.25} color="#a5b4fc" />
        <pointLight position={[0, 3, 0]} intensity={0.3} color="#5eead4" distance={8} />

        <Suspense fallback={null}>
          {/* ── Floor grid — world reference plane ───────────────────────── */}
          <Grid
            args={[10, 10]}
            sectionColor="#1e293b"
            cellColor="#0f172a"
            sectionThickness={0.8}
            cellThickness={0.3}
            position={[0, -1.1, 0]}
            fadeDistance={14}
            fadeStrength={1.2}
          />

          {/*
           * World-fixed axes at the world origin (0,0,0).
           * This is the aircraft's geometric center AND pivot point after the
           * bounding-box correction in AircraftModel.  All three coincide:
           *   • pivot (rotation center)
           *   • geometric center of the aircraft
           *   • origin of the world coordinate system
           * The axes never rotate — only AircraftModel's quaternion changes.
           */}
          <AxesHelper />

          {/* Aircraft — only this group rotates via quaternion slerp */}
          <AircraftModel radians={radians} />
        </Suspense>

        {/* Camera controller — contains OrbitControls and reset animation */}
        <CameraResetter resetSignal={resetSignal} />
      </Canvas>

      {/* ── Isometric reset button — top-right canvas overlay ─────────────── */}
      <button
        onClick={() => setResetSignal((v) => v + 1)}
        title="Restaurar vista isométrica"
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full
                   border border-white/20 px-3 py-1.5 text-[11px] font-semibold
                   text-white/75 backdrop-blur-sm transition
                   hover:border-accent/60 hover:text-accent
                   active:scale-95"
        style={{ background: 'rgba(11,18,32,0.55)' }}
      >
        {/* Cube / isometric icon */}
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true"
             stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" />
          <path d="M10 2V18M2 7L18 7" opacity="0.45" />
        </svg>
        Isométrica
      </button>

      {/* Subtle vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
};

export default EulerVisualizer;
