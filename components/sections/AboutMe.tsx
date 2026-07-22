'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * About Me card stack — Original style with perfectly aligned spacing:
 *   Back  (slot 0): left=0,  top=64 — scale=0.90, opacity=1.00 (permanently solid)
 *   Mid   (slot 1): left=64, top=32 — scale=0.95, opacity=1.00 (permanently solid)
 *   Front (slot 2): left=32, top=0  — scale=1.00, opacity=1.00 (permanently solid)
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

export default function AboutMe() {
  const [order, setOrder] = useState([0, 1, 2])
  const [isAnimating, setIsAnimating] = useState(false)

  // Absolute positioning properties matching Figma desktop design
  const cardStyles = [
    { left: '0px',   top: '64px', scale: 0.90, zIndex: 10 }, // slot 0 (back)
    { left: '64px',  top: '32px', scale: 0.95, zIndex: 20 }, // slot 1 (mid)
    { left: '32px',  top: '0px',  scale: 1.00, zIndex: 30 }, // slot 2 (front)
  ]

  function cycle() {
    if (isAnimating) return
    setIsAnimating(true)

    // Cycle order: front card (idx 2) swings behind (idx 0)
    setOrder((prev) => [prev[2], prev[0], prev[1]])

    setTimeout(() => {
      setIsAnimating(false)
    }, 700)
  }

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white py-0"
    >
      {/* Main container - centered vertically */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-8 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">

          {/* Left — text */}
          <motion.div
            className="flex flex-col gap-6 max-w-[600px] lg:pl-[83px]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-5xl lg:text-6xl tracking-[12px] text-shadow-heading uppercase"
            >
              ABOUT ME
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-libertinus)] text-xl text-black leading-relaxed text-shadow-heading"
            >
              Mahasiswa teknik informatika yang ingin mencapai tujuan nya. Dia
              tak ingin kalah dari kemalasannya. Ia ingin menjadi orang yang
              berbeda dengan orang biasa. Menurutnya berbeda tersebut adalah
              sebuah pencapaian baginya
            </motion.p>
          </motion.div>

          {/* Right — card stack, clickable */}
          <motion.div
            className="lg:mr-[260px]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Container sized to fit all 3 card positions */}
            <div
              className="relative cursor-pointer select-none"
              style={{ width: '288px', height: '385px' }}
              onClick={cycle}
            >
              {[0, 1, 2].map((cardIdx) => {
                const slotIdx = order.indexOf(cardIdx)
                const style = cardStyles[slotIdx]
                const isFront = slotIdx === 2

                // Smooth transitional values for card components
                return (
                  <motion.div
                    key={cardIdx}
                    className="absolute w-[190px] h-[321px] rounded-[18px] bg-zinc-950 border border-black/5"
                    animate={{
                      left: style.left,
                      top: style.top,
                      scale: style.scale,
                      zIndex: style.zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 18,
                    }}
                    style={{
                      transformOrigin: 'center center',
                      position: 'absolute',
                      left: style.left,
                      top: style.top,
                      scale: style.scale,
                      zIndex: style.zIndex,
                      // Sleek premium shadows matching new TechStack card hierarchy
                      boxShadow: isFront
                        ? '0px 8px 24px rgba(0,0,0,0.08)'
                        : '0px 4px 12px rgba(0,0,0,0.04)',
                    }}
                    whileHover={isFront ? { y: -6, boxShadow: '0px 12px 28px rgba(0,0,0,0.12)' } : undefined}
                  />
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
