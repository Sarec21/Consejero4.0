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
