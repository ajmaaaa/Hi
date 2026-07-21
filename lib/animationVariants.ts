import { Variants } from 'framer-motion'

// Spring preset for card depth transitions
export const cardSpring = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 24,
}

// Spring preset for snap-back on failed drag
export const snapSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

// Fade in up — used for section headings
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

// Depth styles per card index
export function getDepthStyle(index: number) {
  switch (index) {
    case 0:
      return { scale: 1, y: 0, opacity: 1, zIndex: 30 }
    case 1:
      return { scale: 0.94, y: 16, opacity: 0.9, zIndex: 20 }
    case 2:
      return { scale: 0.88, y: 32, opacity: 0.7, zIndex: 10 }
    default:
      return { scale: 0.82, y: 48, opacity: 0, zIndex: 0 }
  }
}
