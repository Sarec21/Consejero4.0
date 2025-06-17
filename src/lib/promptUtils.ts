import type { GameState } from '../state/gameState'
import type { PromptTemplate } from '../types'

export function validatePromptVariables(prompt: PromptTemplate, gameState: GameState): boolean {
  const stateObj = gameState as unknown as Record<string, unknown>
  const missing = prompt.requiredVariables.filter((varName) => stateObj[varName] === undefined)
  if (missing.length > 0) {
    console.warn(`Missing variables for prompt ${prompt.id}:`, missing)
    return false
  }
  return true
}
