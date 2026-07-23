'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { FRAME_IMAGES } from './images'

const TOTAL_FRAMES = FRAME_IMAGES.length
const PIXELS_PER_FRAME = 7 // Adjust sensitivity: lower number = faster rotation on drag

export default function Object3DViewer() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const dragStartXRef = useRef<number>(0)
  const dragStartFrameRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Preload all frame images into browser memory to eliminate flicker
  useEffect(() => {
    FRAME_IMAGES.forEach((imgObj) => {
      const img = new window.Image()
      img.src = imgObj.src
    })
  }, [])

  // Auto-spin animation when user is idle
  useEffect(() => {
    if (isDragging || isHovered) return

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES)
    }, 90)

    return () => clearInterval(interval)
  }, [isDragging, isHovered])

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true)
      setHasInteracted(true)
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
      const rawFrame = dragStartFrameRef.current - frameOffset
      const nextFrame = ((rawFrame % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES
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
      className={`relative w-full max-w-[500px] h-[380px] sm:h-[420px] lg:h-[440px] flex items-center justify-center rounded-[24px] bg-white border border-black/8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden select-none touch-none transition-shadow duration-300 ${
        isDragging ? 'cursor-grabbing shadow-[0_16px_50px_rgba(0,0,0,0.14)]' : 'cursor-grab hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 via-white to-zinc-100/40 pointer-events-none" />

      {/* Frame image display */}
      <div className="relative w-full h-full p-6 flex items-center justify-center">
        {FRAME_IMAGES.map((imgObj, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 p-6 flex items-center justify-center transition-opacity duration-75 ${
              idx === currentFrame ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={imgObj}
              alt={`3D Frame ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority={idx === 0}
              className="object-contain pointer-events-none select-none p-4"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* 360 Interactive Badge / Drag Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-[family-name:var(--font-imfell)] tracking-[2px] uppercase shadow-lg transition-opacity duration-300">
        <svg
          className={`w-3.5 h-3.5 text-white/90 ${isDragging ? 'animate-spin' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>{isDragging ? 'ROTATING 3D' : 'DRAG TO ROTATE 360°'}</span>
      </div>

      {/* Frame step counter pill top right */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none px-3 py-1 rounded-full bg-zinc-100/90 border border-black/5 text-[10px] font-[family-name:var(--font-imfell)] tracking-[1px] text-black/50">
        {currentFrame + 1} / {TOTAL_FRAMES}
      </div>
    </div>
  )
}
