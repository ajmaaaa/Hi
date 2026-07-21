'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

function DiagonalStack() {
  const cards = [
    { id: 'about-c', left: 0, top: 64, z: 10, delay: 0.6 },
    { id: 'about-b', left: 32, top: 32, z: 20, delay: 0.3 },
    { id: 'about-a', left: 64, top: 0, z: 30, delay: 0 },
  ]

  return (
    <div className="relative" style={{ width: '288px', height: '360px' }}>
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute w-56 h-80 rounded-[10px] border border-black/10 bg-white"
          style={{
            left: card.left,
            top: card.top,
            zIndex: card.z,
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: card.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left — text */}
          <motion.div
            className="flex flex-col gap-6 max-w-[450px]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-fredericka)] text-5xl lg:text-6xl tracking-[8px] text-shadow-heading uppercase"
            >
              ABOUT ME
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-libertinus)] text-xl text-black leading-relaxed text-shadow-heading"
            >
              Mahasiswa teknik informatika yang ingin mencapai tujuan nya. Dia
              tak ingin kalah dari kemalasannya.Ia ingin menjadi orang yang
              berbeda dengan orang biasa. Menurutnya berbeda tersebut adalah
              sebuah pencapaian baginya
            </motion.p>
          </motion.div>

          {/* Right — diagonal stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <DiagonalStack />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
