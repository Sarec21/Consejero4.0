import type { PromptTemplate } from '../../types'
import type { GameState } from '../../state/gameState'
import { callAssistant as rawCall } from '../openai'

export async function callAssistant(
  prompt: PromptTemplate,
  state: GameState,
): Promise<string> {
  const variables: Record<string, unknown> = {}
  const stateObj = state as unknown as Record<string, unknown>
  for (const v of prompt.requiredVariables) {
    variables[v] = stateObj[v]
  }
  const promptText = `${prompt.instructions}\n\n${JSON.stringify(variables)}`
  // TODO: use different assistant IDs per prompt type if needed
  return rawCall('asst_xBvJOGRlyLWAJlQeWWTLFw8q', promptText)
}
