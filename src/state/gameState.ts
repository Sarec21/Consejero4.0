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
}

export const useGameState = create<GameState>((set) => ({
  kingName: 'Aldric the Just',
  kingdom: 'Eldoria',
  playerAdvice: '',
  kingReaction: 'The King nods solemnly, but his gaze is stern.',
  setKingName: (kingName) => set({ kingName }),
  setKingdom: (kingdom) => set({ kingdom }),
  setPlayerAdvice: (playerAdvice) => set({ playerAdvice }),
  setKingReaction: (kingReaction) => set({ kingReaction }),
}))
