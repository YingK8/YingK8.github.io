import { motion } from 'motion/react';

interface ContactProps {
  isActive: boolean;
}

export function Contact({ isActive }: ContactProps) {
  return (
    <motion.section
      initial={{ opacity: 0.5, y: 30 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-12"
    >
    </motion.section>
  );
}