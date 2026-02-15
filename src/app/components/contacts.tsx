import { motion } from 'motion/react';
import { useState } from 'react';

interface ContactsProps {
  isActive: boolean;
}

export function Contacts({ isActive }: ContactsProps) {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  
  const contacts = [
    { label: 'email', value: 'hello@yourname.dev', link: 'mailto:hello@yourname.dev' },
    { label: 'github', value: 'github.com/yourname', link: 'https://github.com' },
    { label: 'twitter', value: '@yourname', link: 'https://twitter.com' },
    { label: 'linkedin', value: 'linkedin.com/in/yourname', link: 'https://linkedin.com' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <h2 className="text-sm mb-8 uppercase text-black">
        contact
      </h2>
      
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <motion.a
            key={index}
            href={contact.link}
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isActive ? index * 0.05 : 0, duration: 0.3 }}
            onMouseEnter={() => setHoveredContact(contact.label)}
            onMouseLeave={() => setHoveredContact(null)}
            className="block hover:bg-black transition-all duration-100 px-2 py-1 group"
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: hoveredContact === contact.label ? -3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-black group-hover:text-white transition-colors duration-100">{contact.label}</p>
              <p className="text-xs text-gray-700 group-hover:text-white break-all transition-colors duration-100">{contact.value}</p>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}