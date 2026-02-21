import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface AboutProps {
  isActive: boolean;
}

export function About({ isActive }: AboutProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lines = [
    '""""',
    'hi, i\'m a creative engineer,',
    'passionate about building',
    'beautiful things.',
    '',
    'i specialize in robotics,',
    'graphics, industrial design',
    'and bikes.',
    '""""',
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className={`text-sm mb-8 uppercase text-black transition-all duration-200 ${isActive ? 'font-bold' : 'font-normal'}`}>
        {isActive && '> '}about
      </h2>
      
      <div className="space-y-1">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (isActive || isInView) ? index * 0.05 : 0, duration: 0.2 }}
            className="text-xs leading-relaxed text-black"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.section>
  );
}