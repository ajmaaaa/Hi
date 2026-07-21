'use client'

import { useRef } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { StackCardData, CardStackVariant } from './cardStack.types'
import { cardSpring, snapSpring, getDepthStyle } from '@/lib/animationVariants'

interface StackCardProps {
  card: StackCardData
  index: number
  isFront: boolean
  variant: CardStackVariant
  onSendToBack: () => void
  totalCards: number
}

export default function StackCard({
  card,
  index,
  isFront,
  variant,
  onSendToBack,
}: StackCardProps) {
  const controls = useAnimation()
  const isDragging = useRef(false)
  const depthStyle = getDepthStyle(index)
  const baseRotation = card.baseRotation ?? 0

  // Idle float animation values
  const floatY = [0, -8, 0]
  const floatRotate =
    variant === 'polaroid'
      ? [baseRotation - 1, baseRotation + 1, baseRotation - 1]
      : [0, 0, 0]

  // Peek-sides: special x positioning for non-front cards
  function getPeekX(): string | number {
    if (variant !== 'peek-sides') return 0
    if (index === 1) return '-55%'
    if (index === 2) return '55%'
    return 0
  }

  async function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (!isFront) return
    const { offset, velocity } = info
    const threshold = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500

    if (threshold) {
      const direction = offset.x > 0 ? 1 : -1
      await controls.start({
        x: direction * 600,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      })
      onSendToBack()
      controls.set({ x: 0, opacity: 1 })
    } else {
      controls.start({ x: 0, transition: snapSpring })
    }
    isDragging.current = false
  }

  function handleTap() {
    if (!isFront || isDragging.current) return
    onSendToBack()
  }

  // Hide cards beyond index 2
  if (index > 2) return null

  const peekX = getPeekX()

  return (
    <motion.div
      animate={controls}
      style={{ zIndex: depthStyle.zIndex, x: peekX }}
      initial={false}
      className="absolute"
    >
      {/* Depth layer */}
      <motion.div
        animate={{
          scale: depthStyle.scale,
          y: depthStyle.y,
          opacity: depthStyle.opacity,
        }}
        transition={cardSpring}
      >
        {/* Idle float */}
        <motion.div
          animate={{
            y: floatY,
            rotate: floatRotate,
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
          drag={isFront ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragStart={() => {
            isDragging.current = true
          }}
          onDragEnd={handleDragEnd}
          onTap={handleTap}
          className={`rounded-[10px] border border-black/10 bg-white shadow-[var(--shadow-card)] ${
            isFront ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
          }`}
          whileTap={isFront ? { scale: 0.98 } : {}}
        >
          {variant === 'polaroid' ? (
            // Polaroid layout: outer card + inner photo frame
            <div className="w-56 h-80 flex items-start justify-center pt-5">
              <div className="w-44 h-64 border border-black rounded-lg bg-zinc-200 flex items-center justify-center overflow-hidden">
                {card.content}
              </div>
            </div>
          ) : (
            // Default layout
            <div className="w-56 h-80 p-4 flex items-center justify-center">
              {card.content}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
