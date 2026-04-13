import { motion } from 'framer-motion';

const sections = [
  { id: 'hero',          label: 'Inicio' },
  { id: 'intro',         label: 'Concepto' },
  { id: 'rollpitchyaw',  label: 'Roll / Pitch / Yaw' },
  { id: 'visualizador',  label: 'Visualizador 3D' },
  { id: 'orden',         label: 'Orden importa' },
  { id: 'aplicaciones',  label: 'Aplicaciones' },
  { id: 'matematicas',   label: 'Matemáticas' },
  { id: 'gimbal',        label: 'Gimbal Lock' },
  { id: 'cierre',        label: 'Síntesis' },
];

const NavDots = () => (
  <nav className="fixed right-5 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-2.5">
    {sections.map((s) => (
      <a key={s.id} href={`#${s.id}`} className="group flex items-center justify-end gap-2">
        {/* Tooltip */}
        <span className="pointer-events-none select-none rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/70 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          {s.label}
        </span>
        {/* Dot */}
        <motion.span
          whileHover={{ scale: 1.35 }}
          className="block h-2.5 w-2.5 rounded-full bg-white/25 transition-colors duration-200 group-hover:bg-accent"
        />
      </a>
    ))}
  </nav>
);

export default NavDots;
