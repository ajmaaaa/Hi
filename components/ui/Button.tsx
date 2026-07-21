'use client'

import { motion } from 'framer-motion'

interface ButtonProps {
  variant?: 'solid' | 'outline'
  id?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
}

export default function Button({ variant = 'solid', id, children, onClick, href }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-[family-name:var(--font-libertinus)] text-base tracking-wide rounded-lg transition-all duration-200 select-none cursor-pointer'
  const styles = {
    solid: 'bg-neutral-600 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-neutral-700',
    outline: 'bg-white text-black border border-neutral-300 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-neutral-50',
  }

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        className={`${base} ${styles[variant]} px-7 py-3`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      id={id}
      onClick={onClick}
      className={`${base} ${styles[variant]} px-7 py-3`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
