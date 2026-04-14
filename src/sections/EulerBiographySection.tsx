import { motion } from 'framer-motion';

const EULER_IMAGE =
  'https://res.cloudinary.com/dkucopkow/image/upload/v1776182555/_101301298_euler-arriba_vvq2zp.jpg';

const facts = [
  { label: 'Nacimiento', value: '15 abr 1707 — Basilea, Suiza' },
  { label: 'Fallecimiento', value: '18 sep 1783 — San Petersburgo' },
  { label: 'Campo', value: 'Matemáticas, Física, Mecánica' },
];

const EulerBiographySection = () => (
  <section id="euler" className="section pb-8">
    <div className="section-narrow flex flex-col gap-10">

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col gap-1"
      >
        <p className="text-sm uppercase tracking-[0.26em] text-accent">Contexto histórico</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          La mente detrás de los ángulos
        </h2>
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        viewport={{ once: true }}
        className="glass rounded-3xl border border-white/10 overflow-hidden
                   shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
      >
        <div className="grid lg:grid-cols-[360px_1fr]">

          {/* Image column */}
          <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
            {/* Gradient overlay on the image */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-[#0b1220]/60 hidden lg:block" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b1220]/70 via-transparent to-transparent lg:hidden" />

            <img
              src={EULER_IMAGE}
              alt="Leonhard Euler, retrato histórico"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />

            {/* Subtle teal glow overlay */}
            <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_30%_70%,rgba(94,234,212,0.08),transparent_55%)]" />

            {/* Name overlay on mobile */}
            <div className="absolute bottom-4 left-4 z-30 lg:hidden">
              <p className="text-2xl font-extrabold text-white drop-shadow-xl">
                Leonhard Euler
              </p>
              <p className="text-sm text-accent/90 font-medium tracking-wide">1707 – 1783</p>
            </div>
          </div>

          {/* Text column */}
          <div className="flex flex-col gap-6 p-7 sm:p-9">

            {/* Name — desktop only */}
            <div className="hidden lg:block">
              <p className="text-3xl font-extrabold text-white">Leonhard Euler</p>
              <p className="mt-1 text-sm text-accent/80 font-medium tracking-widest uppercase">
                1707 – 1783
              </p>
            </div>

            {/* Quick facts strip */}
            <div className="flex flex-wrap gap-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2"
                >
                  <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
                    {f.label}
                  </p>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Biography paragraphs */}
            <div className="space-y-4 text-[15px] text-slate-300 leading-relaxed">
              <p>
                Leonhard Euler fue uno de los matemáticos más prolíficos de la historia.
                Durante su vida publicó más de 800 trabajos que abarcaron análisis, teoría
                de números, mecánica, óptica y astronomía. Sus contribuciones son tan
                fundamentales que buena parte del lenguaje matemático moderno —desde la
                notación <em className="text-white">f(x)</em> y el número{' '}
                <em className="text-white">e</em>, hasta el símbolo <em className="text-white">π</em>—
                proviene directamente de él.
              </p>
              <p>
                En el campo de la mecánica y la geometría, Euler demostró que cualquier
                orientación de un cuerpo rígido en el espacio puede describirse mediante
                tres rotaciones sucesivas alrededor de ejes ortogonales. A ese conjunto de
                rotaciones se les conoce hoy como{' '}
                <span className="text-accent font-semibold">ángulos de Euler</span>, y
                siguen siendo la forma más intuitiva de representar actitud en robótica,
                aeronáutica y videojuegos.
              </p>
              <p>
                Su impacto no se limita a las matemáticas puras. La identidad de Euler
                conecta las cinco constantes más importantes del análisis, y su trabajo en
                mecánica rígida sentó las bases para el control de satélites, el diseño de
                drones, la navegación inercial y la animación 3D. Cada vez que un robot
                gira su muñeca, un satélite corrige su actitud o un videojuego calcula la
                orientación de una cámara, la intuición de Euler está presente.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-auto border-l-2 border-accent/50 pl-4 text-sm italic text-slate-400 leading-relaxed">
              "Para que nada se oponga a la comprensión, lo que es difícil se aclara con
              la práctica y el rigor."
              <cite className="not-italic block mt-1 text-xs text-slate-500">— Leonhard Euler</cite>
            </blockquote>
          </div>

        </div>
      </motion.div>

    </div>
  </section>
);

export default EulerBiographySection;
