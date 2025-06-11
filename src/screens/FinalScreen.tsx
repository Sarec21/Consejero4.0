import { useNavigate } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function FinalScreen() {
  const navigate = useNavigate()
  const { resetState } = useGameState()

  const handleReset = () => {
    resetState()
    navigate('/')
  }

  return (
    <div>
      <p>Your service has ended. The future of Eldoria is uncertain.</p>
      <button onClick={handleReset}>Play Again</button>
    </div>
  )
}
