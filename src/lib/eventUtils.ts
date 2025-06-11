import eventsData from '../data/events.json'
import type { Plot, GameState } from '../state/gameState'

export interface Event {
  id: string
  title: string
  description: string
  level: Plot['level']
  tags: string[]
  recommended_for: string[]
  conditions: {
    min_trust?: number
    max_trust?: number
    min_prestige?: number
    max_prestige?: number
    war?: boolean
    max_war?: boolean
  }
}

// Cast to any to avoid schema mismatches with legacy data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const events = eventsData as any as Event[]

export function getEligibleEvents(plot: Plot, gameState: GameState): Event[] {
  return events.filter((event) => {
    if (event.level !== plot.level) return false
    if (!event.recommended_for.includes(plot.id)) return false

    const { conditions } = event
    if (conditions.min_trust && gameState.trust < conditions.min_trust) return false
    if (conditions.max_trust && gameState.trust > conditions.max_trust) return false
    if (conditions.min_prestige && gameState.prestige < conditions.min_prestige) return false
    if (conditions.max_prestige && gameState.prestige > conditions.max_prestige) return false
    if (conditions.war !== undefined && gameState.war !== conditions.war) return false
    if (conditions.max_war === false && gameState.war) return false

    return true
  })
}
