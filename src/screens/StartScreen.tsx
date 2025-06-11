import { Link } from 'react-router-dom'

export default function StartScreen() {
  return (
    <div>
      <h1>The Advisor</h1>
      <Link to="/presentation">
        <button>Start Game</button>
      </Link>
    </div>
  )
}
