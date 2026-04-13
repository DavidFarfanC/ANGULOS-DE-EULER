import SectionHeading from '../components/SectionHeading';
import MatrixDisplay from '../components/MatrixDisplay';
import { motion } from 'framer-motion';

const Matematicas = () => (
  <section id="matematicas" className="section">
    <div className="section-narrow flex flex-col gap-10">
      <SectionHeading
        eyebrow="Fundamento matemático"
        title="Matrices de rotación"
        subtitle="Cada rotación se modela con una matriz ortogonal 3×3. Al combinar rotaciones, se multiplican matrices — y el orden de multiplicación determina la orientación final."
      />

      <MatrixDisplay />

      {/* Contextual note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="glass grid gap-4 rounded-2xl border border-white/10 p-6 lg:grid-cols-3"
      >
        {[
          {
            icon: '⊗',
            title: 'Multiplicación de matrices',
            text: 'R = R_z · Rᵧ · Rₓ aplica primero Rₓ (pitch), luego Rᵧ (yaw), luego R_z (roll). El orden importa.',
          },
          {
            icon: '⊥',
            title: 'Propiedad ortogonal',
            text: 'RRᵀ = I y det(R) = 1. La inversa de una rotación es simplemente su transpuesta.',
          },
          {
            icon: '↔',
            title: 'Preserva estructura',
            text: 'Las rotaciones conservan distancias y ángulos entre vectores. El objeto no se deforma.',
          },
        ].map((item) => (
          <div key={item.title} className="space-y-2">
            <div className="text-2xl text-accent">{item.icon}</div>
            <p className="text-sm font-bold text-white">{item.title}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Matematicas;
