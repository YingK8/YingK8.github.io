import { useState } from 'react';
import { Header } from './components/header';
import { About } from './components/about';
import { Projects } from './components/projects';
import { Skills } from './components/skills';
import { Contacts } from './components/contacts';
import { Contact } from './components/contact';

export default function App() {
  const [currentSection, setCurrentSection] = useState('about');

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Header onNavigate={setCurrentSection} currentSection={currentSection} />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
          onMouseLeave={() => setCurrentSection('')}
        >
          <div onMouseEnter={() => setCurrentSection('about')}>
            <About isActive={currentSection === 'about'} />
          </div>
          <div onMouseEnter={() => setCurrentSection('projects')}>
            <Projects isActive={currentSection === 'projects'} />
          </div>
          <div onMouseEnter={() => setCurrentSection('skills')}>
            <Skills isActive={currentSection === 'skills'} />
          </div>
          <div onMouseEnter={() => setCurrentSection('contact')}>
            <Contacts isActive={currentSection === 'contact'} />
          </div>
        </div>
        
        <Contact isActive={currentSection === 'contact'} />
      </main>
      
      <footer className="py-8 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-xs text-gray-700">© 2026 ASCII PORTFOLIO</p>
        </div>
      </footer>
    </div>
  );
}