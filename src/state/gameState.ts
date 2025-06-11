import { create } from 'zustand'
import type { King } from '../types'

export interface Plot {
  id: string
  inspirationalPhrase: string
  tone: 'light' | 'dark' | 'neutral'
  difficulty: 'easy' | 'medium' | 'hard'
  level:
    | 'village'
    | 'governor'
    | 'royal_court'
    | 'mythical_kingdom'
    | 'legendary_oracle'
  startingState: Record<string, unknown>
  requiredEvents: string[]
  optionalTwists: string[]
  revealTiming: {
    hint: number
    conflict: number
    climax: number
  }
  tags: string[]
  personajes_recomendados?: {
    facciones?: string[]
    arquetipos?: string[]
    etiquetas?: string[]
  }
}

export interface GameState {
  kingName: string
  kingdom: string
  playerAdvice: string
  kingReaction: string
  level: string
  mainPlot: Plot | null
  currentKing: King | null
  setKingName: (name: string) => void
  setKingdom: (kingdom: string) => void
  setPlayerAdvice: (advice: string) => void
  setKingReaction: (reaction: string) => void
  setLevel: (level: string) => void
  setMainPlot: (plot: Plot) => void
  setCurrentKing: (king: King) => void
  resetMainPlot: () => void
  resetState: () => void
}

export const useGameState = create<GameState>((set) => ({
  kingName: '',
  kingdom: '',
  playerAdvice: '',
  kingReaction: '',
  level: '',
  mainPlot: null,
  currentKing: null,
  setKingName: (kingName) => set({ kingName }),
  setKingdom: (kingdom) => set({ kingdom }),
  setPlayerAdvice: (playerAdvice) => set({ playerAdvice }),
  setKingReaction: (kingReaction) => set({ kingReaction }),
  setLevel: (level) => set({ level }),
  setMainPlot: (mainPlot) => set({ mainPlot }),
  setCurrentKing: (currentKing) => set({ currentKing }),
  resetMainPlot: () => set({ mainPlot: null }),
  resetState: () =>
    set({ kingName: '', kingdom: '', playerAdvice: '', kingReaction: '', level: '', currentKing: null }),
}))
