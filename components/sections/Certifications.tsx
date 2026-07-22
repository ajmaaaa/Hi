'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * Desktop 4 Figma (1440×1024):
 *   Center card:     w-[830]  h-[500]  — front, full size (scaled proportionally from 1027x618 for viewport safety)
 *   Left peek card:  w-[716]  h-[400]  — smaller, centered vertically (scaled from 923x516)
 *   Right peek card: w-[716]  h-[400]  — smaller, centered vertically (scaled from 923x516)
 */

const CERTS = [
  { id: 'cert-0', title: 'Certificate 1', issuer: 'Organization Name' },
  { id: 'cert-1', title: 'Certificate 2', issuer: 'Organization Name' },
  { id: 'cert-2', title: 'Certificate 3', issuer: 'Organization Name' },
]
const N = CERTS.length

const CENTER_W  = 940
const CENTER_H  = 550
const SIDE_W    = 810
const SIDE_H    = 440
const OFFSET    = 880 // spacing for peeking cards

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
      className="relative z-10 min-h-screen flex flex-col justify-center items-center bg-white py-0 overflow-hidden"
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
          CERTIFICATIONS
        </motion.h2>

        {/* Stage — height matches center card height (550px) for centered vertical layout */}
        <div className="relative flex items-center justify-center w-full flex-shrink-0" style={{ height: `${CENTER_H}px` }}>
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
                  'absolute rounded-[18px] border border-black/10 bg-white',
                  !slot.isCenter ? 'cursor-pointer' : '',
                ].join(' ')}
                style={{
                  left: '50%',
                  zIndex: slot.zIndex,
                  // Ultra-clean minimal shadows: tight vertical Y-offset and low opacity for sleek premium UI
                  boxShadow: slot.isCenter
                    ? '0px 8px 24px rgba(0, 0, 0, 0.08)'
                    : '0px 4px 12px rgba(0, 0, 0, 0.04)',
                }}
                animate={{
                  x:       xValue,
                  y:       (CENTER_H - slot.height) / 2, // Centered vertically on 550px stage
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
      </div>
    </section>
  )
}
