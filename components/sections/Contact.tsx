'use client'

import { motion } from 'framer-motion'

/**
 * Editorial-Minimalist Asymmetric Contact Section:
 *   - Perfectly aligned grid container (max-w-[1536px] px-8 lg:px-6) matching Hero and About Me.
 *   - Left column aligned exactly at lg:pl-[83px] (perfectly aligned with logo "Y" and other sections).
 *   - min-h-screen layout (full screen background cover).
 *   - Main content vertically centered via flex-1 flex items-center.
 *   - Footer text perfectly centered vertically between the border-t divider and the bottom of the screen (24px/24px symmetric).
 *   - Moderate heading sizes to prevent overbearing layout proportions.
 *   - Clearer border divider lines for high-visibility.
 *   - Fixed, clean standard WhatsApp SVG icon.
 */

const SOCIALS = [
  {
    id: 'c-github',
    label: 'GitHub',
    href: 'https://github.com/meyky',
    icon: (
      <svg className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>
    )
  },
  {
    id: 'c-linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    )
  },
  {
    id: 'c-instagram',
    label: 'Instagram',
    href: 'https://instagram.com/meyky.ajm',
    icon: (
      <svg className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
      </svg>
    )
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#070707] flex flex-col justify-between overflow-hidden text-white z-30 pt-20 pb-0"
    >
      {/* Main container - centered vertically in the remaining space */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-8 lg:px-6 flex-1 flex items-center py-6">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-16">
          
          {/* Left Column — Title, Bio & Metadata (aligned at pl-[83px]) */}
          <div className="flex flex-col gap-6 max-w-[580px] text-left lg:pl-[83px]">
            <motion.h2
              className="font-[family-name:var(--font-fredericka)] text-5xl sm:text-6xl lg:text-7xl tracking-[8px] uppercase text-white leading-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              GET IN
              <br />
              TOUCH
            </motion.h2>

            <motion.p
              className="font-[family-name:var(--font-libertinus)] text-lg sm:text-xl text-white/40 leading-relaxed max-w-[460px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Mahasiswa teknik informatika yang ingin mencapai tujuan nya. Dia tak ingin kalah dari kemalasannya. Terbuka untuk kolaborasi dan proyek baru.
            </motion.p>

            {/* Location & Timezone metadata — Brightened border-t (border-white/15) */}
            <motion.div
              className="flex items-center gap-6 mt-4 pt-6 border-t border-white/15 w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-imfell)] text-[9px] tracking-[3px] uppercase text-white/20">LOCATION</span>
                <span className="font-[family-name:var(--font-libertinus)] text-sm text-white/55 mt-0.5">Yogyakarta, ID</span>
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-imfell)] text-[9px] tracking-[3px] uppercase text-white/20">TIMEZONE</span>
                <span className="font-[family-name:var(--font-libertinus)] text-sm text-white/55 mt-0.5">GMT +7 (WIB)</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Contact CTAs (Email & WhatsApp) */}
          <div className="flex flex-col gap-10 text-left lg:pr-[180px] lg:pt-6">
            
            {/* Say Hello Area */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-[family-name:var(--font-imfell)] text-[10px] tracking-[4px] uppercase text-white/30 font-medium">
                SAY HELLO
              </span>
              <div className="flex flex-col gap-4">
                {/* Email Option with Envelope Icon */}
                <a
                  href="mailto:meyky@example.com"
                  id="contact-email"
                  className="group flex items-center gap-3.5 self-start"
                >
                  <span className="p-2 rounded bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-300">
                    <svg className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="font-[family-name:var(--font-libertinus)] text-xl sm:text-2xl text-white/70 group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white/30 pb-0.5 break-all">
                    meyky@example.com
                  </span>
                </a>

                {/* WhatsApp Option with Fixed Clean SVG Icon */}
                <a
                  href="https://wa.me/6281234567890"
                  id="contact-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 self-start"
                >
                  <span className="p-2 rounded bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-300">
                    <svg className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.26 4.88L2 22l5.3-.98c1.4.74 3 1.15 4.7 1.15 5.52 0 10-4.48 10-10C22.004 6.48 17.52 2 12.004 2zm5.72 13.98c-.24.68-1.2 1.24-1.64 1.3-.44.06-.98.1-2.92-.66-2.48-.98-4.08-3.5-4.2-3.66-.12-.16-1.02-1.36-1.02-2.6 0-1.24.64-1.84.86-2.08.22-.24.48-.3.64-.3.16 0 .32 0 .46.02.14.02.34-.04.52.4.18.44.62 1.5.68 1.62.06.12.1.26.02.42-.08.16-.18.26-.3.4-.12.14-.26.3-.38.4-.14.12-.28.26-.12.54.16.28.72 1.18 1.54 1.9.18.16.36.32.54.46.3.26.46.22.64.02.18-.2.8-1 .98-1.32.18-.32.36-.26.6-.16.24.1 1.54.72 1.8.84.26.12.44.18.5.3.06.12.06.68-.18 1.36z"/>
                    </svg>
                  </span>
                  <span className="font-[family-name:var(--font-libertinus)] text-xl sm:text-2xl text-white/70 group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white/30 pb-0.5">
                    +62 812 3456 7890
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Social Channels Area */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="font-[family-name:var(--font-imfell)] text-[10px] tracking-[4px] uppercase text-white/30 font-medium">
                FOLLOW ME
              </span>
              <div className="flex flex-wrap items-center gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <span className="p-1.5 rounded bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-300">
                      {s.icon}
                    </span>
                    <span className="font-[family-name:var(--font-imfell)] text-xs tracking-[3px] uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Footer Area — Perfectly balanced (24px top / 24px bottom symmetric spacing) */}
      <div className="w-full flex-shrink-0 pb-6">
        <div className="w-full max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/20 px-8 lg:px-[107px]">
          <p className="font-[family-name:var(--font-imfell)] text-[10px] text-white/45 tracking-[4px] uppercase">
            © 2026 Meyky Ajmariadi
          </p>
          <p className="font-[family-name:var(--font-imfell)] text-[10px] text-white/35 tracking-[3px] uppercase">
            Crafted with code & art
          </p>
        </div>
      </div>
    </section>
  )
}
