'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SkillPill from '@/components/ui/SkillPill'

/**
 * Desktop 5 Figma reference (1440×1024):
 * Enhanced TechStack card layout with editorial design hierarchy.
 */

const TECH_CARDS = [
  {
    id: 'tc-dev',
    title: 'DEVELOPMENT',
    subtitle: 'WEB & BACKEND',
    skills: [
      { label: 'NEXT.JS', icon: 'Nx' },
      { label: 'REACT', icon: 'Re' },
      { label: 'TYPESCRIPT', icon: 'TS' },
      { label: 'TAILWIND', icon: 'TW' },
      { label: 'NODE.JS', icon: 'No' },
      { label: 'POSTGRES', icon: 'PG' },
    ],
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-dev" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d1117" />
            <stop offset="100%" stopColor="#161b22" />
          </linearGradient>
          <linearGradient id="glow-dev" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="300" height="180" fill="url(#grad-dev)" />
        <path d="M 0,30 L 300,30 M 0,60 L 300,60 M 0,90 L 300,90 M 0,120 L 300,120 M 0,150 L 300,150" stroke="#30363d" strokeWidth="0.5" />
        <path d="M 50,0 L 50,180 M 100,0 L 100,180 M 150,0 L 150,180 M 200,0 L 200,180 M 250,0 L 250,180" stroke="#30363d" strokeWidth="0.5" />
        <path d="M -20,130 Q 60,70 150,110 T 320,50" stroke="url(#glow-dev)" strokeWidth="3" strokeLinecap="round" className="opacity-90" />
        <path d="M -20,140 Q 60,80 150,120 T 320,60" stroke="url(#glow-dev)" strokeWidth="1" strokeLinecap="round" className="opacity-40" />
        <g transform="translate(125, 65)">
          <rect width="50" height="50" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <path d="M 18,20 L 12,25 L 18,30 M 32,20 L 38,25 L 32,30 M 27,17 L 23,33" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    )
  },
  {
    id: 'tc-auto',
    title: 'AUTOMATION',
    subtitle: 'WORKFLOW & API',
    skills: [
      { label: 'N8N', icon: 'N8' },
      { label: 'PYTHON', icon: 'Py' },
      { label: 'WEBHOOKS', icon: 'Wh' },
      { label: 'REST API', icon: 'API' },
      { label: 'DOCKER', icon: 'Dk' },
      { label: 'GIT', icon: 'Git' },
    ],
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-auto" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b0f19" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="glow-auto" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="300" height="180" fill="url(#grad-auto)" />
        <circle cx="50" cy="90" r="30" stroke="#1f2937" strokeWidth="1" />
        <circle cx="250" cy="90" r="30" stroke="#1f2937" strokeWidth="1" />
        <path d="M 50,90 C 100,40 200,140 250,90" stroke="#374151" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 50,90 C 100,140 200,40 250,90" stroke="url(#glow-auto)" strokeWidth="2.5" strokeLinecap="round" />
        <g transform="translate(125, 65)">
          <rect width="50" height="50" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <path d="M 27,15 L 18,27 L 25,27 L 23,35 L 32,23 L 25,23 Z" fill="url(#glow-auto)" stroke="#f59e0b" strokeWidth="1" strokeLinejoin="round" />
        </g>
      </svg>
    )
  },
  {
    id: 'tc-design',
    title: 'UI/UX DESIGN',
    subtitle: 'PROTOTYPE & BRAND',
    skills: [
      { label: 'FIGMA', icon: 'Fg' },
      { label: 'CANVA', icon: 'Cn' },
      { label: 'PHOTOSHOP', icon: 'Ps' },
      { label: 'WIREFRAME', icon: 'Wf' },
      { label: 'PROTOTYPE', icon: 'Pr' },
      { label: 'SYSTEMS', icon: 'Sys' },
    ],
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-design" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f0b15" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="glow-design" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <rect width="300" height="180" fill="url(#grad-design)" />
        <circle cx="110" cy="90" r="45" fill="url(#glow-design)" className="opacity-20" />
        <circle cx="190" cy="90" r="45" fill="#8b5cf6" className="opacity-15" />
        <path d="M 60,130 L 240,50" stroke="#312e81" strokeWidth="1" />
        <path d="M 60,50 L 240,130" stroke="#312e81" strokeWidth="1" />
        <g transform="translate(125, 65)">
          <rect width="50" height="50" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <path d="M 25,14 C 18.9,14 14,18.9 14,25 C 14,31.1 18.9,36 25,36 C 26.4,36 27.5,34.9 27.5,33.5 C 27.5,32.8 27.2,32.2 26.8,31.7 C 26.3,31.2 26,30.5 26,29.8 C 26,28.4 27.1,27.3 28.5,27.3 H 30.5 C 33.5,27.3 36,24.8 36,21.8 C 36,17.5 31.1,14 25,14 Z" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20.5" cy="20.5" r="2" fill="#8b5cf6" />
          <circle cx="29.5" cy="20.5" r="2" fill="#ec4899" />
          <circle cx="20.5" cy="29.5" r="2" fill="#10b981" />
        </g>
      </svg>
    )
  },
]

