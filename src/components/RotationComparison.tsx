import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Angles used for the demo (same values, different order) ─────────────────
const YAW_DEG = 60;
const PITCH_DEG = 45;
const ROLL_DEG = 30;

interface Sequence {
  id: 'A' | 'B';
  name: string;
  color: string;
  steps: Array<{ label: string; axis: string; axisColor: string; transform: string }>;
}

const SEQUENCES: Sequence[] = [
  {
    id: 'A',
    name: 'Yaw → Pitch → Roll',
    color: '#5eead4',
    steps: [
      {
        label: 'Yaw +60°',
        axis: 'eje Y',
        axisColor: '#22c55e',
        transform: `rotateY(${YAW_DEG}deg)`,
      },
      {
        label: 'Pitch +45°',
        axis: 'eje X',
        axisColor: '#ef4444',
        transform: `rotateY(${YAW_DEG}deg) rotateX(${PITCH_DEG}deg)`,
      },
      {
        label: 'Roll +30°',
        axis: 'eje Z',
        axisColor: '#3b82f6',
        transform: `rotateY(${YAW_DEG}deg) rotateX(${PITCH_DEG}deg) rotateZ(${ROLL_DEG}deg)`,
      },
    ],
  },
  {
    id: 'B',
    name: 'Roll → Pitch → Yaw',
    color: '#a78bfa',
    steps: [
      {
        label: 'Roll +30°',
        axis: 'eje Z',
        axisColor: '#3b82f6',
        transform: `rotateZ(${ROLL_DEG}deg)`,
      },
      {
        label: 'Pitch +45°',
        axis: 'eje X',
        axisColor: '#ef4444',
        transform: `rotateZ(${ROLL_DEG}deg) rotateX(${PITCH_DEG}deg)`,
      },
      {
        label: 'Yaw +60°',
        axis: 'eje Y',
        axisColor: '#22c55e',
        transform: `rotateZ(${ROLL_DEG}deg) rotateX(${PITCH_DEG}deg) rotateY(${YAW_DEG}deg)`,
      },
    ],
  },
];

// ── CSS 3D cube ──────────────────────────────────────────────────────────────
const CUBE_SIZE = 110;
const HALF = CUBE_SIZE / 2;

const FACES = [
  { label: 'FRONT', transform: `translateZ(${HALF}px)`, bg: 'rgba(59,130,246,0.75)', text: '#ffffff' },
  { label: 'BACK',  transform: `rotateY(180deg) translateZ(${HALF}px)`, bg: 'rgba(30,58,138,0.55)', text: '#93c5fd' },
  { label: 'UP',    transform: `rotateX(90deg) translateZ(${HALF}px)`,  bg: 'rgba(34,197,94,0.7)',  text: '#ffffff' },
  { label: 'DOWN',  transform: `rotateX(-90deg) translateZ(${HALF}px)`, bg: 'rgba(20,83,45,0.5)',   text: '#86efac' },
  { label: 'RIGHT', transform: `rotateY(90deg) translateZ(${HALF}px)`,  bg: 'rgba(239,68,68,0.7)',  text: '#ffffff' },
  { label: 'LEFT',  transform: `rotateY(-90deg) translateZ(${HALF}px)`, bg: 'rgba(127,29,29,0.5)',  text: '#fca5a5' },
];

interface CubeProps {
  sequenceTransform: string;
  isDimmed?: boolean;
}

const Cube3D = ({ sequenceTransform, isDimmed }: CubeProps) => (
  <div style={{ perspective: '500px', width: CUBE_SIZE, height: CUBE_SIZE }} className="mx-auto">
    <div
      style={{
        width: CUBE_SIZE,
        height: CUBE_SIZE,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: sequenceTransform || 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
        transition: 'transform 0.95s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isDimmed ? 0.5 : 1,
      }}
    >
      {FACES.map((face) => (
        <div
          key={face.label}
          style={{
            position: 'absolute',
            width: CUBE_SIZE,
            height: CUBE_SIZE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: face.bg,
            color: face.text,
            transform: face.transform,
            backfaceVisibility: 'visible',
          }}
        >
          {face.label}
        </div>
      ))}
    </div>
  </div>
);

