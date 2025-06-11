import { callAssistant } from './openai'
import { getEligibleEvents, type Event } from './eventUtils'
import scenesData from '../data/reusable_scenes.json'
import type { Plot, GameState } from '../state/gameState'

export interface ReusableScene {
  id: string
  title: string
  description: string
  tags: string[]
  level: Plot['level']
  tone: string
  visual: string
  linked_plot_tags?: string[]
  conditions?: Record<string, unknown>
}

const scenes = scenesData as ReusableScene[]

function conditionsMet(scene: ReusableScene, gameState: GameState): boolean {
  if (!scene.conditions) return true
  for (const [key, value] of Object.entries(scene.conditions)) {
    switch (key) {
      case 'prestige_below':
        if (!(gameState.prestige < Number(value))) return false
        break
      case 'prestige_above':
        if (!(gameState.prestige > Number(value))) return false
        break
      case 'trust_below':
        if (!(gameState.trust < Number(value))) return false
        break
      case 'trust_above':
        if (!(gameState.trust > Number(value))) return false
        break
      case 'war':
        if (gameState.war !== value) return false
        break
      case 'war_true':
        if (value && !gameState.war) return false
        break
      case 'war_false':
        if (value && gameState.war) return false
        break
      default:
        break
    }
  }
  return true
}

function getEligibleScenes(plot: Plot, gameState: GameState): ReusableScene[] {
  return scenes.filter((s) => {
    if (s.level !== plot.level) return false
    if (s.linked_plot_tags && !s.linked_plot_tags.some((t) => plot.tags.includes(t))) {
      return false
    }
    return conditionsMet(s, gameState)
  })
}

export const initialPlotPrompt = `Generate a JSON object representing a narrative plot for a medieval advisor game.
The plot must follow this strict structure:
{
  id: string,
  inspirationalPhrase: string,
  tone: 'light' | 'dark' | 'neutral',
  difficulty: 'easy' | 'medium' | 'hard',
  level: 'village' | 'governor' | 'royal_court' | 'mythical_kingdom' | 'legendary_oracle',
  startingState: Record<string, unknown>,
  requiredEvents: string[],
  optionalTwists: string[],
  revealTiming: { hint: number, conflict: number, climax: number },
  tags: string[]
}
Do not explain or wrap the output. Return only valid JSON.`

export async function generateInitialPlot(): Promise<Plot | null> {
  const prompt = initialPlotPrompt
  try {
    const result = await callAssistant(
      'asst_xBvJOGRlyLWAJlQeWWTLFw8q',
      prompt,
    )
    if (!result) throw new Error('No response from OpenAI')
    const plot: Plot = JSON.parse(result)
    return plot
  } catch (error) {
    console.error('Failed to generate initial plot', error)
    return null
  }
}

export interface TurnContext {
  event: Event | null
  sceneDescription: string
  sceneVisual: string | null
}

export function generateTurnContent(
  plot: Plot,
  gameState: GameState,
): TurnContext {
  const eligible = getEligibleEvents(plot, gameState)
  const event = eligible.length > 0
    ? eligible[Math.floor(Math.random() * eligible.length)]
    : null
  const possibleScenes = getEligibleScenes(plot, gameState)
  const scene = possibleScenes.length > 0
    ? possibleScenes[Math.floor(Math.random() * possibleScenes.length)]
    : null
  const fallback = 'The court murmurs restlessly while shadows gather in the corners of the hall.'
  return {
    event,
    sceneDescription: scene ? scene.description : fallback,
    sceneVisual: scene ? scene.visual : null,
  }
}
