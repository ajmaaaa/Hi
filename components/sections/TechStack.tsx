'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SkillPill from '@/components/ui/SkillPill'

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const Logos = {
  NextJs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  Typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  Tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  Node: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  Postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  Github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  Canva: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
  Flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  Expo: 'https://cdn.simpleicons.org/expo/000020',
  AndroidStudio: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg',
  Unity: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  N8n: 'https://cdn.simpleicons.org/n8n/FF6D5A',
  Obsidian: 'https://cdn.simpleicons.org/obsidian/483699',
  Hermes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhTpaIGWxHnvMbfygiOtqbYivM-LykIvb5pMKdtmFy9w&s=10',
  Openclaw: 'https://taalenta.id/wp-content/uploads/2026/05/openclaw-official-logo.png',
  Arch: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/archlinux/archlinux-original.svg',
  Linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  Debian: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg',
  Ubuntu: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg',
  Fedora: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fedora/fedora-original.svg',
  Hyprland: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/hyprland.png',
  Swayfx: 'https://github.com/wlrfx/swayfx/raw/master/assets/swayfx_logo.svg'
}

const ImageUrls = {
  WebDev: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
  AppDev: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600',
  UiUx: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
  Automation: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCr7MHWDr04mmkve0oUQ2Zn5G_5wyXgobEh8KgdkT5VA&s=10',
  OsEnv: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600'
}

const TECH_CARDS = [
  {
    id: 'tc-web',
    title: 'WEB DEV',
    subtitle: 'FRONTEND & BACKEND',
    skills: [
      { label: 'NEXT.JS', icon: Logos.NextJs },
      { label: 'REACT', icon: Logos.React },
      { label: 'TYPESCRIPT', icon: Logos.Typescript },
      { label: 'TAILWIND', icon: Logos.Tailwind },
      { label: 'NODE.JS', icon: Logos.Node },
      { label: 'POSTGRES', icon: Logos.Postgres },
      { label: 'DOCKER', icon: Logos.Docker },
      { label: 'GIT', icon: Logos.Git },
      { label: 'GITHUB', icon: Logos.Github },
    ],
    illustration: <img src={ImageUrls.WebDev} alt="Web Development" loading="lazy" decoding="async" className="w-full h-full object-cover" />
  },
  {
    id: 'tc-uiux',
    title: 'UI/UX DESIGN',
    subtitle: 'PROTOTYPE & BRAND',
    skills: [
      { label: 'FIGMA', icon: Logos.Figma },
      { label: 'CANVA', icon: Logos.Canva },
    ],
    illustration: <img src={ImageUrls.UiUx} alt="UI/UX Design" loading="lazy" decoding="async" className="w-full h-full object-cover" />
  },
  {
    id: 'tc-os',
    title: 'OS & ENV',
    subtitle: 'SYSTEM & TOOLS',
    skills: [
      { label: 'ARCH', icon: Logos.Arch },
      { label: 'LINUX', icon: Logos.Linux },
      { label: 'DEBIAN', icon: Logos.Debian },
      { label: 'UBUNTU', icon: Logos.Ubuntu },
      { label: 'FEDORA', icon: Logos.Fedora },
      { label: 'HYPRLAND', icon: Logos.Hyprland },
      { label: 'SWAYFX', icon: Logos.Swayfx },
    ],
    illustration: <img src={ImageUrls.OsEnv} alt="OS and Environment" loading="lazy" decoding="async" className="w-full h-full object-cover" />
  },
  {
    id: 'tc-auto',
    title: 'AUTOMATION',
    subtitle: 'WORKFLOWS',
    skills: [
      { label: 'N8N', icon: Logos.N8n },
      { label: 'PYTHON', icon: Logos.Python },
      { label: 'HERMES', icon: Logos.Hermes },
      { label: 'OPENCLAW', icon: Logos.Openclaw },
      { label: 'OBSIDIAN', icon: Logos.Obsidian },
    ],
    illustration: <img src={ImageUrls.Automation} alt="Automation" loading="lazy" decoding="async" className="w-full h-full object-cover" />
  },
  {
    id: 'tc-app',
    title: 'APP DEV',
    subtitle: 'MOBILE PLATFORMS',
    skills: [
      { label: 'REACT NATIVE', icon: Logos.React },
      { label: 'FLUTTER', icon: Logos.Flutter },
      { label: 'EXPO', icon: Logos.Expo },
      { label: 'ANDROID', icon: Logos.AndroidStudio },
      { label: 'UNITY', icon: Logos.Unity },
    ],
    illustration: <img src={ImageUrls.AppDev} alt="App Development" loading="lazy" decoding="async" className="w-full h-full object-cover" />
  }
]

