'use client'

import { AnimatePresence } from 'framer-motion'
import { CardStackProps, StackCardData } from './cardStack.types'
import { useCardStack } from './useCardStack'
import StackCard from './StackCard'

export default function CardStack({
  cards,
  variant = 'diagonal',
  className = '',
}: CardStackProps) {
  const { order, sendFrontToBack } = useCardStack(cards)

  // Map from card id → original card data
  const cardMap = new Map<string, StackCardData>(cards.map((c) => [c.id, c]))

  // Diagonal variant: offset each card position
  function getDiagonalOffset(index: number) {
    if (variant !== 'diagonal') return {}
    // index 0 = front (top-right), index 2 = back (bottom-left)
    const totalOffset = (cards.length - 1 - index) * 32
    return {
      left: `${totalOffset}px`,
      top: `${-totalOffset}px`,
    }
  }

  return (
    <div className={`relative ${className}`} style={{ width: '14rem', height: '20rem' }}>
      <AnimatePresence>
        {order.map((id, visualIndex) => {
          const card = cardMap.get(id)
          if (!card) return null

          const diagonalStyle = getDiagonalOffset(visualIndex)

          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                ...diagonalStyle,
              }}
            >
              <StackCard
                card={card}
                index={visualIndex}
                isFront={visualIndex === 0}
                variant={variant}
                onSendToBack={sendFrontToBack}
                totalCards={cards.length}
              />
            </div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
