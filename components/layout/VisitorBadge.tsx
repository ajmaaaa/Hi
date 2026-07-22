'use client'

import { useVisitorStore } from '@/store/useVisitorStore'

/**
 * Modern Round Visitor Badge
 * Circular container (w-16 h-16) with a 1.5x larger paper plane icon (27px) overlapping the bottom-left edge.
 */
export default function VisitorBadge() {
  const count = useVisitorStore((s) => s.count)

  return (
    <div className="relative w-16 h-16 select-none pointer-events-auto">
      {/* Main Circle Container (w-16 h-16) */}
      <div className="flex flex-col items-center justify-center w-full h-full rounded-full bg-zinc-50 border border-black/10 shadow-sm hover:bg-zinc-100 transition-colors gap-0.5">
        {/* Label "VISITORS" on top */}
        <span className="font-[family-name:var(--font-imfell)] text-[7px] tracking-[1px] uppercase text-black/40 leading-none mb-0.5">
          VISITORS
        </span>
        {/* Visitor Counter on bottom */}
        <span className="font-sans font-extrabold text-sm text-neutral-800 leading-none">
          {count}
        </span>
      </div>

      {/* 1.5x Larger Paper Plane Icon (27px) - Overlapping bottom-left border */}
      <div
        className="absolute -left-2.5 -bottom-2.5 flex items-center justify-center rotate-[5deg] text-neutral-800"
        style={{ width: '34px', height: '34px' }}
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>
    </div>
  )
}
