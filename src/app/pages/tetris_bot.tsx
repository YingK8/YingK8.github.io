import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
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

interface HTMLBlock {
  type: 'html';
  content: string;
}

type ContentBlock = TextBlock | CodeBlock | ImageBlock | VideoBlock | GridBlock | HTMLBlock;

interface ProjectSection {
  title: string;
  blocks: ContentBlock[];
}

interface ProjectRow {
  columns: number; // Number of columns in this row (1-4)
  sections: ProjectSection[];
}

// Project data
const projectData = {
  name: 'tetrisbot',
  rows: [
    {
      columns: 1,
      sections: [
        {
          title: 'overview',
          blocks: [
            {
              type: 'text',
              content: [
                'autonomous robotic system',
                '',
                'TetrisBot is designed to play physical Tetris.',
                'Built as a software-focused final project for',
                'UC Berkeley\'s EECS 106A, the system uses ROS2',
                'and a Universal Robots UR7e manipulator.',
              ],
            },
            {
              type: 'video',
              url: 'media/tetrisbot_demo.mp4',
              caption: 'ur7e tetrisbot full system demonstration',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'computer vision',
          blocks: [
            {
              type: 'text',
              content: [
                'aruco marker detection',
                '',
                'accurate localization of the game board',
                'and individual tetris pieces is critical.',
                '',
                'our ros2 vision nodes calculate precise',
                '6-dof transformations broadcast to tf2.',
              ],
            },
            {
              type: 'video',
              url: 'media/cv_demo.mp4',
              caption: 'aruco marker pose estimation',
            },
          ],
        },
        {
          title: 'rl packing',
          blocks: [
            {
              type: 'text',
              content: [
                'reinforcement learning algorithm',
                '',
                'evaluates board state and piece geometry,',
                'scoring placements based on packing',
                'density and line clears.',
                '',
                'custom gripping planning calculates',
                'collision-free grasp approaches.',
              ],
            },
            {
              type: 'image',
              url: 'media/circuit.jpg',
              caption: 'ros2 node architecture',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'hardware design',
          blocks: [
            {
              type: 'text',
              content: [
                'compliant gripper',
                '',
                'custom 3d-printed end-effector',
                'uses compliant flexures to adapt',
                'to varied block geometries.',
                '',
                'mechanical compliance increases',
                'grasp reliability significantly.',
              ],
            },
            {
              type: 'image',
              url: 'media/gripper.jpg',
              caption: 'compliant gripper prototype',
            },
          ],
        },
        {
          title: 'workspace',
          blocks: [
            {
              type: 'text',
              content: [
                'operational environment',
                '',
                'isolates physical board while',
                'providing clear vision sensor',
                'lines of sight.',
                '',
                'ur7e operates within a',
                'collision-free safety zone.',
              ],
            },
            {
              type: 'image',
              url: 'media/gantry.jpg',
              caption: 'ur7e manipulator setup',
            },
          ],
        },
      ],
    },
    {
      columns: 1,
      sections: [
        {
          title: 'interactive model',
          blocks: [
            {
              type: 'text',
              content: [
                'explore the cad assembly of our compliant',
                'gripper design below. drag to rotate and',
                'scroll to zoom in on flexure mechanisms.',
              ],
            },
            {
              type: 'html',
              content: '<div style="width: 100%; height: 500px; background: #f5f5f5;"><model-viewer src="media/tetrisbot.glb" camera-controls auto-rotate shadow-intensity="1" style="width: 100%; height: 100%; background-color: white;"></model-viewer></div>',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'conclusion',
          blocks: [
            {
              type: 'text',
              content: [
                'successful orchestration',
                '',
                'tetrisbot demonstrates modern robotics',
                'software stacks (ros2) with industrial',
                'hardware (ur7e).',
                '',
                'combining rl decision making with aruco',
                'pose estimation and compliant hardware.',
              ],
            },
          ],
        },
        {
          title: 'team',
          blocks: [
            {
              type: 'grid',
              items: [
                { title: 'kevin ying', description: 'aruco vision pipeline & motion planning' },
                { title: 'kimberly duong', description: 'ros2 architecture'},
                { title: 'arjun rewari', description: 'rl integration'},
              ],
            },
          ],
        },
      ],
    },
  ],
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

function VideoBlockComponent({ url, caption }: { url: string; caption?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2"
    >
      <video src={url} autoPlay loop muted playsInline className="w-full object-cover" />
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

function HTMLBlockComponent({ content }: { content: string }) {
  return (
    <div
      className="w-full"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export function TetrisBot() {
  const [currentSection, setCurrentSection] = useState('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Load model-viewer script
  useEffect(() => {
    if (!document.querySelector('script[src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Header */}
      <header className="py-8 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="text-xl text-black uppercase">
              {projectData.name}
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
          {projectData.rows.map((row, rowIndex) => (
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
                          {block.type === 'video' && <VideoBlockComponent url={block.url} caption={block.caption} />}
                          {block.type === 'grid' && <GridBlockComponent items={block.items} />}
                          {block.type === 'html' && <HTMLBlockComponent content={block.content} />}
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
