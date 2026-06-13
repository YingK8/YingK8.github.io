import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

interface ProjectsProps {
  isActive: boolean;
}

export function Projects({ isActive }: ProjectsProps) {
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

  const projects = [
    { name: 'tetrisBot', desc: 'EECS 106A final project', status: '100%', id: 'tetrisBot' },
    { name: 'calSol', desc: 'ESP32 CANbus firmware', status: '100%', id: 'CalSol' },
    { name: 'flying micro robots', desc: 'liwei lin lab', status: '60%', id: 'liwei' },
    { name: 'a2rl competition team', desc: 'ai robotics @ berkeley', status: '20%', id: 'a2rl' },
    { name: 'soy fish (S)', desc: 'fish night light', status: '100%', id: 'soy-fish' },
    { name: 'drone racing', desc: 'EECS 106B final project', status: '0%', id: '106B' },
    { name: 'computer graphics', desc: 'CS 184', status: '10%', id: '184' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <h2 className={`text-sm mb-8 uppercase text-black transition-all duration-200 ${isActive ? 'font-bold' : 'font-normal'}`}>
        {isActive && '> '}projects
      </h2>
      
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            to={`/projects/${project.id}`}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (isActive || isInView) ? index * 0.075 : 0, duration: 0.3 }}
              whileHover={{ x: 5, transition: { duration: 0.15 } }}
              className="cursor-pointer"
            >
              <p className="text-xs mb-1 text-black">{project.name}</p>
              <p className="text-xs text-gray-700">{project.desc}</p>
              <p className="text-xs text-gray-700 mt-1">{project.status}</p>
            </motion.div>
          </Link>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (isActive || isInView) ? 0.4 : 0, duration: 0.3 }}
        className="mt-8"
      >
      </motion.div>
    </motion.section>
  );
}
