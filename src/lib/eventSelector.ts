import eventsData from '../data/events.json'
import type { Plot } from '../state/gameState'

export interface Event {
  id: string
  title: string
  description: string
  level: string
  tags: string[]
  impact: {
    prestige: number
    trust: number
    war: number
  }
  activation_conditions: {
    plot_tags: string[]
    min_turn: number
    max_turn: number
  }
  visual: string
}

const events = eventsData as Event[]

export function getAvailableEvents(plot: Plot, currentTurn: number) {
  return events.filter(
    (event) =>
      event.activation_conditions.plot_tags.some((tag) => plot.tags.includes(tag)) &&
      currentTurn >= event.activation_conditions.min_turn &&
      currentTurn <= event.activation_conditions.max_turn,
  )
}