// Slot geometry derived from Figma
const SIDE_OFFSET_X = 392 // px from center
const CENTER_W = 340
const CENTER_H = 500

interface CardSlot {
  x: number
  scale: number
  zIndex: number
  opacity: number
  rotate: number
}

function getSlot(position: 'left' | 'center' | 'right' | 'hidden', compact: boolean): CardSlot {
  if (compact) {
    switch (position) {
      case 'center':
        return { x: 0, scale: 1, zIndex: 30, opacity: 1, rotate: 0 }
      case 'left':
        return { x: -230, scale: 0.9, zIndex: 10, opacity: 0, rotate: 0 }
      case 'right':
        return { x: 230, scale: 0.9, zIndex: 10, opacity: 0, rotate: 0 }
      case 'hidden':
        return { x: 0, scale: 0.8, zIndex: 0, opacity: 0, rotate: 0 }
    }
  }

  switch (position) {
    case 'center':
      return { x: 0, scale: 1, zIndex: 30, opacity: 1, rotate: 0 }
    case 'left':
      return { x: -SIDE_OFFSET_X, scale: 0.8, zIndex: 10, opacity: 1, rotate: 0 }
    case 'right':
      return { x: SIDE_OFFSET_X, scale: 0.8, zIndex: 10, opacity: 1, rotate: 0 }
    case 'hidden':
      return { x: 0, scale: 0.8, zIndex: 0, opacity: 0, rotate: 0 }
  }
}

