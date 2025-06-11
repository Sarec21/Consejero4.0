import kings from '../data/kings.json'
import type { King } from '../types'

export function getRandomKing(): King {
  const index = Math.floor(Math.random() * kings.length)
  return kings[index] as King
}
