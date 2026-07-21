import { create } from 'zustand'

interface VisitorState {
  count: number
  increment: () => void
}

export const useVisitorStore = create<VisitorState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
