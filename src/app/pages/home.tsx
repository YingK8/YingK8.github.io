import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/header';
import { About } from '../components/about';
import { Projects } from '../components/projects';
import { Skills } from '../components/skills';
import { Contacts } from '../components/contacts';
import { Contact } from '../components/contact';

export function Home() {
  const [currentSection, setCurrentSection] = useState('about');
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const visibilityMap = useRef<Record<string, number>>({
    about: 0,
    projects: 0,
    skills: 0,
    contact: 0,
  });

  const sectionRefs = {
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  };

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setCurrentSection(section);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            visibilityMap.current[sectionId] = entry.intersectionRatio;
          }
        });

        let maxRatio = 0;
        let activeId = '';

        const sections = ['about', 'projects', 'skills', 'contact'];
        
        for (const section of sections) {
          const ratio = visibilityMap.current[section];
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = section;
          }
        }

        if (maxRatio > 0.2 && activeId) {
          setCurrentSection(activeId);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    Object.entries(sectionRefs).forEach(([section, ref]) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', section);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Header onNavigate={scrollToSection} onHoverSection={setCurrentSection} currentSection={currentSection} />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
          onMouseLeave={() => setCurrentSection('')}
        >
          <div ref={aboutRef} onMouseEnter={() => setCurrentSection('about')}>
            <About isActive={currentSection === 'about'} />
          </div>
          <div ref={projectsRef} onMouseEnter={() => setCurrentSection('projects')}>
            <Projects isActive={currentSection === 'projects'} />
          </div>
          <div ref={skillsRef} onMouseEnter={() => setCurrentSection('skills')}>
            <Skills isActive={currentSection === 'skills'} />
          </div>
          <div ref={contactRef} onMouseEnter={() => setCurrentSection('contact')}>
            <Contacts isActive={currentSection === 'contact'} />
          </div>
        </div>
        
        <Contact isActive={currentSection === 'contact'} />
      </main>
      
      <footer className="py-8 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-xs text-gray-700">© 2026 KEVIN YING</p>
        </div>
      </footer>
    </div>
  );
}
