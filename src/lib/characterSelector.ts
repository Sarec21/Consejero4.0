import characters from '../data/characters.json'
import type { Plot } from '../state/gameState'
import type { Character } from '../types'

function conditionsMet(plot: Plot, cond?: Character['condiciones_aparicion']): boolean {
  if (!cond) return true
  if (cond.niveles && !cond.niveles.includes(plot.level)) return false
  if (cond.etiquetas && !cond.etiquetas.every(t => plot.tags.includes(t))) return false
  if (cond.facciones && plot.personajes_recomendados?.facciones) {
    const facMatch = cond.facciones.some(f => plot.personajes_recomendados!.facciones!.includes(f))
    if (!facMatch) return false
  }
  if (cond.arquetipos && plot.personajes_recomendados?.arquetipos) {
    const arcMatch = cond.arquetipos.some(a => plot.personajes_recomendados!.arquetipos!.includes(a))
    if (!arcMatch) return false
  }
  return true
}

export function findMatchingCharacter(plot: Plot): Character | null {
  let best: Character | null = null
  let bestScore = -Infinity

  for (const char of characters as Character[]) {
    if (!char.activo_en_niveles.includes(plot.level)) continue
    if (char.oculto && !conditionsMet(plot, char.condiciones_aparicion)) continue

    let score = 0
    const shared = char.etiquetas.filter(t => plot.tags.includes(t)).length
    score += shared

    if (plot.personajes_recomendados) {
      const rec = plot.personajes_recomendados
      if (rec.facciones && rec.facciones.includes(char.faccion)) score += 2
      if (rec.arquetipos && rec.arquetipos.includes(char.arquetipo)) score += 2
      if (rec.etiquetas) {
        score += char.etiquetas.filter(t => rec.etiquetas!.includes(t)).length
      }
    }

    if (score > bestScore) {
      bestScore = score
      best = char
    }
  }

  return best
}
