import { getPromptTemplate } from './promptTemplates'
import { callAssistant } from './callAssistant'
import { useGameState } from '../../state/gameState'
import type { GameState } from '../../state/gameState'
import type { PromptTemplate } from '../../types'

export async function runPromptWithValidation(promptId: string): Promise<string> {
  const state = useGameState.getState()
  const prompt = getPromptTemplate(promptId)

  // Validaciones mínimas según tipo de prompt
  if (!prompt) throw new Error(`Prompt not found: ${promptId}`)

  if (promptId === 'scene_generation') {
    if (!state.currentKing || !state.mainPlot) {
      throw new Error('Scene prompt requires currentKing and mainPlot.')
    }
  }

  if (promptId === 'reaction_generation') {
    if (!state.playerAdvice || !state.currentKing) {
      throw new Error('Reaction prompt requires player advice and king.')
    }
  }

  // Añadir más validaciones según se necesiten...

  // Ejecutar el prompt
  const response = await callAssistant(
    prompt as PromptTemplate,
    state as GameState,
  )
  return response
}
