'use client'

import { useState, useRef } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { snapSpring } from '@/lib/animationVariants'

interface CertCard { id: string }

const CERT_CARDS: CertCard[] = [
  { id: 'cert-1' },
  { id: 'cert-2' },
  { id: 'cert-3' },
]

function PeekSidesCertStack() {
  const [order, setOrder] = useState<string[]>(CERT_CARDS.map((c) => c.id))
  const controls = useAnimation()
  const isDragging = useRef(false)

  function sendFrontToBack() {
    setOrder((prev) => [...prev.slice(1), prev[0]])
  }

  async function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const { offset, velocity } = info
    const passed = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500

    if (passed) {
      const dir = offset.x > 0 ? 1 : -1
      await controls.start({
        x: dir * 800,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      })
      sendFrontToBack()
      controls.set({ x: 0, opacity: 1 })
    } else {
      controls.start({ x: 0, transition: snapSpring })
    }
    isDragging.current = false
  }

  function getCardX(index: number): string | number {
    if (index === 0) return '0%'
    if (index === 1) return '-58%'
    if (index === 2) return '58%'
    return '0%'
  }

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: '420px' }}
    >
      <div
        className="relative w-full max-w-[1100px] flex items-center justify-center overflow-hidden"
        style={{ height: '420px' }}
      >
        {order.map((id, idx) => {
          const isFront = idx === 0
          if (idx > 2) return null

          return (
            <motion.div
              key={id}
              style={{ zIndex: 30 - idx * 10, position: 'absolute' }}
              initial={false}
            >
              <motion.div
                animate={isFront ? controls : { x: getCardX(idx), scale: idx === 0 ? 1 : 0.95, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                drag={isFront ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => { isDragging.current = true }}
                onDragEnd={handleDragEnd}
                onTap={() => { if (isFront && !isDragging.current) sendFrontToBack() }}
                className={`rounded-[10px] border border-black/10 bg-white ${isFront ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                style={{
                  width: '720px',
                  height: '380px',
                  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                  x: isFront ? undefined : getCardX(idx),
                }}
                whileTap={isFront ? { scale: 0.99 } : {}}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-zinc-200 rounded-[10px] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-imfell)] text-xs text-black/40 tracking-widest">CERT</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="min-h-screen flex flex-col items-center justify-center bg-white py-24"
    >
      <div className="w-full max-w-[1440px] mx-auto px-0">
        <motion.h2
          className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          CERTIFICATIONS
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PeekSidesCertStack />
        </motion.div>

        <p className="font-[family-name:var(--font-imfell)] text-xs text-center text-black/40 tracking-widest mt-8 uppercase">
          Tap or swipe to browse
        </p>
      </div>
    </section>
  )
}
