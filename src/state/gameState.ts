import { create } from 'zustand'

export interface GameState {
  kingName: string
  kingdom: string
  playerAdvice: string
  kingReaction: string
  setKingName: (name: string) => void
  setKingdom: (kingdom: string) => void
  setPlayerAdvice: (advice: string) => void
  setKingReaction: (reaction: string) => void
  resetState: () => void
}

export const useGameState = create<GameState>((set) => ({
  kingName: '',
  kingdom: '',
  playerAdvice: '',
  kingReaction: '',
  setKingName: (kingName) => set({ kingName }),
  setKingdom: (kingdom) => set({ kingdom }),
  setPlayerAdvice: (playerAdvice) => set({ playerAdvice }),
  setKingReaction: (kingReaction) => set({ kingReaction }),
  resetState: () => set({ kingName: '', kingdom: '', playerAdvice: '', kingReaction: '' }),
}))
