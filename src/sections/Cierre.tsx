import { motion } from 'framer-motion';

const pillars = [
  {
    emoji: '🧭',
    title: 'Intuitivos',
    text: 'Roll, Pitch, Yaw son las mismas palabras que usan pilotos, ingenieros y robóticos. Conectan la teoría con la experiencia física.',
  },
  {
    emoji: '⚙',
    title: 'Poderosos',
    text: 'Representan cualquier orientación en 3D con solo tres números. Son suficientes para drones, satélites, robots y videojuegos.',
  },
  {
    emoji: '⚠',
    title: 'Limitados',
    text: 'El gimbal lock es una singularidad real. En aplicaciones críticas, se transita a cuaterniones para representación robusta sin bloqueos.',
  },
];

const Cierre = () => (
  <section id="cierre" className="section pb-24">
    <div className="section-narrow flex flex-col items-center gap-12 text-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.26em] text-accent">Síntesis</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          Tres rotaciones. Una orientación.
          <span className="block text-slate-400 mt-2 text-2xl sm:text-3xl">
            El orden importa. El gimbal lock acecha. Los cuaterniones esperan.
          </span>
        </h2>
      </motion.div>

      {/* Pillars */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-3 w-full max-w-3xl"
      >
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-white/10 p-5 text-left"
          >
            <div className="text-2xl mb-3">{p.emoji}</div>
            <p className="font-bold text-white mb-1.5">{p.title}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quote */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-2xl text-lg text-slate-400 italic leading-relaxed border-l-2 border-accent/50 pl-5 text-left"
      >
        "Los ángulos de Euler son el primer idioma para hablar de orientación en 3D.
        Comprender sus virtudes y sus límites es el primer paso hacia el control preciso
        de cualquier sistema espacial."
      </motion.blockquote>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <a
          href="#hero"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
        >
          ↑ Volver al inicio
        </a>
        <a
          href="#visualizador"
          className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/40 px-5 py-3 text-sm font-semibold text-accent transition hover:bg-accent/25"
        >
          ⟳ Explorar visualizador
        </a>
      </motion.div>
    </div>
  </section>
);

export default Cierre;
