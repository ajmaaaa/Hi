'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

/**
 * About Me card stack — Original style with perfectly aligned spacing:
 *   Back  (slot 0): left=0,  top=64 — scale=0.90, opacity=1.00 (permanently solid)
 *   Mid   (slot 1): left=64, top=32 — scale=0.95, opacity=1.00 (permanently solid)
 *   Front (slot 2): left=32, top=0  — scale=1.00, opacity=1.00 (permanently solid)
 *
 * Click: front → back (swings out to the left), others slide forward.
 * Jarak undakan horizontal (32px) dan vertikal (32px) diselaraskan sama rata.
 * Opacity di-set 1.00 konstan pada semua kartu agar 100% solid dan tidak ada efek transparan.
 */
const SLOTS = [
  { left: 0,  top: 64, scale: 0.90, opacity: 1.00 }, // back (slot 0)
  { left: 64, top: 32, scale: 0.95, opacity: 1.00 }, // mid (slot 1)
  { left: 32, top: 0,  scale: 1.00, opacity: 1.00 }, // front (slot 2)
]

// Normal visual speed (0.7s) for a snappy and premium user experience
const TWEEN_SWING = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.7,
}

export default function AboutMe() {
  const [order, setOrder] = useState([0, 1, 2]) // order[slotIdx] = cardIdx
  const [prevOrder, setPrevOrder] = useState([0, 1, 2])
  
  // Throttle state to prevent spam clicking and visual bugs
  const [isAnimating, setIsAnimating] = useState(false)

  // Track discrete z-index states dynamically to avoid Framer Motion keyframe snap bugs
  const [cardZIndexes, setCardZIndexes] = useState<{ [key: number]: number }>({
    0: 10, // card 0 starts at Back
    1: 20, // card 1 starts at Mid
    2: 30, // card 2 starts at Front
  })

  function cycle() {
    if (isAnimating) return // Ignore click if transition is in progress
    setIsAnimating(true)

    const backCardId = order[0]
    const midCardId = order[1]
    const frontCardId = order[2]

    // 1. Immediately hold z-indices: swinging card goes to super-front (40), others stay back
    setCardZIndexes({
      [frontCardId]: 40, // swing card is kept on top
      [midCardId]: 20,   // mid card stays at mid level
      [backCardId]: 10,  // back card stays at back level
    })

    // 2. Set slot positions to trigger movement
    setPrevOrder(order)
    setOrder([frontCardId, backCardId, midCardId]) // front → back, back → mid, mid → front

    // 3. Delay the z-index shift until the swing card has reached the apex left (-190px) at 0.35s (50% of 0.7s duration)
    setTimeout(() => {
      setCardZIndexes({
        [frontCardId]: 10, // swing card now lands behind
        [midCardId]: 30,   // mid card takes front position
        [backCardId]: 20,  // back card takes mid position
      })
    }, 350) // 350ms (50% of 0.7s)

    // 4. Unlock click action after the full 700ms animation has finished
    setTimeout(() => {
      setIsAnimating(false)
    }, 700)
  }

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white"
    >
      {/* Spacer to balance navbar height */}
      <div className="h-20 flex-shrink-0" />

      {/* Main container - centered vertically */}
      <div className="relative z-10 flex-1 flex items-center justify-center max-w-[1536px] mx-auto w-full px-8 lg:px-6 py-6">
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
                const prevSlotIdx = prevOrder.indexOf(cardIdx)
                
                const slot = SLOTS[slotIdx]
                const isFront = slotIdx === 2

                // Detect exact transition paths
                const isSwingingToBack = prevSlotIdx === 2 && slotIdx === 0

                // Formulate target values (Cards move simultaneously from start frame)
                let leftValue: number | number[] = slot.left
                let topValue: number | number[] = slot.top
                let scaleValue: number | number[] = slot.scale
                let opacityValue: number | number[] = slot.opacity
                let customTimes: number[] | undefined = undefined

                if (isSwingingToBack) {
                  // Swing card follows a continuous curved motion: left/top keyframes
                  leftValue = [32, -190, 0]
                  topValue = [0, 32, 64]
                  scaleValue = [1.00, 0.95, 0.90]
                  customTimes = [0, 0.5, 1.0]
                }

                return (
                  <motion.div
                    key={cardIdx}
                    className="absolute w-56 h-80 rounded-[18px] border border-black/10 bg-white"
                    animate={{
                      left: leftValue,
                      top: topValue,
                      scale: scaleValue,
                      opacity: opacityValue, // Set to slot.opacity which is permanently 1.00 solid
                    }}
                    transition={{
                      ...TWEEN_SWING,
                      ...(customTimes ? { times: customTimes } : {})
                    }}
                    style={{
                      zIndex: cardZIndexes[cardIdx], // Controlled by delayed React state
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

      {/* Spacer to balance bottom centering */}
      <div className="h-20 flex-shrink-0" />
    </section>
  )
}
