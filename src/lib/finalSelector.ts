import finalsData from '../data/finals.json'
import type { GameState } from '../state/gameState'

export interface Final {
  id: string
  title: string
  description: string
  condition: Record<string, unknown>
  achievement_id?: string
  card_id?: string
  visual: { tag_ia: string; icon: string }
}

const finals = finalsData as Final[]

function matches(final: Final, state: GameState): boolean {
  const cond = final.condition || {}
  const s = state as unknown as Record<string, unknown>
  for (const [key, value] of Object.entries(cond)) {
    if (key.endsWith('_min')) {
      const prop = key.replace(/_min$/, '')
      if (typeof s[prop] !== 'number' || (s[prop] as number) < (value as number)) return false
    } else if (key.endsWith('_max')) {
      const prop = key.replace(/_max$/, '')
      if (typeof s[prop] !== 'number' || (s[prop] as number) > (value as number)) return false
    } else {
      if (s[key] !== value) return false
    }
  }
  return true
}

function specificity(final: Final): number {
  return Object.keys(final.condition || {}).length
}

export function selectFinal(state: GameState): Final {
  const eligible = finals.filter(f => matches(f, state))
  if (eligible.length === 0) return finals[0]
  eligible.sort((a, b) => specificity(b) - specificity(a))
  return eligible[0]
}
