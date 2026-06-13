import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

// --- media assets (imported so Vite bundles, hashes, and base-prefixes them) ---
import demoVideo from './media/tetris_bot/videos/demo.mp4';
import internalGripVideo from './media/tetris_bot/videos/internal_grip.mp4';

import gripperModel from './media/tetris_bot/3d_models/gripper.glb';
import smallCubeModel from './media/tetris_bot/3d_models/smallCube.glb';
import largeCubeModel from './media/tetris_bot/3d_models/large_cube.glb';
import longRectModel from './media/tetris_bot/3d_models/long_rectangle.glb';

import multiMarkerImg from './media/tetris_bot/multi_marker.jpg';
import multiObjectImg from './media/tetris_bot/multi-object.png';
import objectStackingImg from './media/tetris_bot/object-stacking.png';
import stackingImg from './media/tetris_bot/stacking.png';
import customGripperImg from './media/tetris_bot/custom-gripper.png';
import graspingImg from './media/tetris_bot/grasping.png';
import collisionObjectsImg from './media/tetris_bot/collision_objects.png';
import collisionObj1Img from './media/tetris_bot/collision_objects/collisionObj1.png';
import collisionObj2Img from './media/tetris_bot/collision_objects/collisionObj2.png';

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

interface GalleryBlock {
  type: 'gallery';
  items: {
    url: string;
    caption?: string;
  }[];
}

interface GridBlock {
  type: 'grid';
  items: {
    title: string;
    description: string;
  }[];
}

interface FactsBlock {
  type: 'facts';
  items: {
    label: string;
    value: string;
  }[];
}

interface ModelBlock {
  type: 'model';
  url: string;
  caption?: string;
}

interface ModelsBlock {
  type: 'models';
  items: {
    url: string;
    caption?: string;
  }[];
}

type ContentBlock =
  | TextBlock
  | CodeBlock
  | ImageBlock
  | VideoBlock
  | GalleryBlock
  | GridBlock
  | FactsBlock
  | ModelBlock
  | ModelsBlock;

interface ProjectSection {
  title: string;
  blocks: ContentBlock[];
}

interface ProjectRow {
  columns: number;
  sections: ProjectSection[];
}

