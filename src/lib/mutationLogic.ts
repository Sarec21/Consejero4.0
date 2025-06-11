import mutationsData from '../data/mutationsPlot.json'
import type { Plot } from '../state/gameState'
import { useGameState } from '../state/gameState'

export interface Mutation {
  id: string
  title: string
  description: string
  effects: {
    prestige?: number
    trust?: number
    war?: boolean
  }
  requiredTags: string[]
  forbiddenTags: string[]
  minTurns: number
  linkedEvents: string[]
  unlockCards: string[]
  triggeredRumors: string[]
  visual?: { tag_ia: string }
}

const mutations = mutationsData as Mutation[]

export function checkAndTriggerMutations(
  currentTurn: number,
  mainPlot: Plot | null,
  gameState: ReturnType<typeof useGameState.getState>,
): Mutation[] {
  if (!mainPlot) return []

  const triggered: Mutation[] = []

  for (const m of mutations) {
    if (gameState.activatedMutations.includes(m.id)) continue
    if (currentTurn < m.minTurns) continue
    if (!m.requiredTags.every((t) => mainPlot.tags.includes(t))) continue
    if (m.forbiddenTags.some((t) => mainPlot.tags.includes(t))) continue

    if (typeof m.effects.prestige === 'number') {
      gameState.setPrestige(gameState.prestige + m.effects.prestige)
    }
    if (typeof m.effects.trust === 'number') {
      gameState.setTrust(gameState.trust + m.effects.trust)
    }
    if (typeof m.effects.war === 'boolean') {
      gameState.setWar(m.effects.war)
    }

    gameState.addActivatedMutation(m.id)
    if (m.unlockCards.length) gameState.addUnlockedCards(m.unlockCards)
    if (m.triggeredRumors.length) gameState.addRumors(m.triggeredRumors)

    triggered.push(m)
  }

  return triggered
}
