import rumorsData from '../data/rumors.json'

export interface Rumor {
  id: string
  text: string
  level?: string[]
  tags?: string[]
  conditions?: {
    prestigeAbove?: number
    trustBelow?: number
    war?: boolean
  }
}

const rumors = rumorsData as Rumor[]

export function getRumorTextById(id: string): string {
  const found = rumors.find(r => r.id === id)
  return found?.text || '[Missing rumor text]'
}