// Slot geometry derived from Figma
const SIDE_OFFSET_X = 392 // px from center
const CENTER_W = 340
const CENTER_H = 500
const SIDE_W = 270
const SIDE_H = 400

interface CardSlot {
  x: number
  width: number
  height: number
  scale: number
  zIndex: number
  opacity: number
  rotate: number
}

function getSlot(position: 'left' | 'center' | 'right'): CardSlot {
  switch (position) {
    case 'center':
      return { x: 0, width: CENTER_W, height: CENTER_H, scale: 1, zIndex: 30, opacity: 1, rotate: 0 }
    case 'left':
      return { x: -SIDE_OFFSET_X, width: SIDE_W, height: SIDE_H, scale: 1, zIndex: 10, opacity: 1.00, rotate: 0 }
    case 'right':
      return { x: SIDE_OFFSET_X, width: SIDE_W, height: SIDE_H, scale: 1, zIndex: 10, opacity: 1.00, rotate: 0 }
  }
}

// Initial order: DEVELOPMENT=left, AUTOMATION=center, DESIGN=right
const INITIAL_ORDER = [0, 1, 2]

export default function TechStack() {
  const [order, setOrder] = useState(INITIAL_ORDER)
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger left slide click
  function clickLeft() {
    if (isAnimating) return
    setIsAnimating(true)
    setOrder((prev) => [prev[2], prev[0], prev[1]])
    
    // Unlock clicks after the spring animation settles (approx 500ms)
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Trigger right slide click
  function clickRight() {
    if (isAnimating) return
    setIsAnimating(true)
    setOrder((prev) => [prev[1], prev[2], prev[0]])
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const positions: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right']

  return (
    <section
      id="techstack"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-white py-12 overflow-hidden"
    >
      <motion.h2
        className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        TECH STACK
      </motion.h2>

      {/* Stage Wrapper - Height matching Certifications 618px container (cards centered inside) */}
      <div className="w-full flex items-center justify-center flex-shrink-0" style={{ height: 618 }}>
        <div className="w-full">
          {/* Card stage */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ height: `${CENTER_H + 40}px` }}
          >
            {TECH_CARDS.map((card, cardIdx) => {
              const posIdx = order.indexOf(cardIdx)
              const pos = positions[posIdx]
              const slot = getSlot(pos)
              const isCenter = pos === 'center'

              return (
                <motion.div
                  key={card.id}
                  className={[
                    'absolute rounded-[16px] border border-black/10 bg-white flex flex-col items-center p-6 select-none overflow-hidden transition-shadow duration-300',
                    !isCenter ? 'cursor-pointer hover:border-black/20' : '',
                  ].join(' ')}
                  style={{
                    boxShadow: isCenter
                      ? '0px 20px 48px rgba(0,0,0,0.12)'
                      : '0px 4px 16px rgba(0,0,0,0.06)',
                  }}
                  animate={{
                    x: slot.x,
                    width: slot.width,
                    height: slot.height,
                    zIndex: slot.zIndex,
                    opacity: slot.opacity,
                    rotate: slot.rotate,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => {
                    if (pos === 'left') clickLeft()
                    else if (pos === 'right') clickRight()
                  }}
                >
                  {/* 1. Header Area — Structured and clean */}
                  <div className="flex flex-col items-center gap-1.5 w-full text-center mb-1 flex-shrink-0">
                    <span className="font-[family-name:var(--font-imfell)] text-[10px] tracking-[4.5px] uppercase text-black/35 font-medium">
                      {card.subtitle}
                    </span>
                    <h3 className="font-[family-name:var(--font-fredericka)] text-xl lg:text-2xl tracking-[3px] text-shadow-heading uppercase text-black font-semibold">
                      {card.title}
                    </h3>
                  </div>

                  {/* 2. Visual Illustration Box */}
                  <div
                    className="w-full rounded-[10px] bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden border border-black/15 shadow-inner flex-1 my-3"
                    style={{ minHeight: '110px' }}
                  >
                    {card.illustration}
                  </div>

                  {/* 3. Footer Tools Area */}
                  <div className="w-full flex flex-col items-center mt-1 pt-3 border-t border-zinc-100 flex-shrink-0">
                    <span className="font-[family-name:var(--font-imfell)] text-[9px] tracking-[3px] text-zinc-400 uppercase font-semibold mb-3 self-start pl-1">
                      TOOLS & SKILLS
                    </span>
                    
                    {/* Skill Pills Grid */}
                    <div className={`grid grid-cols-3 w-full ${isCenter ? 'gap-x-4 gap-y-3' : 'gap-x-2 gap-y-2'}`}>
                      {card.skills.map((skill, i) => (
                        <SkillPill
                          key={i}
                          label={skill.label}
                          icon={skill.icon}
                          size={isCenter ? 'md' : 'sm'}
                        />
                      ))}
                    </div>
                  </div>

                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
