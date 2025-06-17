import rumors from '../data/rumors.json'
import type { GameState } from '../state/gameState'

export function selectRumor(state: GameState): string | null {
  const emotion = state.currentEmotion || []
  const kingdomTags = state.mainPlot?.tags || []
  const level = state.level

  const candidates = (rumors as unknown as Array<{
    id: string
    text: string
    emotion_tags?: string[]
    kingdom_tags?: string[]
    level?: string[]
  }>).filter((rumor) =>
    (!rumor.level || rumor.level.includes(level)) &&
    (!rumor.emotion_tags || rumor.emotion_tags.some((e) => emotion.includes(e))) &&
    (!rumor.kingdom_tags || rumor.kingdom_tags.some((t) => kingdomTags.includes(t)))
  )

  if (candidates.length === 0) return null

  const chosen = candidates[Math.floor(Math.random() * candidates.length)]
  return chosen.text
}
