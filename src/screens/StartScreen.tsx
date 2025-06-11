import { useNavigate } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function StartScreen() {
  const navigate = useNavigate()
  const { setKingName, setKingdom } = useGameState()

  const handleStart = () => {
    setKingName('Aldric the Just')
    setKingdom('Eldoria')
    navigate('/level')
  }

  return (
    <div>
      <h1>The Advisor</h1>
      <button onClick={handleStart}>Start Game</button>
    </div>
  )
}
