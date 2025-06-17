import type { PromptTemplate } from '../../types'
import prompts from '../../data/prompts.json'

export function getPromptTemplate(id: string): PromptTemplate | null {
  return (prompts as PromptTemplate[]).find((p) => p.id === id) || null
}
