'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

/**
 * Hero section: Perfectly aligned with the navbar grid, centering vertically excluding navbar.
 */
export default function HeroPortfolio() {
  const controlsA = useAnimation()
  const controlsB = useAnimation()

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Both cards drop simultaneously
      Promise.all([
        controlsA.start({
          y: 0, opacity: 1,
          transition: { type: 'spring', stiffness: 70, damping: 13 },
        }).then(() => {
          controlsA.start({
            y: [0, -9, 0],
            rotate: [-13, -11.5, -13],
            transition: { duration: 3.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          })
        }),
        controlsB.start({
          y: 0, opacity: 1,
          transition: { type: 'spring', stiffness: 70, damping: 13 },
        }).then(() => {
          controlsB.start({
            y: [0, -7, 0],
            rotate: [15, 16.5, 15],
            transition: { duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          })
        }),
      ])
    }, 900)

    return () => clearTimeout(timer)
  }, [controlsA, controlsB])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white py-0"
    >
      {/* Main content - centered vertically in viewport */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-8 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-0">

          {/* Left — text (Shifted slightly inward to align precisely under the center of the 'Y' in MEYKY logo) */}
          <motion.div
            className="relative flex flex-col gap-6 max-w-[600px] items-start text-left w-full lg:pl-[83px]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-2xl tracking-[8px] text-shadow-heading uppercase"
            >
              PORTFOLIO
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-5xl lg:text-6xl leading-tight tracking-[6px] text-shadow-heading uppercase"
            >
              MEYKY<br />AJMARIADI
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-libertinus)] text-xl text-black leading-relaxed text-shadow-heading"
            >
              Mahasiswa teknik informatika yang ingin mencapai tujuan nya. Dia
              tak ingin kalah dari kemalasannya. Ia ingin menjadi orang yang
              berbeda dengan orang biasa. Menurutnya berbeda tersebut adalah
              sebuah pencapaian baginya
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <Button variant="solid" id="btn-hire-me">Hire Me</Button>
              <Button variant="outline" id="btn-download-cv" href="/cv.pdf">Download CV</Button>
            </motion.div>
          </motion.div>

          {/* Right — two polaroid cards with corrected spacing offset */}
          <div className="relative flex-shrink-0 hidden lg:block" style={{ width: '588px', height: '433px' }}>
            {/* Card B — back, +15° (zIndex: 20 to overlap on top) */}
            <motion.div
              className="absolute rounded-[18px] border border-black/10 bg-white"
              style={{
                width: '224px', height: '320px',
                left: '243px', top: '113px',
                zIndex: 20,
                boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
                rotate: 15,
              }}
              initial={{ y: -700, opacity: 0 }}
              animate={controlsB}
            >
              <div className="flex items-start justify-center pt-5 h-full">
                <div className="w-44 h-64 border border-black rounded-lg bg-zinc-200" />
              </div>
            </motion.div>

            {/* Card A — front, -13° (zIndex: 10, shifted to left: -70px to prevent overlapping) */}
            <motion.div
              className="absolute rounded-[18px] border border-black/10 bg-white"
              style={{
                width: '224px', height: '320px',
                left: '-70px', top: '0px',
                zIndex: 10,
                boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
                rotate: -13,
              }}
              initial={{ y: -700, opacity: 0 }}
              animate={controlsA}
            >
              <div className="flex items-start justify-center pt-5 h-full">
                <div className="w-44 h-64 border border-black rounded-lg bg-zinc-200" />
              </div>
            </motion.div>
          </div>

          {/* Mobile simplified polaroid list */}
          <div className="relative lg:hidden" style={{ width: '260px', height: '300px' }}>
            <motion.div
              className="absolute rounded-[18px] border border-black/10 bg-white"
              style={{ width: '190px', height: '270px', right: 0, top: '30px', zIndex: 10, boxShadow: '0px 4px 4px rgba(0,0,0,0.25)', rotate: 12 }}
              initial={{ y: -400, opacity: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ delay: 1.2, duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
              <div className="flex items-start justify-center pt-4 h-full">
                <div className="w-36 h-52 border border-black rounded-lg bg-zinc-200" />
              </div>
            </motion.div>
            <motion.div
              className="absolute rounded-[18px] border border-black/10 bg-white"
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
