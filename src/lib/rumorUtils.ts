import rumorsData from '../data/rumors.json'
import { useGameState } from '../state/gameState'

export interface Rumor {
  id: string
  text: string
  conditions?: {
    prestige_min?: number
    prestige_max?: number
    trust_min?: number
    trust_max?: number
    war?: boolean
  }
  weight?: number
  type?: string
}

const rumors = rumorsData as unknown as Rumor[]

export function getRumorTextById(id: string): string {
  const found = rumors.find((r) => r.id === id)
  return found?.text || '[Missing rumor text]'
}

export function getValidRumors(): Rumor[] {
  const { prestige, trust, war } = useGameState.getState()
  return rumors.filter((rumor) => {
    const c = rumor.conditions
    if (!c) return true
    if (c.prestige_min !== undefined && prestige < c.prestige_min) return false
    if (c.prestige_max !== undefined && prestige > c.prestige_max) return false
    if (c.trust_min !== undefined && trust < c.trust_min) return false
    if (c.trust_max !== undefined && trust > c.trust_max) return false
    if (c.war !== undefined && war !== c.war) return false
    return true
  })
}

export function pickRandomRumor(): string {
  const validRumors = getValidRumors()
  if (validRumors.length === 0) return 'The realm is silent...'
  const randomIndex = Math.floor(Math.random() * validRumors.length)
  return validRumors[randomIndex].text
}