export default function TechStack() {
  const [activeIndex, setActiveIndex] = useState(3) // Start with AUTOMATION (index 3) in center
  const [isAnimating, setIsAnimating] = useState(false)
  const [compact, setCompact] = useState(true)
  const n = TECH_CARDS.length

  useEffect(() => {
    const updateLayout = () => setCompact(window.innerWidth < 640)
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  function clickLeft() {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + n) % n)
    setTimeout(() => setIsAnimating(false), 500)
  }

  function clickRight() {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % n)
    setTimeout(() => setIsAnimating(false), 500)
  }

  function getPosition(cardIdx: number): 'left' | 'center' | 'right' | 'hidden' {
    if (cardIdx === activeIndex) return 'center'
    if (cardIdx === (activeIndex - 1 + n) % n) return 'left'
    if (cardIdx === (activeIndex + 1) % n) return 'right'
    return 'hidden'
  }

  return (
    <section
      id="techstack"
      className="relative z-30 min-h-screen flex flex-col justify-center items-center bg-transparent py-0 overflow-hidden"
    >
      <div className="relative z-30 w-full max-w-[1536px] mx-auto px-8 lg:px-6 py-6 flex flex-col items-center justify-center">
        <motion.h2
          className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase text-center mb-10"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          TECH STACK
        </motion.h2>

        <div data-native-carousel data-default-index="3" className={`${compact ? 'flex' : 'hidden'} w-screen max-w-none snap-x snap-mandatory gap-2 overflow-x-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
          {TECH_CARDS.map((card) => (
            <article key={`mobile-${card.id}`} data-carousel-card className="responsive-carousel-card flex h-[480px] w-[min(70vw,300px)] flex-none snap-center flex-col items-center overflow-hidden rounded-[18px] border border-black/10 bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.10)] first:ml-[15vw] last:mr-[15vw]">
              <div className="mb-1 flex w-full flex-shrink-0 flex-col items-center gap-1.5 text-center">
                <span className="font-[family-name:var(--font-imfell)] text-[10px] font-medium uppercase tracking-[4.5px] text-black/35">{card.subtitle}</span>
                <h3 className="font-[family-name:var(--font-fredericka)] text-xl font-normal uppercase tracking-[3px] text-black/80">{card.title}</h3>
              </div>
              <div className="relative my-3 flex min-h-[170px] w-full flex-1 flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-black/15 bg-zinc-100">
                {card.illustration}
              </div>
              <div className="mt-1 flex w-full flex-1 flex-col items-center overflow-hidden border-t border-zinc-100 pt-3">
                <span className="mb-3 self-start pl-1 font-[family-name:var(--font-imfell)] text-[9px] font-semibold uppercase tracking-[3px] text-zinc-400">TOOLS & SKILLS</span>
                <div className="custom-scrollbar grid max-h-[180px] w-full grid-cols-3 gap-x-4 gap-y-3 overflow-y-auto pr-1 pb-2">
                  {card.skills.map((skill) => (
                    <SkillPill key={skill.label} label={skill.label} icon={skill.icon} size="md" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`relative ${compact ? 'hidden' : 'flex'} items-center justify-center w-full`}
          style={{ height: `${compact ? 470 : CENTER_H + 40}px` }}
        >
          <motion.button
            type="button"
            aria-label="Previous tech stack"
            className="absolute left-1 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-colors hover:text-black sm:left-3 lg:left-[calc(50%_-_620px)] lg:h-14 lg:w-14"
            onClick={clickLeft}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronIcon className="h-5 w-5 rotate-180 stroke-[2.5] lg:h-7 lg:w-7" />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Next tech stack"
            className="absolute right-1 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-colors hover:text-black sm:right-3 lg:right-[calc(50%_-_620px)] lg:h-14 lg:w-14"
            onClick={clickRight}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronIcon className="h-5 w-5 stroke-[2.5] lg:h-7 lg:w-7" />
          </motion.button>

          {TECH_CARDS.map((card, cardIdx) => {
            const pos = getPosition(cardIdx)
            const slot = getSlot(pos, compact)
            const isCenter = pos === 'center'
            const isHidden = pos === 'hidden'
            const isCompactSide = compact && !isCenter

            if (isHidden || isCompactSide) return null

            return (
              <motion.div
                key={card.id}
                className={[
                  'absolute rounded-[18px] border border-black/10 bg-white flex flex-col items-center p-6 overflow-hidden transition-shadow duration-300',
                  !isCenter && !isHidden ? 'cursor-pointer hover:border-black/20' : '',
                  isHidden || isCompactSide ? 'pointer-events-none' : ''
                ].join(' ')}
                style={{
                  width: compact ? 260 : CENTER_W,
                  height: compact ? 430 : CENTER_H,
                  boxShadow: isCenter
                    ? '0px 8px 24px rgba(0, 0, 0, 0.08)'
                    : isHidden || isCompactSide
                      ? 'none' 
                      : '0px 4px 12px rgba(0, 0, 0, 0.04)',
                }}
                animate={{
                  x: slot.x,
                  zIndex: slot.zIndex,
                  opacity: slot.opacity,
                  scale: slot.scale,
                  rotate: slot.rotate,
                }}
                transition={{ type: 'tween', duration: 0.32, ease: 'easeOut' }}
                onClick={() => {
                  if (pos === 'left') clickLeft()
                  else if (pos === 'right') clickRight()
                }}
              >
                {/* 1. Header Area */}
                <div className="flex flex-col items-center gap-1.5 w-full text-center mb-1 flex-shrink-0">
                  <span className="font-[family-name:var(--font-imfell)] text-[10px] tracking-[4.5px] uppercase text-black/35 font-medium">
                    {card.subtitle}
                  </span>
                  <h3 className="font-[family-name:var(--font-fredericka)] text-xl lg:text-2xl tracking-[3px] uppercase text-black/80 font-normal">
                    {card.title}
                  </h3>
                </div>

                {/* 2. Visual Illustration Box - using Unsplash images */}
                <div
                  className="w-full rounded-[10px] bg-zinc-100 flex flex-col items-center justify-center relative overflow-hidden border border-black/15 shadow-inner flex-1 my-3 flex-shrink-0"
                  style={{ minHeight: '170px' }}
                >
                  {card.illustration}
                </div>

                {/* 3. Footer Tools Area - With custom scrollbar */}
                <div className="w-full flex flex-col items-center mt-1 pt-3 border-t border-zinc-100 flex-1 overflow-hidden">
                  <span className="font-[family-name:var(--font-imfell)] text-[9px] tracking-[3px] text-zinc-400 uppercase font-semibold mb-3 self-start pl-1 flex-shrink-0">
                    TOOLS & SKILLS
                  </span>
                  
                  {/* Skill Pills Grid - Scrollable Container */}
                  <div className={`grid grid-cols-3 w-full overflow-y-auto custom-scrollbar pr-1 pb-2 ${isCenter ? 'gap-x-4 gap-y-3' : 'gap-x-2 gap-y-2'}`} style={{ maxHeight: '180px' }}>
                    {card.skills.map((skill, i) => (
                      <SkillPill
                        key={i}
                        label={skill.label}
                        icon={skill.icon}
                        size={isCenter ? 'md' : 'sm'}
                      />
                    ))}
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
