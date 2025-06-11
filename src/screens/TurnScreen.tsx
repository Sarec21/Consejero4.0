import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGameState } from '../state/gameState'

export default function TurnScreen() {
  const { setPlayerAdvice } = useGameState()
  const [advice, setAdvice] = useState('')

  const handleSend = () => {
    setPlayerAdvice(advice)
  }

  return (
    <div>
      <p>Villagers have gathered in the square with torches.</p>
      <p>Should we intervene or let them speak freely?</p>
      <input
        value={advice}
        onChange={(e) => setAdvice(e.target.value)}
        placeholder="Your advice"
      />
      <Link to="/reaction">
        <button onClick={handleSend}>Send Advice</button>
      </Link>
    </div>
  )
}
