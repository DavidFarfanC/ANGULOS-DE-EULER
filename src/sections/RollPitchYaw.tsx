import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import AnimatedDivider from '../components/AnimatedDivider';

const items = [
  {
    title: 'Roll',
    desc: 'Giro alrededor del eje Z (azul) en esta demo. Un alabeo que hace rotar la referencia lateral.',
    icon: '↻',
  },
  {
    title: 'Pitch',
    desc: 'Giro alrededor del eje X (rojo). La nariz sube o baja modificando la elevación.',
    icon: '⤴',
  },
  {
    title: 'Yaw',
    desc: 'Giro alrededor del eje Y (verde). La nariz rota izquierda/derecha para cambiar el rumbo.',
    icon: '↺',
  },
];

const RollPitchYaw = () => (
  <section id="rollpitchyaw" className="section">
    <div className="section-narrow flex flex-col gap-10">
      <SectionHeading
        eyebrow="Ejes fundamentales"
        title="Roll, Pitch y Yaw"
        subtitle="Tres movimientos que, combinados, orientan cualquier vehículo o cuerpo rígido en el espacio."
      />
      <AnimatedDivider />
      <div className="grid-cards">
        {items.map((item, idx) => (
          <GlassCard key={item.title} title={item.title} description={item.desc} icon={item.icon} delay={idx * 0.05} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="glass mt-4 rounded-2xl p-6 text-slate-200"
      >
        <p className="text-white font-semibold mb-2">Tip rápido</p>
        <p>Con roll controlas el alabeo, con pitch la actitud vertical y con yaw el rumbo. Juntos, definen la actitud completa.</p>
      </motion.div>
    </div>
  </section>
);

export default RollPitchYaw;
