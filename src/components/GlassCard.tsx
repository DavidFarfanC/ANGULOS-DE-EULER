import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

const GlassCard = ({ title, description, icon, delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.55, delay }}
    viewport={{ once: true, amount: 0.3 }}
    className="glass relative overflow-hidden rounded-2xl p-6 shadow-glass"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-white/2 to-transparent" />
    <div className="relative z-10 flex flex-col gap-3">
      {icon && <div className="text-3xl text-accent drop-shadow-lg">{icon}</div>}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-200 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default GlassCard;
