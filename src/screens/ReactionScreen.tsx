import { Link } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function ReactionScreen() {
  const { kingReaction } = useGameState()
  return (
    <div>
      <p>{kingReaction}</p>
      <Link to="/final">
        <button>End Game</button>
      </Link>
    </div>
  )
}
