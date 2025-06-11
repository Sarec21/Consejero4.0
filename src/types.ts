export interface King {
  id: string
  name: string
  epithet: string
  personality: string
  king_phrase: string
  general_tone: string
  kingdom_context: string
  throne_room_description: string
  tags: string[]
  visual?: string
}

export interface Character {
  id: string
  nombre: string
  descripcion: string
  faccion: string
  arquetipo: string
  etiquetas: string[]
  activo_en_niveles: (
    | "village"
    | "governor"
    | "royal_court"
    | "mythical_kingdom"
    | "legendary_oracle"
  )[]
  oculto?: boolean
  condiciones_aparicion?: {
    niveles?: string[]
    etiquetas?: string[]
    facciones?: string[]
    arquetipos?: string[]
  }
  visual?: string
}
