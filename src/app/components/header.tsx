import { motion } from 'motion/react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function Header({ onNavigate, currentSection }: HeaderProps) {
  const navItems = ['about', 'projects', 'skills', 'contact'];

  return (
    <header className="py-8 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="text-xl text-black">
            KEVIN YING
          </div>
          
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => onNavigate(item)}
                // Added hover:font-bold to the class list
                className={`
                  text-sm transition-all duration-200
                  ${currentSection === item ? 'font-bold' : 'font-normal hover:font-bold'} text-black
                `}
              >
                {item}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}