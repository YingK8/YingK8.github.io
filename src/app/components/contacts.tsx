import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface ContactsProps {
  isActive: boolean;
}

export function Contacts({ isActive }: ContactsProps) {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
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
  
  const contacts = [
    { label: 'email', value: 'yingk@berkeley.edu', link: 'mailto:yingk@berkeley.edu' },
    { label: 'github', value: '@yingk8', link: 'https://github.com/YingK8' },
    { label: 'linkedin', value: 'yingk888', link: 'https://www.linkedin.com/in/yingk888/' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <h2 className={`text-sm mb-8 uppercase text-black transition-all duration-200 ${isActive ? 'font-bold' : 'font-normal'}`}>
        {isActive && '> '}contact
      </h2>
      
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <motion.a
            key={index}
            href={contact.link}
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (isActive || isInView) ? index * 0.05 : 0, duration: 0.3 }}
            onMouseEnter={() => setHoveredContact(contact.label)}
            onMouseLeave={() => setHoveredContact(null)}
            className="block transition-all duration-100 px-2 py-1"
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: hoveredContact === contact.label ? -3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-black transition-colors duration-100">{contact.label}</p>
              <p className="text-xs text-gray-700 break-all transition-colors duration-100">{contact.value}</p>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
