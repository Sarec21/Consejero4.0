import { callAssistant } from './openai'
import { getPromptByContext } from './promptSelector'
import { validatePromptVariables } from './promptUtils'

import scenesData from '../data/reusable_scenes.json'
import type { Plot, GameState } from '../state/gameState'

export interface ReusableScene {
  id: string
  title: string
  description: string
  tags: string[]
  level: Plot['level']
  tone: string
  visual: { tag_ia: string }
  linked_plot_tags?: string[]
  conditions?: Record<string, unknown>
}

const scenes = scenesData as unknown as ReusableScene[]

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

export async function generateNarrativeScene(
  gameState: GameState,
  context = 'start_of_turn',
): Promise<TurnContext> {
  const template = getPromptByContext(context)
  const fallback: TurnContext = {
    sceneDescription:
      'The court murmurs restlessly while shadows gather in the corners of the hall.',
    sceneVisual: null,
  }

  if (!template) return fallback
  if (!validatePromptVariables(template, gameState)) return fallback

  const variables: Record<string, unknown> = {}
  for (const v of template.requiredVariables) {
    switch (v) {
      case 'king':
        variables.king = gameState.currentKing
        break
      case 'plot':
        variables.plot = gameState.mainPlot
        break
      case 'kingdom':
        variables.kingdom = gameState.kingdom
        break
      case 'playerReputation':
        variables.playerReputation = {
          prestige: gameState.prestige,
          trust: gameState.trust,
        }
        break
      case 'currentEmotion':
        variables.currentEmotion = gameState.currentEmotion
        break
      default:
        break
    }
  }

  const prompt = `${template.instructions}\n\n${JSON.stringify(variables)}`

  try {
    const result = await callAssistant('asst_xBvJOGRlyLWAJlQeWWTLFw8q', prompt)
    return {
      sceneDescription: result || template.outputExample,
      sceneVisual: null,
    }
  } catch (error) {
    console.error('Failed to generate narrative scene', error)
    return { ...fallback, sceneDescription: template.outputExample }
  }
}

export interface TurnContext {
  sceneDescription: string
  sceneVisual: string | null
}

export async function generateTurnContent(
  plot: Plot,
  gameState: GameState,
): Promise<TurnContext> {
  try {
    const gptScene = await generateNarrativeScene(gameState, 'start_of_turn')
    if (gptScene.sceneDescription) return gptScene
  } catch {
    // ignore and fall back to local scenes
  }

  const possibleScenes = getEligibleScenes(plot, gameState)
  const scene = possibleScenes.length > 0
    ? possibleScenes[Math.floor(Math.random() * possibleScenes.length)]
    : null
  const fallback = 'The court murmurs restlessly while shadows gather in the corners of the hall.'
  return {
    sceneDescription: scene ? scene.description : fallback,
    sceneVisual: scene ? scene.visual.tag_ia : null,
  }
}
