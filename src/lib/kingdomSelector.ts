import kingdoms from '../data/kingdoms.json'
import type { Plot } from '../state/gameState'
import type { Kingdom } from '../types'

export function findMatchingKingdom(plot: Plot, level: string): Kingdom | null {
  const filtered = (kingdoms as Kingdom[]).filter(k => k.levels_available.includes(level))
  let bestMatch: Kingdom | null = null
  let maxScore = 0

  for (const kingdom of filtered) {
    const score = kingdom.narrative_tags.filter(tag => plot.tags.includes(tag)).length
    if (score > maxScore) {
      bestMatch = kingdom
      maxScore = score
    }
  }

  return bestMatch
}
