import charactersData from '../data/characters.json'
import type { Plot } from '../state/gameState'

export interface CharacterEntry {
  id: string
  name: string
  archetype: string
  faction: string
  type: 'visible' | 'hidden'
  appearance_conditions?: {
    plot_tags?: string[]
    current_emotion?: string[]
    advisor_level?: string[]
  }
  active_in_levels: string[]
  tags: string[]
  visual?: { tag_ia: string }
  [key: string]: unknown
}

const characters = charactersData as unknown as CharacterEntry[]

export function getAvailableCharacters(
  currentPlot: Plot,
  currentEmotion: string[],
  currentLevel: string,
): CharacterEntry[] {
  return characters.filter((char) => {
    const cond = char.appearance_conditions
    if (!cond) return false
    if (cond.plot_tags && !cond.plot_tags.some((t) => currentPlot.tags.includes(t))) {
      return false
    }
    if (
      cond.current_emotion &&
      currentEmotion.length > 0 &&
      !cond.current_emotion.some((e) => currentEmotion.includes(e))
    ) {
      return false
    }
    if (cond.advisor_level && !cond.advisor_level.includes(currentLevel)) {
      return false
    }
    if (!char.active_in_levels.includes(currentLevel)) return false
    return true
import type { Character } from '../types'

export function getAvailableCharacters(
  plotTags: string[],
  emotion: string,
  level: string,
  characters: Character[],
): Character[] {
  return characters.filter((char) => {
    if (
      char.appearance_conditions.plot_tags.some((tag) => plotTags.includes(tag)) &&
      char.appearance_conditions.current_emotion.includes(emotion) &&
      char.appearance_conditions.advisor_levels.includes(level)
    ) {
      return true
    }
    return false
  })
}
