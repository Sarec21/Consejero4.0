import type { PromptTemplate } from '../types'
import prompts from '../data/prompts.json'

export function getPromptByContext(context: string): PromptTemplate | null {
  return (prompts as PromptTemplate[]).find((p) => p.context === context) || null
}
