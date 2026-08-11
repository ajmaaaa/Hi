'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

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

interface ProjectItem {
  id: number
  category: string
  title: string
  desc: string
  tags: string[]
  github?: string | null
  web?: string | null
  download?: string | null
  image?: string
  layout?: 'left' | 'right'
  isScretor?: boolean
  isNalara?: boolean
  isFlipbook?: boolean
}

const PROJECTS: ProjectItem[] = [
  {
    id: 0,
    category: 'Mobile App',
    title: 'Scretor\nTranslator',
    desc: 'A versatile screen translator for Android designed to help you master new vocabulary. Beyond instant translation, it provides voice pronunciation, romanization (to help you read foreign characters like Chinese or Japanese), comprehensive definitions, and synonyms.',
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
    web: '/documents/flipbook.pdf',
    image: '/flipbook-user.jpg',
    layout: 'right',
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
const CARD_H = 675
const PEEK   = 60  // how many px the back cards peek above the front card
const STACK_H = CARD_H + PEEK

// slot 0 = back (top of stack, peeks at top), slot 2 = front (bottom of stack, in front)
const SLOTS = [
  { y: 0,          scale: 0.93, opacity: 1.00, zIndex: 10 }, // back  — peeks at top
  { y: PEEK / 2,   scale: 0.965, opacity: 1.00, zIndex: 20 }, // mid
  { y: PEEK,       scale: 1.00, opacity: 1.00, zIndex: 30 }, // front — full size
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
  const [scale, setScale] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = Math.max(280, window.innerWidth - 32)
      setScale(Math.min(1, availableWidth / CARD_W))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

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
      ref={wrapperRef}
      className="relative cursor-pointer select-none"
      style={{ width: CARD_W * scale, height: STACK_H * scale + 64 }}
      onClick={cycle}
    >
      <div
        className="relative"
        style={{
          width: CARD_W,
          height: STACK_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {PROJECTS.map((proj, cardIdx) => {
        const slotIdx = order.indexOf(cardIdx)
        const prevSlotIdx = prevOrder.indexOf(cardIdx)
        const slot    = SLOTS[slotIdx]
        const isFront = slotIdx === 2

        const isSwingingToBack = prevSlotIdx === 2 && slotIdx === 0
        const isMidToFront     = prevSlotIdx === 1 && slotIdx === 2
        const isBackToMid      = prevSlotIdx === 0 && slotIdx === 1

        // Precise timeline segmentations: hold mid/back cards static for first 55% of duration
        let yValue: number | number[] = slot.y
        let scaleValue: number | number[] = slot.scale
        let customTimes: number[] | undefined = undefined
        let easeConfig: any = 'easeInOut'

        if (isSwingingToBack) {
          // Front swings deep down (Y: 690) to fully clear tumpukan card
          yValue = [PEEK, 690, 0]
          scaleValue = [1.00, 0.965, 0.93]
          customTimes = [0, 0.55, 1.0]
          easeConfig = ['easeIn', 'easeOut']
        } else if (isMidToFront) {
          // Mid -> Front: Wait at position Mid (PEEK/2) for 55% of time, then slide forward
          yValue = [PEEK / 2, PEEK / 2, PEEK]
          scaleValue = [0.965, 0.965, 1.00]
          customTimes = [0, 0.55, 1.0]
          easeConfig = ['linear', 'easeInOut']
        } else if (isBackToMid) {
          // Back -> Mid: Wait at position Back (0) for 55% of time, then slide forward
          yValue = [0, 0, PEEK / 2]
          scaleValue = [0.93, 0.93, 0.965]
          customTimes = [0, 0.55, 1.0]
          easeConfig = ['linear', 'easeInOut']
        }

        return (
          <motion.div
            key={proj.id}
            className="absolute isolate overflow-hidden rounded-[18px] bg-transparent"
            style={{
              left:   0,
              top:    0,
              width:  CARD_W,
              height: CARD_H,
              zIndex: cardZIndexes[proj.id], // State-driven z-index to guarantee absolute DOM layout locking
              boxShadow: slotIdx === 2
                ? '0px 20px 48px rgba(0, 0, 0, 0.16)'
                : slotIdx === 1
                  ? '0px 14px 36px rgba(0, 0, 0, 0.13)'
                  : '0px 9px 26px rgba(0, 0, 0, 0.10)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
            animate={{
              y:       yValue,
              scale:   scaleValue,
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
            {proj.isScretor ? (
              <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-between p-16 overflow-hidden relative">
                
                {/* Decorative background blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-indigo-200/40 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />

                {/* Custom Scretor Text Content */}
                <div className="flex flex-col gap-6 z-10 max-w-[450px]">
                  
                  <div className="flex gap-6 items-start mt-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-[family-name:var(--font-imfell)] text-[14px] tracking-[6px] uppercase text-slate-500 font-bold">
                        {proj.category}
                      </span>
                      <h4 className="font-[family-name:var(--font-fredericka)] text-[54px] tracking-[4px] uppercase text-slate-900 font-normal leading-none" style={{ whiteSpace: 'pre-line' }}>
                        Scretor
                      </h4>
                    </div>
                    <img src="/projects/scretor/icon.png" alt="Scretor Icon" className="w-20 h-20 rounded-[18px] shadow-lg border border-white/60 bg-white/50 backdrop-blur-sm p-1" />
                  </div>
                  
                  <p className="font-[family-name:var(--font-libertinus)] text-lg text-slate-600 leading-relaxed">
                    {proj.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="font-[family-name:var(--font-imfell)] text-[12px] tracking-[4px] uppercase border border-slate-300 rounded-full px-4 py-1.5 text-slate-700 bg-white/60 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-2" onClick={(e) => e.stopPropagation()}>
                    {proj.download && (
                       <Button variant="solid" id={`btn-download-${proj.id}`} href={proj.download}>Download</Button>
                    )}
                    {proj.web && (
                       <Button variant="outline" id={`btn-visit-${proj.id}`} href={proj.web} className="border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm">Visit</Button>
                    )}
                  </div>
                </div>

                {/* 3D Tilted Mobile Frames Composition */}
                <div className="absolute right-[20px] top-[54.5%] -translate-y-1/2 w-[600px] h-[650px] flex items-center justify-center pointer-events-none">
                   
                   {/* Back Phone (01-Scretor.png) */}
                   <div className="absolute right-[220px] top-[15%] w-[270px] h-[580px] transform -rotate-[8deg] translate-y-10 scale-90 opacity-90 transition-transform duration-700 hover:rotate-0 hover:translate-y-0 hover:scale-100 hover:z-30">
                     <div className="w-full h-full bg-[#1c1c1c] rounded-[36px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] ring-1 ring-white/10 relative overflow-hidden flex-shrink-0">
                       {/* Notch */}
                       <div className="absolute z-10 bg-[#1c1c1c] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                       <div className="w-full h-full bg-black rounded-[28px] overflow-hidden">
                          <img src="/projects/scretor/01-Scretor.png" alt="Scretor UI" className="h-full w-full object-cover" />
                       </div>
                     </div>
                   </div>
                   
                   {/* Front Phone (03-manhwa.png) */}
                   <div className="absolute right-[40px] top-[15%] w-[270px] h-[580px] transform rotate-[6deg] -translate-y-2 transition-transform duration-700 hover:rotate-0 hover:-translate-y-6 hover:scale-105 z-20">
                     <div className="w-full h-full bg-[#1c1c1c] rounded-[36px] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.25)] ring-1 ring-white/10 relative overflow-hidden flex-shrink-0">
                       {/* Notch */}
                       <div className="absolute z-10 bg-[#1c1c1c] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                        <div className="w-full h-full bg-black rounded-[28px] overflow-hidden">
                          <img src="/projects/scretor/03-manhwa.png" alt="Scretor Translation" className="h-full w-full object-cover" />
                       </div>
                     </div>
                   </div>

                </div>
              </div>
            ) : proj.isNalara ? (
              <div className="w-full h-full bg-zinc-950 flex items-center justify-between p-16 overflow-hidden relative">
                 {/* Decorative Glow */}
                 <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

                 {/* VISUALS ON THE LEFT FOR NALARA */}
                 <div className="relative w-[500px] h-[600px] flex items-center justify-center pointer-events-none z-10 -ml-8">
                   {/* Phone 1: Loading screen */}
                   <div className="absolute left-[20px] top-[15%] w-[260px] h-[550px] transform -rotate-[4deg] -translate-y-2 scale-95 opacity-80 transition-transform duration-700 hover:rotate-0 hover:-translate-y-6 hover:scale-100 hover:opacity-100 hover:z-30">
                     <div className="w-full h-full bg-[#2a2a2a] rounded-[34px] p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] ring-1 ring-white/10 relative overflow-hidden flex-shrink-0">
                       <div className="absolute z-10 bg-[#2a2a2a] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                       <div className="w-full h-full bg-black rounded-[26px] overflow-hidden">
                          <img src="/projects/nalara/nalara_loading.png" alt="Nalara Loading" className="h-full w-full object-cover" />
                       </div>
                     </div>
                   </div>

                   {/* Phone 2: Progress screen */}
                    <div className="absolute left-[190px] top-[15%] w-[260px] h-[550px] transform rotate-[4deg] translate-y-6 transition-transform duration-700 hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-40 z-20">
                     <div className="w-full h-full bg-[#1c1c1c] rounded-[34px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-teal-500/30 relative overflow-hidden flex-shrink-0">
                       <div className="absolute z-10 bg-[#1c1c1c] top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-[14px]"></div>
                        <div
                          className="relative isolate w-full h-full bg-black rounded-[26px] overflow-hidden"
                          style={{ clipPath: 'inset(0 round 26px)' }}
                        >
                          <img
                            src="/projects/nalara/progress.png"
                            alt="Nalara Progress"
                            className="absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] rounded-[24px] bg-black object-contain object-top"
                            style={{ clipPath: 'inset(0 round 24px)' }}
                          />
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* TEXT CONTENT ON THE RIGHT */}
                 <div className="flex w-[530px] max-w-[530px] flex-col gap-6 z-10 text-left items-start">
                   
                   <div className="flex gap-5 items-start mt-2">
                     <div className="flex flex-col gap-1 items-start">
                       <span className="font-[family-name:var(--font-imfell)] text-[14px] tracking-[6px] uppercase text-teal-400/80 font-semibold">
                         {proj.category}
                       </span>
                       <h4 className="font-[family-name:var(--font-fredericka)] text-[54px] tracking-[4px] uppercase text-white font-normal leading-none" style={{ whiteSpace: 'pre-line' }}>
                         {proj.title}
                       </h4>
                     </div>
                     <img src="/projects/nalara/nalara.png" alt="Nalara Icon" className="w-20 h-20 rounded-[18px] shadow-[0_0_30px_rgba(20,184,166,0.3)] border border-teal-500/30 object-cover bg-zinc-900" />
                   </div>
                   
                   <p className="font-[family-name:var(--font-libertinus)] text-lg text-zinc-400 leading-relaxed text-left">
                     {proj.desc}
                   </p>
                   
                   <div className="flex flex-wrap gap-3 mt-2 justify-start">
                     {proj.tags.map((tag) => (
                       <span key={tag} className="font-[family-name:var(--font-imfell)] text-[12px] tracking-[4px] uppercase border border-zinc-700 rounded-full px-4 py-1.5 text-zinc-300 bg-zinc-900/50">
                         {tag}
                       </span>
                     ))}
                   </div>
                   
                   {/* Development Badge */}
                   <div className="mt-2 flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full shadow-lg">
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
              <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-white flex items-center justify-between p-16 overflow-hidden relative">
                
                {/* Modern Minimal Text Content */}
                <div className="flex flex-col gap-6 z-10 max-w-[420px]">
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="font-[family-name:var(--font-imfell)] text-[14px] tracking-[6px] uppercase text-rose-500 font-bold">
                      {proj.category}
                    </span>
                    <h4 className="font-[family-name:var(--font-fredericka)] text-[56px] tracking-[4px] uppercase text-zinc-900 font-normal leading-[1.1] mt-2" style={{ whiteSpace: 'pre-line' }}>
                      {proj.title}
                    </h4>
                  </div>
                  
                  <p className="font-[family-name:var(--font-libertinus)] text-xl text-zinc-600 leading-relaxed mt-2">
                    {proj.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="font-[family-name:var(--font-imfell)] text-[12px] tracking-[4px] uppercase border border-rose-200 rounded-full px-4 py-1.5 text-rose-600 bg-rose-50 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-2" onClick={(e) => e.stopPropagation()}>
                    {proj.web && (
                       <Button variant="outline" id={`btn-visit-${proj.id}`} href={proj.web} className="border-rose-300 text-rose-700 hover:bg-rose-100 bg-white rounded-full px-8 shadow-sm uppercase tracking-widest font-semibold text-xs">
                         View Flipbook
                       </Button>
                    )}
                  </div>
                </div>

                {/* 3D Physical Book Showcase */}
                <div className="absolute right-12 top-0 bottom-0 w-[500px] flex items-center justify-center pointer-events-none">
                   
                   {/* Book Container */}
                   <div className="relative w-[350px] h-[500px] transform rotate-[3deg] drop-shadow-[0_32px_28px_rgba(0,0,0,0.28)] transition-transform duration-700 hover:rotate-0 hover:scale-105 hover:drop-shadow-[0_38px_34px_rgba(0,0,0,0.32)]">
                     
                     {/* Stacked Pages (Sticking out to the right) */}
                     {/* Page 3 (furthest) */}
                     <div className="absolute inset-0 bg-stone-200 border border-stone-300 shadow-sm transform translate-x-5 translate-y-1 rotate-[2deg] rounded-r-md" />
                     
                     {/* Page 2 */}
                     <div className="absolute inset-0 bg-stone-100 border border-stone-200 shadow-sm transform translate-x-3.5 translate-y-0.5 rotate-[1deg] rounded-r-md" />
                     
                     {/* Page 1 (closest) */}
                     <div className="absolute inset-0 bg-white border border-stone-100 shadow-sm transform translate-x-2 rotate-[0.5deg] rounded-r-md" />
                     
                     {/* Front Cover (The Image) */}
                     <div className="absolute inset-0 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.38)] border-r border-stone-200 transform rounded-r-md overflow-hidden z-10">
                       <img src="/flipbook-user.jpg" alt="Flipbook Cover" className="w-full h-full object-cover object-left" />
                       
                       {/* Spine crease/shadow effect on the left */}
                       <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/15 to-transparent mix-blend-overlay pointer-events-none" />
                       
                       {/* Subtle gloss overlay */}
                       <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
                     </div>
                   </div>
                </div>

              </div>
            ) : (
              <div className={`flex h-full ${proj.layout === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* VISUAL (phone or custom image) on tinted panel */}
                <div
                  className="flex items-center justify-center bg-zinc-100 flex-shrink-0 relative overflow-hidden"
                  style={{ width: '460px' }}
                >
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-contain p-6" />
                  ) : (
                    <PhoneFrame />
                  )}
                </div>

                {/* PROJECT INFO */}
                <div className="flex flex-col justify-center gap-6 px-16 py-12 flex-1 min-w-0">
                  <span className="font-[family-name:var(--font-imfell)] text-[13px] tracking-[6px] uppercase text-black/35">
                    {proj.category}
                  </span>

                  {/* Fixed faux bold: use font-normal to keep original sketch transparency */}
                  <h4
                    className="font-[family-name:var(--font-fredericka)] text-[42px] tracking-[6px] uppercase text-black/80 font-normal leading-snug"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {proj.title}
                  </h4>

                  <p className="font-[family-name:var(--font-libertinus)] text-lg text-black/55 leading-relaxed max-w-md">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-[family-name:var(--font-imfell)] text-[12px] tracking-[4px] uppercase border border-black/15 rounded-full px-4 py-1.5 text-black/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
                    {proj.github && (
                      <Button variant="solid" id={`btn-github-${proj.id}`} href={proj.github}>GitHub</Button>
                    )}
                    {proj.download && (
                      <Button variant="solid" id={`btn-download-${proj.id}`} href={proj.download}>Download</Button>
                    )}
                    {proj.web && (
                      <Button variant="outline" id={`btn-visit-${proj.id}`} href={proj.web}>Visit</Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          
          </motion.div>
          )
        })}
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 text-black/80"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronIcon className="h-8 w-8 rotate-90 stroke-[2.5]" />
        <span className="font-[family-name:var(--font-imfell)] text-[11px] font-semibold uppercase tracking-[4px]">
          Next Project
        </span>
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
