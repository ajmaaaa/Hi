'use client'

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'P&E', id: 'portfolio' },
  { label: 'Tech Stack', id: 'techstack' },
  // { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-3 md:py-5">
      <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        <a
          href="#hero"
          className="font-[family-name:var(--font-fredericka)] text-lg sm:text-xl lg:text-2xl text-black tracking-[3px] sm:tracking-[4px] uppercase select-none hover:opacity-60 transition-opacity duration-200 bg-transparent border-0 cursor-pointer"
        >
          PORTOFOLIO
        </a>
        <nav className="hidden md:flex gap-6 lg:gap-12" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              id={`nav-${item.id}`}
              href={`#${item.id}`}
              className="font-[family-name:var(--font-imfell)] text-base text-black tracking-widest uppercase hover:opacity-50 transition-opacity duration-200 bg-transparent border-0 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <details className="group md:hidden">
          <summary aria-label="Toggle navigation menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-black/10 bg-white text-black [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-current transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
              <span className="h-px w-full bg-current transition-transform group-open:-translate-y-[3.5px] group-open:-rotate-45" />
            </span>
          </summary>
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute left-4 right-4 top-[calc(100%+8px)] grid grid-cols-2 gap-2 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.14)]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-xl px-3 py-3 text-left font-[family-name:var(--font-imfell)] text-sm uppercase tracking-[2px] transition-colors hover:bg-zinc-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}
