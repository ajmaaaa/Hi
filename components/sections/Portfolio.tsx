'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

/* ──────────────────────────────────────────
   Portfolio — 3 large stacked cards
   Card layout: Phone LEFT | Info RIGHT
   
   DOWNWARD STACK animation with GPU-accelerated vertical translate (y):
     Back  (slot 0): y=0    — peeks ABOVE, highest on screen
     Mid   (slot 1): y=20   — middle
     Front (slot 2): y=40   — lowest on screen, visually in FRONT
   
   Click: front rolls downward (y: 540px) lurus tanpa miring,
   then slips behind the stack and opens back up at the top slot (0).
 ────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 0,
    category: 'Web Development',
    title: 'Full-Stack\nApplication',
    desc: 'Building responsive web applications with modern tech — Next.js, TailwindCSS, and REST APIs.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    github: 'https://github.com/meyky',
    web: 'https://meyky.vercel.app',
  },
  {
    id: 1,
    category: 'Automation',
    title: 'N8N\nWorkflow',
    desc: 'Designing automation pipelines that connect APIs, handle data, and reduce manual work.',
    tags: ['N8N', 'Webhooks', 'REST API'],
    github: 'https://github.com/meyky',
    web: null,
  },
  {
    id: 2,
    category: 'UI/UX Design',
    title: 'Interface\nDesign',
    desc: 'Crafting clean, modern interfaces in Figma — from wireframes to production-ready designs.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    github: 'https://github.com/meyky',
    web: null,
  },
]

const CARD_W = 900
const CARD_H = 500
const PEEK   = 40  // how many px the back cards peek above the front card

// slot 0 = back (top of stack, peeks at top), slot 2 = front (bottom of stack, in front)
const SLOTS = [
  { y: 0,          scale: 0.94, opacity: 1.00 }, // back  — peeks at top
  { y: PEEK / 2,   scale: 0.97, opacity: 1.00 }, // mid
  { y: PEEK,       scale: 1.00, opacity: 1.00 }, // front — full size
]

const TWEEN_SWING = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.6,
}

/* ── Phone frame ── */
function PhoneFrame() {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: '175px',
        height: '358px',
        borderRadius: '34px',
        border: '5px solid #1c1c1c',
        background: '#1c1c1c',
        boxShadow: '0px 16px 40px rgba(0,0,0,0.30)',
      }}
    >
      {/* Dynamic island */}
      <div
        className="absolute z-10 bg-[#1c1c1c]"
        style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '72px', height: '22px', borderRadius: '0 0 16px 16px' }}
      />
      {/* Screen */}
      <div
        className="absolute bg-white overflow-hidden"
        style={{ inset: '4px', top: '22px', borderRadius: '27px' }}
      >
        <div className="h-6 bg-zinc-900 flex items-center px-3">
          <div className="w-8 h-1 bg-zinc-600 rounded-full" />
        </div>
        <div className="flex flex-col gap-2.5 p-3">
          <div className="w-10 h-10 bg-zinc-200 rounded-xl" />
          <div className="w-20 h-1.5 bg-zinc-200 rounded-full" />
          <div className="w-14 h-1.5 bg-zinc-100 rounded-full" />
          <div className="h-16 bg-zinc-100 rounded-xl mt-1" />
          <div className="h-12 bg-zinc-100 rounded-xl" />
          <div className="h-12 bg-zinc-50 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

