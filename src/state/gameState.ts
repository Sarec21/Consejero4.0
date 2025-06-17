import { create } from 'zustand'
import type { King, Character } from '../types'
import charactersData from '../data/characters.json'
import type { Event as PlotEvent } from "../lib/eventSelector"

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
  currentEmotion: string[]
  rumorsQueue: string[]
  activeEvents: PlotEvent[],
  currentEvent: import('../lib/eventUtils').Event | null
  characters: Character[]
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
  setActiveEvents: (events: PlotEvent[]) => void,
  addUnlockedCards: (cards: string[]) => void
  setCurrentEmotion: (emotion: string[]) => void
  addRumors: (rumors: string[]) => void
  setRumorsQueue: (queue: string[]) => void
  setCurrentEvent: (event: import('../lib/eventUtils').Event | null) => void
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
  currentEmotion: [],
  rumorsQueue: [],
  currentEvent: null,
  characters: charactersData as Character[],
  activeEvents: [],
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
  setCurrentEmotion: (currentEmotion) => set({ currentEmotion }),
  addActivatedMutation: (id) =>
    set((state) => ({ activatedMutations: [...state.activatedMutations, id] })),
  addUnlockedCards: (cards) =>
    set((state) => ({ unlockedCards: [...state.unlockedCards, ...cards] })),
  setActiveEvents: (activeEvents) => set({ activeEvents }),
  addRumors: (rumors) =>
    set((state) => ({ rumorsQueue: [...state.rumorsQueue, ...rumors] })),
  setRumorsQueue: (rumorsQueue) => set({ rumorsQueue }),
  setCurrentEvent: (currentEvent) => set({ currentEvent }),
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
      activeEvents: [],
      currentEmotion: [],
      rumorsQueue: [],
      currentEvent: null,
      characters: charactersData as Character[],
    }),
}))
