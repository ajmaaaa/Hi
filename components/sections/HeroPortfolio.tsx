'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

/**
 * Editorial-Minimalist Asymmetric Hero Section:
 *   - Perfectly aligned grid container (max-w-[1536px] px-8 lg:px-6) matching the main site grid.
 *   - Left column aligned exactly at lg:pl-[83px] (perfectly aligned with logo "Y" and other sections).
 *   - Absolute vertical centering (justify-center items-center) on min-h-screen viewport, excluding navbar layout offsets.
 */

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function HeroPortfolio() {
  const controlsA = useAnimation()
  const controlsB = useAnimation()

  useEffect(() => {
    // Soft subtle alternate floating animations for the two overlapping Polaroid cards
    controlsA.start({
      y: [0, -6, 0],
      rotate: [-13, -11, -13],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    })
    controlsB.start({
      y: [0, -8, 0],
      rotate: [15, 17, 15],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay: 0.5,
      },
    })
  }, [controlsA, controlsB])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white py-0"
    >
      {/* Main content - centered vertically in the viewport */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-8 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-0">

          {/* Left — text (Shifted slightly inward to align precisely under the center of the 'Y' in MEYKY logo) */}
          <motion.div
            className="relative flex flex-col gap-6 max-w-[600px] items-start text-left w-full lg:pl-[83px]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h4
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-2xl tracking-[8px] text-shadow-heading uppercase"
            >
              HI, I AM MEYKY
            </motion.h4>

            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-5xl lg:text-6xl leading-tight tracking-[6px] text-shadow-heading uppercase"
            >
              CREATIVE
              <br />
              DEVELOPER
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-libertinus)] text-xl text-black leading-relaxed text-shadow-heading"
            >
              Mahasiswa teknik informatika yang ingin mencapai tujuan nya. Dia tak ingin kalah dari kemalasannya.
            </motion.p>
          </motion.div>

          {/* Right — two polaroid cards with corrected spacing offset */}
          <div className="relative w-full max-w-[420px] h-[340px] flex items-center justify-center flex-shrink-0 lg:mr-[140px] lg:mt-0 mt-8">
            {/* Card B — back, +15° (zIndex: 20 to overlap on top) */}
            <motion.div
              className="absolute rounded-[18px] bg-white border border-black/8 p-3 flex flex-col justify-between"
              style={{ width: '190px', height: '270px', left: '160px', top: '10px', zIndex: 20, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)', rotate: 15 }}
              initial={{ y: -400, opacity: 0 }}
              animate={controlsB}
            >
              <div className="w-full h-[180px] bg-zinc-100 rounded-[10px] flex items-center justify-center overflow-hidden border border-black/5">
                <span className="font-[family-name:var(--font-imfell)] text-xs text-black/35 tracking-[2px]">AUTOMATION</span>
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <span className="font-[family-name:var(--font-fredericka)] text-[11px] tracking-[2px] uppercase text-black/85">n8n workflow</span>
                <span className="font-[family-name:var(--font-imfell)] text-[8px] tracking-[1px] uppercase text-black/35">meyky ajmariadi</span>
              </div>
            </motion.div>

            {/* Card A — front, -13° (zIndex: 10, shifted to left: -70px to prevent overlapping) */}
            <motion.div
              className="absolute rounded-[18px] bg-white border border-black/8 p-3 flex flex-col justify-between"
              style={{ width: '190px', height: '270px', left: '10px', top: '40px', zIndex: 10, boxShadow: '0px 4px 12px rgba(0,0,0,0.06)', rotate: -13 }}
              initial={{ y: -400, opacity: 0 }}
              animate={controlsA}
            >
              <div className="w-full h-[180px] bg-zinc-100 rounded-[10px] flex items-center justify-center overflow-hidden border border-black/5">
                <span className="font-[family-name:var(--font-imfell)] text-xs text-black/35 tracking-[2px]">DEVELOPER</span>
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <span className="font-[family-name:var(--font-fredericka)] text-[11px] tracking-[2px] uppercase text-black/85">web application</span>
                <span className="font-[family-name:var(--font-imfell)] text-[8px] tracking-[1px] uppercase text-black/35">meyky ajmariadi</span>
              </div>
            </motion.div>

            {/* Faux shadow/placeholder line for polaroid border styling */}
            <motion.div
              className="absolute rounded-[18px] opacity-0 pointer-events-none"
              style={{ width: '190px', height: '270px', left: 0, top: 0, zIndex: 20, boxShadow: '0px 4px 4px rgba(0,0,0,0.25)', rotate: -10 }}
              initial={{ y: -400, opacity: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ delay: 1, duration: 3.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
              <div className="flex items-start justify-center pt-4 h-full">
                <div className="w-36 h-52 border border-black rounded-lg bg-zinc-200" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
