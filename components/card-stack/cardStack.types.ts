import React from 'react'

export interface StackCardData {
  id: string
  content: React.ReactNode
  /** Base rotation in degrees — used by 'polaroid' variant */
  baseRotation?: number
}

export type CardStackVariant = 'polaroid' | 'diagonal' | 'peek-sides'
export type CardStackSize = 'sm' | 'md' | 'lg'

export interface CardStackProps {
  cards: StackCardData[]
  variant?: CardStackVariant
  size?: CardStackSize
  className?: string
}