const projectData: { name: string; rows: ProjectRow[] } = {
  name: 'tetrisBot',
  rows: [
    {
      columns: 2,
      sections: [
        {
          title: 'overview',
          blocks: [
            {
              type: 'text',
              content: [
                'autonomous robotic tetris system',
                '',
                'tetrisBot plays physical tetris with a',
                'Universal Robots UR7e manipulator.',
                '',
                "built as a software-focused final project for",
                "UC Berkeley's EECS 106A, the system uses ROS2",
                'to coordinate perception, planning, and control',
                'for robust autonomous block placement.',
              ],
            },
            {
              type: 'video',
              url: demoVideo,
              caption: 'fig.01 — full system demonstration: perception to placement',
            },
          ],
        },
        {
          title: 'project facts',
          blocks: [
            {
              type: 'facts',
              items: [
                { label: 'course', value: 'EECS 106A (Intro to Robotics)' },
                { label: 'focus', value: 'software architecture + autonomy' },
                { label: 'robot', value: 'Universal Robots UR7e' },
                { label: 'middleware', value: 'ROS2 + tf2 transform tree' },
                { label: 'perception', value: 'aruco marker-based localization' },
                { label: 'planning', value: 'RL-informed packing + grasp generation' },
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
          title: 'perception pipeline',
          blocks: [
            {
              type: 'text',
              content: [
                'aruco marker detection and frame calibration',
                '',
                'accurate localization of both the game board',
                'and each tetris piece is critical for stability.',
                '',
                'ros2 vision nodes estimate precise 6-dof poses,',
                'then broadcast transforms through tf2 so planning',
                'and control nodes share a common geometric',
                'understanding of the workspace.',
              ],
            },
            {
              type: 'image',
              url: multiMarkerImg,
              caption: 'fig.02 — multi-marker board and frame calibration',
            },
          ],
        },
        {
          title: 'multi-object handling',
          blocks: [
            {
              type: 'text',
              content: [
                'simultaneous piece localization',
                '',
                'multiple pieces are tracked at once so the',
                'planner can reason about the full set of',
                'available placements per turn.',
                '',
                'per-piece pose estimates feed directly into',
                'the packing policy and grasp generation stages.',
              ],
            },
            {
              type: 'image',
              url: multiObjectImg,
              caption: 'fig.03 — concurrent multi-object pose tracking',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'decision and packing policy',
          blocks: [
            {
              type: 'text',
              content: [
                'reinforcement learning placement strategy',
                '',
                'the policy evaluates board state and piece',
                'geometry to score candidate placements using',
                'packing density, local support, and line-clear',
                'opportunities.',
                '',
                'selected placements are paired with custom grasp',
                'and approach trajectories that enforce',
                'collision-free motion constraints.',
              ],
            },
            {
              type: 'gallery',
              items: [
                { url: objectStackingImg, caption: 'fig.04 — RL-guided packing output' },
                { url: stackingImg, caption: 'fig.05 — resulting stacked board state' },
              ],
            },
          ],
        },
        {
          title: 'grasp execution',
          blocks: [
            {
              type: 'text',
              content: [
                'pick-and-place under contact constraints',
                '',
                'each grasp pairs an approach pose with an',
                'orientation that keeps the piece stable through',
                'lift, transport, and release.',
                '',
                'execution targets are expressed in the shared',
                'tf2 frame tree, keeping perception output and',
                'manipulator motion aligned.',
              ],
            },
            {
              type: 'image',
              url: graspingImg,
              caption: 'fig.06 — grasp execution on a tracked piece',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'gripper and hardware design',
          blocks: [
            {
              type: 'text',
              content: [
                'compliant gripper',
                '',
                'a custom 3d-printed end-effector uses compliant',
                'flexures to adapt to varied block geometries.',
                '',
                'mechanical compliance improves contact quality',
                'and increases grasp reliability across repeated',
                'pick-and-place cycles.',
              ],
            },
            {
              type: 'image',
              url: customGripperImg,
              caption: 'fig.07 — custom compliant gripper prototype',
            },
            {
              type: 'video',
              url: internalGripVideo,
              caption: 'fig.08 — internal grip behavior during pick-up',
            },
          ],
        },
        {
          title: 'workspace and collision environment',
          blocks: [
            {
              type: 'text',
              content: [
                'operational envelope',
                '',
                'the setup isolates the physical board while',
                'preserving clear sensor line-of-sight for robust',
                'marker tracking.',
                '',
                'the ur7e operates inside a collision-checked',
                'workspace with predefined keep-out regions that',
                'protect hardware and preserve repeatability.',
              ],
            },
            {
              type: 'gallery',
              items: [
                { url: collisionObjectsImg, caption: 'fig.09 — registered collision geometry' },
                { url: collisionObj1Img, caption: 'fig.10 — collision object, view 1' },
                { url: collisionObj2Img, caption: 'fig.11 — collision object, view 2' },
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
          title: 'Blocks',
          blocks: [
            {
              type: 'text',
              content: [
                'the physical pieces, as modeled for planning.',
                'drag to rotate and scroll to zoom each part.',
              ],
            },
            {
              type: 'models',
              items: [
                { url: smallCubeModel, caption: 'fig.12 — small cube' },
                { url: largeCubeModel, caption: 'fig.13 — large cube' },
                { url: longRectModel, caption: 'fig.14 — long rectangle' },
              ],
            },
          ],
        },
        {
          title: 'Compliant Gripper',
          blocks: [
            {
              type: 'text',
              content: [
                'inspect the compliant gripper assembly below.',
                'drag to rotate and scroll to zoom in on flexure',
                'details and contact surfaces.',
              ],
            },
            {
              type: 'model',
              url: gripperModel,
              caption: 'fig.15 — interactive compliant gripper model',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'transform coordination',
          blocks: [
            {
              type: 'text',
              content: [
                'cross-node frame consistency',
                '',
                'the system maintains a shared transform graph so',
                'camera, board, piece, and end-effector frames stay',
                'synchronized during planning and motion.',
                '',
                'this reduces drift between perception output and',
                'manipulator execution targets, which is the main',
                'driver of placement reliability.',
              ],
            },
          ],
        },
        {
          title: 'conclusion',
          blocks: [
            {
              type: 'text',
              content: [
                'successful orchestration',
                '',
                'tetrisBot demonstrates how a modern robotics',
                'software stack (ros2 + tf2 + planning) integrates',
                'with industrial hardware (ur7e).',
                '',
                'RL-based decision making, aruco-based perception,',
                'and compliant hardware combine to deliver',
                'consistent physical gameplay.',
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
          title: 'team',
          blocks: [
            {
              type: 'grid',
              items: [
                { title: 'kevin ying', description: 'aruco vision pipeline and motion planning' },
                { title: 'kimberly duong', description: 'ros2 node architecture and integration' },
                { title: 'arjun rewari', description: 'rl policy integration and evaluation' },
                { title: 'ronald', description: 'hardware fabrication and gripper assembly' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

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
          {line ? line : ' '}
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
      className="bg-transparent"
    >
      <div className="text-xs text-gray-700 mb-2">{language}</div>
      <pre className="text-xs leading-relaxed text-black font-mono whitespace-pre">{code}</pre>
    </motion.div>
  );
}

function Caption({ caption }: { caption?: string }) {
  if (!caption) return null;
  return <p className="text-xs text-gray-700">{caption}</p>;
}

function ImageBlockComponent({ url, caption }: { url: string; caption?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2 m-0"
    >
      <img src={url} alt={caption || 'project media'} className="w-full object-cover" />
      <Caption caption={caption} />
    </motion.figure>
  );
}

function VideoBlockComponent({ url, caption }: { url: string; caption?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2 m-0"
    >
      <video src={url} autoPlay loop muted playsInline controls className="w-full object-cover" />
      <Caption caption={caption} />
    </motion.figure>
  );
}

function GalleryBlockComponent({ items }: { items: { url: string; caption?: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="space-y-2 m-0"
        >
          <img
            src={item.url}
            alt={item.caption || 'project media'}
            className="w-full object-cover"
          />
          <Caption caption={item.caption} />
        </motion.figure>
      ))}
    </div>
  );
}

function GridBlockComponent({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          className="space-y-1"
        >
          <div className="text-xs font-bold text-black uppercase tracking-wide">{item.title}</div>
          <div className="text-xs text-gray-700">{item.description}</div>
        </motion.div>
      ))}
    </div>
  );
}

function FactsBlockComponent({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-3">
          <p className="text-xs font-bold uppercase tracking-wide text-black">{item.label}</p>
          <p className="text-xs text-gray-700 leading-relaxed">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function ModelBlockComponent({ url, caption }: { url: string; caption?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2 m-0"
    >
      <div
        className="w-full h-[380px] overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: `<model-viewer src="${url}" camera-controls auto-rotate shadow-intensity="1" style="width: 100%; height: 100%; background-color: white;"></model-viewer>`,
        }}
      />
      <Caption caption={caption} />
    </motion.figure>
  );
}

function ModelsBlockComponent({ items }: { items: { url: string; caption?: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="space-y-2 m-0"
        >
          <div
            className="w-full h-[220px] overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: `<model-viewer src="${item.url}" camera-controls auto-rotate shadow-intensity="1" style="width: 100%; height: 100%; background-color: white;"></model-viewer>`,
            }}
          />
          <Caption caption={item.caption} />
        </motion.figure>
      ))}
    </div>
  );
}

export function TetrisBot() {
  const [currentSection, setCurrentSection] = useState('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
      <div>
        <header className="py-6 md:py-8 sticky top-0 bg-white z-50">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                className="text-lg md:text-xl text-black uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                {projectData.name}
              </Link>
              <Link to="/" className="text-sm text-black font-normal hover:font-bold transition-all">
                back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-14">
          <div className="space-y-8 md:space-y-10">
            {projectData.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-1 ${
                  row.columns === 1
                    ? ''
                    : row.columns === 2
                      ? 'md:grid-cols-2'
                      : row.columns === 3
                        ? 'md:grid-cols-3'
                        : 'md:grid-cols-2 lg:grid-cols-4'
                } gap-6 md:gap-8`}
              >
                {row.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    ref={(el) => {
                      sectionRefs.current[`${rowIndex}-${section.title}`] = el;
                    }}
                    data-section={`${rowIndex}-${section.title}`}
                    onMouseEnter={() => setCurrentSection(`${rowIndex}-${section.title}`)}
                  >
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                    >
                      <h2
                        className={`text-xs md:text-sm mb-6 uppercase text-black transition-all duration-200 ${
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
                            {block.type === 'gallery' && <GalleryBlockComponent items={block.items} />}
                            {block.type === 'grid' && <GridBlockComponent items={block.items} />}
                            {block.type === 'facts' && <FactsBlockComponent items={block.items} />}
                            {block.type === 'model' && <ModelBlockComponent url={block.url} caption={block.caption} />}
                            {block.type === 'models' && <ModelsBlockComponent items={block.items} />}
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
            <p className="text-xs text-gray-700">c 2026 KEVIN YING TETRISBOT</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
