import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero',         label: 'Inicio' },
  { id: 'intro',        label: 'Concepto' },
  { id: 'rollpitchyaw', label: 'Roll / Pitch / Yaw' },
  { id: 'visualizador', label: 'Visualizador 3D' },
  { id: 'orden',        label: 'Orden importa' },
  { id: 'aplicaciones', label: 'Aplicaciones' },
  { id: 'matematicas',  label: 'Matemáticas' },
  { id: 'gimbal',       label: 'Gimbal Lock' },
  { id: 'cierre',       label: 'Síntesis' },
];

const NavDots = () => {
  const [active, setActive] = useState('hero');

  // Track which section is in the viewport center-band
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // Trigger when the section occupies the middle 30% of the viewport
        { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Navegación de secciones"
      className="fixed right-5 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-2.5"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            aria-label={`Ir a: ${s.label}`}
            className="group relative flex items-center justify-end gap-2 outline-none"
          >
            {/* Tooltip */}
            <span
              className="pointer-events-none select-none rounded-md border border-white/10
                         bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/70
                         opacity-0 backdrop-blur-sm transition-opacity duration-200
                         group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {s.label}
            </span>

            {/* Dot */}
            <motion.span
              animate={
                isActive
                  ? { scale: 1.45, backgroundColor: '#5eead4' }
                  : { scale: 1,    backgroundColor: 'rgba(255,255,255,0.25)' }
              }
              whileHover={
                isActive
                  ? { scale: 1.45 }
                  : { scale: 1.35, backgroundColor: '#5eead4' }
              }
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="block h-2.5 w-2.5 rounded-full"
              style={
                isActive
                  ? { boxShadow: '0 0 6px 1px rgba(94,234,212,0.55)' }
                  : {}
              }
            />
          </button>
        );
      })}
    </nav>
  );
};

export default NavDots;
