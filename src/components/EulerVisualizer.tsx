import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import AircraftModel from './AircraftModel';
import AxesHelper from './AxesHelper';
import { EulerControlState } from '../hooks/useEulerControls';

interface Props {
  controls: EulerControlState;
}

const EulerVisualizer = ({ controls }: Props) => {
  const { radians } = controls;

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
          {/* Floor grid */}
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

          <AxesHelper />
          <AircraftModel radians={radians} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          maxDistance={8}
          minDistance={2}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 8}
        />
      </Canvas>

      {/* Subtle vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
};

export default EulerVisualizer;