/* ── Stacked cycling cards ── */
function ProjectCards() {
  const [order, setOrder] = useState([0, 1, 2])
  const [prevOrder, setPrevOrder] = useState([0, 1, 2])
  const [isAnimating, setIsAnimating] = useState(false)

  // Track discrete z-indexes dynamically to prevent Framer Motion rendering order teleport bugs
  const [cardZIndexes, setCardZIndexes] = useState<{ [key: number]: number }>({
    0: 10, // card 0 starts at Back
    1: 20, // card 1 starts at Mid
    2: 30, // card 2 starts at Front
  })

  function cycle() {
    if (isAnimating) return
    setIsAnimating(true)

    const backCardId = order[0]
    const midCardId = order[1]
    const frontCardId = order[2]

    // 1. Hold z-indexes: swinging card is on top (40) while escaping, others stay back
    setCardZIndexes({
      [frontCardId]: 40,
      [midCardId]: 20,
      [backCardId]: 10,
    })

    // 2. Shift order positions
    setPrevOrder(order)
    setOrder([frontCardId, backCardId, midCardId]) // front → back, back → mid, mid → front

    // 3. Delay the z-index shift until the swing card has fully cleared downward at 300ms (50% duration)
    setTimeout(() => {
      setCardZIndexes({
        [frontCardId]: 10, // swing card now lands behind
        [midCardId]: 30,   // mid card takes front position
        [backCardId]: 20,  // back card takes mid position
      })
    }, 300)

    // 4. Unlock clicks after animation finishes (600ms)
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: CARD_W, height: CARD_H + PEEK }}
      onClick={cycle}
    >
      {PROJECTS.map((proj, cardIdx) => {
        const slotIdx = order.indexOf(cardIdx)
        const prevSlotIdx = prevOrder.indexOf(cardIdx)
        const slot    = SLOTS[slotIdx]
        const isFront = slotIdx === 2

        const isSwingingToBack = prevSlotIdx === 2 && slotIdx === 0

        // Vertical swing keyframes logic: swing out DOWNWARDS, hold, and return
        let yValue: number | number[] = slot.y
        let scaleValue: number | number[] = slot.scale
        let customTimes: number[] | undefined = undefined

        if (isSwingingToBack) {
          yValue = [PEEK, 540, 0]
          scaleValue = [1.00, 0.97, 0.94]
          customTimes = [0, 0.5, 1.0]
        }

        return (
          <motion.div
            key={proj.id}
            className="absolute rounded-[18px] bg-white border border-black/8 overflow-hidden"
            style={{
              left:   0,
              top:    0,
              width:  CARD_W,
              height: CARD_H,
              zIndex: cardZIndexes[proj.id], // State-driven z-index
              boxShadow: isFront
                ? '0px 12px 36px rgba(0,0,0,0.12)'
                : '0px 4px 16px rgba(0,0,0,0.06)',
              willChange: 'transform',
            }}
            animate={{
              y:       yValue,
              scale:   scaleValue,
              opacity: slot.opacity,
            }}
            transition={{
              ...TWEEN_SWING,
              ...(customTimes ? { times: customTimes } : {})
            }}
          >
            <div className="flex h-full">

              {/* LEFT — phone on tinted panel */}
              <div
                className="flex items-center justify-center bg-zinc-100 flex-shrink-0"
                style={{ width: '300px' }}
              >
                <PhoneFrame />
              </div>

              {/* RIGHT — project info */}
              <div className="flex flex-col justify-center gap-5 px-12 py-10 flex-1 min-w-0">

                <span className="font-[family-name:var(--font-imfell)] text-[11px] tracking-[5px] uppercase text-black/35">
                  {proj.category}
                </span>

                <h4
                  className="font-[family-name:var(--font-fredericka)] text-3xl tracking-[5px] uppercase text-black leading-snug"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {proj.title}
                </h4>

                <p className="font-[family-name:var(--font-libertinus)] text-base text-black/55 leading-relaxed max-w-xs">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[family-name:var(--font-imfell)] text-[10px] tracking-[3px] uppercase border border-black/15 rounded-full px-3 py-1 text-black/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GitHub + Kunjungi — only on front card */}
                {isFront && (
                  <div className="flex gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="solid" id="btn-github" href={proj.github}>GitHub</Button>
                    {proj.web && (
                      <Button variant="outline" id="btn-visit" href={proj.web}>Kunjungi</Button>
                    )}
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Section ─── */
import { motion as m2 } from 'framer-motion'

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative z-30 min-h-screen flex flex-col bg-white pt-32 pb-24 overflow-hidden"
    >
      {/* 1. Header Area — Positioned with pt-32 to match Certifications Y coordinate exactly */}
      <div className="w-full text-center flex-shrink-0">
        <m2.h2
          className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          PORTFOLIO
        </m2.h2>
      </div>

      {/* 2. Stage Area — Consistent spacing mt-16 below heading, centered horizontally */}
      <div className="w-full mt-16 relative flex items-center justify-center flex-shrink-0" style={{ height: `${CARD_H + PEEK}px` }}>
        <m2.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <ProjectCards />
        </m2.div>
      </div>
    </section>
  )
}
