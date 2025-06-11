import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useGameState } from '../state/gameState'

export default function ReactionScreen() {
  const { kingName, playerAdvice, kingReaction, setKingReaction } = useGameState()

  useEffect(() => {
    setKingReaction('The King nods solemnly, but his gaze is stern.')
  }, [setKingReaction])

  return (
    <div>
      <p>Your advice to King {kingName}: {playerAdvice}</p>
      <p>{kingReaction}</p>
      <Link to="/final">
        <button>End Game</button>
      </Link>
    </div>
  )
}
