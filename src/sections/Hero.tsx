import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';

// ── Gimbal ring visual ───────────────────────────────────────────────────────
// Three concentric rings representing the three rotation frames.
const GimbalRings = () => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '600px',
    }}
  >
    {/* Outer ring — Yaw (green), tilted horizontal */}
    <div
      style={{
        position: 'absolute',
        width: '88%',
        paddingTop: '88%',
        borderRadius: '50%',
        border: '1.5px solid rgba(34, 197, 94, 0.55)',
        boxShadow: '0 0 18px rgba(34, 197, 94, 0.15)',
        transform: 'rotateX(72deg) rotateZ(0deg)',
        animation: 'gimbalOuter 24s linear infinite',
      }}
    />
    {/* Middle ring — Pitch (red), more upright */}
    <div
      style={{
        position: 'absolute',
        width: '66%',
        paddingTop: '66%',
        borderRadius: '50%',
        border: '1.5px solid rgba(239, 68, 68, 0.6)',
        boxShadow: '0 0 14px rgba(239, 68, 68, 0.12)',
        transform: 'rotateX(35deg) rotateY(55deg)',
        animation: 'gimbalMid 18s linear infinite reverse',
      }}
    />
    {/* Inner ring — Roll (blue), nearly vertical */}
    <div
      style={{
        position: 'absolute',
        width: '44%',
        paddingTop: '44%',
        borderRadius: '50%',
        border: '2px solid rgba(99, 130, 246, 0.75)',
        boxShadow: '0 0 20px rgba(99, 130, 246, 0.2)',
        transform: 'rotateX(8deg) rotateY(90deg)',
        animation: 'gimbalInner 14s linear infinite',
      }}
    />
    {/* Center dot */}
    <div
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 12px rgba(94, 234, 212, 0.7)',
      }}
    />
    {/* Axis labels */}
    {[
      { label: 'Yaw', color: '#22c55e', top: '5%', left: '50%' },
      { label: 'Pitch', color: '#ef4444', top: '42%', right: '2%' },
      { label: 'Roll', color: '#6382f6', bottom: '8%', left: '50%' },
    ].map((lbl) => (
      <div
        key={lbl.label}
        style={{
          position: 'absolute',
          top: lbl.top,
          left: lbl.left,
          right: lbl.right,
          bottom: lbl.bottom,
          transform: lbl.left === '50%' ? 'translateX(-50%)' : undefined,
          color: lbl.color,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          opacity: 0.8,
          textShadow: `0 0 8px ${lbl.color}80`,
          userSelect: 'none',
        }}
      >
        {lbl.label}
      </div>
    ))}
  </div>
);

// ── Hero section ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    id="hero"
    className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-28 sm:pt-32"
  >
    <style>{`
      @keyframes gimbalOuter {
        from { transform: rotateX(72deg) rotateZ(0deg); }
        to   { transform: rotateX(72deg) rotateZ(360deg); }
      }
      @keyframes gimbalMid {
        from { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
        to   { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); }
      }
      @keyframes gimbalInner {
        from { transform: rotateX(8deg) rotateY(90deg) rotateZ(0deg); }
        to   { transform: rotateX(8deg) rotateY(90deg) rotateZ(360deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        @keyframes gimbalOuter, gimbalMid, gimbalInner { from {}, to {} }
      }
    `}</style>

    <ParticlesBackground />
    <div className="absolute inset-0 bg-radial-dark opacity-80" />

    <div className="section-narrow relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
      {/* Text content */}
      <div className="flex flex-col gap-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          Orientación 3D — Experiencia interactiva
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
        >
          Ángulos de Euler
          <span className="mt-3 block text-2xl sm:text-3xl font-semibold text-slate-300">
            Roll · Pitch · Yaw
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl text-lg text-slate-300 leading-relaxed"
        >
          Tres rotaciones que definen cualquier orientación en el espacio.
          Explora por qué el orden importa, cómo fallan bajo gimbal lock y
          qué tecnologías dependen de ellos.
        </motion.p>

        {/* Axis color chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="flex flex-wrap gap-2"
        >
          {[
            { label: 'Pitch — eje X', color: '#ef4444' },
            { label: 'Roll — eje Z', color: '#3b82f6' },
            { label: 'Yaw — eje Y', color: '#22c55e' },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#intro"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"
          >
            Comenzar recorrido
          </a>
          <a
            href="#visualizador"
            className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            Ir al visualizador 3D
          </a>
        </motion.div>
      </div>

      {/* Gimbal rings visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        className="relative h-[340px] sm:h-[420px]"
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/8 via-white/3 to-transparent blur-3xl" />

        <div className="glass relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(94,234,212,0.12),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(99,102,241,0.16),transparent_38%)]" />

          {/* Gimbal rings */}
          <div className="relative z-10 h-full w-full">
            <GimbalRings />
          </div>

          {/* Corner label */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-slate-500 font-medium tracking-[0.1em]">
            <span>3 GRADOS DE LIBERTAD</span>
            <span>ORIENTACIÓN COMPLETA</span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Descubrir</span>
      <div className="h-8 w-px animate-bounce bg-gradient-to-b from-accent/60 to-transparent" />
    </motion.div>
  </section>
);

export default Hero;
