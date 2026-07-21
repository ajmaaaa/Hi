'use client'

import { useVisitorStore } from '@/store/useVisitorStore'

export default function VisitorBadge() {
  const count = useVisitorStore((s) => s.count)

  return (
    <div
      className="w-32 h-10 bg-[#4C4A4A] rounded-[10px] flex items-center justify-center"
      style={{ boxShadow: '2px 4px 4px 0px rgba(0,0,0,0.25)' }}
    >
      <span className="font-[family-name:var(--font-libertinus)] text-white text-sm tracking-widest">
        Visitor: {count}
      </span>
    </div>
  )
}
