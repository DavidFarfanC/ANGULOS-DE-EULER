import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Styled matrix cell types ─────────────────────────────────────────────────
type CellValue =
  | { type: 'literal'; val: string }
  | { type: 'trig'; fn: 'cos' | 'sin'; theta: string; neg?: boolean }
  | { type: 'zero' }
  | { type: 'one' };

type MatrixRow = CellValue[];
type Matrix3 = [MatrixRow, MatrixRow, MatrixRow];

const lit = (val: string): CellValue => ({ type: 'literal', val });
const trig = (fn: 'cos' | 'sin', theta: string, neg?: boolean): CellValue => ({ type: 'trig', fn, theta, neg });
const zero: CellValue = { type: 'zero' };
const one: CellValue = { type: 'one' };

// ── Tab definitions ──────────────────────────────────────────────────────────
interface MatrixTab {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  title: string;
  subtitle: string;
  theta: string;
  matrix: Matrix3;
  explanation: string;
}

const TABS: MatrixTab[] = [
  {
    id: 'pitch',
    label: 'Rₓ — Pitch',
    shortLabel: 'Pitch',
    color: '#ef4444',
    title: 'Rotación alrededor de X',
    subtitle: 'Cabeceo (Pitch)',
    theta: 'θₚ',
    matrix: [
      [one, zero, zero],
      [zero, trig('cos', 'θ'), trig('sin', 'θ', true)],
      [zero, trig('sin', 'θ'), trig('cos', 'θ')],
    ],
    explanation:
      'El eje X permanece fijo. Los ejes Y y Z giran en el plano YZ, haciendo que la nariz del avión suba o baje.',
  },
  {
    id: 'yaw',
    label: 'Rᵧ — Yaw',
    shortLabel: 'Yaw',
    color: '#22c55e',
    title: 'Rotación alrededor de Y',
    subtitle: 'Guiñada (Yaw)',
    theta: 'θᵧ',
    matrix: [
      [trig('cos', 'θ'), zero, trig('sin', 'θ')],
      [zero, one, zero],
      [trig('sin', 'θ', true), zero, trig('cos', 'θ')],
    ],
    explanation:
      'El eje Y permanece fijo (vertical). Los ejes X y Z giran en el plano horizontal, haciendo que la nariz gire a la izquierda o derecha.',
  },
  {
    id: 'roll',
    label: 'R_z — Roll',
    shortLabel: 'Roll',
    color: '#3b82f6',
    title: 'Rotación alrededor de Z',
    subtitle: 'Alabeo (Roll)',
    theta: 'θᵣ',
    matrix: [
      [trig('cos', 'θ'), trig('sin', 'θ', true), zero],
      [trig('sin', 'θ'), trig('cos', 'θ'), zero],
      [zero, zero, one],
    ],
    explanation:
      'El eje Z (longitudinal) permanece fijo. Los ejes X e Y giran en el plano XY, inclinando las alas lateralmente.',
  },
  {
    id: 'combined',
    label: 'R combinada',
    shortLabel: 'Total',
    color: '#a78bfa',
    title: 'Combinación de rotaciones',
    subtitle: 'R = R_z · Rᵧ · Rₓ',
    theta: '',
    matrix: [
      [lit('cᵧcᵣ'), lit('cᵣsₚsᵧ−cₚsᵣ'), lit('sₚsᵣ+cₚcᵣsᵧ')],
      [lit('cᵧsᵣ'), lit('cₚcᵣ+sₚsᵧsᵣ'), lit('cₚsᵧsᵣ−cᵣsₚ')],
      [lit('−sᵧ'), lit('cᵧsₚ'), lit('cₚcᵧ')],
    ],
    explanation:
      'La rotación combinada se obtiene multiplicando las matrices en orden. El resultado es una matriz ortogonal (Rᵀ = R⁻¹) que preserva distancias y ángulos.',
  },
];

