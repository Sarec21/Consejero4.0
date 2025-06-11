import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewFinalScreen from '../view/ViewFinalScreen'

export default function FinalScreen() {
  const navigate = useNavigate()
  const { resetState } = useGameState()

  const handleReset = () => {
    resetState()
    navigate('/')
  }

  return <ViewFinalScreen onReset={handleReset} />
}
