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
  name: string
  archetype: string
  faction: string
  type: 'visible' | 'hidden'
  appearance_conditions: {
    plot_tags: string[]
    current_emotion: string[]
    advisor_levels: string[]
  }
  active_in_levels: (
    | 'village'
    | 'governor'
    | 'royal_court'
    | 'mythical_kingdom'
    | 'legendary_oracle'
  )[]
  tags: string[]
  visual: { tag_ia: string }
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


export interface PromptTemplate {
  id: string
  type: 'scene' | 'event' | 'reaction' | 'twist'
  context: string
  requiredVariables: string[]
  instructions: string
  outputExample: string
  visual_tags: string[]
}
