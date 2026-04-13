import { motion } from 'framer-motion';

interface Props {
  title: string;
  lines: string[];
}

const EquationBlock = ({ title, lines }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="glass rounded-2xl p-6 text-left shadow-glass"
  >
    <p className="text-sm uppercase tracking-[0.2em] text-accent mb-2">{title}</p>
    {lines.map((line, idx) => (
      <pre key={idx} className="text-lg sm:text-xl text-white/90 font-mono leading-7">
        {line}
      </pre>
    ))}
  </motion.div>
);

export default EquationBlock;
