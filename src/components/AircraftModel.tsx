import { useEffect, useRef } from 'react';
import { Group, Quaternion, Euler } from 'three';
import { useFrame } from '@react-three/fiber';

interface Props {
  radians: { roll: number; pitch: number; yaw: number };
}

// ── Aerospace sign convention ────────────────────────────────────────────────
// Nose points along +Z. Standard aerospace convention:
//   Pitch positive = nose UP   → Rx(-θ) in Three.js (Rx(+θ) moves nose DOWN)
//   Roll  positive = right bank → Rz(-θ) in Three.js (Rz(+θ) lifts right wing)
//   Yaw   positive = nose RIGHT → Ry(+θ) in Three.js ✓

const AircraftModel = ({ radians }: Props) => {
  const groupRef = useRef<Group>(null);
  const targetQuat = useRef(new Quaternion());

  useEffect(() => {
    // Negate pitch and roll so slider "+" matches pilot intuition
    const euler = new Euler(-radians.pitch, radians.yaw, -radians.roll, 'XYZ');
    targetQuat.current.setFromEuler(euler);
  }, [radians.pitch, radians.yaw, radians.roll]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.quaternion.slerp(targetQuat.current, 0.12);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── FUSELAGE ─ tapered cylinder along +Z (nose forward) ──────────── */}
      {/* Rear body – wider */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 1.1, 20]} />
        <meshStandardMaterial color="#7dd3fc" metalness={0.45} roughness={0.2} />
      </mesh>
      {/* Front body – narrows toward nose */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.62]} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 0.85, 20]} />
        <meshStandardMaterial color="#7dd3fc" metalness={0.45} roughness={0.2} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.09, 0.46, 20]} />
        <meshStandardMaterial color="#bae6fd" metalness={0.35} roughness={0.2} />
      </mesh>
      {/* Tail taper */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, -1.02]} castShadow>
        <cylinderGeometry args={[0.05, 0.11, 0.45, 16]} />
        <meshStandardMaterial color="#7dd3fc" metalness={0.4} roughness={0.25} />
      </mesh>

      {/* ── COCKPIT CANOPY ────────────────────────────────────────────────── */}
      <mesh position={[0, 0.13, 0.55]} scale={[1, 0.65, 1.4]} castShadow>
        <sphereGeometry args={[0.1, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.05} roughness={0.05} transparent opacity={0.62} />
      </mesh>

      {/* ── MAIN WINGS ─ swept back, slight dihedral ──────────────────────── */}
      {/* Left inner wing */}
      <mesh position={[-0.44, -0.01, 0.1]} rotation={[0.03, 0.16, 0.04]} castShadow>
        <boxGeometry args={[0.6, 0.048, 0.38]} />
        <meshStandardMaterial color="#a5b4fc" metalness={0.25} roughness={0.3} />
      </mesh>
      {/* Left outer wing */}
      <mesh position={[-0.82, 0.04, -0.04]} rotation={[0.06, 0.28, 0.08]} castShadow>
        <boxGeometry args={[0.38, 0.038, 0.26]} />
        <meshStandardMaterial color="#a5b4fc" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Left winglet */}
      <mesh position={[-1.01, 0.1, -0.12]} rotation={[0, 0.4, -0.45]} castShadow>
        <boxGeometry args={[0.04, 0.18, 0.14]} />
        <meshStandardMaterial color="#818cf8" metalness={0.3} roughness={0.25} />
      </mesh>

      {/* Right inner wing */}
      <mesh position={[0.44, -0.01, 0.1]} rotation={[-0.03, -0.16, -0.04]} castShadow>
        <boxGeometry args={[0.6, 0.048, 0.38]} />
        <meshStandardMaterial color="#a5b4fc" metalness={0.25} roughness={0.3} />
      </mesh>
      {/* Right outer wing */}
      <mesh position={[0.82, 0.04, -0.04]} rotation={[-0.06, -0.28, -0.08]} castShadow>
        <boxGeometry args={[0.38, 0.038, 0.26]} />
        <meshStandardMaterial color="#a5b4fc" metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Right winglet */}
      <mesh position={[1.01, 0.1, -0.12]} rotation={[0, -0.4, 0.45]} castShadow>
        <boxGeometry args={[0.04, 0.18, 0.14]} />
        <meshStandardMaterial color="#818cf8" metalness={0.3} roughness={0.25} />
      </mesh>

      {/* ── TAIL ASSEMBLY ─────────────────────────────────────────────────── */}
      {/* Vertical stabilizer */}
      <mesh position={[0, 0.22, -0.9]} castShadow>
        <boxGeometry args={[0.05, 0.38, 0.28]} />
        <meshStandardMaterial color="#5eead4" metalness={0.25} roughness={0.28} />
      </mesh>
      {/* Horizontal stabilizer left */}
      <mesh position={[-0.22, 0.02, -0.9]} rotation={[0.04, 0.06, 0.03]} castShadow>
        <boxGeometry args={[0.36, 0.045, 0.22]} />
        <meshStandardMaterial color="#5eead4" metalness={0.2} roughness={0.28} />
      </mesh>
      {/* Horizontal stabilizer right */}
      <mesh position={[0.22, 0.02, -0.9]} rotation={[-0.04, -0.06, -0.03]} castShadow>
        <boxGeometry args={[0.36, 0.045, 0.22]} />
        <meshStandardMaterial color="#5eead4" metalness={0.2} roughness={0.28} />
      </mesh>

      {/* ── ENGINES (turbofan nacelles under wings) ──────────────────────── */}
      {([-0.48, 0.48] as const).map((x) => (
        <group key={x} position={[x, -0.12, 0.12]}>
          {/* Nacelle body */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.068, 0.075, 0.42, 14]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.18} />
          </mesh>
          {/* Engine intake ring */}
          <mesh position={[0, 0, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.072, 0.068, 0.025, 14]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.15} />
          </mesh>
          {/* Exhaust nozzle glow */}
          <mesh position={[0, 0, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.052, 0.06, 0.04, 12]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* ── VENTRAL DETAILS ─ small belly fin ───────────────────────────── */}
      <mesh position={[0, -0.14, -0.55]} castShadow>
        <boxGeometry args={[0.04, 0.14, 0.22]} />
        <meshStandardMaterial color="#5eead4" metalness={0.2} roughness={0.3} />
      </mesh>
    </group>
  );
};

export default AircraftModel;
