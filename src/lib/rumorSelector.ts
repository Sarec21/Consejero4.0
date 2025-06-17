import rumors from '../data/rumors.json'
import type { GameState } from '../state/gameState'

type Rumor = {
  id: string
  text: string
  emotion_tags?: string[]
  kingdom_tags?: string[]
  level?: string[]
  intensity?: 'low' | 'medium' | 'high'
}

export function getMatchingRumors(
  currentEmotion: string[],
  kingdomTags: string[],
  level: string,
): Rumor[] {
  return (rumors as unknown as Rumor[]).filter((rumor) => {
    const matchesEmotion = rumor.emotion_tags
      ? rumor.emotion_tags.some((e) => currentEmotion.includes(e))
      : true
    const matchesTags = rumor.kingdom_tags
      ? rumor.kingdom_tags.some((tag) => kingdomTags.includes(tag))
      : true
    const matchesLevel = rumor.level ? rumor.level.includes(level) : true
    return matchesEmotion && matchesTags && matchesLevel
  })
}

export function selectRumor(state: GameState): string | null {
  const emotion = state.currentEmotion || []
  const kingdomTags = state.mainPlot?.tags || []
  const level = state.level

  const candidates = getMatchingRumors(emotion, kingdomTags, level)
  if (candidates.length === 0) return null

  const weighted: Rumor[] = []
  for (const rumor of candidates) {
    let weight = 1
    if (rumor.intensity === 'low') weight = 3
    else if (rumor.intensity === 'medium') weight = 2
    const strongMatch =
      (rumor.emotion_tags?.every((e) => emotion.includes(e)) ?? false) &&
      (rumor.kingdom_tags?.every((t) => kingdomTags.includes(t)) ?? false)
    if (rumor.intensity === 'high' && strongMatch) weight += 2
    for (let i = 0; i < weight; i++) weighted.push(rumor)
  }

  const chosen = weighted[Math.floor(Math.random() * weighted.length)]
  return chosen.text
}
