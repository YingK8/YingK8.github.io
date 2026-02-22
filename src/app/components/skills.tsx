import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface SkillsProps {
  isActive: boolean;
}

export function Skills({ isActive }: SkillsProps) {
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

  const skills = [
    { category: 'languages', items: ['c++', 'python', 'matlab'] },
    { category: 'tools', items: ['linux', 'ros2','issacsim', 'docker', 'gitlab', 'pytorch'] },
    { category: 'hardware', items: ['kicad', 'fusion360', 'rhino'] },
    { category: 'coursework', items: ['robotics', 'feedback control', 'optimisation', 'machine learning', 'signal processing', 'probability'] },
    // { category: 'design', items: ['figma', 'keyshot', 'adobe'] },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className={`text-sm mb-8 uppercase text-black transition-all duration-200 ${isActive ? 'font-bold' : 'font-normal'}`}>
        {isActive && '> '}skills
      </h2>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (isActive || isInView) ? index * 0.1 : 0, duration: 0.3 }}
          >
            <p className="text-xs mb-2 text-black">
              {skill.category}
            </p>
            <ul className="space-y-1">
              {skill.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (isActive || isInView) ? index * 0.1 + itemIndex * 0.05 : 0 }}
                  className="text-xs text-gray-700"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}