// ── Cell renderer ────────────────────────────────────────────────────────────
const Cell = ({ cell, color }: { cell: CellValue; color: string }) => {
  if (cell.type === 'zero') return <span className="text-slate-500 text-sm font-mono">0</span>;
  if (cell.type === 'one') return <span className="text-white/60 text-sm font-mono">1</span>;
  if (cell.type === 'literal')
    return <span className="text-white/80 text-xs font-mono leading-none">{cell.val}</span>;
  if (cell.type === 'trig') {
    return (
      <span className="inline-flex items-baseline gap-[1px] text-xs font-mono leading-none">
        {cell.neg && <span className="text-slate-400 mr-px">−</span>}
        <span style={{ color }}>{cell.fn}</span>
        <span className="text-white/60">θ</span>
      </span>
    );
  }
  return null;
};

// ── Matrix renderer ──────────────────────────────────────────────────────────
const MatrixGrid = ({ matrix, color }: { matrix: Matrix3; color: string }) => (
  <div className="flex items-stretch gap-1">
    {/* Left bracket */}
    <div
      className="flex-shrink-0 w-3"
      style={{
        borderLeft: `2px solid ${color}`,
        borderTop: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        opacity: 0.7,
        borderRadius: '4px 0 0 4px',
      }}
    />
    {/* Grid */}
    <div className="grid grid-cols-3 gap-x-5 gap-y-3 py-3 px-1">
      {matrix.flat().map((cell, i) => (
        <div key={i} className="flex items-center justify-center min-w-[54px]">
          <Cell cell={cell} color={color} />
        </div>
      ))}
    </div>
    {/* Right bracket */}
    <div
      className="flex-shrink-0 w-3"
      style={{
        borderRight: `2px solid ${color}`,
        borderTop: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        opacity: 0.7,
        borderRadius: '0 4px 4px 0',
      }}
    />
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
const MatrixDisplay = () => {
  const [activeId, setActiveId] = useState('pitch');
  const active = TABS.find((t) => t.id === activeId)!;

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              activeId === tab.id
                ? 'text-ink border-transparent'
                : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white'
            }`}
            style={activeId === tab.id ? { backgroundColor: tab.color, borderColor: tab.color } : {}}
          >
            {tab.shortLabel}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 lg:grid-cols-2 items-start"
        >
          {/* Matrix card */}
          <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: active.color }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: active.color }}>
                  {active.label}
                </p>
                <p className="text-xs text-slate-400">{active.subtitle}</p>
              </div>
            </div>

            {/* Matrix */}
            <div className="flex items-center gap-3 flex-wrap">
              {active.theta && (
                <span className="text-sm font-mono text-white/60">
                  R({active.theta}) ={' '}
                </span>
              )}
              <MatrixGrid matrix={active.matrix} color={active.color} />
            </div>

            {/* Properties */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Ortogonal', 'det = 1', 'Rᵀ = R⁻¹'].map((prop) => (
                <span
                  key={prop}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300"
                >
                  {prop}
                </span>
              ))}
            </div>
          </div>

          {/* Explanation card */}
          <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
            <h4 className="text-base font-bold text-white">{active.title}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{active.explanation}</p>

            {active.id === 'combined' ? (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-400 uppercase tracking-[0.12em]">Nota clave</p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  El orden importa:{' '}
                  <strong className="text-white">R_z · Rᵧ · Rₓ ≠ Rₓ · Rᵧ · R_z</strong>.
                  Cambiar el orden de multiplicación produce orientaciones finales distintas.
                  Esta es la raíz matemática de la no conmutatividad de las rotaciones en 3D.
                </p>
                <div className="mt-3 rounded-xl border border-accent/20 bg-accent/8 px-4 py-3">
                  <p className="text-xs text-accent font-semibold">
                    Propiedad ortogonal
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    R preserva la norma de cualquier vector y el ángulo entre vectores.
                    No escala, no distorsiona — solo rota.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-white/4 border border-white/8 px-4 py-3">
                <p className="text-xs text-slate-400 mb-1 uppercase tracking-[0.12em]">Columnas = nueva base</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Las columnas de la matriz son los nuevos vectores de base del sistema
                  de coordenadas rotado. Cada columna es un vector unitario ortonormal.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MatrixDisplay;
