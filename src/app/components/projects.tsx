import { motion } from 'motion/react';

interface ProjectsProps {
  isActive: boolean;
}

export function Projects({ isActive }: ProjectsProps) {
  const projects = [
    { name: 'project 01', desc: 'e-commerce platform', status: '90%' },
    { name: 'project 02', desc: 'mobile app design', status: '70%' },
    { name: 'project 03', desc: 'portfolio system', status: '100%' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <h2 className="text-sm mb-8 uppercase text-black">
        projects
      </h2>
      
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isActive ? index * 0.075 : 0, duration: 0.3 }}
            whileHover={{ x: 5, transition: { duration: 0.15 } }}
            className="cursor-pointer"
          >
            <p className="text-xs mb-1 text-black">{project.name}</p>
            <p className="text-xs text-gray-700">{project.desc}</p>
            <p className="text-xs text-gray-700 mt-1">{project.status}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isActive ? 0.4 : 0, duration: 0.3 }}
        className="mt-8"
      >
        <button className="text-xs text-black hover:bg-black hover:text-white transition-all duration-100 px-2">
          view all projects
        </button>
      </motion.div>
    </motion.section>
  );
}