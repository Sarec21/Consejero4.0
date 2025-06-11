import { useNavigate } from 'react-router-dom'
import { useGameState } from '../state/gameState'

const levels = [
  'Aldea',
  'Gobernador',
  'Corte Real',
  'Reino Mitológico',
  'Oráculo Legendario',
]

export default function LevelSelectionScreen() {
  const navigate = useNavigate()
  const { setLevel } = useGameState()

  const handleSelect = (level: string) => {
    setLevel(level)
    navigate('/presentation')
  }

  return (
    <div>
      <h2>Select your level of influence</h2>
      <ul>
        {levels.map((level) => (
          <li key={level}>
            <button onClick={() => handleSelect(level)}>{level}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
