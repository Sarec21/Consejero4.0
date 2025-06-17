import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewReactionScreen from '../view/ViewReactionScreen'

export default function ReactionScreen() {
  const {
    kingName,
    playerAdvice,
    kingReaction,
    currentTurn,
    setCurrentTurn,
  } = useGameState()
  const navigate = useNavigate()

  const handleContinue = () => {
    setCurrentTurn(currentTurn + 1)
    navigate('/turn')
  }

  return (
    <ViewReactionScreen
      kingName={kingName}
      playerAdvice={playerAdvice}
      kingReaction={kingReaction}
      onContinue={handleContinue}
    />
  )
}
