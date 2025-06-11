import { Link } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function PresentationScreen() {
  const { kingName, kingdom } = useGameState()
  return (
    <div>
      <h2>Welcome to {kingdom}</h2>
      <p>King {kingName} awaits your counsel.</p>
      <Link to="/turn">
        <button>Continue</button>
      </Link>
    </div>
  )
}
