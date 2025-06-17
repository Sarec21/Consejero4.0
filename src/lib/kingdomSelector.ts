import kingdoms from '../data/kingdoms.json'
import type { Plot } from '../state/gameState'
import type { Kingdom } from '../types'

export function findMatchingKingdom(plot: Plot): Kingdom | null {
  let bestMatch: Kingdom | null = null
  let maxScore = 0

  for (const kingdom of kingdoms as Kingdom[]) {
    const score = kingdom.traits.filter(tag => plot.tags.includes(tag)).length
    if (score > maxScore) {
      bestMatch = kingdom
      maxScore = score
    }
  }

  return bestMatch
}
