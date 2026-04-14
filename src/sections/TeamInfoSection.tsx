import { motion } from 'framer-motion';

const members = ['Kamila', 'David', 'Ivan', 'Enrique', 'Jorge', 'Jesus'];

const TeamInfoSection = () => (
  <section className="relative w-full overflow-hidden py-10 px-[5vw]">
    {/* Subtle separator line at top */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

    <div className="section-narrow">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="glass rounded-2xl border border-white/10 p-6 sm:p-8
                   bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent
                   shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">

          {/* Left — institution */}
          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent/70 font-semibold">
              Institución
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              CETYS Universidad
            </p>
            <p className="text-sm text-slate-400 font-medium">Campus Tijuana</p>
          </div>

          {/* Divider — hidden on mobile, visible sm+ */}
          <div className="hidden sm:block h-14 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent mx-4" />

          {/* Center — course + professor */}
          <div className="flex flex-col gap-4 sm:px-2">
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-accent/70 font-semibold">
                Materia
              </p>
              <p className="text-base font-bold text-white">Robótica Industrial</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500 font-semibold">
                Profesor
              </p>
              <p className="text-base font-semibold text-slate-200">Rafael Miranda</p>
            </div>
          </div>

          {/* Right — team */}
          <div className="sm:col-span-1 flex flex-col gap-3 sm:pl-8
                          sm:border-l sm:border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black"
                style={{ background: 'rgba(239,68,68,0.18)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.35)' }}
              >
                R
              </span>
              <p className="text-[10px] uppercase tracking-[0.28em] text-accent/70 font-semibold">
                Equipo Rojo
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {members.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1
                             text-xs font-medium text-slate-300 leading-none"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>

    {/* Subtle separator line at bottom */}
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
  </section>
);

export default TeamInfoSection;
