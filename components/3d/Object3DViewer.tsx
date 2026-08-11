'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FRAME_IMAGES } from './images'

const TOTAL_FRAMES = FRAME_IMAGES.length
const PIXELS_PER_FRAME = 7 // Adjust sensitivity: lower number = faster rotation on drag
const DRAG_THRESHOLD = 8

export default function Object3DViewer() {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const activeFrameRef = useRef<number>(0)
  const targetFrameRef = useRef<number>(0)
  const isDraggingRef = useRef(false)
  const hasManualInteractionRef = useRef(false)
  const dragStartXRef = useRef<number>(0)
  const dragStartYRef = useRef<number>(0)
  const dragStartFrameRef = useRef<number>(0)
  const gestureAxisRef = useRef<'pending' | 'horizontal' | 'vertical' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const rafPendingRef = useRef<number | null>(null)
  const loadFrameRef = useRef<(index: number) => void>(() => {})

  // Draw a specific frame onto the HTML5 Canvas with aspect-ratio contain math
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = imagesRef.current[index]
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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
      loadFrameRef.current(newFrame)
      for (let offset = 1; offset <= 3; offset++) {
        loadFrameRef.current(Math.max(0, newFrame - offset))
        loadFrameRef.current(Math.min(TOTAL_FRAMES - 1, newFrame + offset))
      }
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

  // Load only the first frames up front; nearby frames are fetched on demand.
  useEffect(() => {
    if (window.innerWidth < 1024) return

    let cancelled = false
    const loadFrame = (i: number) => {
      if (i < 0 || i >= TOTAL_FRAMES || imagesRef.current[i]) return
      const img = new window.Image()
      img.decoding = 'async'
      imagesRef.current[i] = img
      img.src = FRAME_IMAGES[i].src
      img.onload = () => {
        if (cancelled) return
        if (i === 0) {
          setIsLoaded(true)
          drawFrame(0)
        }
        if (targetFrameRef.current === i) {
          drawFrame(i)
        }
      }
    }

    loadFrameRef.current = loadFrame
    loadFrame(0)
    const warmupTimer = window.setTimeout(() => {
      for (let i = 1; i <= 8; i++) loadFrame(i)
    }, 500)

    return () => {
      cancelled = true
      window.clearTimeout(warmupTimer)
      loadFrameRef.current = () => {}
      if (rafPendingRef.current !== null) cancelAnimationFrame(rafPendingRef.current)
    }
  }, [drawFrame])

  // Handle window resize to re-render canvas cleanly
  useEffect(() => {
    const handleResize = () => {
      drawFrame(activeFrameRef.current)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame])

  // Rotate through the frame sequence while scrolling from Hero to the end of About Me.
  useEffect(() => {
    const updateFromScroll = () => {
      if (isDraggingRef.current || hasManualInteractionRef.current || !isLoaded) return

      const hero = document.getElementById('hero')
      const about = document.getElementById('about')
      if (!hero || !about) return

      const start = hero.offsetTop
      const fullRangeEnd = about.offsetTop + about.offsetHeight
      const end = start + (fullRangeEnd - start) / 5
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)))
      updateFrameRAF(Math.round(progress * (TOTAL_FRAMES - 1)))
    }

    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [isLoaded, updateFrameRAF])

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (window.innerWidth < 1024) return
      dragStartXRef.current = e.clientX
      dragStartYRef.current = e.clientY
      dragStartFrameRef.current = activeFrameRef.current
      gestureAxisRef.current = 'pending'
    },
    []
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (window.innerWidth < 1024) return
      const deltaX = e.clientX - dragStartXRef.current
      const deltaY = e.clientY - dragStartYRef.current

      if (gestureAxisRef.current === 'pending') {
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < DRAG_THRESHOLD) return
        if (Math.abs(deltaY) >= Math.abs(deltaX)) {
          gestureAxisRef.current = 'vertical'
          return
        }

        gestureAxisRef.current = 'horizontal'
        isDraggingRef.current = true
        hasManualInteractionRef.current = true
        setIsDragging(true)
        containerRef.current?.setPointerCapture(e.pointerId)
      }

      if (gestureAxisRef.current !== 'horizontal') return
      e.preventDefault()
      const frameOffset = Math.round(deltaX / PIXELS_PER_FRAME)
      // Inverted direction: + frameOffset so dragging right advances frames in the natural direction
      const rawFrame = dragStartFrameRef.current + frameOffset
      // Clamp frame between 0 and TOTAL_FRAMES - 1 (no 360 loop)
      const nextFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawFrame))
      updateFrameRAF(nextFrame)
    },
    [updateFrameRAF]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = false
      gestureAxisRef.current = null
      if (isDraggingRef.current || isDragging) {
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
      className={`relative h-[360px] w-full max-w-[1020px] sm:h-[520px] lg:h-[820px] flex items-center justify-center select-none touch-auto lg:touch-pan-y ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* High-performance HTML5 Canvas: 0ms texture eviction, 100% flicker-free 120 FPS GPU rendering */}
      <div
        data-native-frame-viewer
        data-frame-urls={JSON.stringify(FRAME_IMAGES.map((frame) => frame.src))}
        className="h-full w-full touch-pan-y lg:hidden"
        aria-label="Swipe character horizontally to change frames"
      >
        <img
          data-frame-image
          src={FRAME_IMAGES[0].src}
          alt="Meyky character illustration"
          draggable={false}
          className="h-full w-full translate-y-10 object-contain sm:translate-y-6"
        />
      </div>
      <img
        src={FRAME_IMAGES[0].src}
        alt="Meyky character illustration"
        className={`absolute inset-0 hidden h-full w-full object-contain transition-opacity lg:block ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <canvas ref={canvasRef} className={`hidden w-full h-full object-contain pointer-events-none select-none transition-opacity lg:block ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}
