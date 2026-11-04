import { motion, useReducedMotion } from 'motion/react';

// O movimento acompanha as imagens. Texto e evidências nunca ficam invisíveis.
export default function Reveal({ children, className }) {
  const reduce = useReducedMotion();
  return <motion.div className={className}
    initial={reduce ? false : { y: 16 }} whileInView={{ y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>;
}
