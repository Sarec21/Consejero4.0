import rumorsData from '../data/rumors.json'
import { useGameState } from '../state/gameState'

export interface Rumor {
  id: string
  text: string
  level?: string[]
  tags?: string[]
  conditions?: {
    prestigeAbove?: number
    trustBelow?: number
    war?: boolean
  }
}

const rumors = rumorsData as Rumor[]

export function getRumorTextById(id: string): string {
  const found = rumors.find(r => r.id === id)
  return found?.text || '[Missing rumor text]'
}

export function getValidRumors(): Rumor[] {
  const { level, prestige, trust, war } = useGameState.getState()
  return rumors.filter(rumor => {
    if (rumor.level && !rumor.level.includes(level)) return false
    const cond = rumor.conditions
    if (!cond) return true
    if (cond.prestigeAbove !== undefined && prestige <= cond.prestigeAbove) return false
    if (cond.trustBelow !== undefined && trust >= cond.trustBelow) return false
    if (cond.war !== undefined && war !== cond.war) return false
    return true
  })
}

export function pickRandomRumor(): string {
  const validRumors = getValidRumors()
  if (validRumors.length === 0) return 'The realm is silent...'
  const randomIndex = Math.floor(Math.random() * validRumors.length)
  return validRumors[randomIndex].text
}
