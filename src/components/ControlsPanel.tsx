import { motion, AnimatePresence } from 'framer-motion';
import { EulerControlState } from '../hooks/useEulerControls';
import { PRESETS } from '../lib/presets';

interface Props {
  controls: EulerControlState;
}

interface SliderRowProps {
  label: string;
  axis: string;
  value: number;
  color: string;
  trackClass: string;
  onChange: (v: number) => void;
}

const SliderRow = ({ label, axis, value, color, trackClass, onChange }: SliderRowProps) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-sm font-semibold" style={{ color }}>
      <span>
        {label}{' '}
        <span className="text-xs font-normal opacity-50">({axis})</span>
      </span>
      <span className="tabular-nums text-xs font-bold tracking-wide">{value.toFixed(1)}°</span>
    </div>
    <input
      type="range"
      min={-180}
      max={180}
      step={0.5}
      value={value}
      className={`slider ${trackClass} h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 outline-none transition`}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
    {/* Mini positional bar */}
    <div className="relative h-px w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-75"
        style={{ width: `${((value + 180) / 360) * 100}%`, background: color, opacity: 0.6 }}
      />
    </div>
  </div>
);

const ControlsPanel = ({ controls }: Props) => {
  const { angles, setPitch, setRoll, setYaw, setAll, reset, auto, toggleAuto, isGimbalLock } = controls;

  const activePreset = PRESETS.find(
    (p) =>
      Math.abs(p.pitch - angles.pitch) < 1 &&
      Math.abs(p.roll - angles.roll) < 1 &&
      Math.abs(p.yaw - angles.yaw) < 1,
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true }}
      className="glass flex flex-col gap-5 rounded-3xl border border-white/10 p-6 shadow-glass backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Control de actitud</p>
          <p className="mt-0.5 text-lg font-bold text-white">Ángulos de Euler</p>
        </div>
        <button
          onClick={reset}
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-accent hover:text-accent"
        >
          Reset
        </button>
      </div>

      {/* Presets */}
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">Presets</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => {
            const isActive = activePreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setAll({ pitch: preset.pitch, roll: preset.roll, yaw: preset.yaw })}
                title={preset.description}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? 'text-ink'
                    : 'border-white/15 text-white/60 hover:border-white/30 hover:text-white'
                }`}
                style={
                  isActive
                    ? { borderColor: preset.color, backgroundColor: preset.color, color: '#0b1220' }
                    : {}
                }
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gimbal lock warning */}
      <AnimatePresence>
        {isGimbalLock && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2.5 text-xs text-orange-300"
          >
            <strong className="text-orange-400">⚠ Gimbal lock activo</strong>
            <br />
            Pitch ≈ ±90° — yaw y roll se alinean. Se pierde un grado de libertad.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliders */}
      <div className="flex flex-col gap-4">
        <SliderRow label="Pitch" axis="eje X" value={angles.pitch} color="#ef4444" trackClass="slider-pitch" onChange={setPitch} />
        <SliderRow label="Roll" axis="eje Z" value={angles.roll} color="#3b82f6" trackClass="slider-roll" onChange={setRoll} />
        <SliderRow label="Yaw" axis="eje Y" value={angles.yaw} color="#22c55e" trackClass="slider-yaw" onChange={setYaw} />
      </div>

      {/* Legend chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Pitch (X)', color: '#ef4444' },
          { label: 'Roll (Z)', color: '#3b82f6' },
          { label: 'Yaw (Y)', color: '#22c55e' },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>

      {/* Auto toggle */}
      <div className="border-t border-white/8 pt-4">
        <button
          onClick={toggleAuto}
          className={`w-full rounded-full border py-2.5 text-sm font-semibold transition ${
            auto
              ? 'border-accent bg-accent/15 text-accent'
              : 'border-white/20 text-white hover:border-accent hover:text-accent'
          }`}
        >
          {auto ? '⏹  Detener animación' : '▶  Animación automática'}
        </button>
        <p className="mt-2 text-center text-[11px] text-slate-500">
          −180° → +180° · interpolación slerp
        </p>
      </div>
    </motion.div>
  );
};

export default ControlsPanel;
