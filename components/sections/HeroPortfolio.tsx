'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

export default function HeroPortfolio() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      {/* Decorative stacked paper layers — peek from bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-[90%] max-w-[1221px] bg-white rounded-[10px] border border-black/5"
            style={{
              height: '693px',
              boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
              transform: `rotate(180deg)`,
              bottom: `${-620 + i * 24}px`,
            }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center max-w-[1440px] mx-auto w-full px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-0 pt-28 lg:pt-0">

          {/* Left — text content */}
          <motion.div
            className="flex flex-col gap-6 max-w-[505px]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Section label */}
            <motion.span
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-2xl tracking-[8px] text-shadow-heading uppercase"
            >
              PORTFOLIO
            </motion.span>

            {/* Name heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-5xl lg:text-6xl leading-tight tracking-[6px] text-shadow-heading uppercase"
            >
              MEYKY
              <br />
              AJMARIADI
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-libertinus)] text-xl text-black leading-relaxed text-shadow-heading"
            >
              Mahasiswa teknik informatika yang ingin mencapai tujuan nya. Dia
              tak ingin kalah dari kemalasannya.Ia ingin menjadi orang yang
              berbeda dengan orang biasa. Menurutnya berbeda tersebut adalah
              sebuah pencapaian baginya
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <Button variant="solid" id="btn-hire-me">Hire Me</Button>
              <Button variant="outline" id="btn-portfolio">Portfolio</Button>
            </motion.div>
          </motion.div>

          {/* Right — polaroid card pair at precise -13deg / +15deg */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative" style={{ width: '340px', height: '380px' }}>
              {/* Card B — behind, +15deg, offset bottom-right */}
              <motion.div
                className="absolute rounded-[10px] border border-black/10 bg-white"
                style={{
                  width: '224px',
                  height: '320px',
                  top: '60px',
                  left: '100px',
                  zIndex: 10,
                  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                }}
                animate={{ y: [0, -6, 0], rotate: [15, 16, 15] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              >
                <div className="flex items-start justify-center pt-5 h-full">
                  <div className="w-44 h-64 border border-black rounded-lg bg-zinc-200" />
                </div>
              </motion.div>

              {/* Card A — front, -13deg */}
              <motion.div
                className="absolute rounded-[10px] border border-black/10 bg-white cursor-grab active:cursor-grabbing"
                style={{
                  width: '224px',
                  height: '320px',
                  top: '0px',
                  left: '0px',
                  zIndex: 20,
                  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                }}
                animate={{ y: [0, -8, 0], rotate: [-13, -12, -13] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-start justify-center pt-5 h-full">
                  <div className="w-44 h-64 border border-black rounded-lg bg-zinc-200" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom ticker text */}
      <div className="relative z-10 pb-8 px-8 lg:px-16">
        <p className="font-[family-name:var(--font-imfell)] text-xs tracking-widest uppercase text-black/60">
          HALLO NAMA SAYA MEYKY AJMARIADI
          <br />
          SAAT INI SAYA BERKULIAH DI UMRAH
        </p>
      </div>
    </section>
  )
}
