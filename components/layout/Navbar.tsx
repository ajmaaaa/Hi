'use client'

import { scrollToId } from '@/lib/scrollTo'

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Tech Stack', id: 'techstack' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-4">
      <div className="max-w-[1536px] mx-auto w-full px-8 lg:px-6 flex items-center justify-between">
        <button
          onClick={() => scrollToId('hero')}
          className="font-[family-name:var(--font-fredericka)] text-lg text-black tracking-[4px] uppercase select-none hover:opacity-60 transition-opacity duration-200 bg-transparent border-0 cursor-pointer"
        >
          MEYKY
        </button>
        <nav className="flex gap-8 lg:gap-14" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => scrollToId(item.id)}
              className="font-[family-name:var(--font-imfell)] text-sm text-black tracking-widest uppercase hover:opacity-50 transition-opacity duration-200 bg-transparent border-0 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
