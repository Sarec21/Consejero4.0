import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewStartScreen from '../view/ViewStartScreen'

export default function StartScreen() {
  const navigate = useNavigate()
  const { setKingName, setKingdom } = useGameState()

  const handleStart = () => {
    setKingName('Aldric the Just')
    setKingdom('Eldoria')
    navigate('/level')
  }

  return <ViewStartScreen onStart={handleStart} />
}
