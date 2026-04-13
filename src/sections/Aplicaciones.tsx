import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';

const apps = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <circle cx="20" cy="20" r="4" fill="#5eead4" />
        {[0, 90, 180, 270].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const ax = 20 + 12 * Math.cos(r);
          const ay = 20 + 12 * Math.sin(r);
          const bx = 20 + 18 * Math.cos(r);
          const by = 20 + 18 * Math.sin(r);
          return <line key={deg} x1={ax} y1={ay} x2={bx} y2={by} stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round" />;
        })}
        <circle cx="20" cy="2" r="3" fill="#a5b4fc" />
        <circle cx="38" cy="20" r="3" fill="#a5b4fc" />
        <circle cx="20" cy="38" r="3" fill="#a5b4fc" />
        <circle cx="2" cy="20" r="3" fill="#a5b4fc" />
      </svg>
    ),
    title: 'Drones',
    tag: 'Estabilización de vuelo',
    color: '#5eead4',
    description: 'Los controladores de vuelo (FC) leen los ángulos de Euler del IMU a ~1 kHz para mantener la actitud. Un error de 1° en pitch puede desviar la trayectoria varios metros en segundos.',
    fact: 'FC típico: 32-bit MCU a 200 Hz PID',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <ellipse cx="20" cy="20" rx="18" ry="8" stroke="#a5b4fc" strokeWidth="1.5" />
        <ellipse cx="20" cy="20" rx="8" ry="18" stroke="#a5b4fc" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="4" fill="#a5b4fc" />
        <line x1="4" y1="20" x2="36" y2="20" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
    title: 'Satélites',
    tag: 'Control de actitud (ADCS)',
    color: '#a5b4fc',
    description: 'El subsistema ADCS orienta paneles solares, antenas y telescopios con precisión submiliarcsegundo. Se usan cuaterniones en el computador de abordo para evitar singularidades.',
    fact: 'Precisión: < 0.001° en satélites de observación',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="14" y="8" width="12" height="8" rx="2" stroke="#f97316" strokeWidth="1.5" />
        <line x1="20" y1="16" x2="20" y2="22" stroke="#f97316" strokeWidth="2" />
        <line x1="8" y1="22" x2="32" y2="22" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="22" x2="8" y2="32" stroke="#f97316" strokeWidth="1.5" />
        <line x1="32" y1="22" x2="32" y2="32" stroke="#f97316" strokeWidth="1.5" />
        <line x1="14" y1="28" x2="14" y2="38" stroke="#f97316" strokeWidth="1.5" />
        <line x1="26" y1="28" x2="26" y2="38" stroke="#f97316" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Robótica',
    tag: 'Cinemática de articulaciones',
    color: '#f97316',
    description: 'Los brazos robóticos usan ángulos de Euler para definir la orientación del efector final. La cinemática inversa resuelve qué ángulos articulares producen la orientación deseada en el espacio.',
    fact: 'ROS 2 usa quaterniones para TF (transform frames)',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="10" y="12" width="20" height="16" rx="3" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="20" y1="4" x2="20" y2="10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="7" x2="14" y2="12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="7" x2="26" y2="12" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 1.5" />
        <line x1="20" y1="16" x2="20" y2="24" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 1.5" />
        <line x1="10" y1="28" x2="30" y2="28" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Sensores IMU',
    tag: 'Estimación de orientación',
    color: '#22c55e',
    description: 'Las IMU fusionan datos de acelerómetros, giróscopos y magnetómetros mediante filtros (Kalman, Mahony) para estimar actitud a alta frecuencia, incluso en presencia de deriva y ruido.',
    fact: 'MEMS IMU: ±0.5°/s precisión giroscópica típica',
  },
];

const Aplicaciones = () => (
  <section id="aplicaciones" className="section">
    <div className="section-narrow flex flex-col gap-10">
      <SectionHeading
        eyebrow="Impacto real"
        title="Donde los ángulos de Euler son críticos"
        subtitle="De los drones de consumo a los satélites geoestacionarios, la correcta representación y control de la orientación es la diferencia entre éxito y fallo."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {apps.map((app, idx) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            transition={{ duration: 0.55, delay: idx * 0.07 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass group relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-glass cursor-default"
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
              style={{ background: `radial-gradient(circle at 30% 20%, ${app.color}18, transparent 55%)` }}
            />

            <div className="relative z-10 space-y-4">
              {/* Icon + tags */}
              <div className="flex items-start justify-between">
                <div
                  className="rounded-xl p-2.5"
                  style={{ background: `${app.color}14`, border: `1px solid ${app.color}30` }}
                >
                  {app.icon}
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: `${app.color}18`, color: app.color }}
                >
                  {app.tag}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="mb-1.5 text-lg font-bold text-white">{app.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{app.description}</p>
              </div>

              {/* Technical fact */}
              <div
                className="rounded-lg border px-3 py-2 text-xs font-medium"
                style={{ borderColor: `${app.color}30`, color: app.color, background: `${app.color}0a` }}
              >
                📌 {app.fact}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Aplicaciones;
