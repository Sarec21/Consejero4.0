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
  visual?: { tag_ia: string }
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

export interface Event {
  id: string
  title: string
  description: string
  level:
    | 'village'
    | 'governor'
    | 'royal_court'
    | 'mythical_kingdom'
    | 'legendary_oracle'
  tags: string[]
  recommended_for: string[]
  conditions: {
    min_trust?: number
    max_trust?: number
    min_prestige?: number
    max_prestige?: number
    war?: boolean
    max_war?: boolean
  }
  visual: { tag_ia: string }
}

export interface Kingdom {
  id: string
  name: string
  traits: string[]
  visual: { tag_ia: string }
  description?: string
}

