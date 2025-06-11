import { callAssistant } from './openai'
import { getEligibleEvents, type Event } from './eventUtils'

import type { Plot, GameState } from '../state/gameState'

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
}

export function generateTurnContent(
  plot: Plot,
  gameState: GameState,
): TurnContext {
  const eligible = getEligibleEvents(plot, gameState)
  const event = eligible.length > 0
    ? eligible[Math.floor(Math.random() * eligible.length)]
    : null
  return { event }
}
