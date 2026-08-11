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
   
   Click: front rolls downward (y: 580px) lurus tanpa miring,
   then slips behind the stack and opens back up at the top slot (0).
 ────────────────────────────────────────────── */

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

type ProjectItem = {
  id: number;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  github?: string | null;
  web?: string | null;
  download?: string | null;
  isScretor?: boolean;
  isNalara?: boolean;
  isFlipbook?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 0,
    category: 'Mobile App',
    title: 'Scretor\nTranslator',
    desc: 'A versatile screen translator for Android designed to help you master new vocabulary. Beyond instant translation, it provides voice pronunciation, romanization, comprehensive definitions, and synonyms.',
    tags: ['Android', 'Kotlin', 'Compose', 'ML Kit'],
    download: 'https://play.google.com/store/search?q=scretor',
    web: 'https://scretor.xyz',
    isScretor: true,
  },
  {
    id: 1,
    category: 'Design',
    title: 'Digital\nFlipbook',
    desc: 'An interactive digital flipbook design featuring aesthetic visual layouts tailored for engaging presentations and digital publications.',
    tags: ['Canva', 'Layout', 'Typography', 'Visual Design'],
    github: null,
    web: 'https://canva.link/qh2rbxc57dbwnn2',
    isFlipbook: true,
  },
  {
    id: 2,
    category: 'Mobile App',
    title: 'Nalara',
    desc: 'A next-generation intelligent research and learning assistant. Empowers students and academics to accelerate document comprehension and streamline research workflows with AI.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Gemini AI'],
    isNalara: true,
  },
]

const CARD_W = 1200
const CARD_H = 700
const PEEK = 40  // how many px the back cards peek above the front card

// slot 0 = back (top of stack, peeks at top), slot 2 = front (bottom of stack, in front)
const SLOTS = [
  { y: 0, scale: 0.94, opacity: 1.00, zIndex: 10 }, // back  — peeks at top
  { y: PEEK / 2, scale: 0.97, opacity: 1.00, zIndex: 20 }, // mid
  { y: PEEK, scale: 1.00, opacity: 1.00, zIndex: 30 }, // front — full size
]

