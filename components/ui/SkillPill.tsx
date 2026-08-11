import React from 'react'

interface SkillPillProps {
  label: string
  icon?: string | React.ReactNode
  size?: 'sm' | 'md'
}

export default function SkillPill({ label, icon, size = 'sm' }: SkillPillProps) {
  const boxSize = size === 'md' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-xs'
  const textSize = size === 'md' ? 'text-[11px]' : 'text-[9px]'

  const isUrl = typeof icon === 'string' && icon.startsWith('http')

  return (
    <div className="flex flex-col items-center gap-1.5 group cursor-default">
      <div
        className={`${boxSize} rounded-[10px] bg-zinc-50 border border-black/10 flex items-center justify-center font-bold text-zinc-700 shadow-sm group-hover:bg-zinc-900 group-hover:text-white group-hover:border-black transition-all duration-200 overflow-hidden`}
      >
        {isUrl ? (
          <img src={icon as string} alt={label} className="w-[60%] h-[60%] object-contain" />
        ) : (
          icon || label.slice(0, 2).toUpperCase()
        )}
      </div>
      <span className={`font-[family-name:var(--font-imfell)] ${textSize} text-zinc-600 tracking-wider uppercase text-center group-hover:text-black transition-colors`}>
        {label}
      </span>
    </div>
  )
}
