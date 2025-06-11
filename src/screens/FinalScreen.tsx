import { useNavigate } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function FinalScreen() {
  const navigate = useNavigate()
  const { setKingName, setKingdom, setPlayerAdvice, setKingReaction } =
    useGameState()

  const handleReset = () => {
    setKingName('')
    setKingdom('')
    setPlayerAdvice('')
    setKingReaction('')
    navigate('/')
  }

  return (
    <div>
      <p>Your service has ended. The future of Eldoria is uncertain.</p>
      <button onClick={handleReset}>Play Again</button>
    </div>
  )
}