// Normalized back to 0.6 seconds duration for fast responsive UX
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
  const [order, setOrder] = useState([2, 1, 0])
  const [prevOrder, setPrevOrder] = useState([2, 1, 0])
  const [isAnimating, setIsAnimating] = useState(false)

  // React state-based z-index management to ensure physical DOM layer locking during slide animations
  const [cardZIndexes, setCardZIndexes] = useState<{ [key: number]: number }>({
    0: 30,
    1: 20,
    2: 10,
  })

  function cycle() {
    if (isAnimating) return
    setIsAnimating(true)

    const backCardId = order[0]
    const midCardId = order[1]
    const frontCardId = order[2]

    // 1. Immediately lock z-indexes on click: swing card goes to top front (40), mid stays mid (20), back stays back (10)
    setCardZIndexes({
      [frontCardId]: 40,
      [midCardId]: 20,
      [backCardId]: 10,
    })

    // 2. Shift order positions in a single React state batch
    setPrevOrder(order)
    setOrder([frontCardId, backCardId, midCardId]) // front → back, back → mid, mid → front

    // 3. Swap layers at exactly 55% of the animation progress (330ms of 0.6s)
    setTimeout(() => {
      setCardZIndexes({
        [frontCardId]: 10, // swing card slips behind
        [midCardId]: 30,   // mid card takes front position
        [backCardId]: 20,  // back card takes mid position
      })
    }, 330)

    // 4. Unlock clicks after animation finishes (600ms normalized)
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
        const slot = SLOTS[slotIdx]
        const isFront = slotIdx === 2

        const isSwingingToBack = prevSlotIdx === 2 && slotIdx === 0
        const isMidToFront = prevSlotIdx === 1 && slotIdx === 2
        const isBackToMid = prevSlotIdx === 0 && slotIdx === 1

        // Precise timeline segmentations: hold mid/back cards static for first 55% of duration
        let yValue: number | number[] = slot.y
        let scaleValue: number | number[] = slot.scale
        let customTimes: number[] | undefined = undefined
        let easeConfig: any = 'easeInOut'

        if (isSwingingToBack) {
          // Front swings deep down (Y: 580) to fully clear tumpukan card
          yValue = [PEEK, 580, 0]
          scaleValue = [1.00, 0.97, 0.94]
          customTimes = [0, 0.55, 1.0]
          easeConfig = ['easeIn', 'easeOut']
        } else if (isMidToFront) {
          // Mid -> Front: Wait at position Mid (PEEK/2) for 55% of time, then slide forward
          yValue = [PEEK / 2, PEEK / 2, PEEK]
          scaleValue = [0.97, 0.97, 1.00]
          customTimes = [0, 0.55, 1.0]
          easeConfig = ['linear', 'easeInOut']
        } else if (isBackToMid) {
          // Back -> Mid: Wait at position Back (0) for 55% of time, then slide forward
          yValue = [0, 0, PEEK / 2]
          scaleValue = [0.94, 0.94, 0.97]
          customTimes = [0, 0.55, 1.0]
          easeConfig = ['linear', 'easeInOut']
        }

        return (
          <motion.div
            key={proj.id}
            className="absolute rounded-[18px] bg-white border border-black/8 overflow-hidden"
            style={{
              left: 0,
              top: 0,
              width: CARD_W,
              height: CARD_H,
              zIndex: cardZIndexes[proj.id], // State-driven z-index to guarantee absolute DOM layout locking
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.06)',
              willChange: 'transform',
            }}
            animate={{
              y: yValue,
              scale: scaleValue,
              opacity: slot.opacity,
            }}
            transition={{
              y: {
                type: 'tween',
                ease: easeConfig,
                duration: 0.6, // Normalized
                ...(customTimes ? { times: customTimes } : {})
              },
              scale: {
                type: 'tween',
                ease: easeConfig,
                duration: 0.6, // Normalized
                ...(customTimes ? { times: customTimes } : {})
              },
              opacity: {
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.6, // Normalized
              },
            }}
          >

            <div className="w-full h-full">
              {proj.isScretor ? (
                <div className="w-full h-full bg-slate-900 flex items-center justify-between p-16 overflow-hidden relative">
                  {/* Decorative Glow */}
                  <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-indigo-200/40 blur-[100px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />

                  {/* VISUALS ON THE LEFT */}
                  <div className="relative w-[600px] h-full flex items-center justify-center pointer-events-none z-10 -ml-12">
                    {/* Phone 1: Dictionary / Details */}
                    <div className="absolute left-[30px] top-[10%] w-[280px] h-[580px] transform -rotate-[4deg] -translate-y-2 scale-95 opacity-80 transition-transform duration-700 hover:rotate-0 hover:-translate-y-4 hover:scale-100 hover:opacity-100 hover:z-30">
                      <div className="w-full h-full bg-[#f4f4f5] rounded-[36px] p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.15)] ring-1 ring-black/5 relative overflow-hidden flex-shrink-0">
                        <div className="absolute z-10 bg-[#f4f4f5] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                        <div className="w-full h-full bg-white rounded-[28px] overflow-hidden border border-zinc-200">
                          <img src="/projects/scretor/01-Scretor.png" alt="Scretor UI 2" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    {/* Phone 2: Main translation screen (In front) */}
                    <div className="absolute left-[200px] top-[10%] w-[280px] h-[580px] transform rotate-[4deg] translate-y-4 shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-transform duration-700 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-40 z-20">
                      <div className="w-full h-full bg-white rounded-[36px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] ring-1 ring-black/5 relative overflow-hidden flex-shrink-0">
                        <div className="absolute z-10 bg-white top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                        <div className="w-full h-full bg-white rounded-[28px] overflow-hidden border border-zinc-200">
                          <img src="/projects/scretor/03-manhwa.png" alt="Scretor UI 1" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Scretor Text Content */}
                  <div className="flex flex-col gap-6 z-10 max-w-[450px]">
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="font-[family-name:var(--font-imfell)] text-[14px] tracking-[6px] uppercase text-indigo-900/60 font-semibold">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-5">
                        <h4 className="font-[family-name:var(--font-fredericka)] text-[54px] tracking-[4px] uppercase text-indigo-950 font-normal leading-none" style={{ whiteSpace: 'pre-line' }}>
                          Scretor
                        </h4>
                        <img src="/projects/scretor/icon.png" alt="Scretor Icon" className="w-14 h-14 rounded-[14px] shadow-lg border border-white/60 bg-white/50 backdrop-blur-sm p-1" />
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-libertinus)] text-lg text-indigo-900/70 leading-relaxed">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="font-[family-name:var(--font-imfell)] text-[12px] tracking-[4px] uppercase border border-indigo-900/10 rounded-full px-4 py-1.5 text-indigo-950/70 bg-indigo-900/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-6" onClick={(e) => e.stopPropagation()}>
                      {proj.download && (
                        <Button variant="solid" id={`btn-download-${proj.id}`} href={proj.download}>Download</Button>
                      )}
                      {proj.web && (
                        <Button variant="outline" id={`btn-visit-${proj.id}`} href={proj.web} className="border-indigo-200 text-indigo-900 hover:bg-indigo-50 shadow-sm">Visit</Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : proj.isNalara ? (
                <div className="w-full h-full bg-zinc-950 flex items-center justify-between p-16 overflow-hidden relative">
                  {/* Decorative Glow */}
                  <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

                  {/* VISUALS ON THE LEFT FOR NALARA */}
                  <div className="relative w-[600px] h-full flex items-center justify-center pointer-events-none z-10 -ml-12">
                    {/* Phone 1: Loading screen */}
                    <div className="absolute left-[30px] top-[10%] w-[280px] h-[580px] transform -rotate-[4deg] -translate-y-2 scale-95 opacity-80 transition-transform duration-700 hover:rotate-0 hover:-translate-y-4 hover:scale-100 hover:opacity-100 hover:z-30">
                      <div className="w-full h-full bg-[#2a2a2a] rounded-[36px] p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] ring-1 ring-white/10 relative overflow-hidden flex-shrink-0">
                        <div className="absolute z-10 bg-[#2a2a2a] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                        <div className="w-full h-full bg-black rounded-[28px] overflow-hidden">
                          <img src="/projects/nalara/nalara_loading.png" alt="Nalara Loading" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    {/* Phone 2: Progress screen */}
                    <div className="absolute left-[200px] top-[10%] w-[280px] h-[580px] transform rotate-[4deg] translate-y-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-40 z-20">
                      <div className="w-full h-full bg-[#1c1c1c] rounded-[36px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-teal-500/30 relative overflow-hidden flex-shrink-0">
                        <div className="absolute z-10 bg-[#1c1c1c] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                        <div className="w-full h-full bg-black rounded-[28px] overflow-hidden">
                          <img src="/projects/nalara/progress.png" alt="Nalara Progress" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TEXT CONTENT ON THE RIGHT */}
                  <div className="flex flex-col gap-6 z-10 max-w-[420px] text-right items-end">
                    <div className="flex gap-5 items-start mt-2 flex-row-reverse">
                      <div className="flex flex-col gap-1 items-end">
                        <span className="font-[family-name:var(--font-imfell)] text-[14px] tracking-[6px] uppercase text-teal-400/80 font-semibold">
                          {proj.category}
                        </span>
                        <h4 className="font-[family-name:var(--font-fredericka)] text-[54px] tracking-[4px] uppercase text-white font-normal leading-none" style={{ whiteSpace: 'pre-line' }}>
                          {proj.title}
                        </h4>
                      </div>
                      <img src="/projects/nalara/nalara.png" alt="Nalara Icon" className="w-20 h-20 rounded-[18px] shadow-[0_0_30px_rgba(20,184,166,0.3)] border border-teal-500/30 object-cover bg-zinc-900" />
                    </div>

                    <p className="font-[family-name:var(--font-libertinus)] text-lg text-zinc-400 leading-relaxed text-right">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-2 justify-end">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="font-[family-name:var(--font-imfell)] text-[12px] tracking-[4px] uppercase border border-zinc-700 rounded-full px-4 py-1.5 text-zinc-300 bg-zinc-900/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Development Badge */}
                    <div className="mt-6 flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full shadow-lg">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                      </span>
                      <span className="text-zinc-300 font-semibold text-sm tracking-wide">
                        Development in Progress...
                      </span>
                    </div>
                  </div>
                </div>
              ) : proj.isFlipbook ? (
                <div className="w-full h-full bg-[#fcf9f2] flex items-center justify-between p-16 overflow-hidden relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[80%] bg-[#f5efe3] rounded-full pointer-events-none blur-[100px]" />

                  {/* VISUALS ON THE LEFT FOR FLIPBOOK */}
                  <div className="relative w-[600px] h-full flex items-center justify-center pointer-events-none z-10 -ml-12">
                    {/* Physical Book Representation */}
                    <div className="relative w-[440px] h-[600px] transform rotate-[2deg] transition-transform duration-700 hover:rotate-0 hover:scale-105 group">

                      {/* Book Shadow */}
                      <div className="absolute inset-0 bg-black/20 rounded-r-[12px] blur-xl transform translate-y-8 translate-x-6"></div>
                      <div className="absolute inset-0 bg-black/10 rounded-r-[12px] blur-md transform translate-y-4 translate-x-4"></div>

                      {/* Book Pages Layer (Creates thickness) */}
                      <div className="absolute inset-y-2 left-2 right-[-8px] bg-[#e6dfcc] rounded-r-[10px] border border-[#d4c8af] shadow-inner transform translate-x-3 translate-y-1 rotate-[0.5deg]"></div>
                      <div className="absolute inset-y-1 left-1 right-[-4px] bg-[#f0ebd9] rounded-r-[10px] border border-[#e0d6c0] shadow-inner transform translate-x-1.5 translate-y-0.5 rotate-[0.2deg]"></div>

                      {/* Book Cover */}
                      <div className="absolute inset-0 bg-white shadow-[inset_4px_0_15px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.05)] rounded-r-[12px] overflow-hidden z-10 border-l-[4px] border-[#3a352d]">
                        {/* Book Spine Highlight/Shadow */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 via-white/20 to-transparent mix-blend-overlay z-20 pointer-events-none border-r border-white/10" />
                        <div className="absolute left-8 top-0 bottom-0 w-4 bg-gradient-to-r from-black/5 to-transparent z-20 pointer-events-none" />

                        {/* Crease line */}
                        <div className="absolute left-[12px] top-0 bottom-0 w-[1px] bg-black/20 z-20 pointer-events-none mix-blend-multiply" />

                        {/* Image Content */}
                        <img src="/flipbook-user.jpg" alt="Flipbook Cover" className="w-full h-full object-cover object-left" />

                        {/* Subtle page texture overlay */}
                        <div className="absolute inset-0 bg-[#f5efe3] mix-blend-multiply opacity-20 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* TEXT CONTENT ON THE RIGHT */}
                  <div className="flex flex-col gap-6 z-10 max-w-[420px] text-right items-end">
                    <div className="flex flex-col gap-1 mt-2 items-end">
                      <span className="font-[family-name:var(--font-imfell)] text-[14px] tracking-[6px] uppercase text-rose-800/60 font-semibold">
                        {proj.category}
                      </span>
                      <h4 className="font-[family-name:var(--font-fredericka)] text-[54px] tracking-[4px] uppercase text-[#3a352d] font-normal leading-none" style={{ whiteSpace: 'pre-line' }}>
                        {proj.title}
                      </h4>
                    </div>

                    <p className="font-[family-name:var(--font-libertinus)] text-lg text-[#5a5448] leading-relaxed italic border-r-2 border-rose-800/20 pr-4">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4 justify-end">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="font-[family-name:var(--font-imfell)] text-[11px] tracking-[4px] uppercase border border-[#d4c8af] rounded-[4px] px-4 py-1.5 text-[#5a5448] bg-white/50 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-6" onClick={(e) => e.stopPropagation()}>
                      {proj.web && (
                        <Button variant="outline" id={`btn-visit-${proj.id}`} href={proj.web} className="border-[#3a352d] text-[#3a352d] hover:bg-[#3a352d] hover:text-[#fcf9f2] shadow-md uppercase tracking-widest font-semibold text-xs transition-colors duration-300 rounded-[4px]">
                          Open Flipbook
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )
      })}

      {/* Floating Hint for P&E */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
        onClick={cycle}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-[family-name:var(--font-imfell)] text-[11px] tracking-[4px] uppercase text-black/40 font-semibold">
          Next Project
        </span>
        <ChevronIcon className="text-black/40 rotate-90 w-6 h-6" />
      </motion.div>
    </div>
  )
}

/* ─── Section ─── */
export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative z-30 min-h-screen flex flex-col justify-center items-center bg-white py-0 overflow-hidden"
    >
      {/* Main container - centered vertically in the viewport */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-8 lg:px-6 py-6 flex flex-col items-center justify-center">
        <motion.h2
          className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          PROJECTS & EXPERIENCES
        </motion.h2>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <ProjectCards />
        </motion.div>
      </div>
    </section>
  )
}
