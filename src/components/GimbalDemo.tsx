import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── SVG geometry constants ───────────────────────────────────────────────────
const CX = 100; // center x of 200×200 viewBox
const CY = 100; // center y
const R  = 68;  // shaft length

// Compute SVG tip position from angle (0 = right, 90 = down, -90 = up)
const toPoint = (deg: number) => ({
  x: CX + R * Math.cos((deg * Math.PI) / 180),
  y: CY + R * Math.sin((deg * Math.PI) / 180),
});

// ── Axis definitions ─────────────────────────────────────────────────────────
interface AxisDef {
  id: string;
  label: string;
  color: string;
  normalAngle: number;
  lockedAngle: number;
  description: string;
}

const AXES: AxisDef[] = [
  { id: 'yaw',   label: 'Yaw',   color: '#22c55e', normalAngle: -90,  lockedAngle: -90,  description: 'Eje Y — guiñada' },
  { id: 'pitch', label: 'Pitch', color: '#ef4444', normalAngle:  30,  lockedAngle:  30,  description: 'Eje X — cabeceo' },
  { id: 'roll',  label: 'Roll',  color: '#3b82f6', normalAngle:  150, lockedAngle: -90,  description: 'Eje Z — alabeo (⚠ se alinea con Yaw)' },
];

// ── Single axis arrow ────────────────────────────────────────────────────────
// Fix: use motion.g with CSS rotate (transform-origin via transformBox: view-box).
//      The shaft is a vertical line (points up = -90°). Rotating by (angle + 90)
//      makes it point toward `angle`.
//      Labels are STATIC <text> elements positioned by the computed angle.
interface ArrowProps {
  axis: AxisDef;
  locked: boolean;
}

