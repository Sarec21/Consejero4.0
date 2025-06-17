import rumors from '../data/rumors.json'
import { useGameState } from '../state/gameState'

interface Rumor {
  id: string
  texto: string
  condiciones?: {
    prestigio_min?: number
    prestigio_max?: number
    confianza_min?: number
    confianza_max?: number
    guerra?: boolean
    turno_min?: number
    turno_max?: number
  }
  peso?: number
  tipo?: string
}

export function getRumorForCurrentState() {
  // Map actual state properties to Spanish variable names
  const {
    trust: confianza,
    prestige: prestigio,
    war: guerra,
    currentTurn,
  } = useGameState.getState()

  const candidatos = (rumors as unknown as Rumor[]).filter(rumor => {
    const c = rumor.condiciones || {}
    if (c.prestigio_min !== undefined && prestigio < c.prestigio_min) return false
    if (c.prestigio_max !== undefined && prestigio > c.prestigio_max) return false
    if (c.confianza_min !== undefined && confianza < c.confianza_min) return false
    if (c.confianza_max !== undefined && confianza > c.confianza_max) return false
    if (c.guerra !== undefined && guerra !== c.guerra) return false
    if (c.turno_min !== undefined && currentTurn < c.turno_min) return false
    if (c.turno_max !== undefined && currentTurn > c.turno_max) return false
    return true
  })

  if (candidatos.length === 0) return null

  const totalPeso = candidatos.reduce((acc, r) => acc + (r.peso || 1), 0)
  const random = Math.random() * totalPeso
  let acumulado = 0
  for (const rumor of candidatos) {
    acumulado += rumor.peso || 1
    if (random <= acumulado) return rumor.texto
  }

  return candidatos[0].texto
}
