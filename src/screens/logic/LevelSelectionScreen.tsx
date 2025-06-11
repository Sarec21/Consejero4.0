import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewLevelSelectionScreen from '../view/ViewLevelSelectionScreen'

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
    <ViewLevelSelectionScreen levels={levels} onSelect={handleSelect} />
  )
}
