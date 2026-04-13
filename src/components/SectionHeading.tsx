import { motion } from 'framer-motion';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ eyebrow, title, subtitle }: Props) => (
  <div className="mb-10 flex flex-col gap-3">
    {eyebrow && (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-sm uppercase tracking-[0.24em] text-accent"
      >
        {eyebrow}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-extrabold text-white"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        viewport={{ once: true }}
        className="text-lg text-slate-300 max-w-3xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
