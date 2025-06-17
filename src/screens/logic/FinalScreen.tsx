import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewFinalScreen from '../view/ViewFinalScreen'
import { selectFinal } from '../../lib/finalSelector'
import type { Final } from '../../lib/finalSelector'

export default function FinalScreen() {
  const navigate = useNavigate()
  const gameState = useGameState()
  const { resetState } = gameState
  const [final, setFinal] = useState<Final | null>(null)

  useEffect(() => {
    const result = selectFinal(useGameState.getState())
    setFinal(result)

    const stored = localStorage.getItem('player_profile')
    const profile = stored ? JSON.parse(stored) : {}
    profile.finals = Array.isArray(profile.finals) ? profile.finals : []
    profile.finals.push(result.id)
    if (result.achievement_id) {
      profile.achievements = Array.isArray(profile.achievements)
        ? profile.achievements
        : []
      profile.achievements.push(result.achievement_id)
    }
    if (result.card_id) {
      profile.cards = Array.isArray(profile.cards) ? profile.cards : []
      profile.cards.push(result.card_id)
    }
    localStorage.setItem('player_profile', JSON.stringify(profile))
  }, [])

  const handleReset = () => {
    resetState()
    navigate('/')
  }

  return <ViewFinalScreen final={final} onReset={handleReset} />
}
