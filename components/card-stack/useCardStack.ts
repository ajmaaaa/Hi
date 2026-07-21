import { useState, useCallback } from 'react'
import { StackCardData } from './cardStack.types'

export function useCardStack(initialCards: StackCardData[]) {
  const [order, setOrder] = useState<string[]>(initialCards.map((c) => c.id))

  const sendFrontToBack = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]])
  }, [])

  const sendBackToFront = useCallback(() => {
    setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)])
  }, [])

  return { order, sendFrontToBack, sendBackToFront }
}
