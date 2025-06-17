import rumorsData from '../data/rumors.json'
import { useGameState } from '../state/gameState'

export interface Rumor {
  id: string
  texto: string
  condiciones?: {
    prestigio_min?: number
    prestigio_max?: number
    confianza_min?: number
    confianza_max?: number
    guerra?: boolean
  }
  peso?: number
  tipo?: string
}

const rumors = rumorsData as unknown as Rumor[]

export function getRumorTextById(id: string): string {
  const found = rumors.find(r => r.id === id)
  return found?.texto || '[Missing rumor text]'
}

export function getValidRumors(): Rumor[] {
  const {
    prestige: prestigio,
    trust: confianza,
    war: guerra,
  } = useGameState.getState()
  return rumors.filter(rumor => {
    const c = rumor.condiciones
    if (!c) return true
    if (c.prestigio_min !== undefined && prestigio < c.prestigio_min) return false
    if (c.prestigio_max !== undefined && prestigio > c.prestigio_max) return false
    if (c.confianza_min !== undefined && confianza < c.confianza_min) return false
    if (c.confianza_max !== undefined && confianza > c.confianza_max) return false
    if (c.guerra !== undefined && guerra !== c.guerra) return false
    return true
  })
}

export function pickRandomRumor(): string {
  const validRumors = getValidRumors()
  if (validRumors.length === 0) return 'The realm is silent...'
  const randomIndex = Math.floor(Math.random() * validRumors.length)
  return validRumors[randomIndex].texto
}
