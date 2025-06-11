import { Link } from 'react-router-dom'

export default function FinalScreen() {
  return (
    <div>
      <h2>Thank you for playing!</h2>
      <Link to="/">
        <button>Back to Start</button>
      </Link>
    </div>
  )
}
