import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';

// Content block types
interface TextBlock {
  type: 'text';
  content: string[];
}

interface CodeBlock {
  type: 'code';
  language: string;
  code: string;
}

interface ImageBlock {
  type: 'image';
  url: string;
  caption?: string;
}

interface VideoBlock {
  type: 'video';
  url: string;
  caption?: string;
}

interface GridBlock {
  type: 'grid';
  items: {
    title: string;
    description: string;
  }[];
}

type ContentBlock = TextBlock | CodeBlock | ImageBlock | VideoBlock | GridBlock;

interface ProjectSection {
  title: string;
  blocks: ContentBlock[];
}

interface ProjectRow {
  columns: number; // Number of columns in this row (1-4)
  sections: ProjectSection[];
}

// Mock project data
const projectData: Record<string, {
  name: string;
  rows: ProjectRow[];
}> = {
  'project-01': {
    name: 'project 01',
    rows: [
      {
        columns: 3,
        sections: [
          {
            title: 'overview',
            blocks: [
              {
                type: 'text',
                content: [
                  'e-commerce platform',
                  '',
                  'A modern e-commerce solution built with',
                  'scalability in mind. The platform handles',
                  'thousands of products with real-time',
                  'inventory management.',
                ],
              },
            ],
          },
          {
            title: 'role',
            blocks: [
              {
                type: 'text',
                content: [
                  'lead developer',
                  '',
                  'full-stack development',
                  'architecture design',
                  'team leadership',
                  'performance optimization',
                ],
              },
            ],
          },
          {
            title: 'timeline',
            blocks: [
              {
                type: 'text',
                content: [
                  'q1 2025 - q4 2025',
                  '',
                  'planning: 2 months',
                  'development: 6 months',
                  'testing: 2 months',
                  'deployment: 1 month',
                ],
              },
            ],
          },
        ],
      },
      {
        columns: 2,
        sections: [
          {
            title: 'technical stack',
            blocks: [
              {
                type: 'grid',
                items: [
                  { title: 'frontend', description: 'react + typescript' },
                  { title: 'backend', description: 'node.js + express' },
                  { title: 'database', description: 'postgresql' },
                  { title: 'cache', description: 'redis' },
                  { title: 'hosting', description: 'aws ec2' },
                  { title: 'cdn', description: 'cloudfront' },
                ],
              },
            ],
          },
          {
            title: 'architecture',
            blocks: [
              {
                type: 'code',
                language: 'typescript',
                code: `// Core payment processing
class PaymentProcessor {
  async process(order: Order) {
    const validation = 
      await this.validate(order);
      
    if (!validation.success) {
      throw new Error(
        validation.error
      );
    }
    
    return await this.charge(order);
  }
}`,
              },
            ],
          },
        ],
      },
      {
        columns: 4,
        sections: [
          {
            title: 'interface design',
            blocks: [
              {
                type: 'text',
                content: [
                  'minimalist aesthetic',
                  'accessibility first',
                  'mobile responsive',
                ],
              },
            ],
          },
          {
            title: 'dashboard',
            blocks: [
              {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                caption: 'main dashboard',
              },
            ],
          },
          {
            title: 'analytics',
            blocks: [
              {
                type: 'text',
                content: [
                  'real-time metrics',
                  'user behavior tracking',
                  'conversion optimization',
                  'a/b testing framework',
                ],
              },
            ],
          },
          {
            title: 'performance',
            blocks: [
              {
                type: 'grid',
                items: [
                  { title: 'lighthouse', description: '98/100' },
                  { title: 'load time', description: '<1.2s' },
                  { title: 'fcp', description: '0.8s' },
                  { title: 'tti', description: '1.1s' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  'project-02': {
    name: 'project 02',
    rows: [
      {
        columns: 2,
        sections: [
          {
            title: 'concept',
            blocks: [
              {
                type: 'text',
                content: [
                  'mobile fitness app',
                  '',
                  'A fitness tracking application that',
                  'combines workout planning with social',
                  'features and progress analytics.',
                ],
              },
            ],
          },
          {
            title: 'motivation',
            blocks: [
              {
                type: 'text',
                content: [
                  'traditional fitness apps',
                  'lack social engagement',
                  '',
                  'our solution combines',
                  'community and tracking',
                  'for better results.',
                ],
              },
            ],
          },
        ],
      },
      {
        columns: 1,
        sections: [
          {
            title: 'design system',
            blocks: [
              {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
                caption: 'app interface mockups',
              },
              {
                type: 'grid',
                items: [
                  { title: 'colors', description: '3-tone palette' },
                  { title: 'typography', description: 'system fonts' },
                  { title: 'spacing', description: '8px grid' },
                  { title: 'components', description: '24 reusable' },
                  { title: 'animations', description: 'spring physics' },
                  { title: 'accessibility', description: 'wcag aaa' },
                ],
              },
            ],
          },
        ],
      },
      {
        columns: 3,
        sections: [
          {
            title: 'features',
            blocks: [
              {
                type: 'text',
                content: [
                  'workout tracking',
                  'social feed',
                  'progress charts',
                  'goal setting',
                  'challenges',
                ],
              },
            ],
          },
          {
            title: 'technology',
            blocks: [
              {
                type: 'text',
                content: [
                  'react native',
                  'typescript',
                  'graphql api',
                  'postgresql',
                  'redis cache',
                ],
              },
            ],
          },
          {
            title: 'results',
            blocks: [
              {
                type: 'text',
                content: [
                  '4.8 star rating',
                  '100k+ downloads',
                  'app store featured',
                  '',
                  'pmf in q1',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  'project-03': {
    name: 'project 03',
    rows: [
      {
        columns: 4,
        sections: [
          {
            title: 'overview',
            blocks: [
              {
                type: 'text',
                content: [
                  'portfolio system',
                  '',
                  'modular portfolio',
                  'for creatives',
                ],
              },
            ],
          },
          {
            title: 'challenge',
            blocks: [
              {
                type: 'text',
                content: [
                  'most portfolios',
                  'are static and',
                  'difficult to update',
                ],
              },
            ],
          },
          {
            title: 'solution',
            blocks: [
              {
                type: 'text',
                content: [
                  'dynamic content',
                  'easy updates',
                  'smooth animations',
                ],
              },
            ],
          },
          {
            title: 'outcome',
            blocks: [
              {
                type: 'text',
                content: [
                  'fast loading',
                  'great ux',
                  'easy to maintain',
                ],
              },
            ],
          },
        ],
      },
      {
        columns: 2,
        sections: [
          {
            title: 'features',
            blocks: [
              {
                type: 'grid',
                items: [
                  { title: 'projects', description: 'dynamic pages' },
                  { title: 'gallery', description: 'image carousel' },
                  { title: 'content', description: 'markdown support' },
                  { title: 'animations', description: 'motion library' },
                  { title: 'routing', description: 'react router' },
                  { title: 'responsive', description: 'mobile first' },
                ],
              },
            ],
          },
          {
            title: 'implementation',
            blocks: [
              {
                type: 'code',
                language: 'typescript',
                code: `// Reusable carousel
const Carousel = ({ images }) => {
  const [current, setCurrent] = 
    useState(0);
  
  return (
    <div className="carousel">
      <img src={images[current]} />
      <Controls 
        onChange={setCurrent} 
      />
    </div>
  );
};`,
              },
            ],
          },
        ],
      },
      {
        columns: 1,
        sections: [
          {
            title: 'live site',
            blocks: [
              {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
                caption: 'portfolio screenshot',
              },
              {
                type: 'text',
                content: [
                  'built with react, typescript, and motion',
                  'deployed on vercel with automatic ci/cd',
                  '',
                  'lighthouse score: 100/100',
                  'core web vitals: all green',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

// Content block renderers
function TextBlockComponent({ content }: { content: string[] }) {
  return (
    <div className="space-y-1">
      {content.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03, duration: 0.2 }}
          className="text-xs leading-relaxed text-black"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

function CodeBlockComponent({ code, language }: { code: string; language: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 p-4"
    >
      <div className="text-xs text-gray-700 mb-2">// {language}</div>
      <pre className="text-xs leading-relaxed text-black font-mono whitespace-pre">
        {code}
      </pre>
    </motion.div>
  );
}

function ImageBlockComponent({ url, caption }: { url: string; caption?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2"
    >
      <img src={url} alt={caption} className="w-full object-cover" />
      {caption && (
        <p className="text-xs text-gray-700">// {caption}</p>
      )}
    </motion.div>
  );
}

function GridBlockComponent({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          className="space-y-1"
        >
          <div className="text-xs font-bold text-black">{item.title}</div>
          <div className="text-xs text-gray-700">{item.description}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function ProjectDetail() {
  const { projectId } = useParams();
  const [currentSection, setCurrentSection] = useState('');
  const project = projectData[projectId || ''];

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setCurrentSection(sectionId);
            }
          }
        });
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-sm mb-4">project not found</h1>
          <Link to="/" className="text-xs text-gray-700 hover:text-black hover:font-bold">
            ← back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Header */}
      <header className="py-8 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="text-xl text-black uppercase">
              {project.name}
            </div>
            <Link 
              to="/" 
              className="text-sm hover:font-bold transition-all"
            >
              ← back
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="space-y-16">
          {project.rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`grid grid-cols-1 ${
                row.columns === 1 ? '' :
                row.columns === 2 ? 'md:grid-cols-2' :
                row.columns === 3 ? 'md:grid-cols-3' :
                'md:grid-cols-2 lg:grid-cols-4'
              } gap-16`}
            >
              {row.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  ref={(el) => (sectionRefs.current[`${rowIndex}-${section.title}`] = el)}
                  data-section={`${rowIndex}-${section.title}`}
                  onMouseEnter={() => setCurrentSection(`${rowIndex}-${section.title}`)}
                >
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                  >
                    <h2 
                      className={`text-sm mb-8 uppercase text-black transition-all duration-200 ${
                        currentSection === `${rowIndex}-${section.title}` ? 'font-bold' : 'font-normal'
                      }`}
                    >
                      {currentSection === `${rowIndex}-${section.title}` && '> '}
                      {section.title}
                    </h2>

                    <div className="space-y-8">
                      {section.blocks.map((block, blockIndex) => (
                        <div key={blockIndex}>
                          {block.type === 'text' && <TextBlockComponent content={block.content} />}
                          {block.type === 'code' && <CodeBlockComponent code={block.code} language={block.language} />}
                          {block.type === 'image' && <ImageBlockComponent url={block.url} caption={block.caption} />}
                          {block.type === 'grid' && <GridBlockComponent items={block.items} />}
                        </div>
                      ))}
                    </div>
                  </motion.section>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-xs text-gray-700">© 2026 KEVIN YING</p>
        </div>
      </footer>
    </div>
  );
}