import { motion } from 'motion/react';

interface AboutProps {
  isActive: boolean;
}

export function About({ isActive }: AboutProps) {
  const lines = [
    'initializing...',
    'loading profile...',
    '',
    'hi, i\'m a creative developer',
    'passionate about building',
    'beautiful digital experiences.',
    '',
    'i specialize in web development,',
    'user interface design, and',
    'minimalist aesthetics.',
  ];

  return (
    <motion.section
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-sm mb-8 uppercase text-black">
        about
      </h2>
      
      <div className="space-y-1">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0.5, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isActive ? index * 0.05 : 0, duration: 0.2 }}
            className="text-xs leading-relaxed text-black"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.section>
  );
}