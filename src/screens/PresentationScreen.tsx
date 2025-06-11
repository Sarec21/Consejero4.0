import { Link } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function PresentationScreen() {
  const { kingName, kingdom } = useGameState()
  return (
    <div>
      <h2>{kingName} of {kingdom}</h2>
      <p>You are now the advisor of King {kingName} of {kingdom}.</p>
      <Link to="/turn">
        <button>Continue</button>
      </Link>
    </div>
  )
}
