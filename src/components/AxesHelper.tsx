import { Html } from '@react-three/drei';

const L = 1.4; // axis length

interface AxisArrowProps {
  direction: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label: string;
}

const AxisArrow = ({ direction, rotation, color, label }: AxisArrowProps) => {
  const [dx, dy, dz] = direction;
  return (
    <group>
      {/* Shaft */}
      <mesh position={[dx * L * 0.46, dy * L * 0.46, dz * L * 0.46]} rotation={rotation}>
        <cylinderGeometry args={[0.018, 0.018, L * 0.92, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Arrowhead cone */}
      <mesh position={[dx * L, dy * L, dz * L]} rotation={rotation}>
        <coneGeometry args={[0.055, 0.18, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Label */}
      <Html
        position={[dx * (L + 0.22), dy * (L + 0.22), dz * (L + 0.22)]}
        center
        distanceFactor={7}
        style={{
          color,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {label}
      </Html>
    </group>
  );
};

const AxesHelper = () => (
  <group>
    {/* X – Pitch – red */}
    <AxisArrow
      direction={[1, 0, 0]}
      rotation={[0, 0, -Math.PI / 2]}
      color="#ef4444"
      label="X · Pitch"
    />
    {/* Y – Yaw – green */}
    <AxisArrow
      direction={[0, 1, 0]}
      rotation={[0, 0, 0]}
      color="#22c55e"
      label="Y · Yaw"
    />
    {/* Z – Roll – blue */}
    <AxisArrow
      direction={[0, 0, 1]}
      rotation={[Math.PI / 2, 0, 0]}
      color="#3b82f6"
      label="Z · Roll"
    />
    {/* Origin dot */}
    <mesh>
      <sphereGeometry args={[0.04, 10, 10]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  </group>
);

export default AxesHelper;
