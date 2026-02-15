import { motion } from 'motion/react';

interface SkillsProps {
  isActive: boolean;
}

export function Skills({ isActive }: SkillsProps) {
  const skills = [
    { category: 'frontend', items: ['react', 'typescript', 'css/tailwind'] },
    { category: 'backend', items: ['node.js', 'python', 'postgresql'] },
    { category: 'design', items: ['figma', 'ui/ux', 'minimalism'] },
  ];

  return (
    <motion.section
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-sm mb-8 uppercase text-black">
        skills
      </h2>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: isActive ? index * 0.1 : 0, duration: 0.3 }}
          >
            <p className="text-xs mb-2 text-black">
              {skill.category}
            </p>
            <ul className="space-y-1">
              {skill.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0.5, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: isActive ? index * 0.1 + itemIndex * 0.05 : 0 }}
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