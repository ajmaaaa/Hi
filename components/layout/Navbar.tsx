'use client'

import { scrollToId } from '@/lib/scrollTo'
import VisitorBadge from './VisitorBadge'

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Tech Stack', id: 'techstack' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-11 py-9 pointer-events-none">
      <div className="pointer-events-auto">
        <VisitorBadge />
      </div>
      <nav className="flex gap-20 pointer-events-auto" aria-label="Main navigation">
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
    </header>
  )
}
