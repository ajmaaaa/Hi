interface SkillPillProps {
  label: string
  size?: 'sm' | 'md'
}

export default function SkillPill({ label, size = 'sm' }: SkillPillProps) {
  const boxSize = size === 'md' ? 'w-12 h-12' : 'w-10 h-10'
  const textSize = size === 'md' ? 'text-sm' : 'text-[10px]'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${boxSize} bg-zinc-300 rounded-[10px]`} />
      <span className={`font-[family-name:var(--font-imfell)] ${textSize} text-black tracking-wide uppercase`}>
        {label}
      </span>
    </div>
  )
}