// ── Step badge row ───────────────────────────────────────────────────────────
const StepBadges = ({ seq, activeStep }: { seq: Sequence; activeStep: number }) => (
  <div className="flex items-center justify-center gap-1.5 flex-wrap">
    {seq.steps.map((step, i) => {
      const state = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
      return (
        <span
          key={i}
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-all duration-300 ${
            state === 'done'
              ? 'bg-white/10 text-slate-400'
              : state === 'active'
              ? 'text-ink'
              : 'bg-white/5 text-slate-600'
          }`}
          style={state === 'active' ? { backgroundColor: step.axisColor } : {}}
        >
          {i + 1}. {step.label}
        </span>
      );
    })}
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
const RotationComparison = () => {
  const [step, setStep] = useState(0); // 0 = identity, 1-3 = cumulative rotation
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const maxStep = 3;

  const getCubeTransform = (seq: Sequence, currentStep: number): string => {
    if (currentStep === 0) return '';
    return seq.steps[currentStep - 1].transform;
  };

  const advance = () => {
    setStep((s) => {
      if (s >= maxStep) { setIsPlaying(false); return s; }
      return s + 1;
    });
  };

  useEffect(() => {
    if (!isPlaying) { clearTimeout(timerRef.current); return; }
    timerRef.current = setTimeout(() => {
      setStep((s) => {
        const next = s + 1;
        if (next > maxStep) { setIsPlaying(false); return s; }
        return next;
      });
    }, 1600);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, step]);

  const handlePlay = () => {
    if (step >= maxStep) { setStep(0); setTimeout(() => setIsPlaying(true), 80); return; }
    setIsPlaying((v) => !v);
  };

  const handleReset = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    setStep(0);
  };

  const isDone = step === maxStep;

  return (
    <div className="space-y-8">
      {/* Side-by-side cubes */}
      <div className="grid gap-6 sm:grid-cols-2">
        {SEQUENCES.map((seq) => (
          <div
            key={seq.id}
            className="glass rounded-2xl border border-white/10 p-6 flex flex-col gap-5"
          >
            {/* Header */}
            <div>
              <div
                className="mb-1 inline-block rounded-full px-3 py-0.5 text-[11px] font-bold tracking-[0.1em] text-ink"
                style={{ backgroundColor: seq.color }}
              >
                Secuencia {seq.id}
              </div>
              <p className="mt-1 text-sm font-semibold text-white/80">{seq.name}</p>
            </div>

            {/* Cube */}
            <div className="flex items-center justify-center py-4">
              <Cube3D
                sequenceTransform={getCubeTransform(seq, step)}
                isDimmed={step === 0}
              />
            </div>

            {/* Step badges */}
            <StepBadges seq={seq} activeStep={step - 1} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => { setIsPlaying(false); setStep(s); }}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={handleReset}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/60 transition hover:border-white/40 hover:text-white"
          >
            ↺ Reiniciar
          </button>
          <button
            disabled={step === 0 && !isPlaying}
            onClick={() => { setIsPlaying(false); setStep((s) => Math.max(0, s - 1)); }}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/60 transition hover:border-white/40 hover:text-white disabled:opacity-30"
          >
            ← Anterior
          </button>
          <button
            onClick={handlePlay}
            className={`rounded-full px-6 py-2 text-sm font-bold transition border ${
              isPlaying
                ? 'border-accent bg-accent/15 text-accent'
                : 'bg-accent text-ink border-accent hover:brightness-110'
            }`}
          >
            {isPlaying ? '⏸ Pausar' : step >= maxStep ? '↺ Repetir' : step === 0 ? '▶ Reproducir' : '▶ Continuar'}
          </button>
          <button
            disabled={step >= maxStep}
            onClick={advance}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/60 transition hover:border-white/40 hover:text-white disabled:opacity-30"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Final comparison banner */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 22 }}
            className="rounded-2xl border border-orange-400/30 bg-orange-500/10 p-6 text-center"
          >
            <p className="text-2xl font-extrabold text-white mb-2">
              Orientación A <span className="text-orange-400">≠</span> Orientación B
            </p>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Los mismos ángulos (Yaw 60°, Pitch 45°, Roll 30°), aplicados en distinto orden,
              producen orientaciones finales diferentes.{' '}
              <strong className="text-white">Las rotaciones en 3D no son conmutativas.</strong>
            </p>
            <div className="mt-4 flex justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#5eead4]" />
                <span className="text-slate-400">Secuencia A: cara FRONT apunta aquí</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#a78bfa]" />
                <span className="text-slate-400">Secuencia B: cara FRONT apunta allá</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RotationComparison;
