'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * Desktop 4 Figma (1440×1024):
 *   Center card:     w-[1027] h-[618]  — front, full size
 *   Left peek card:  w-[923]  h-[516]  — smaller, centered vertically
 *   Right peek card: w-[923]  h-[516]  — smaller, centered vertically
 *
 * Layout:
 *   - mb-8 on H2 heading to reduce visual gap and pull heading closer to the cards.
 *   - Reduced padding: py-12 instead of py-24 to prevent overflow/clipping on laptop screens.
 */

const CERTS = [
  { id: 'cert-0', title: 'Certificate 1', issuer: 'Organization Name' },
  { id: 'cert-1', title: 'Certificate 2', issuer: 'Organization Name' },
  { id: 'cert-2', title: 'Certificate 3', issuer: 'Organization Name' },
]
const N = CERTS.length

const CENTER_W  = 1027
const CENTER_H  = 618
const SIDE_W    = 923
const SIDE_H    = 516
const OFFSET    = 1020 // spacing for peeking cards

// Horizontal coordinates based on card widths anchoring at left: 50%
const LEFT_X  = -(SIDE_W / 2) - OFFSET
const RIGHT_X = -(SIDE_W / 2) + OFFSET
const CENT_X  = -(CENTER_W / 2)

function getSlotProps(offset: number) {
  // offset: 0=center, 1=right, 2=left
  if (offset === 0) {
    return {
      x:       CENT_X,
      width:   CENTER_W,
      height:  CENTER_H,
      opacity: 1,
      zIndex:  20,
      isCenter: true,
      isLeft:   false,
      isRight:  false,
    }
  } else if (offset === 1) {
    return {
      x:       RIGHT_X,
      width:   SIDE_W,
      height:  SIDE_H,
      opacity: 0.90,
      zIndex:  10,
      isCenter: false,
      isLeft:   false,
      isRight:  true,
    }
  } else {
    return {
      x:       LEFT_X,
      width:   SIDE_W,
      height:  SIDE_H,
      opacity: 0.90,
      zIndex:  10,
      isCenter: false,
      isLeft:   true,
      isRight:  false,
    }
  }
}

export default function Certifications() {
  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goNext = useCallback(() => {
    setPrevActive(active)
    setActive((i) => (i + 1) % N)
  }, [active])

  const goPrev = useCallback(() => {
    setPrevActive(active)
    setActive((i) => (i - 1 + N) % N)
  }, [active])

  // Snappy normal speed click lock (600ms)
  const triggerNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    goNext()
    setTimeout(() => setIsAnimating(false), 600)
  }, [goNext, isAnimating])

  const triggerPrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    goPrev()
    setTimeout(() => setIsAnimating(false), 600)
  }, [goPrev, isAnimating])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.getElementById('certifications')
      if (!el) return
      const { top, bottom } = el.getBoundingClientRect()
      if (top < window.innerHeight * 0.9 && bottom > window.innerHeight * 0.1) {
        if (e.key === 'ArrowRight') { e.preventDefault(); triggerNext() }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); triggerPrev() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [triggerNext, triggerPrev])

  return (
    <section
      id="certifications"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-white py-12 overflow-hidden"
    >
      <motion.h2
        className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        CERTIFICATIONS
      </motion.h2>

      {/* Stage — height = center card height */}
      <div className="relative w-full flex-shrink-0" style={{ height: CENTER_H }}>
        {CERTS.map((cert, i) => {
          const slotIdx = (i - active + N) % N
          const prevSlotIdx = (i - prevActive + N) % N
          const slot = getSlotProps(slotIdx)

          // Detect wrapping directions
          const isJumpingLeftToRight = prevSlotIdx === 2 && slotIdx === 1 // Left -> Right
          const isJumpingRightToLeft = prevSlotIdx === 1 && slotIdx === 2 // Right -> Left
          const isJumping = isJumpingLeftToRight || isJumpingRightToLeft

          let xValue: number | number[] = slot.x
          let customTimes: number[] | undefined = undefined

          if (isJumpingLeftToRight) {
            xValue = [LEFT_X, LEFT_X - 300, RIGHT_X, RIGHT_X]
            customTimes = [0, 0.49, 0.50, 1.0]
          } else if (isJumpingRightToLeft) {
            xValue = [RIGHT_X, RIGHT_X + 300, LEFT_X, LEFT_X]
            customTimes = [0, 0.49, 0.50, 1.0]
          }

          return (
            <motion.div
              key={cert.id}
              className={[
                'absolute rounded-[10px] border border-black/10 bg-white',
                !slot.isCenter ? 'cursor-pointer' : '',
              ].join(' ')}
              style={{
                left: '50%',
                zIndex: slot.zIndex,
                // Enhanced shadow definitions for better depth visibility on white backgrounds
                boxShadow: slot.isCenter
                  ? '0px 25px 50px -12px rgba(0, 0, 0, 0.15)'
                  : '0px 10px 25px -5px rgba(0, 0, 0, 0.08)',
              }}
              animate={{
                x:       xValue,
                y:       (CENTER_H - slot.height) / 2, // Centered vertically on stage
                width:   slot.width,
                height:  slot.height,
                opacity: slot.opacity,
              }}
              transition={{
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.6,
                x: isJumping
                  ? { type: 'tween', duration: 0, times: customTimes }
                  : { type: 'tween', ease: 'easeInOut', duration: 0.6 }
              }}
              onClick={() => {
                if (slotIdx === 2) triggerPrev()
                if (slotIdx === 1) triggerNext()
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-10 text-center">
                <div className="w-32 h-32 bg-zinc-200 rounded-[10px] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-imfell)] text-sm text-black/40 tracking-widest uppercase">
                    {cert.id}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-[family-name:var(--font-fredericka)] text-2xl tracking-[4px] uppercase text-black/80">
                    {cert.title}
                  </p>
                  <p className="font-[family-name:var(--font-libertinus)] text-base text-black/55">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
