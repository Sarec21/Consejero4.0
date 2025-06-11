import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewReactionScreen from '../view/ViewReactionScreen'

export default function ReactionScreen() {
  const { kingName, playerAdvice, kingReaction, setKingReaction } = useGameState()
  const navigate = useNavigate()

  useEffect(() => {
    setKingReaction('The King nods solemnly, but his gaze is stern.')
  }, [setKingReaction])

  const handleEnd = () => {
    navigate('/final')
  }

  return (
    <ViewReactionScreen
      kingName={kingName}
      playerAdvice={playerAdvice}
      kingReaction={kingReaction}
      onEnd={handleEnd}
    />
  )
}
