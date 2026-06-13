import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

// --- media assets (imported so Vite bundles, hashes, and base-prefixes them) ---
import groupPhoto from './Photos/CANTB/group_photo.jpg';
import latestLayout from './Photos/CANTB/latestLayout.png';
import renderImg from './Photos/CANTB/render.png';
import layoutImg from './Photos/CANTB/layout.jpg';
import smallLayout from './Photos/CANTB/small_layout.png';
import fabricatedImg from './Photos/CANTB/IMG_8619.jpg';
import prototypeImg from './Photos/CANTB/prototype.jpg';
import pcbBringupImg from './Photos/CANTB/pcb_bringup.jpg';
import teamworkImg from './Photos/CANTB/teamwork.jpg';
import benchImg from './Photos/CANTB/bench.jpg';
import boardCloseupImg from './Photos/CANTB/board_closeup.jpg';
import teameat1Img from './Photos/CANTB/teameat1.jpg';
import teameat2Img from './Photos/CANTB/teameat2.jpg';
import photoImg from './Photos/CANTB/photo.jpg';

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

type ContentBlock = TextBlock | CodeBlock | ImageBlock | GalleryBlock | GridBlock | FactsBlock;

interface ProjectSection {
  title: string;
  blocks: ContentBlock[];
}

interface ProjectRow {
  columns: number;
  sections: ProjectSection[];
}

const CAN_CODE = `/* CalSol - UC Berkeley Solar Vehicle Team
 * can_communication.h - Gen11
 * Purpose: ESP32 CAN Protocol Definitions
 * Author(s): Kevin Ying, Haaziq Kazi, DeepSeek 2025
 * Date: 13th April 2025
 */

#ifndef CAN_COMMUNICATION_H
#define CAN_COMMUNICATION_H

#include <Arduino.h>
#include <algorithm>
#include "driver/twai.h"  // ESP32 CAN (TWAI) library
#include <cstring>        // for memcpy
#include "can_message.h"

#define SEND_TIMEOUT_MS 100     // ms
#define RECEIVE_TIMEOUT_MS 1000 // ms

class CANDevice {
private:
    static const size_t MAX_ALLOWED_IDS = 10;
    uint32_t allowedIDs[MAX_ALLOWED_IDS];
    size_t numAllowedIDs;
    uint32_t self_ID;
    bool driver_initialized = false;
    uint8_t TX;
    uint8_t RX;

    /* Helper function for unpacking CAN messages */
    void unpackMessage(const CANMessage& msg, void* data_dest, size_t dest_len) {
        if (msg.len == dest_len) {
            memcpy(data_dest, msg.data, dest_len);
            Serial.println("Message unpacked successfully!");
        } else {
            Serial.println("Destination data length does not match the message length.");
        }
    }

    // ... (Remainder of class methods) ...

public:
    CANDevice(uint32_t id, uint8_t tx_pin, uint8_t rx_pin,
              const uint32_t* filter_IDs = nullptr, size_t num_filtered_IDs = 0) :
        self_ID(id),
        numAllowedIDs(std::min(num_filtered_IDs, MAX_ALLOWED_IDS))
    {
        if (filter_IDs && numAllowedIDs > 0) {
            memcpy(allowedIDs, filter_IDs, numAllowedIDs * sizeof(uint32_t));
            std::sort(allowedIDs, allowedIDs + numAllowedIDs);
        }
        TX = tx_pin;
        RX = rx_pin;
    }

    // ...
};

#endif // CAN_COMMUNICATION_H`;

