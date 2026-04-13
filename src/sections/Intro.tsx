import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import AnimatedDivider from '../components/AnimatedDivider';

const Intro = () => (
  <section id="intro" className="section">
    <div className="section-narrow flex flex-col gap-10">
      <SectionHeading
        eyebrow="Concepto"
        title="¿Qué son los ángulos de Euler?"
        subtitle="Describen cómo un objeto se orienta en 3D aplicando tres rotaciones consecutivas alrededor de ejes. No indican posición, solo la dirección hacia donde apunta."
      />
      <div className="glass rounded-3xl p-8 shadow-glass grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-lg text-slate-200 leading-relaxed">
          <p>
            Imagina un avión en vuelo. Para describir hacia dónde apunta, encadenamos tres rotaciones: roll, pitch y yaw. Cada una gira el avión sobre un eje diferente y, juntas, definen su actitud en el espacio.
          </p>
          <p>
            Esta secuencia es clave en navegación aérea, robótica y gráficos 3D. Cambiar el orden de las rotaciones altera el resultado final: las rotaciones en 3D no son conmutativas.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 border border-white/10"
        >
          <AnimatedDivider />
          <div className="mt-6 space-y-4 text-sm text-slate-200">
            <p className="text-white font-semibold">Ejemplo avión</p>
            <ul className="list-disc list-inside space-y-2 marker:text-accent">
              <li>Roll: el avión inclina sus alas.</li>
              <li>Pitch: la nariz sube o baja.</li>
              <li>Yaw: la nariz gira a la izquierda o derecha.</li>
            </ul>
            <p className="text-accent font-semibold">Tres giros → una orientación única.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Intro;