const Arrow = ({ axis, locked }: ArrowProps) => {
  const currentAngle = locked ? axis.lockedAngle : axis.normalAngle;

  // Rotation needed: arrow shaft points up (-90°), rotate by (targetAngle + 90)
  const rotateDeg = currentAngle + 90;
  const initialRotateDeg = axis.normalAngle + 90;

  // Label position – placed outside the rotating group so it stays upright
  const labelRad = (currentAngle * Math.PI) / 180;
  const lx = CX + (R + 20) * Math.cos(labelRad);
  const ly = CY + (R + 20) * Math.sin(labelRad);

  return (
    <g>
      {/* ── Rotating shaft + arrowhead ── */}
      <motion.g
        initial={{ rotate: initialRotateDeg }}
        animate={{ rotate: rotateDeg }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        style={{
          transformBox: 'view-box' as React.CSSProperties['transformBox'],
          transformOrigin: `${CX}px ${CY}px`,
        }}
      >
        {/* Shaft: from center upward */}
        <line
          x1={CX} y1={CY}
          x2={CX} y2={CY - R}
          stroke={axis.color}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        {/* Arrowhead at top */}
        <polygon
          points={`${CX},${CY - R - 2} ${CX - 5},${CY - R + 9} ${CX + 5},${CY - R + 9}`}
          fill={axis.color}
        />
      </motion.g>

      {/* ── Label: static position, updated by React on state change ── */}
      {/* This avoids Framer Motion SVG coordinate animation (known issue) */}
      <text
        x={lx}
        y={ly}
        fill={axis.color}
        fontSize="11"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {axis.label}
      </text>
    </g>
  );
};

// ── DoF counter ──────────────────────────────────────────────────────────────
const DofCounter = ({ locked }: { locked: boolean }) => (
  <div className="flex items-center justify-center gap-3">
    {[0, 1, 2].map((i) => {
      const active = !locked || i < 2;
      const ax = AXES[i];
      return (
        <motion.div
          key={i}
          animate={{ opacity: active ? 1 : 0.25, scale: active ? 1 : 0.82 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex flex-col items-center gap-1"
        >
          <div
            className="h-10 w-10 rounded-xl border-2 flex items-center justify-center text-lg font-extrabold"
            style={{
              borderColor: active ? ax.color : 'rgba(255,255,255,0.08)',
              color:       active ? ax.color : 'rgba(255,255,255,0.15)',
              background:  active ? `${ax.color}1a` : 'transparent',
            }}
          >
            {i + 1}
          </div>
          <span
            className="text-[10px] font-bold tracking-wide uppercase"
            style={{ color: active ? ax.color : 'rgba(255,255,255,0.18)' }}
          >
            {ax.id}
          </span>
        </motion.div>
      );
    })}

    <div className="mx-1 h-px w-4 bg-white/15" />

    <div className="text-center">
      <p className="text-2xl font-extrabold tabular-nums" style={{ color: locked ? '#f97316' : '#22c55e' }}>
        {locked ? '2' : '3'}
      </p>
      <p className="text-[10px] text-slate-400 tracking-wide leading-tight">DoF<br/>activos</p>
    </div>
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
const GimbalDemo = () => {
  const [locked, setLocked] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* SVG diagram */}
        <div className="glass flex flex-col items-center gap-4 rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            {locked ? 'Estado bloqueado — 2 DoF' : 'Estado normal — 3 DoF'}
          </p>

          <svg
            viewBox="0 0 200 200"
            className="w-full max-w-[200px]"
            style={{ overflow: 'visible' }}
          >
            {/* Reference circle */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            {/* Origin */}
            <circle cx={CX} cy={CY} r={4.5} fill="#475569" />

            {AXES.map((ax) => (
              <Arrow key={ax.id} axis={ax} locked={locked} />
            ))}

            {/* Overlap indicator when locked */}
            <AnimatePresence>
              {locked && (
                <motion.circle
                  key="overlap"
                  initial={{ opacity: 0, r: 0 }}
                  animate={{ opacity: 0.35, r: 14 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  cx={toPoint(-90).x}
                  cy={toPoint(-90).y}
                  fill="#f97316"
                />
              )}
            </AnimatePresence>
          </svg>

          <DofCounter locked={locked} />

          <button
            onClick={() => setLocked((v) => !v)}
            className={`w-full rounded-full border py-2.5 text-sm font-bold transition ${
              locked
                ? 'border-orange-500 bg-orange-500/15 text-orange-400'
                : 'border-accent bg-accent/10 text-accent hover:bg-accent/20'
            }`}
          >
            {locked ? '🔓 Restaurar 3 DoF' : '🔒 Aplicar Gimbal Lock'}
          </button>
        </div>

        {/* Explanation */}
        <div className="flex flex-col justify-center gap-4">
          <AnimatePresence mode="wait">
            {!locked ? (
              <motion.div
                key="normal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="glass rounded-xl border border-white/10 p-4">
                  <p className="text-sm font-bold text-white mb-1">Estado normal — 3 grados de libertad</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Los tres ejes (Pitch en rojo, Yaw en verde, Roll en azul) son{' '}
                    <strong className="text-white">linealmente independientes</strong>.
                    Cada uno puede rotar sin afectar la capacidad de representar cualquier orientación.
                  </p>
                </div>
                {AXES.map((ax) => (
                  <div key={ax.id} className="flex items-start gap-3">
                    <span className="mt-0.5 h-3 w-3 flex-shrink-0 rounded-full" style={{ background: ax.color }} />
                    <div>
                      <span className="text-sm font-semibold" style={{ color: ax.color }}>{ax.label}</span>
                      <span className="text-sm text-slate-400"> — {ax.description}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="locked"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="glass rounded-xl border border-orange-500/30 bg-orange-500/8 p-4">
                  <p className="text-sm font-bold text-orange-400 mb-1">⚠ Gimbal lock — 2 grados efectivos</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Con Pitch = ±90°, el eje de{' '}
                    <strong className="text-blue-400">Roll (azul)</strong> se alinea con el de{' '}
                    <strong className="text-green-400">Yaw (verde)</strong>.
                    Ambos describen <strong className="text-white">la misma rotación</strong>:
                    el sistema perdió un eje independiente.
                  </p>
                </div>
                <div className="glass rounded-xl border border-white/10 p-4 space-y-2">
                  <p className="text-sm font-bold text-white">Consecuencia práctica</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Ciertos movimientos ya no se pueden representar de forma única.
                    El sistema no puede "saber" si está usando yaw o roll para rotar
                    en ese plano compartido. Se producen singularidades en el control.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quaternion teaser */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="glass rounded-2xl border border-accent/20 bg-accent/5 p-5 text-center"
      >
        <p className="text-sm font-bold text-accent mb-1">Por eso existen los cuaterniones</p>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Los cuaterniones (4 componentes: w, x, y, z) representan rotaciones en 4D,
          eliminando las singularidades del gimbal lock. Son la base del control de
          orientación en drones, satélites y motores gráficos modernos.
        </p>
      </motion.div>
    </div>
  );
};

export default GimbalDemo;
