import { Html } from '@react-three/drei';

// ── Constants ─────────────────────────────────────────────────────────────────
const L  = 1.8;  // positive-direction arrow length
const NL = 1.2;  // negative-direction line length (no arrowhead, faint)

// ── Positive-direction arrow (shaft + cone + label) ───────────────────────────
interface AxisArrowProps {
  direction: [number, number, number];
  rotation:  [number, number, number];
  color:     string;
  label:     string;
}

const AxisArrow = ({ direction, rotation, color, label }: AxisArrowProps) => {
  const [dx, dy, dz] = direction;
  return (
    <group>
      {/* Shaft */}
      <mesh position={[dx * L * 0.46, dy * L * 0.46, dz * L * 0.46]} rotation={rotation}>
        <cylinderGeometry args={[0.022, 0.022, L * 0.92, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Arrowhead cone */}
      <mesh position={[dx * L, dy * L, dz * L]} rotation={rotation}>
        <coneGeometry args={[0.062, 0.2, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Label */}
      <Html
        position={[dx * (L + 0.28), dy * (L + 0.28), dz * (L + 0.28)]}
        center
        distanceFactor={7}
        style={{
          color,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textShadow: '0 1px 6px rgba(0,0,0,0.7)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Html>
    </group>
  );
};

// ── Negative-direction line (faint, no arrowhead) ─────────────────────────────
interface NegLineProps {
  direction: [number, number, number];
  rotation:  [number, number, number];
  color:     string;
}

const AxisNegLine = ({ direction, rotation, color }: NegLineProps) => {
  const [dx, dy, dz] = direction;
  return (
    <mesh
      position={[dx * NL * 0.5, dy * NL * 0.5, dz * NL * 0.5]}
      rotation={rotation}
    >
      <cylinderGeometry args={[0.008, 0.008, NL, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} />
    </mesh>
  );
};

// ── World-fixed axes helper ────────────────────────────────────────────────────
// Placed at grid level by the parent (EulerVisualizer wraps in
// <group position={[0, -1.1, 0]}>). Never parented to the aircraft.
const AxesHelper = () => (
  <group>
    {/* ── Positive direction arrows ─────────────────────────────────────── */}

    {/* X+ — Pitch — red */}
    <AxisArrow
      direction={[1, 0, 0]}
      rotation={[0, 0, -Math.PI / 2]}
      color="#ef4444"
      label="X · Pitch"
    />

    {/* Y+ — Yaw — green (vertical, goes up from ground toward aircraft) */}
    <AxisArrow
      direction={[0, 1, 0]}
      rotation={[0, 0, 0]}
      color="#22c55e"
      label="Y · Yaw"
    />

    {/* Z+ — Roll — blue */}
    <AxisArrow
      direction={[0, 0, 1]}
      rotation={[Math.PI / 2, 0, 0]}
      color="#3b82f6"
      label="Z · Roll"
    />

    {/* ── Negative direction lines (X– and Z– only; Y– would go below floor) */}

    {/* X− — faint red line */}
    <AxisNegLine
      direction={[-1, 0, 0]}
      rotation={[0, 0, Math.PI / 2]}
      color="#ef4444"
    />

    {/* Z− — faint blue line */}
    <AxisNegLine
      direction={[0, 0, -1]}
      rotation={[-Math.PI / 2, 0, 0]}
      color="#3b82f6"
    />

    {/* ── Origin: bright dot + flat ring on the XZ plane ────────────────── */}
    {/* Center dot */}
    <mesh>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>

    {/* Subtle horizontal ring to visually anchor the reference on the floor */}
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.22, 0.007, 6, 40]} />
      <meshBasicMaterial color="#5eead4" transparent opacity={0.45} />
    </mesh>
  </group>
);

export default AxesHelper;
