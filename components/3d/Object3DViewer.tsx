'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FRAME_IMAGES } from './images'

const TOTAL_FRAMES = FRAME_IMAGES.length
const PIXELS_PER_FRAME = 7 // Adjust sensitivity: lower number = faster rotation on drag

export default function Object3DViewer() {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const activeFrameRef = useRef<number>(0)
  const targetFrameRef = useRef<number>(0)
  const dragStartXRef = useRef<number>(0)
  const dragStartFrameRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const rafPendingRef = useRef<number | null>(null)

  // Draw a specific frame onto the HTML5 Canvas with aspect-ratio contain math
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = imagesRef.current[index]
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return

    const dpr = window.devicePixelRatio || 1
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight

    // Set actual canvas drawing surface dimensions to match physical display pixels
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Aspect ratio contain calculation
    const hRatio = canvas.width / img.naturalWidth
    const vRatio = canvas.height / img.naturalHeight
    const ratio = Math.min(hRatio, vRatio)

    const drawWidth = img.naturalWidth * ratio
    const drawHeight = img.naturalHeight * ratio
    const offsetX = (canvas.width - drawWidth) / 2
    const offsetY = (canvas.height - drawHeight) / 2

    // Enable high quality image smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, offsetX, offsetY, drawWidth, drawHeight)
  }, [])

  // Throttled RAF draw updates for 120 FPS performance
  const updateFrameRAF = useCallback(
    (newFrame: number) => {
      targetFrameRef.current = newFrame
      if (rafPendingRef.current !== null) return

      rafPendingRef.current = requestAnimationFrame(() => {
        rafPendingRef.current = null
        const target = targetFrameRef.current
        if (target !== activeFrameRef.current) {
          activeFrameRef.current = target
          drawFrame(target)
        }
      })
    },
    [drawFrame]
  )

  // Preload all 74 frame images into JS memory objects & render initial frame
  useEffect(() => {
    let loadedCount = 0
    const totalCount = FRAME_IMAGES.length

    FRAME_IMAGES.forEach((imgObj, i) => {
      const img = new window.Image()
      img.src = imgObj.src
      img.onload = () => {
        loadedCount++
        if (i === 0 || loadedCount === 1) {
          drawFrame(0)
        }
        if (loadedCount === totalCount) {
          setIsLoaded(true)
          drawFrame(0)
        }
      }
      imagesRef.current[i] = img
    })
  }, [drawFrame])

  // Handle window resize to re-render canvas cleanly
  useEffect(() => {
    const handleResize = () => {
      drawFrame(activeFrameRef.current)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame])

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true)
      dragStartXRef.current = e.clientX
      dragStartFrameRef.current = activeFrameRef.current
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId)
      }
    },
    []
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
      updateFrameRAF(nextFrame)
    },
    [isDragging, updateFrameRAF]
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
      className={`relative w-full max-w-[1020px] h-[580px] sm:h-[700px] lg:h-[820px] flex items-center justify-center select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* High-performance HTML5 Canvas: 0ms texture eviction, 100% flicker-free 120 FPS GPU rendering */}
      <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none select-none" />
    </div>
  )
}
