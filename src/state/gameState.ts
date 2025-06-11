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
  currentTurn: number
  prestige: number
  trust: number
  war: boolean
  activatedMutations: string[]
  unlockedCards: string[]
  rumorsQueue: string[]
  setKingName: (name: string) => void
  setKingdom: (kingdom: string) => void
  setPlayerAdvice: (advice: string) => void
  setKingReaction: (reaction: string) => void
  setLevel: (level: string) => void
  setMainPlot: (plot: Plot) => void
  setCurrentKing: (king: King) => void
  setCurrentTurn: (turn: number) => void
  setPrestige: (value: number) => void
  setTrust: (value: number) => void
  setWar: (value: boolean) => void
  addActivatedMutation: (id: string) => void
  addUnlockedCards: (cards: string[]) => void
  addRumors: (rumors: string[]) => void
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
  currentTurn: 0,
  prestige: 0,
  trust: 0,
  war: false,
  activatedMutations: [],
  unlockedCards: [],
  rumorsQueue: [],
  setKingName: (kingName) => set({ kingName }),
  setKingdom: (kingdom) => set({ kingdom }),
  setPlayerAdvice: (playerAdvice) => set({ playerAdvice }),
  setKingReaction: (kingReaction) => set({ kingReaction }),
  setLevel: (level) => set({ level }),
  setMainPlot: (mainPlot) => set({ mainPlot }),
  setCurrentKing: (currentKing) => set({ currentKing }),
  setCurrentTurn: (currentTurn) => set({ currentTurn }),
  setPrestige: (prestige) => set({ prestige }),
  setTrust: (trust) => set({ trust }),
  setWar: (war) => set({ war }),
  addActivatedMutation: (id) =>
    set((state) => ({ activatedMutations: [...state.activatedMutations, id] })),
  addUnlockedCards: (cards) =>
    set((state) => ({ unlockedCards: [...state.unlockedCards, ...cards] })),
  addRumors: (rumors) =>
    set((state) => ({ rumorsQueue: [...state.rumorsQueue, ...rumors] })),
  resetMainPlot: () => set({ mainPlot: null }),
  resetState: () =>
    set({
      kingName: '',
      kingdom: '',
      playerAdvice: '',
      kingReaction: '',
      level: '',
      currentKing: null,
      currentTurn: 0,
      prestige: 0,
      trust: 0,
      war: false,
      activatedMutations: [],
      unlockedCards: [],
      rumorsQueue: [],
    }),
}))
