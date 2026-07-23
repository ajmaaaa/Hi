'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FRAME_IMAGES } from './images'

const TOTAL_FRAMES = FRAME_IMAGES.length
const PIXELS_PER_FRAME = 7 // Adjust sensitivity: lower number = faster rotation on drag

export default function Object3DViewer() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const dragStartXRef = useRef<number>(0)
  const dragStartFrameRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload all frame images into browser memory to eliminate any loading delay
  useEffect(() => {
    FRAME_IMAGES.forEach((imgObj) => {
      const img = new window.Image()
      img.src = imgObj.src
    })
  }, [])

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true)
      dragStartXRef.current = e.clientX
      dragStartFrameRef.current = currentFrame
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId)
      }
    },
    [currentFrame]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      const deltaX = e.clientX - dragStartXRef.current
      const frameOffset = Math.round(deltaX / PIXELS_PER_FRAME)
      // Inverted direction: + frameOffset so dragging right advances frames in the natural direction
      const rawFrame = dragStartFrameRef.current + frameOffset
      // Clamp frame between 0 and TOTAL_FRAMES - 1 (no 360 loop)
      const nextFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawFrame))
      setCurrentFrame(nextFrame)
    },
    [isDragging]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        setIsDragging(false)
        if (containerRef.current) {
          try {
            containerRef.current.releasePointerCapture(e.pointerId)
          } catch {
            // Safe fallback if pointer capture was lost
          }
        }
      }
    },
    [isDragging]
  )

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[760px] h-[480px] sm:h-[580px] lg:h-[660px] flex items-center justify-center select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Instantaneous 0ms frame switching without opacity transitions or flicker */}
      <div className="relative w-full h-full flex items-center justify-center">
        {FRAME_IMAGES.map((imgObj, idx) => (
          <img
            key={idx}
            src={imgObj.src}
            alt={`3D Object Frame ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
            style={{ display: idx === currentFrame ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  )
}
