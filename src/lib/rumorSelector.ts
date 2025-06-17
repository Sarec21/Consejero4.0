import rumors from '../data/rumors.json'
import { useGameState } from '../state/gameState'

interface Rumor {
  id: string
  text: string
  conditions?: {
    prestige_min?: number
    prestige_max?: number
    trust_min?: number
    trust_max?: number
    war?: boolean
    turn_min?: number
    turn_max?: number
  }
  weight?: number
  type?: string
}

export function getRumorForCurrentState() {
  const { trust, prestige, war, currentTurn } = useGameState.getState()

  const candidates = (rumors as unknown as Rumor[]).filter((rumor) => {
    const c = rumor.conditions || {}
    if (c.prestige_min !== undefined && prestige < c.prestige_min) return false
    if (c.prestige_max !== undefined && prestige > c.prestige_max) return false
    if (c.trust_min !== undefined && trust < c.trust_min) return false
    if (c.trust_max !== undefined && trust > c.trust_max) return false
    if (c.war !== undefined && war !== c.war) return false
    if (c.turn_min !== undefined && currentTurn < c.turn_min) return false
    if (c.turn_max !== undefined && currentTurn > c.turn_max) return false
    return true
  })

  if (candidates.length === 0) return null

  const totalWeight = candidates.reduce((acc, r) => acc + (r.weight || 1), 0)
  const random = Math.random() * totalWeight
  let accumulated = 0
  for (const rumor of candidates) {
    accumulated += rumor.weight || 1
    if (random <= accumulated) return rumor.text
  }

  return candidates[0].text
}
