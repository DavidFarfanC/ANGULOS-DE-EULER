import { motion } from 'framer-motion';

const AnimatedDivider = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 0.6 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
    viewport={{ once: true }}
    className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent"
  />
);

export default AnimatedDivider;