const projectData: { name: string; rows: ProjectRow[] } = {
  name: 'calSol',
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
                'can testbench — calsol, spring 2025',
                '',
                "on the can tb team, we led the club's switch to",
                'esp microprocessors and designed the pcb and',
                'firmware for can bus communication on the esp32.',
                '',
                'the work spanned hardware (board layout, a custom',
                'transceiver module) and firmware (a modular,',
                'class-based can stack on the esp32 twai driver).',
              ],
            },
            {
              type: 'image',
              url: groupPhoto,
              caption: 'fig.01 — the can testbench team',
            },
          ],
        },
        {
          title: 'background',
          blocks: [
            {
              type: 'facts',
              items: [
                { label: 'club', value: 'CalSol — UC Berkeley Solar Vehicle Team' },
                { label: 'term', value: 'Spring 2025' },
                { label: 'focus', value: 'club migration to ESP32 microprocessors' },
                { label: 'hardware', value: 'ESP32 dev board + custom CAN transceiver PCB' },
                { label: 'firmware', value: 'CAN bus via ESP32 built-in TWAI driver' },
                { label: 'fabrication', value: 'JLCPCB' },
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
          title: 'esp32 dev board',
          blocks: [
            {
              type: 'text',
              content: [
                'reworked board layout',
                '',
                'we fixed the esp dev board layout from last',
                'semester and updated it to be printed by jlcpcb.',
                '',
                'i rearranged components and vias and added the',
                'silkscreen to make assembly and debugging easier.',
              ],
            },
            {
              type: 'gallery',
              items: [
                { url: latestLayout, caption: 'fig.02 — latest pcb layout' },
                { url: renderImg, caption: 'fig.03 — board 3d render' },
                { url: layoutImg, caption: 'fig.04 — earlier layout pass' },
              ],
            },
          ],
        },
        {
          title: 'can bus transceiver',
          blocks: [
            {
              type: 'text',
              content: [
                'custom transceiver module',
                '',
                'to give other esp32 dev boards can bus',
                'capability, we designed our own transceiver',
                'module.',
                '',
                'it is based on the esp32 dev board design but',
                'miniaturized for modular use.',
              ],
            },
            {
              type: 'image',
              url: smallLayout,
              caption: 'fig.05 — transceiver module layout',
            },
          ],
        },
      ],
    },
    {
      columns: 1,
      sections: [
        {
          title: 'fabricated transceiver',
          blocks: [
            {
              type: 'image',
              url: fabricatedImg,
              caption: 'fig.06 — the fabricated transceiver board',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'wiring setup',
          blocks: [
            {
              type: 'text',
              content: [
                'prototype 1',
                '',
                'using the transceiver, i connected two esp32',
                'boards to develop the firmware that lets them',
                'communicate.',
                '',
                'i learned the hard way that a can network needs',
                'termination caps for a stable signal — which our',
                'first prototype did not have.',
              ],
            },
            {
              type: 'image',
              url: prototypeImg,
              caption: 'fig.07 — two-board prototype wiring',
            },
          ],
        },
        {
          title: 'pcb bring-up',
          blocks: [
            {
              type: 'text',
              content: [
                'bench bring-up',
                '',
                'with boards in hand, we powered up the hardware',
                'and verified the transceiver and esp32 before',
                'moving on to firmware integration.',
              ],
            },
            {
              type: 'image',
              url: pcbBringupImg,
              caption: 'fig.08 — pcb bring-up on the bench',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'firmware and debug process',
          blocks: [
            {
              type: 'text',
              content: [
                'can over the twai driver',
                '',
                'for can on the esp32 we built on the built-in',
                'twai library.',
                '',
                'we wrote modular, class-based code so it can be',
                'customized per subsystem/sensor while leaving',
                'room for future firmware development.',
              ],
            },
            {
              type: 'image',
              url: teamworkImg,
              caption: 'fig.09 — debugging the firmware together',
            },
          ],
        },
        {
          title: 'team',
          blocks: [
            {
              type: 'grid',
              items: [
                { title: 'kevin ying', description: 'esp32 pcb layout and can/twai firmware' },
                { title: 'haaziq kazi', description: 'can bus firmware' },
                { title: 'jonathan', description: 'electrical subsystem lead' },
                { title: 'ahmed · preston', description: 'calsol collaborators' },
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
          title: 'firmware source',
          blocks: [
            {
              type: 'code',
              language: 'can_communication.h',
              code: CAN_CODE,
            },
          ],
        },
      ],
    },
    {
      columns: 1,
      sections: [
        {
          title: 'testbench',
          blocks: [
            {
              type: 'image',
              url: benchImg,
              caption: 'fig.10 — testing can communication on the testbench',
            },
          ],
        },
      ],
    },
    {
      columns: 1,
      sections: [
        {
          title: 'board closeup',
          blocks: [
            {
              type: 'image',
              url: boardCloseupImg,
              caption: 'fig.11 — closeup of the assembled board',
            },
          ],
        },
      ],
    },
    {
      columns: 2,
      sections: [
        {
          title: 'reflections',
          blocks: [
            {
              type: 'text',
              content: [
                'may 15, 2025',
                '',
                "i've made great friends at calsol — including",
                'ahmed, haaziq, and preston — and worked with',
                'electrical subsystem lead jonathan to hit the',
                "club's goals. we had a great time on this project.",
                '',
                "we've built a functional system that moves the",
                "club's new sensors and components onto the esp32,",
                'across both hardware design and firmware support.',
              ],
            },
          ],
        },
        {
          title: 'team off the bench',
          blocks: [
            {
              type: 'gallery',
              items: [
                { url: teameat1Img, caption: 'fig.12 — team dinner' },
                { url: teameat2Img, caption: 'fig.13 — more food, more team' },
                { url: photoImg, caption: 'fig.14 — calsol crew' },
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
      <pre className="text-xs leading-relaxed text-black font-mono whitespace-pre overflow-x-auto">{code}</pre>
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

export function CalSol() {
  const [currentSection, setCurrentSection] = useState('');
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
                            {block.type === 'gallery' && <GalleryBlockComponent items={block.items} />}
                            {block.type === 'grid' && <GridBlockComponent items={block.items} />}
                            {block.type === 'facts' && <FactsBlockComponent items={block.items} />}
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
            <p className="text-xs text-gray-700">c 2026 KEVIN YING CALSOL</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
