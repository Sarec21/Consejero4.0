import kings from '../data/kings.json'
import type { Plot } from '../state/gameState'

export function findMatchingKing(plot: Plot) {
  let bestMatch = null
  let maxMatches = 0

  for (const king of kings) {
    const matches = king.tags.filter(tag => plot.tags.includes(tag)).length
    if (matches > maxMatches) {
      bestMatch = king
      maxMatches = matches
    }
  }

  return bestMatch
}
